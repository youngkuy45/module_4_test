'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Loading from '@/components/ui/Loading';
import { logsAPI } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { LOG_ACTION_LABELS, BADGE_VARIANTS } from '@/lib/constants';
import toast from 'react-hot-toast';

const RecentLogs = ({ limit = 10 }) => {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentLogs();
  }, []);

  const fetchRecentLogs = async () => {
    try {
      const response = await logsAPI.getRecent(limit);
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch recent logs:', error);
      // 백엔드 없이도 작동하도록 더미 데이터 사용
      const dummyLogs = [
        {
          id: 1,
          timestamp: new Date().toISOString(),
          source_ip: '192.168.1.100',
          destination_ip: '8.8.8.8',
          destination_port: 443,
          action: 'allow',
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 60000).toISOString(),
          source_ip: '192.168.1.105',
          destination_ip: '10.0.0.50',
          destination_port: 22,
          action: 'block',
        },
        {
          id: 3,
          timestamp: new Date(Date.now() - 120000).toISOString(),
          source_ip: '192.168.1.110',
          destination_ip: '172.16.0.1',
          destination_port: 80,
          action: 'allow',
        },
        {
          id: 4,
          timestamp: new Date(Date.now() - 180000).toISOString(),
          source_ip: '192.168.1.115',
          destination_ip: '10.0.0.100',
          destination_port: 3389,
          action: 'drop',
        },
        {
          id: 5,
          timestamp: new Date(Date.now() - 240000).toISOString(),
          source_ip: '192.168.1.120',
          destination_ip: '1.1.1.1',
          destination_port: 53,
          action: 'allow',
        },
      ];
      setLogs(dummyLogs.slice(0, limit));
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (logId) => {
    router.push(`/logs/${logId}`);
  };

  if (loading) {
    return (
      <Card title="최근 로그">
        <Loading />
      </Card>
    );
  }

  return (
    <Card title="최근 로그">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                시간
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                소스 IP
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                목적지 IP
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                포트
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                액션
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  최근 로그가 없습니다.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => handleRowClick(log.id)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatDate(log.timestamp, 'MM-dd HH:mm:ss')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {log.source_ip}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {log.destination_ip}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {log.destination_port}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={BADGE_VARIANTS[log.action]}>
                      {LOG_ACTION_LABELS[log.action]}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentLogs;
