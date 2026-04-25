const mongoose = require('mongoose');
const { Progress } = require('../learning/learning.model');
const { Submission } = require('../assessments/assessments.model');
const { Video } = require('../learning/learning.model');

class AnalyticsService {
  /**
   * Progress Overview Aggregation
   */
  async getProgressOverview(userId) {
    const totalVideos = await Video.countDocuments();
    const completedVideos = await Progress.countDocuments({ userId, completed: true });
    
    // Aggregation by course
    const courseProgress = await Progress.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoId',
          foreignField: '_id',
          as: 'video'
        }
      },
      { $unwind: '$video' },
      {
        $group: {
          _id: '$video.courseId',
          completedCount: { $sum: { $cond: ['$completed', 1, 0] } },
          totalWatchedSeconds: { $sum: '$watchedSeconds' }
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'course'
        }
      },
      { $unwind: '$course' },
      {
        $project: {
          courseTitle: '$course.title',
          completedCount: 1,
          totalWatchedSeconds: 1,
          percentage: { $multiply: [{ $divide: ['$completedCount', { $max: [1, '$course.totalLessons'] }] }, 100] }
        }
      }
    ]);

    return {
      overallCompletion: totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0,
      completedItems: completedVideos,
      totalItems: totalVideos,
      courseBreakdown: courseProgress
    };
  }

  /**
   * Performance Analytics Aggregation
   */
  async getPerformanceAnalytics(userId) {
    const submissions = await Submission.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), status: 'graded' } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: { $divide: ['$score', '$totalPoints'] } },
          maxScore: { $max: { $divide: ['$score', '$totalPoints'] } },
          totalAttempts: { $sum: 1 }
        }
      }
    ]);

    const trends = await Submission.find({ userId, status: 'graded' })
      .sort({ submittedAt: 1 })
      .limit(10)
      .project({ score: 1, totalPoints: 1, submittedAt: 1 });

    return {
      averageAccuracy: submissions.length > 0 ? submissions[0].avgScore * 100 : 0,
      bestPerformance: submissions.length > 0 ? submissions[0].maxScore * 100 : 0,
      totalEvaluations: submissions.length > 0 ? submissions[0].totalAttempts : 0,
      history: trends.map(s => ({
        date: s.submittedAt,
        accuracy: (s.score / s.totalPoints) * 100
      }))
    };
  }

  /**
   * Learning Time Aggregation
   */
  async getLearningTime(userId) {
    const timeData = await Progress.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          seconds: { $sum: "$watchedSeconds" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const totalSeconds = timeData.reduce((acc, curr) => acc + curr.seconds, 0);

    return {
      totalHours: (totalSeconds / 3600).toFixed(2),
      dailyBreakdown: timeData.map(d => ({
        date: d._id,
        minutes: Math.round(d.seconds / 60)
      }))
    };
  }

  /**
   * Skill Graph Aggregation
   */
  async getSkillGraph(userId) {
    // Skills are mapped from course categories and submission scores
    const skills = await Submission.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), status: 'graded' } },
      {
        $lookup: {
          from: 'assessments',
          localField: 'assessmentId',
          foreignField: '_id',
          as: 'assessment'
        }
      },
      { $unwind: '$assessment' },
      {
        $lookup: {
          from: 'courses',
          localField: 'assessment.courseId',
          foreignField: '_id',
          as: 'course'
        }
      },
      { $unwind: '$course' },
      {
        $group: {
          _id: '$course.category',
          mastery: { $avg: { $divide: ['$score', '$totalPoints'] } },
          engagement: { $sum: 1 }
        }
      },
      {
        $project: {
          skill: '$_id',
          level: { $multiply: ['$mastery', 100] },
          strength: '$engagement'
        }
      }
    ]);

    return skills.length > 0 ? skills : [
      { skill: 'Strategy', level: 0, strength: 0 },
      { skill: 'Product', level: 0, strength: 0 },
      { skill: 'Growth', level: 0, strength: 0 },
      { skill: 'Finance', level: 0, strength: 0 }
    ];
  }
}

module.exports = new AnalyticsService();
