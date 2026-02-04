'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import LogTable from '@/components/logs/LogTable';
import LogFilters from '@/components/logs/LogFilters';
import Loading from '@/components/ui/Loading';
import Card from '@/components/ui/Card';
import { logsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await logsAPI.getAll(filters);
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      // 백엔드 없이도 작동하도록 더미 데이터 사용
      const dummyLogs = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        timestamp: new Date(Date.now() - i * 300000).toISOString(),
        source_ip: `192.168.1.${100 + i}`,
        source_port: 50000 + i,
        destination_ip: `10.0.${Math.floor(i / 10)}.${(i % 10) * 10}`,
        destination_port: [80, 443, 22, 3389, 53][i % 5],
        protocol: ['tcp', 'udp', 'icmp'][i % 3],
        action: ['allow', 'block', 'drop'][i % 3],
        rule_id: `RULE-${1000 + i}`,
      }));

      // 필터 적용
      let filteredLogs = dummyLogs;
      if (filters.source_ip) {
        filteredLogs = filteredLogs.filter(log => log.source_ip.includes(filters.source_ip));
      }
      if (filters.destination_ip) {
        filteredLogs = filteredLogs.filter(log => log.destination_ip.includes(filters.destination_ip));
      }
      if (filters.destination_port) {
        filteredLogs = filteredLogs.filter(log => log.destination_port.toString() === filters.destination_port);
      }
      if (filters.action) {
        filteredLogs = filteredLogs.filter(log => log.action === filters.action);
      }

      setLogs(filteredLogs);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  return (
    <DashboardLayout title="로그">
      <div className="space-y-6">
        <LogFilters onFilter={handleFilter} onReset={handleReset} />

        <Card title={`로그 목록 (총 ${logs.length}개)`}>
          {loading ? (
            <Loading />
          ) : (
            <LogTable logs={logs} />
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
