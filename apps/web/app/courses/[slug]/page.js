'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { apiGet, apiPost } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

/* ──── Tab Button ──── */
function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
        active
          ? 'bg-[#7A1F2B] text-white shadow-md'
          : 'text-gray-500 hover:text-[#7A1F2B] hover:bg-[#7A1F2B]/5'
      }`}
    >
      {label}
    </button>
  );
}

/* ──── Skeleton ──── */
function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="h-72 bg-gray-200" />
      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-8 flex-wrap">
        <div className="flex-1 min-w-[300px] space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-40 bg-gray-200 rounded-xl mt-6" />
        </div>
        <div className="w-80 h-96 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    async function load() {
      let res = await apiGet(`/api/v1/courses?slug=${encodeURIComponent(slug)}`);
      let c = null;
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        c = res.data[0];
      } else {
        res = await apiGet(`/api/v1/courses/${slug}`);
        c = res.data;
      }
      if (c) {
        setCourse(c);
        const modRes = await apiGet(`/api/v1/courses/${c._id}/modules`);
        setModules(modRes.data || []);
        const enrollRes = await apiGet('/api/v1/enrollments');
        if (enrollRes.data) {
          const isEnrolled = enrollRes.data.some(
            e => (typeof e.courseId === 'string' ? e.courseId : e.courseId?._id) === c._id
          );
          setEnrolled(isEnrolled);
        }
        // check wishlist
        const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlisted(!!list.find(w => w._id === c._id));
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  async function handleEnroll() {
    if (!course) return;
    setEnrolling(true);
    setError('');
    if ((course.priceInr || course.price) > 0) {
      router.push(`/checkout?courseId=${course._id}`);
      return;
    }
    const res = await apiPost('/api/v1/enrollments', { courseId: course._id });
    if (res.error) {
      setError(res.error.message);
    } else {
      setEnrolled(true);
    }
    setEnrolling(false);
  }

  function toggleWishlist() {
    if (!course) return;
    const list = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = list.find(c => c._id === course._id);
    if (exists) {
      const updated = list.filter(c => c._id !== course._id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setWishlisted(false);
    } else {
      list.push({
        _id: course._id,
        title: course.title,
        price: course.priceInr || course.price,
        slug: course.slug,
      });
      localStorage.setItem('wishlist', JSON.stringify(list));
      setWishlisted(true);
    }
  }

  const totalLessons = useMemo(
    () => modules.reduce((sum, m) => sum + (m.lessonCount || m.lessons?.length || 0), 0),
    [modules]
  );

  const hasDiscount =
    course?.originalPriceInr && course.originalPriceInr > (course?.priceInr || course?.price || 0);
  const price = course?.priceInr || course?.price || 0;

  if (loading) return <DetailSkeleton />;

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Course Not Found</h1>
          <p className="text-gray-500 mb-6">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A1F2B] text-white rounded-xl font-medium hover:bg-[#5C1520] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero Section ── */}
      <div className="relative bg-gradient-to-br from-[#7A1F2B] via-[#5C1520] to-[#4A1019] overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#C5975B] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Courses
          </Link>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              {course.category && (
                <span className="inline-block text-xs font-semibold text-white/90 bg-white/15 px-3 py-1 rounded-full mb-4">
                  {course.category}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-2xl">
                  {course.subtitle}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                {modules.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    {modules.length} Modules
                  </span>
                )}
                {totalLessons > 0 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {totalLessons} Lessons
                  </span>
                )}
                {course.durationWeeks > 0 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {course.durationWeeks} Weeks
                  </span>
                )}
                {course.enrolledCount > 0 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                    {course.enrolledCount.toLocaleString()} Students
                  </span>
                )}
                {course.difficultyLevel && (
                  <span className="flex items-center gap-1.5 capitalize">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {course.difficultyLevel}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Right — Sticky Price Card (Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden lg:block w-[340px] shrink-0"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {(course.thumbnailUrl || course.thumbnail) && (
                  <div className="relative h-48">
                    <Image
                      src={course.thumbnailUrl || course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="340px"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-extrabold text-gray-900">
                      {price > 0 ? `₹${price.toLocaleString()}` : 'Free'}
                    </span>
                    {hasDiscount && (
                      <span className="text-base text-gray-400 line-through">
                        ₹{course.originalPriceInr.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {hasDiscount && (
                    <p className="text-sm text-green-600 font-medium mb-4">
                      💰{' '}
                      {Math.round(
                        ((course.originalPriceInr - price) / course.originalPriceInr) * 100
                      )}
                      % discount applied
                    </p>
                  )}

                  {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

                  {enrolled ? (
                    <Link
                      href={`/learn/${course._id}`}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-base hover:bg-emerald-700 transition-colors"
                    >
                      Continue Learning
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="w-full py-3.5 bg-[#7A1F2B] text-white rounded-xl font-bold text-base hover:bg-[#5C1520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {enrolling ? 'Processing...' : price > 0 ? 'Enroll Now' : 'Enroll for Free'}
                    </button>
                  )}

                  {!enrolled && (
                    <button
                      onClick={toggleWishlist}
                      className={`w-full mt-3 py-2.5 rounded-xl font-medium text-sm border transition-colors ${
                        wishlisted
                          ? 'border-red-200 text-red-500 bg-red-50 hover:bg-red-100'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {wishlisted ? '❤️ In Wishlist' : '♡ Add to Wishlist'}
                    </button>
                  )}

                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Full lifetime access
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Certificate on completion
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {modules.length} modules,{' '}
                      {totalLessons} lessons
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Secure payment
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile Price Bar ── */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-xl font-extrabold text-gray-900">
              {price > 0 ? `₹${price.toLocaleString()}` : 'Free'}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ₹{course.originalPriceInr.toLocaleString()}
              </span>
            )}
          </div>
          {enrolled ? (
            <Link
              href={`/learn/${course._id}`}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors"
            >
              Continue →
            </Link>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="px-6 py-2.5 bg-[#7A1F2B] text-white rounded-xl font-bold text-sm hover:bg-[#5C1520] disabled:opacity-50"
            >
              {enrolling ? 'Processing...' : 'Enroll Now'}
            </button>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-10">
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
              <TabBtn
                label="Overview"
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
              />
              <TabBtn
                label="Benefits"
                active={activeTab === 'benefits'}
                onClick={() => setActiveTab('benefits')}
              />
              <TabBtn
                label="Curriculum"
                active={activeTab === 'curriculum'}
                onClick={() => setActiveTab('curriculum')}
              />
              <TabBtn
                label="FAQ"
                active={activeTab === 'faq'}
                onClick={() => setActiveTab('faq')}
              />
              <TabBtn
                label="Reviews"
                active={activeTab === 'reviews'}
                onClick={() => setActiveTab('reviews')}
              />
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* What you'll learn */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-5">What You&apos;ll Learn</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(course.whatYouLearn || modules.slice(0, 6).map(m => m.title)).map(
                        (item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-sm text-gray-700">
                              {typeof item === 'string' ? item : item?.title || `Module ${i + 1}`}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">About This Course</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {course.description}
                    </p>
                    {course.introCopy && (
                      <p className="text-gray-600 leading-relaxed mt-4 whitespace-pre-wrap">
                        {course.introCopy}
                      </p>
                    )}
                  </div>

                  {/* Course Highlights */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                      <div className="text-3xl mb-2">📚</div>
                      <div className="text-2xl font-bold text-gray-900">{modules.length}</div>
                      <div className="text-sm text-gray-500">Modules</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                      <div className="text-3xl mb-2">🎥</div>
                      <div className="text-2xl font-bold text-gray-900">{totalLessons}</div>
                      <div className="text-sm text-gray-500">Lessons</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                      <div className="text-3xl mb-2">🏆</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {course.durationWeeks || '—'}
                      </div>
                      <div className="text-sm text-gray-500">Weeks</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'benefits' && (
                <motion.div
                  key="benefits"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Program Benefits</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        {
                          icon: '🎓',
                          title: 'Industry-Ready Skills',
                          desc: 'Learn directly applicable skills that startups need right now',
                        },
                        {
                          icon: '🏆',
                          title: 'Official Certificate',
                          desc: 'Get a verified certificate to showcase your achievement',
                        },
                        {
                          icon: '🤝',
                          title: 'Mentor Access',
                          desc: 'Connect with experienced mentors and industry professionals',
                        },
                        {
                          icon: '📊',
                          title: 'Real Case Studies',
                          desc: 'Work on real-world startup scenarios and business problems',
                        },
                        {
                          icon: '🌐',
                          title: 'Community Network',
                          desc: 'Join a community of like-minded founders and entrepreneurs',
                        },
                        {
                          icon: '♾️',
                          title: 'Lifetime Access',
                          desc: 'Revisit content anytime — your access never expires',
                        },
                      ].map((b, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-[#F8F9FA] rounded-xl">
                          <span className="text-2xl shrink-0">{b.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{b.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Trust stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                      <div className="text-2xl font-bold text-[#7A1F2B]">
                        {course.enrolledCount?.toLocaleString() || '100'}+
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Students Enrolled</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                      <div className="text-2xl font-bold text-[#7A1F2B]">4.8</div>
                      <div className="text-sm text-gray-500 mt-1">Average Rating</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                      <div className="text-2xl font-bold text-[#7A1F2B]">95%</div>
                      <div className="text-sm text-gray-500 mt-1">Completion Rate</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-5">
                      Frequently Asked Questions
                    </h2>
                    {[
                      {
                        q: 'When does the program start?',
                        a: course.startDate
                          ? `The program starts on ${new Date(course.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`
                          : 'You can start immediately after enrollment.',
                      },
                      {
                        q: 'Will I get a certificate?',
                        a: 'Yes, you will receive a verified certificate of completion after finishing all modules and assessments.',
                      },
                      {
                        q: 'Can I access the content after completion?',
                        a: 'Absolutely. You get full lifetime access to all course materials, even after completion.',
                      },
                      {
                        q: 'Is there mentor support?',
                        a: 'Yes, you will have access to mentors and community support throughout the program.',
                      },
                      {
                        q: 'Is there a refund policy?',
                        a: 'Please check our refund policy page for detailed information about refunds and cancellations.',
                      },
                    ].map((faq, i) => (
                      <details key={i} className="group border-b border-gray-100 last:border-0">
                        <summary className="flex items-center justify-between py-4 cursor-pointer text-sm font-semibold text-gray-700 hover:text-[#7A1F2B]">
                          {faq.q}
                          <svg
                            className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <p className="pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'curriculum' && (
                <motion.div
                  key="curriculum"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Course Curriculum</h2>
                      <span className="text-sm text-gray-500">
                        {modules.length} modules • {totalLessons} lessons
                      </span>
                    </div>

                    <div className="space-y-3">
                      {modules.map((mod, i) => (
                        <div
                          key={mod._id || i}
                          className="border border-gray-100 rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#7A1F2B]/10 text-sm font-bold text-[#7A1F2B]">
                                {i + 1}
                              </span>
                              <div>
                                <h3 className="font-semibold text-gray-800 text-sm">{mod.title}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {mod.lessonCount || mod.lessons?.length || 0} lessons
                                  {mod.durationHours > 0 && ` • ${mod.durationHours}h`}
                                </p>
                              </div>
                            </div>
                            <svg
                              className={`w-4 h-4 text-gray-400 transition-transform ${expandedModule === i ? 'rotate-180' : ''}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          {expandedModule === i && mod.description && (
                            <div className="px-5 pb-4 text-sm text-gray-500 border-t border-gray-50 pt-3">
                              {mod.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 text-center py-16">
                    <div className="text-5xl mb-4">⭐</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Reviews Coming Soon
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Student reviews will appear here once the course has enrollments.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop sidebar spacer (the actual card is in the hero) */}
          <div className="hidden lg:block w-[340px] shrink-0" />
        </div>
      </div>
    </div>
  );
}
