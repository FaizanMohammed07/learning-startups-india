module.exports = {
  auth: ['app/login/page.js', 'app/signup/page.js', 'app/verify/page.js'],
  dashboard: ['app/dashboard/page.js', 'app/dashboard/my-courses/page.js', 'app/dashboard/certificates/page.js'],
  learning: ['app/courses/[slug]/page.js', 'app/learn/[courseId]/page.js', 'app/quiz/page.js', 'app/certificate/page.js'],
  marketing: ['app/page.js', 'app/about/page.js', 'app/events/page.js', 'app/mentors/page.js', 'app/investors/page.js'],
};
