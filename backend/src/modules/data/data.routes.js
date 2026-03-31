const express = require('express');
const { z } = require('zod');
const { authRequired } = require('../../middlewares/authMiddleware');
const { validateBody } = require('../../middlewares/validateBody');
const { asyncHandler } = require('../../utils/asyncHandler');
const { ApiError } = require('../../utils/apiError');
const { User } = require('../users/user.model');
const { Course, Module, Lesson } = require('../courses/course.model');
const { Enrollment, LessonProgress } = require('../enrollments/enrollment.model');
const { Certificate } = require('../certificates/certificate.model');
const { Mentor } = require('../profiles/mentor.model');
const { Investor } = require('../profiles/investor.model');
const {
  QuizAttempt,
  QuizResponse,
  Quiz,
  Video,
  Assignment,
  Progress,
} = require('../learning/learning.model');
const { Activity } = require('../activity/activity.model');

const router = express.Router();

const modelRegistry = {
  user_profiles: User,
  profiles: User,
  courses: Course,
  modules: Module,
  lessons: Lesson,
  enrollments: Enrollment,
  lesson_progress: LessonProgress,
  certificates: Certificate,
  mentors: Mentor,
  investors: Investor,
  quiz_attempts: QuizAttempt,
  quiz_responses: QuizResponse,
  quizzes: Quiz,
  videos: Video,
  assignments: Assignment,
  progress: Progress,
  user_activity: Activity,
};

const querySchema = z.object({
  table: z.string().min(1),
  operation: z.enum(['select', 'insert', 'upsert', 'update', 'delete', 'rpc']),
  select: z.string().optional(),
  filters: z
    .array(
      z.object({
        op: z.enum(['eq', 'in', 'gte', 'lte']),
        field: z.string().min(1),
        value: z.any(),
      })
    )
    .optional(),
  orderBy: z.object({ field: z.string(), ascending: z.boolean().optional() }).optional(),
  limit: z.number().int().positive().max(500).optional(),
  single: z.boolean().optional(),
  values: z.any().optional(),
  onConflict: z.string().optional(),
  rpc: z.object({ name: z.string(), params: z.record(z.any()).optional() }).optional(),
});

function camelToSnake(key) {
  return key.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}

function snakeToCamel(key) {
  return key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function normalizeInputKeys(input) {
  if (Array.isArray(input)) {
    return input.map(item => normalizeInputKeys(item));
  }
  if (input && typeof input === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(input)) {
      if (key === 'id') {
        out._id = normalizeInputKeys(value);
      } else {
        out[snakeToCamel(key)] = normalizeInputKeys(value);
      }
    }
    return out;
  }
  return input;
}

function normalizeOutput(input) {
  if (Array.isArray(input)) {
    return input.map(item => normalizeOutput(item));
  }
  if (input && typeof input === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(input)) {
      const normalizedKey = key === '_id' ? 'id' : camelToSnake(key);
      out[normalizedKey] = normalizeOutput(value);
    }
    return out;
  }
  return input;
}

function attachLegacyRelations(rows, table, selectClause) {
  const list = Array.isArray(rows) ? rows : rows ? [rows] : [];
  const includesCourses = typeof selectClause === 'string' && selectClause.includes('courses(');
  const includesQuizzes = typeof selectClause === 'string' && selectClause.includes('quizzes(');

  if (!includesCourses && !includesQuizzes) {
    return rows;
  }

  const transformed = list.map(row => {
    const next = { ...row };
    if (includesCourses && ['enrollments', 'certificates'].includes(table)) {
      next.courses = row.course_id || null;
    }
    if (includesQuizzes && table === 'quiz_responses') {
      next.quizzes = row.quiz_id || null;
    }
    return next;
  });

  if (Array.isArray(rows)) return transformed;
  return transformed[0] || null;
}

function applyFilters(query, filters = []) {
  let output = query;
  for (const filter of filters) {
    const field = filter.field === 'id' ? '_id' : snakeToCamel(filter.field);
    const value = normalizeInputKeys(filter.value);
    if (filter.op === 'eq') output = output.where(field).equals(value);
    if (filter.op === 'in') output = output.where(field).in(value || []);
    if (filter.op === 'gte') output = output.where(field).gte(value);
    if (filter.op === 'lte') output = output.where(field).lte(value);
  }
  return output;
}

