import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { calculateVariation } from '../../../utils/calculations';

interface DashboardCardProps {
  title: string;
  value: number;
  previousValue: number;
  color: string;
  symbol: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  previousValue,
  color,
  symbol
}) => {
  const variation = calculateVariation(value, previousValue);

  return (
    <div className="bg-zinc-800 rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-zinc-300">{title}</h3>
          <div className="p-2 bg-zinc-700 rounded-lg">
            <span className="text-2xl" style={{ color }}>{symbol}</span>
          </div>
        </div>
        <p className="text-2xl font-bold" style={{ color }}>
          {formatCurrency(value)}
        </p>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700">
        <p className="text-sm text-zinc-400">Variação mensal</p>
        <div className="flex items-center gap-2">
          {variation.isPositive ? (
            <ArrowUp className="text-green-400" size={16} />
          ) : (
            <ArrowDown className="text-red-400" size={16} />
          )}
          <span className={variation.isPositive ? "text-green-400" : "text-red-400"}>
            {variation.percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};