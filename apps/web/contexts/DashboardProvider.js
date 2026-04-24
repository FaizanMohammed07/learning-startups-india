'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiGet } from '@/lib/api';

const DashboardContext = createContext({});

export function DashboardProvider({ children, authUser }) {
  const [user] = useState(authUser || null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const [enrReq, compReq, wishReq, crsReq, certsReq, actsReq] = await Promise.all([
      apiGet('/api/v1/enrollments'),
      apiGet('/api/v1/enrollments?status=completed'),
      apiGet('/api/v1/courses/wishlist'),
      apiGet('/api/v1/courses'),
      apiGet('/api/v1/certificates'),
      apiGet('/api/v1/activity?limit=10'),
    ]);

    setEnrolledCourses(Array.isArray(enrReq.data) ? enrReq.data : []);
    setCompletedCourses(Array.isArray(compReq.data) ? compReq.data : []);
    setWishlist(Array.isArray(wishReq.data) ? wishReq.data : []);
    setCourses(Array.isArray(crsReq.data) ? crsReq.data : []);
    setCertificates(Array.isArray(certsReq.data) ? certsReq.data : []);
    setActivities(Array.isArray(actsReq.data) ? actsReq.data : []);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleWishlist = async (courseId) => {
    const { apiPost } = await import('@/lib/api');
    try {
      await apiPost(`/api/v1/courses/${courseId}/wishlist`);
      refresh();
    } catch (err) {
      console.error('Wishlist toggle failed:', err);
    }
  };

  const value = {
    user,
    courses,
    enrolledCourses,
    completedCourses,
    wishlist,
    certificates,
    activities,
    isLoading,
    refresh,
    toggleWishlist,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  return useContext(DashboardContext);
}
