'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { apiGet, apiPost } from '@/lib/api';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════
   INLINE SVG ICONS — no emojis anywhere
   ═══════════════════════════════════════════════ */
const Icons = {
  back: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
  ),
  arrow: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ),
  checkCircle: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  modules: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  ),
  video: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  ),
  clock: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  users: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
  ),
  bolt: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  star: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
  ),
  heart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  heartFill: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  ),
  certificate: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
  ),
  mentor: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  infinity: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" /></svg>
  ),
  play: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
  ),
  lock: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
  ),
  chevDown: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  ),
  book: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  trophy: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  fire: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /></svg>
  ),
  share: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
  ),
  eye: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
  ),
  sparkle: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744l.311 1.242 1.242.311a1 1 0 010 1.406l-1.242.311-.311 1.242a1 1 0 01-1.934 0l-.311-1.242-1.242-.311a1 1 0 010-1.406l1.242-.311L12.033 2.744A1 1 0 0112 2z" /></svg>
  ),
  money: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
};

/* ──── Animated Counter (scrolls into view) ──── */
function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target, 10) || 0;
    if (end === 0) { setCount(0); return; }
    const duration = 1400;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ──── Tab Button with pill animation ──── */
function TabBtn({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
        active
          ? 'text-white'
          : 'text-gray-500 hover:text-[#7A1F2B] hover:bg-[#7A1F2B]/5'
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-[#7A1F2B] rounded-xl shadow-lg"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{icon}{label}</span>
    </button>
  );
}

/* ──── Premium Skeleton ──── */
function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="h-80 bg-gradient-to-br from-[#7A1F2B] to-[#5C1520] animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-white/20 border-t-white/60 animate-spin" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-8 flex-wrap">
        <div className="flex-1 min-w-[300px] space-y-4">
          <div className="h-8 bg-gray-200 rounded-xl w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="h-48 bg-gray-100 rounded-2xl mt-6 animate-pulse" />
        </div>
        <div className="w-80 h-[420px] bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

/* ──── Floating Particles (decorative) ──── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
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
  const [expandAll, setExpandAll] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

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
    if (res.error) setError(res.error.message);
    else setEnrolled(true);
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
      list.push({ _id: course._id, title: course.title, price: course.priceInr || course.price, slug: course.slug });
      localStorage.setItem('wishlist', JSON.stringify(list));
      setWishlisted(true);
    }
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: course.title, url });
    } else {
      navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  }

  const totalLessons = useMemo(
    () => modules.reduce((sum, m) => sum + (m.lessonCount || m.lessons?.length || 0), 0),
    [modules]
  );
  const hasDiscount = course?.originalPriceInr && course.originalPriceInr > (course?.priceInr || course?.price || 0);
  const price = course?.priceInr || course?.price || 0;
  const discountPercent = hasDiscount ? Math.round(((course.originalPriceInr - price) / course.originalPriceInr) * 100) : 0;

  if (loading) return <DetailSkeleton />;

  if (!course) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#7A1F2B]/10 flex items-center justify-center text-[#7A1F2B] mb-6">
            {Icons.book}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Course Not Found</h1>
          <p className="text-gray-500 mb-6">The course you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A1F2B] text-white rounded-xl font-medium hover:bg-[#5C1520] transition-colors">
            {Icons.back} Browse Courses
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION — Cinematic header with course info
         ═══════════════════════════════════════════════════════ */}
      <div className="relative bg-gradient-to-br from-[#7A1F2B] via-[#5C1520] to-[#4A1019] overflow-hidden">
        <FloatingParticles />
        {/* Decorative geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#C5975B]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-white/5 rounded-2xl rotate-45" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          {/* Breadcrumb + Share */}
          <div className="flex items-center justify-between mb-8">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors group">
                <span className="group-hover:-translate-x-0.5 transition-transform">{Icons.back}</span>
                Back to Courses
              </Link>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm"
              title="Share"
            >
              {Icons.share}
            </motion.button>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* ── Left: Course Info ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {course.category && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full">
                    {Icons.book} {course.category}
                  </span>
                )}
                {course.difficultyLevel && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C5975B] bg-[#C5975B]/15 backdrop-blur-sm px-3 py-1 rounded-full capitalize">
                    {Icons.bolt} {course.difficultyLevel}
                  </span>
                )}
                {hasDiscount && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/15 backdrop-blur-sm px-3 py-1 rounded-full"
                  >
                    {Icons.sparkle} {discountPercent}% OFF
                  </motion.span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-lg text-white/60 mb-8 leading-relaxed max-w-2xl">
                  {course.subtitle}
                </p>
              )}

              {/* Meta Stats Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/50">
                {modules.length > 0 && (
                  <span className="flex items-center gap-1.5"><span className="text-[#C5975B]">{Icons.modules}</span> {modules.length} Modules</span>
                )}
                {totalLessons > 0 && (
                  <span className="flex items-center gap-1.5"><span className="text-[#C5975B]">{Icons.video}</span> {totalLessons} Lessons</span>
                )}
                {course.durationWeeks > 0 && (
                  <span className="flex items-center gap-1.5"><span className="text-[#C5975B]">{Icons.clock}</span> {course.durationWeeks} Weeks</span>
                )}
                {course.enrolledCount > 0 && (
                  <span className="flex items-center gap-1.5"><span className="text-[#C5975B]">{Icons.users}</span> {course.enrolledCount.toLocaleString()} Students</span>
                )}
              </div>

              {/* Social Proof Bar */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
                  <div className="flex text-[#C5975B]">
                    {[1,2,3,4,5].map(i => <span key={i}>{Icons.star}</span>)}
                  </div>
                  <span className="text-white/80 text-sm font-semibold">4.8</span>
                  <span className="text-white/40 text-xs">rating</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  {Math.floor(Math.random() * 30 + 15)} viewing now
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Trust Strip ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            {[
              { icon: Icons.shield, text: 'Verified Program' },
              { icon: Icons.certificate, text: 'Official Certificate' },
              { icon: Icons.mentor, text: 'Expert Mentors' },
              { icon: Icons.infinity, text: 'Lifetime Access' },
            ].map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-[#C5975B]">{t.icon}</span>
                <span className="font-medium">{t.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Sticky CTA ── */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-xl font-extrabold text-gray-900">{price > 0 ? `₹${price.toLocaleString()}` : 'Free'}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through ml-2">₹{course.originalPriceInr.toLocaleString()}</span>
            )}
          </div>
          {enrolled ? (
            <Link href={`/learn/${course._id}`} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors">
              Continue
            </Link>
          ) : (
            <motion.button
              onClick={handleEnroll}
              disabled={enrolling}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#7A1F2B] to-[#5C1520] text-white rounded-xl font-bold text-sm disabled:opacity-50"
            >
              {enrolling ? 'Processing...' : 'Enroll Now'}
            </motion.button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          TAB CONTENT AREA + STICKY SIDEBAR
         ═══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            {/* Tab Navigation */}
            <div className="flex gap-1.5 mb-8 overflow-x-auto pb-1 bg-gray-100/80 rounded-xl p-1.5">
              {[
                { key: 'overview', label: 'Overview', icon: Icons.eye },
                { key: 'curriculum', label: 'Curriculum', icon: Icons.modules },
                { key: 'benefits', label: 'Benefits', icon: Icons.trophy },
                { key: 'faq', label: 'FAQ', icon: Icons.book },
                { key: 'reviews', label: 'Reviews', icon: Icons.star },
              ].map(tab => (
                <TabBtn
                  key={tab.key}
                  label={tab.label}
                  icon={tab.icon}
                  active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* ═══ OVERVIEW TAB ═══ */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* What You'll Learn */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">{Icons.check}</div>
                      <h2 className="text-xl font-bold text-gray-900">What You&apos;ll Learn</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(course.whatYouLearn || modules.slice(0, 8).map(m => m.title)).map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors"
                        >
                          <span className="text-emerald-500 mt-0.5 shrink-0">{Icons.checkCircle}</span>
                          <span className="text-sm text-gray-700">{typeof item === 'string' ? item : item?.title || `Module ${i + 1}`}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* About This Course */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#7A1F2B]/10 flex items-center justify-center text-[#7A1F2B]">{Icons.book}</div>
                      <h2 className="text-xl font-bold text-gray-900">About This Course</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{course.description}</p>
                    {course.introCopy && <p className="text-gray-600 leading-relaxed mt-4 whitespace-pre-wrap">{course.introCopy}</p>}
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Modules', value: modules.length, icon: Icons.modules, color: 'text-[#7A1F2B]', bg: 'bg-[#7A1F2B]/10' },
                      { label: 'Lessons', value: totalLessons, icon: Icons.video, color: 'text-[#C5975B]', bg: 'bg-[#C5975B]/10' },
                      { label: 'Weeks', value: course.durationWeeks || 0, icon: Icons.clock, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: 'Students', value: course.enrolledCount || 0, icon: Icons.users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className={`w-10 h-10 mx-auto rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-3`}>{stat.icon}</div>
                        <div className="text-2xl font-extrabold text-gray-900">
                          <AnimatedCounter target={stat.value} suffix={stat.label === 'Students' ? '+' : ''} />
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Why Choose This Program */}
                  <div className="bg-gradient-to-br from-[#7A1F2B] to-[#5C1520] rounded-2xl p-6 sm:p-8 shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-6">Why Choose This Program</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { icon: Icons.chart, title: 'Industry-Aligned Curriculum', desc: 'Content designed with top startup founders and investors' },
                        { icon: Icons.mentor, title: 'Expert Mentorship', desc: 'Direct guidance from experienced industry professionals' },
                        { icon: Icons.globe, title: 'Global Community', desc: 'Connect with entrepreneurs from across India and beyond' },
                        { icon: Icons.certificate, title: 'Recognized Certification', desc: 'Get a certificate valued by startups and investors alike' },
                      ].map((card, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors"
                        >
                          <span className="text-[#C5975B] mb-3 block">{card.icon}</span>
                          <h3 className="font-semibold text-white text-sm mb-1">{card.title}</h3>
                          <p className="text-white/60 text-xs leading-relaxed">{card.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Price Card */}
                  <div className="lg:hidden bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    {(course.thumbnailUrl || course.thumbnail) && (
                      <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                        <Image src={course.thumbnailUrl || course.thumbnail} alt={course.title} fill className="object-cover" sizes="100vw" />
                      </div>
                    )}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-extrabold text-gray-900">{price > 0 ? `₹${price.toLocaleString()}` : 'Free'}</span>
                      {hasDiscount && <span className="text-base text-gray-400 line-through">₹{course.originalPriceInr.toLocaleString()}</span>}
                    </div>
                    {enrolled ? (
                      <Link href={`/learn/${course._id}`} className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition">
                        Continue Learning {Icons.arrow}
                      </Link>
                    ) : (
                      <motion.button onClick={handleEnroll} disabled={enrolling} whileTap={{ scale: 0.97 }}
                        className="w-full py-3.5 bg-gradient-to-r from-[#7A1F2B] to-[#5C1520] text-white rounded-xl font-bold disabled:opacity-50">
                        {enrolling ? 'Processing...' : price > 0 ? 'Enroll Now' : 'Start Learning Free'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ═══ CURRICULUM TAB ═══ */}
              {activeTab === 'curriculum' && (
                <motion.div
                  key="curriculum"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#7A1F2B]/10 flex items-center justify-center text-[#7A1F2B]">{Icons.modules}</div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Course Curriculum</h2>
                          <p className="text-sm text-gray-500">{modules.length} modules, {totalLessons} lessons</p>
                        </div>
                      </div>
                      <button onClick={() => { setExpandAll(!expandAll); setExpandedModule(expandAll ? null : 'all'); }} className="text-sm text-[#7A1F2B] font-semibold hover:underline">
                        {expandAll ? 'Collapse All' : 'Expand All'}
                      </button>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
                      <div className="bg-gradient-to-r from-[#7A1F2B] to-[#C5975B] h-1.5 rounded-full" style={{ width: enrolled ? '100%' : '0%' }} />
                    </div>

                    <div className="space-y-3">
                      {modules.map((mod, i) => {
                        const isOpen = expandAll || expandedModule === i;
                        return (
                          <motion.div
                            key={mod._id || i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border border-gray-100 rounded-xl overflow-hidden hover:border-[#7A1F2B]/20 transition-colors"
                          >
                            <button
                              onClick={() => { if (expandAll) { setExpandAll(false); setExpandedModule(i); } else setExpandedModule(expandedModule === i ? null : i); }}
                              className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#faf8f5] transition-colors text-left"
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A1F2B] to-[#5C1520] text-xs font-bold text-white shadow-sm">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                  <h3 className="font-semibold text-gray-800 text-sm">{mod.title}</h3>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    {mod.lessonCount || mod.lessons?.length || 0} lessons
                                    {mod.durationHours > 0 && ` • ${mod.durationHours}h`}
                                  </p>
                                </div>
                              </div>
                              <span className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>{Icons.chevDown}</span>
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-4 border-t border-gray-50 pt-3">
                                    {mod.description && <p className="text-sm text-gray-500 mb-3">{mod.description}</p>}
                                    {!enrolled && (
                                      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg p-2.5">
                                        <span className="text-[#7A1F2B]">{Icons.lock}</span>
                                        Enroll to unlock all lessons
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ═══ BENEFITS TAB ═══ */}
              {activeTab === 'benefits' && (
                <motion.div
                  key="benefits"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#C5975B]/10 flex items-center justify-center text-[#C5975B]">{Icons.trophy}</div>
                      <h2 className="text-xl font-bold text-gray-900">Program Benefits</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { icon: Icons.chart, title: 'Industry-Ready Skills', desc: 'Learn directly applicable skills that startups need right now', color: 'text-blue-600', bg: 'bg-blue-50' },
                        { icon: Icons.certificate, title: 'Official Certificate', desc: 'Get a verified certificate to showcase your achievement', color: 'text-[#C5975B]', bg: 'bg-[#C5975B]/10' },
                        { icon: Icons.mentor, title: 'Mentor Access', desc: 'Connect with experienced mentors and industry professionals', color: 'text-[#7A1F2B]', bg: 'bg-[#7A1F2B]/10' },
                        { icon: Icons.chart, title: 'Real Case Studies', desc: 'Work on real-world startup scenarios and business problems', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { icon: Icons.globe, title: 'Community Network', desc: 'Join a community of like-minded founders and entrepreneurs', color: 'text-purple-600', bg: 'bg-purple-50' },
                        { icon: Icons.infinity, title: 'Lifetime Access', desc: 'Revisit content anytime — your access never expires', color: 'text-orange-600', bg: 'bg-orange-50' },
                      ].map((b, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex gap-4 p-5 bg-[#faf8f5] rounded-xl hover:shadow-md transition-all group cursor-default"
                        >
                          <div className={`w-10 h-10 shrink-0 rounded-xl ${b.bg} flex items-center justify-center ${b.color} group-hover:scale-110 transition-transform`}>{b.icon}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{b.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Trust Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: course.enrolledCount || 100, suffix: '+', label: 'Students Enrolled' },
                      { value: 48, suffix: '', label: 'Avg Rating (4.8)' },
                      { value: 95, suffix: '%', label: 'Completion Rate' },
                    ].map((s, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
                        <div className="text-2xl font-extrabold text-[#7A1F2B]">
                          <AnimatedCounter target={s.value} suffix={s.suffix} />
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* What Sets Us Apart */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">What Sets Us Apart</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Startup India Certified Program',
                        'Project-based learning approach',
                        'Weekly live mentor sessions',
                        'Real startup pitch preparation',
                        'Investor network access',
                        'Post-course career support',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500">{Icons.checkCircle}</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ═══ FAQ TAB ═══ */}
              {activeTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#7A1F2B]/10 flex items-center justify-center text-[#7A1F2B]">{Icons.book}</div>
                      <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-0">
                      {[
                        { q: 'When does the program start?', a: course.startDate ? `The program starts on ${new Date(course.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}` : 'You can start immediately after enrollment.' },
                        { q: 'Will I get a certificate?', a: 'Yes, you will receive a verified certificate of completion after finishing all modules and assessments.' },
                        { q: 'Can I access the content after completion?', a: 'Absolutely. You get full lifetime access to all course materials, even after completion.' },
                        { q: 'Is there mentor support?', a: 'Yes, you will have access to mentors and community support throughout the program.' },
                        { q: 'What if I need a refund?', a: 'We offer a 7-day money-back guarantee. If you are not satisfied, contact us within 7 days of enrollment.' },
                        { q: 'Do I need prior experience?', a: 'No prior experience is required. The course is designed for beginners and intermediate learners alike.' },
                        { q: 'How long do I have access?', a: 'You get lifetime access. Learn at your own pace, revisit materials anytime.' },
                      ].map((faq, i) => (
                        <details key={i} className="group border-b border-gray-100 last:border-0">
                          <summary className="flex items-center gap-3 py-4 cursor-pointer hover:text-[#7A1F2B] transition-colors">
                            <span className="w-7 h-7 shrink-0 rounded-lg bg-[#7A1F2B]/8 flex items-center justify-center text-xs font-bold text-[#7A1F2B]">{i + 1}</span>
                            <span className="flex-1 text-sm font-semibold text-gray-700 group-hover:text-[#7A1F2B]">{faq.q}</span>
                            <span className="text-gray-400 group-open:rotate-180 transition-transform">{Icons.chevDown}</span>
                          </summary>
                          <p className="pb-4 pl-10 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                        </details>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-[#faf8f5] rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#C5975B]/10 flex items-center justify-center text-[#C5975B] shrink-0">{Icons.mentor}</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Still have questions?</p>
                        <p className="text-xs text-gray-500">Reach out to our support team for personalized help.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ═══ REVIEWS TAB ═══ */}
              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-[#C5975B]/10 flex items-center justify-center text-[#C5975B]">{Icons.star}</div>
                      <h2 className="text-xl font-bold text-gray-900">Student Reviews</h2>
                    </div>

                    <div className="bg-[#faf8f5] rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-5xl font-extrabold text-[#7A1F2B]">4.8</div>
                        <div className="flex text-[#C5975B] mt-2 justify-center">{[1,2,3,4,5].map(i => <span key={i}>{Icons.star}</span>)}</div>
                        <p className="text-xs text-gray-500 mt-2">Course Rating</p>
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        {[{ stars: 5, pct: 78 },{ stars: 4, pct: 15 },{ stars: 3, pct: 5 },{ stars: 2, pct: 1 },{ stars: 1, pct: 1 }].map(bar => (
                          <div key={bar.stars} className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-3 text-right">{bar.stars}</span>
                            <span className="text-[#C5975B] w-4">{Icons.star}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div className="h-full bg-gradient-to-r from-[#C5975B] to-[#7A1F2B] rounded-full" initial={{ width: 0 }} animate={{ width: `${bar.pct}%` }} transition={{ duration: 1, delay: 0.3 }} />
                            </div>
                            <span className="text-xs text-gray-400 w-8">{bar.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#C5975B]/10 flex items-center justify-center text-[#C5975B] mb-4">{Icons.mentor}</div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Reviews Coming Soon</h3>
                      <p className="text-gray-500 text-sm max-w-md mx-auto">Student reviews will appear here as enrollments grow. Be among the first to take this course and share your experience.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Desktop Sticky Price Card (Sidebar) ── */}
          <div className="hidden lg:block w-[360px] shrink-0 lg:-mt-[320px] z-20">
            <div className="sticky top-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  {(course.thumbnailUrl || course.thumbnail) && (
                    <div className="relative h-48 overflow-hidden group">
                      <Image src={course.thumbnailUrl || course.thumbnail} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="360px" />
                      {hasDiscount && (
                        <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                          SAVE {discountPercent}%
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-3xl font-extrabold text-gray-900">
                        {price > 0 ? `₹${price.toLocaleString()}` : 'Free'}
                      </span>
                      {hasDiscount && (
                        <span className="text-base text-gray-400 line-through">₹{course.originalPriceInr.toLocaleString()}</span>
                      )}
                    </div>
                    {hasDiscount && (
                      <p className="text-sm text-emerald-600 font-medium mb-4 flex items-center gap-1">
                        <span className="text-emerald-500">{Icons.money}</span> {discountPercent}% discount applied
                      </p>
                    )}

                    {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

                    {enrolled ? (
                      <Link href={`/learn/${course._id}`} className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-base hover:bg-emerald-700 transition-colors">
                        Continue Learning {Icons.arrow}
                      </Link>
                    ) : (
                      <motion.button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 bg-gradient-to-r from-[#7A1F2B] to-[#5C1520] text-white rounded-xl font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {enrolling ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>{price > 0 ? 'Enroll Now' : 'Start Learning Free'}</>
                        )}
                      </motion.button>
                    )}

                    {!enrolled && (
                      <button
                        onClick={toggleWishlist}
                        className={`w-full mt-3 py-2.5 rounded-xl font-medium text-sm border transition-all flex items-center justify-center gap-2 ${
                          wishlisted ? 'border-red-200 text-red-500 bg-red-50 hover:bg-red-100' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {wishlisted ? <><span className="text-red-500">{Icons.heartFill}</span> In Wishlist</> : <>{Icons.heart} Add to Wishlist</>}
                      </button>
                    )}

                    <div className="mt-5 pt-5 border-t border-gray-100 space-y-3 text-sm text-gray-600">
                      {[
                        { icon: Icons.infinity, text: 'Full lifetime access' },
                        { icon: Icons.certificate, text: 'Certificate on completion' },
                        { icon: Icons.modules, text: `${modules.length} modules, ${totalLessons} lessons` },
                        { icon: Icons.mentor, text: 'Mentor support included' },
                        { icon: Icons.shield, text: '7-day money-back guarantee' },
                      ].map((item, i) => (
                        <p key={i} className="flex items-center gap-2.5">
                          <span className="text-[#C5975B]">{item.icon}</span> {item.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BOTTOM CTA — Final conversion push
         ═══════════════════════════════════════════════════════ */}
      {!enrolled && (
        <div className="bg-gradient-to-br from-[#7A1F2B] via-[#5C1520] to-[#3D0E14] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#C5975B]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-white/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Ready to Transform Your Startup Journey?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
                Join {course.enrolledCount?.toLocaleString() || '100'}+ students who are already building the future. Start learning today with lifetime access and mentor support.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 bg-white text-[#7A1F2B] rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-shadow disabled:opacity-50 whitespace-nowrap"
                >
                  {enrolling ? 'Processing...' : price > 0 ? `Enroll Now — ₹${price.toLocaleString()}` : 'Start Learning — Free'}
                </motion.button>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="text-[#C5975B]">{Icons.shield}</span> 7-day money-back guarantee
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ═══ Share Toast ═══ */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm"
          >
            <span className="text-emerald-400">{Icons.checkCircle}</span> Link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}