function enforceUserScope(input, req) {
  if (req.user.role === 'admin') return input;

  const scopedTables = new Set([
    'profiles',
    'user_profiles',
    'enrollments',
    'lesson_progress',
    'certificates',
    'quiz_attempts',
    'quiz_responses',
    'assignments',
    'progress',
    'user_activity',
  ]);

  if (!scopedTables.has(input.table)) return input;

  const next = { ...input };
  const currentFilters = next.filters || [];
  const field = input.table === 'profiles' || input.table === 'user_profiles' ? 'id' : 'userId';
  const sanitizedFilters = currentFilters.filter(
    f => !['userId', 'user_id', 'id'].includes(f.field)
  );
  next.filters = [...sanitizedFilters, { op: 'eq', field, value: req.user.userId }];

  return next;
}

router.post(
  '/query',
  authRequired,
  validateBody(querySchema),
  asyncHandler(async (req, res) => {
    const scopedInput = enforceUserScope(req.body, req);
    const Model = modelRegistry[scopedInput.table];
    if (!Model) {
      throw new ApiError(400, `Unsupported table: ${scopedInput.table}`);
    }

    if (scopedInput.operation === 'rpc') {
      if (scopedInput.rpc?.name === 'generate_certificate_number') {
        return res.json({
          success: true,
          data: `CERT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
        });
      }
      throw new ApiError(400, `Unsupported rpc: ${scopedInput.rpc?.name || 'unknown'}`);
    }

    if (scopedInput.operation === 'select') {
      let query = applyFilters(Model.find(), scopedInput.filters);

      if (
        scopedInput.table === 'enrollments' &&
        String(scopedInput.select || '').includes('courses(')
      ) {
        query = query.populate({ path: 'courseId', model: 'Course' });
      }

      if (
        scopedInput.table === 'certificates' &&
        String(scopedInput.select || '').includes('courses(')
      ) {
        query = query.populate({ path: 'courseId', model: 'Course' });
      }

      if (
        scopedInput.table === 'quiz_responses' &&
        String(scopedInput.select || '').includes('quizzes(')
      ) {
        query = query.populate({ path: 'quizId', model: 'Quiz' });
      }

      if (scopedInput.orderBy) {
        const orderField =
          scopedInput.orderBy.field === 'id' ? '_id' : snakeToCamel(scopedInput.orderBy.field);
        query = query.sort({ [orderField]: scopedInput.orderBy.ascending === false ? -1 : 1 });
      }
      if (scopedInput.limit) {
        query = query.limit(scopedInput.limit);
      }

      if (scopedInput.single) {
        const row = await query.findOne().lean();
        const normalized = normalizeOutput(row);
        return res.json({
          success: true,
          data: attachLegacyRelations(normalized, scopedInput.table, scopedInput.select),
          error: row ? null : { code: 'PGRST116', message: 'No rows found' },
        });
      }

      const rows = await query.lean();
      const normalized = normalizeOutput(rows);
      return res.json({
        success: true,
        data: attachLegacyRelations(normalized, scopedInput.table, scopedInput.select),
        error: null,
      });
    }

    if (scopedInput.operation === 'insert') {
      const normalized = normalizeInputKeys(scopedInput.values);
      const inserted = await Model.insertMany(
        Array.isArray(normalized) ? normalized : [normalized]
      );
      const data = Array.isArray(scopedInput.values) ? inserted : inserted[0];
      return res.status(201).json({ success: true, data: normalizeOutput(data), error: null });
    }

    if (scopedInput.operation === 'upsert') {
      const values = normalizeInputKeys(scopedInput.values);
      const conflictFields = (scopedInput.onConflict || '')
        .split(',')
        .map(f => f.trim())
        .filter(Boolean)
        .map(f => (f === 'id' ? '_id' : snakeToCamel(f)));

      if (!values || conflictFields.length === 0) {
        throw new ApiError(400, 'Upsert requires values and onConflict');
      }

      const conflictFilter = {};
      for (const key of conflictFields) {
        conflictFilter[key] = values[key];
      }

      const result = await Model.findOneAndUpdate(
        conflictFilter,
        { $set: values },
        { upsert: true, new: true }
      ).lean();
      return res.json({ success: true, data: normalizeOutput(result), error: null });
    }

    if (scopedInput.operation === 'update') {
      const values = normalizeInputKeys(scopedInput.values || {});
      const filterQuery = applyFilters(Model.find(), scopedInput.filters);
      const filter = filterQuery.getFilter();
      const updated = await Model.findOneAndUpdate(filter, { $set: values }, { new: true }).lean();
      return res.json({ success: true, data: normalizeOutput(updated), error: null });
    }

    if (scopedInput.operation === 'delete') {
      const filterQuery = applyFilters(Model.find(), scopedInput.filters);
      const filter = filterQuery.getFilter();
      const deleted = await Model.findOneAndDelete(filter).lean();
      return res.json({ success: true, data: normalizeOutput(deleted), error: null });
    }

    throw new ApiError(400, `Unsupported operation: ${scopedInput.operation}`);
  })
);

module.exports = { dataRouter: router };
