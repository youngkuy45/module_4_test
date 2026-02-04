'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Card from '@/components/ui/Card';
import Loading from '@/components/ui/Loading';
import LineChart from '@/components/analytics/LineChart';
import PieChart from '@/components/analytics/PieChart';
import BarChart from '@/components/analytics/BarChart';
import { logsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    timeline: [],
    byAction: [],
    byProtocol: [],
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // 실제 API가 구현되면 이 부분을 수정해야 합니다
      // 지금은 샘플 데이터를 사용합니다

      // 타임라인 데이터 (최근 7일)
      const timelineData = [
        { date: '2024-01-01', count: 120 },
        { date: '2024-01-02', count: 150 },
        { date: '2024-01-03', count: 180 },
        { date: '2024-01-04', count: 130 },
        { date: '2024-01-05', count: 200 },
        { date: '2024-01-06', count: 170 },
        { date: '2024-01-07', count: 190 },
      ];

      // 액션별 데이터
      const byActionData = [
        { name: '허용', value: 450 },
        { name: '차단', value: 280 },
        { name: '드롭', value: 170 },
      ];

      // 프로토콜별 데이터
      const byProtocolData = [
        { protocol: 'TCP', count: 500 },
        { protocol: 'UDP', count: 250 },
        { protocol: 'ICMP', count: 150 },
      ];

      setAnalyticsData({
        timeline: timelineData,
        byAction: byActionData,
        byProtocol: byProtocolData,
      });
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      toast.error('분석 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="분석">
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="분석">
      <div className="space-y-6">
        <Card title="로그 타임라인 (최근 7일)">
          <LineChart
            data={analyticsData.timeline}
            xKey="date"
            yKey="count"
          />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="액션별 분포">
            <PieChart
              data={analyticsData.byAction}
              dataKey="value"
              nameKey="name"
            />
          </Card>

          <Card title="프로토콜별 로그 수">
            <BarChart
              data={analyticsData.byProtocol}
              xKey="protocol"
              yKey="count"
            />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
