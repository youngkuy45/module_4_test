import { cn } from '@/lib/utils';

const StatsCard = ({ title, value, icon: Icon, iconColor, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {trend && (
            <p className={cn(
              'text-sm mt-2',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            'p-3 rounded-full',
            iconColor || 'bg-blue-100 text-blue-600'
          )}>
            <Icon className="w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
