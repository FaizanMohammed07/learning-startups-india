'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiGet } from '@/lib/api';

const DashboardContext = createContext({});

export function DashboardProvider({ children, authUser }) {
  const [user] = useState(authUser || null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const [enrReq, crsReq, certsReq, actsReq] = await Promise.all([
      apiGet('/api/v1/enrollments'),
      apiGet('/api/v1/courses'),
      apiGet('/api/v1/certificates'),
      apiGet('/api/v1/activity?limit=10'),
    ]);

    setEnrolledCourses(Array.isArray(enrReq.data) ? enrReq.data : []);
    setCourses(Array.isArray(crsReq.data) ? crsReq.data : []);
    setCertificates(Array.isArray(certsReq.data) ? certsReq.data : []);
    setActivities(Array.isArray(actsReq.data) ? actsReq.data : []);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = {
    user,
    courses,
    enrolledCourses,
    certificates,
    activities,
    isLoading,
    refresh,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  return useContext(DashboardContext);
}
