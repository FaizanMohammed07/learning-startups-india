/**
 * Activity Logger
 * Logs user activities to the user_activity table for display in dashboard
 */

import { supabase } from './supabaseClient';

export const activityLogger = {
  /**
   * Log user activity to database
   * @param {string} userId - User ID
   * @param {string} activityType - Type of activity (login, logout, enrollment, etc.)
   * @param {string} description - Human-readable description
   * @param {object} metadata - Additional metadata (optional)
   */
  async logActivity(userId, activityType, description, metadata = {}) {
    if (!userId || !activityType) {
      console.warn('Activity logger: Missing userId or activityType');
      return { success: false, error: 'Missing required parameters' };
    }

    try {
      const { data, error } = await supabase
        .from('user_activity')
        .insert({
          user_id: userId,
          activity_type: activityType,
          description: description,
          metadata: metadata,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to log activity:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Activity logged:', activityType, description);
      return { success: true, data };
    } catch (err) {
      console.error('Activity logger error:', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Log user login
   */
  async logLogin(userId, provider = 'email') {
    const description = provider === 'google' 
      ? 'Logged in with Google' 
      : 'Logged in';
    
    return this.logActivity(userId, 'login', description, { provider });
  },

  /**
   * Log user logout
   */
  async logLogout(userId) {
    return this.logActivity(userId, 'logout', 'Logged out', {});
  },

  /**
   * Log course enrollment
   */
  async logEnrollment(userId, courseId, courseName) {
    return this.logActivity(
      userId, 
      'enrollment', 
      `Enrolled in ${courseName}`, 
      { course_id: courseId, course_name: courseName }
    );
  },

  /**
   * Log lesson completion
   */
  async logLessonComplete(userId, lessonId, lessonName, courseId) {
    return this.logActivity(
      userId,
      'lesson_complete',
      `Completed ${lessonName}`,
      { lesson_id: lessonId, lesson_name: lessonName, course_id: courseId }
    );
  },

  /**
   * Log course completion
   */
  async logCourseComplete(userId, courseId, courseName) {
    return this.logActivity(
      userId,
      'completion',
      `Completed ${courseName}`,
      { course_id: courseId, course_name: courseName }
    );
  },

  /**
   * Log certificate earned
   */
  async logCertificate(userId, courseId, courseName, certificateId) {
    return this.logActivity(
      userId,
      'certificate',
      `Earned certificate for ${courseName}`,
      { course_id: courseId, course_name: courseName, certificate_id: certificateId }
    );
  }
};
