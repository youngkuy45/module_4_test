'use client';

import { useRouter } from 'next/navigation';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { LOG_ACTION_LABELS, BADGE_VARIANTS } from '@/lib/constants';

const LogTable = ({ logs }) => {
  const router = useRouter();

  const columns = [
    {
      header: '시간',
      accessor: 'timestamp',
      render: (value) => formatDate(value, 'yyyy-MM-dd HH:mm:ss'),
    },
    {
      header: '소스 IP',
      accessor: 'source_ip',
    },
    {
      header: '목적지 IP',
      accessor: 'destination_ip',
    },
    {
      header: '포트',
      accessor: 'destination_port',
    },
    {
      header: '프로토콜',
      accessor: 'protocol',
      render: (value) => value?.toUpperCase() || '-',
    },
    {
      header: '액션',
      accessor: 'action',
      render: (value) => (
        <Badge variant={BADGE_VARIANTS[value]}>
          {LOG_ACTION_LABELS[value]}
        </Badge>
      ),
    },
  ];

  const handleRowClick = (log) => {
    router.push(`/logs/${log.id}`);
  };

  return <Table columns={columns} data={logs} onRowClick={handleRowClick} />;
};

export default LogTable;
