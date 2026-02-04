'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentLogs from '@/components/dashboard/RecentLogs';
import Loading from '@/components/ui/Loading';
import { logsAPI } from '@/lib/api';
import { FileText, Shield, ShieldAlert, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await logsAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // 백엔드 없이도 작동하도록 더미 데이터 사용
      setStats({
        total: 1234,
        blocked: 456,
        allowed: 678,
        today: 89,
      });
      toast.success('데모 모드로 실행 중입니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="대시보드">
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="대시보드">
      <div className="space-y-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="총 로그"
            value={stats?.total || 0}
            icon={FileText}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatsCard
            title="차단"
            value={stats?.blocked || 0}
            icon={ShieldAlert}
            iconColor="bg-red-100 text-red-600"
          />
          <StatsCard
            title="허용"
            value={stats?.allowed || 0}
            icon={Shield}
            iconColor="bg-green-100 text-green-600"
          />
          <StatsCard
            title="오늘 이벤트"
            value={stats?.today || 0}
            icon={Clock}
            iconColor="bg-purple-100 text-purple-600"
          />
        </div>

        {/* 최근 로그 */}
        <RecentLogs limit={10} />
      </div>
    </DashboardLayout>
  );
}
