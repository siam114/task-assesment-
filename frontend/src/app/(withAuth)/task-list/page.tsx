'use client';

import AppFallbackSpinner from '@/components/base-components/AppFallbackSpinner';
import TaskListView from '@/components/dashboard/TaskListView';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return <AppFallbackSpinner />
  }

  return (
    <main className="w-full">
      <TaskListView/>
    </main>
  );
}
