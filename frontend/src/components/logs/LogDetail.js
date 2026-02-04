import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { LOG_ACTION_LABELS, BADGE_VARIANTS } from '@/lib/constants';

const LogDetail = ({ log }) => {
  const fields = [
    { label: 'ID', value: log.id },
    { label: '시간', value: formatDate(log.timestamp, 'yyyy-MM-dd HH:mm:ss') },
    { label: '소스 IP', value: log.source_ip },
    { label: '소스 포트', value: log.source_port },
    { label: '목적지 IP', value: log.destination_ip },
    { label: '목적지 포트', value: log.destination_port },
    { label: '프로토콜', value: log.protocol?.toUpperCase() || '-' },
    {
      label: '액션',
      value: (
        <Badge variant={BADGE_VARIANTS[log.action]}>
          {LOG_ACTION_LABELS[log.action]}
        </Badge>
      ),
    },
    { label: '규칙 ID', value: log.rule_id || '-' },
    { label: '인터페이스', value: log.interface || '-' },
    { label: '바이트', value: log.bytes ? `${log.bytes} bytes` : '-' },
    { label: '패킷', value: log.packets || '-' },
  ];

  return (
    <Card title="로그 상세 정보">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="flex border-b border-gray-200 pb-3">
            <dt className="w-1/3 font-medium text-gray-700">{field.label}</dt>
            <dd className="w-2/3 text-gray-900">{field.value}</dd>
          </div>
        ))}

        {log.message && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">메시지</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {log.message}
              </pre>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LogDetail;
