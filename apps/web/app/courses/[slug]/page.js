"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const SkeletonLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#7A1F2B] animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Loading course...</p>
    </div>
  </div>
);

const PremiumCourseDetail = dynamic(() => import("@/components/PremiumCourseDetail"), {
  loading: () => <SkeletonLoader />,
  ssr: true,
});

export default function CourseDetailPage() {
  const { slug } = useParams();

  return <PremiumCourseDetail slug={slug} />;
}
