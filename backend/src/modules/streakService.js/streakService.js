import { supabase } from './supabaseClient';


// Streak service removed: Supabase/browser code purged for backend-only use.
      return {
        day: dayNumber,
        completed,
        isToday
      };
    });

    return { success: true, data: calendar };
  } catch (error) {
    console.error('Error getting streak calendar:', error);
    return { success: false, error: error.message, data: [] };
  }
}

/**
 * Update streak (force recalculation)
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Updated streak data
 */
export async function updateStreak(userId) {
  try {
    const { data, error } = await supabase.rpc('update_user_streak', {
      p_user_id: userId
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating streak:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Track page visit (logs 1 minute of activity)
 * @param {string} userId - User ID
 * @param {string} activityType - Type of activity
 * @returns {Promise<Object>} Log result
 */
export async function trackPageVisit(userId, activityType = 'page_visit') {
  return await logActivity(userId, 1);
}

/**
 * Track video watch (logs actual minutes watched)
 * @param {string} userId - User ID
 * @param {number} minutes - Minutes watched
 * @returns {Promise<Object>} Log result
 */
export async function trackVideoWatch(userId, minutes) {
  return await logActivity(userId, Math.round(minutes));
}

/**
 * Track lesson completion (logs 5 minutes)
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Log result
 */
export async function trackLessonCompletion(userId) {
  return await logActivity(userId, 5);
}

/**
 * Check if user needs to maintain streak today
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Streak status
 */
export async function checkStreakStatus(userId) {
  try {
    const { data: streakData } = await getUserStreakData(userId);
    
    const needsActivity = !streakData.todayGoalAchieved;
    const minutesLeft = Math.max(0, 10 - streakData.todayMinutes);
    const riskLevel = streakData.currentStreak > 0 && needsActivity ? 'high' : 'normal';

    return {
      success: true,
      data: {
        needsActivity,
        minutesLeft,
        currentStreak: streakData.currentStreak,
        todayGoalAchieved: streakData.todayGoalAchieved,
        riskLevel,
        message: needsActivity 
          ? `${minutesLeft} minutes left to maintain your ${streakData.currentStreak}-day streak!`
          : `Great! You've maintained your ${streakData.currentStreak}-day streak today!`
      }
    };
  } catch (error) {
    console.error('Error checking streak status:', error);
    return { success: false, error: error.message };
  }
}
