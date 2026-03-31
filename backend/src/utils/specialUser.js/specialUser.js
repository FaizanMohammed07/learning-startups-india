/**
 * Special User Configuration
 * This user has access to the full course flow for demonstration purposes
 */

// Special admin credentials (for demonstration only)
export const SPECIAL_USER_EMAIL = 'demo@startupsindia.in';
export const SPECIAL_USER_PASSWORD = 'Demo@2026!StartupIndia';

/**
 * Check if the current user is the special admin user
 * @param {object} user - Supabase user object
 * @returns {boolean} - True if user is special admin
 */
export function isSpecialUser(user) {
  if (!user || !user.email) return false;
  return user.email.toLowerCase() === SPECIAL_USER_EMAIL.toLowerCase();
}

/**
 * Check if user can access premium features (enrollment, checkout, etc.)
 * @param {object} user - Supabase user object
 * @returns {boolean} - True if user can access premium features
 */
export function canAccessPremiumFeatures(user) {
  return isSpecialUser(user);
}

/**
 * Get launch date information
 * @returns {object} - Launch date details
 */
export function getLaunchInfo() {
  return {
    date: '26th January, 2026',
    shortDate: '26 Jan 2026',
    timestamp: new Date('2026-01-26T00:00:00+05:30'),
    subtitle: 'Republic Day Special Launch',
    isLaunched: false // Will be true after launch date
  };
}

/**
 * Check if the platform has launched
 * @returns {boolean} - True if current date is past launch date
 */
export function isPlatformLaunched() {
  const launchDate = new Date('2026-01-26T00:00:00+05:30');
  const now = new Date();
  return now >= launchDate;
}
