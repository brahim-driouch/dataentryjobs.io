import { ArrowDownRight, ArrowUpRight, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type DashboardStatsItemProps = {
  statKey: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
  data: {
    currentCount: number;
    isIncrease: boolean;
    percentageChange: number;
  };
}

export const DashboardStatsItem = (statItem: DashboardStatsItemProps) => {
  const getStatColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getStatBgColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50',
      green: 'bg-green-50',
      purple: 'bg-purple-50',
      orange: 'bg-orange-50'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-50';
  };

  const { label, icon: IconComponent, color, data } = statItem;
  const changeText = `${data.isIncrease ? '+' : ''}${data.percentageChange.toFixed(1)}% from last week`;
  const ChangeIcon = data.isIncrease ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Label */}
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {label}
          </p>
          
          {/* Count */}
          <p className="text-4xl font-bold text-gray-900 mt-3 mb-3">
            {data?.currentCount ? data?.currentCount.toLocaleString() : 0}
          </p>
          
          {/* Change Indicator */}
          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
              data.isIncrease 
                ? 'bg-green-50' 
                : 'bg-red-50'
            }`}>
              <ChangeIcon className={`w-4 h-4 ${
                data?.isIncrease ? 'text-green-600' : 'text-red-600'
              }`} />
              <span className={`text-sm font-semibold ${
                data.isIncrease ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(data.percentageChange).toFixed(1)}%
              </span>
            </div>
            <span className="text-xs text-gray-500">vs last week</span>
          </div>
        </div>

        {/* Icon */}
        <div className={`${getStatBgColor(color)} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
          <div className={`bg-linear-to-br ${getStatColor(color)} p-3 rounded-xl shadow-lg`}>
            <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}