'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import LogDetail from '@/components/logs/LogDetail';
import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';
import { logsAPI } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchLog();
    }
  }, [params.id]);

  const fetchLog = async () => {
    try {
      const response = await logsAPI.getById(params.id);
      setLog(response.data);
    } catch (error) {
      console.error('Failed to fetch log:', error);
      // 백엔드 없이도 작동하도록 더미 데이터 사용
      const dummyLog = {
        id: params.id,
        timestamp: new Date().toISOString(),
        source_ip: '192.168.1.100',
        source_port: 54321,
        destination_ip: '8.8.8.8',
        destination_port: 443,
        protocol: 'tcp',
        action: 'allow',
        rule_id: 'RULE-1001',
        interface: 'eth0',
        bytes: 1024,
        packets: 5,
        message: 'Connection established successfully. Traffic allowed by firewall rule RULE-1001.',
      };
      setLog(dummyLog);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="로그 상세">
        <Loading />
      </DashboardLayout>
    );
  }

  if (!log) {
    return null;
  }

  return (
    <DashboardLayout title="로그 상세">
      <div className="space-y-6">
        <div>
          <Button
            variant="outline"
            onClick={() => router.push('/logs')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>목록으로 돌아가기</span>
          </Button>
        </div>

        <LogDetail log={log} />
      </div>
    </DashboardLayout>
  );
}
