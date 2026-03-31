
// Course progress service removed: Supabase/browser code purged for backend-only use.
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  },

  /**
   * Clear course-specific cache
   */
  clearCourseCache(userId, courseId) {
    if (!userId || !courseId) return;
    
    dataCache.delete(`enrollment_${userId}_${courseId}`);
    dataCache.delete(`lessons_${userId}_${courseId}`);
    dataCache.delete(`enrollments_${userId}`);
    dataCache.delete(`activity_${userId}`);
  },

  /**
   * Bulk update - useful for migrations
   */
  async initializeEnrollmentLessons(userId, courseId, totalLessons = 20) {
    if (!userId || !courseId) return;
    
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .update({
          total_lessons: totalLessons,
          lessons_completed: 0,
        })
        .eq('user_id', userId)
        .eq('course_id', String(courseId))
        .select()
        .single();
      
      if (error) throw error;
      
      this.clearCourseCache(userId, courseId);
      return data;
    } catch (err) {
      console.error('Error initializing enrollment lessons:', err);
      throw err;
    }
  },
};
