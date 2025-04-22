import React from 'react';

interface TopListItem {
  name: string;
  value: number;
}

interface DashboardTopListProps {
  title: string;
  items: TopListItem[];
  formatValue?: (value: number) => string;
}

export const DashboardTopList: React.FC<DashboardTopListProps> = ({
  title,
  items,
  formatValue = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}) => {
  return (
    <div className="bg-zinc-800/50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-zinc-400 mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 bg-zinc-800/30 rounded"
          >
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-sm">#{index + 1}</span>
              <span className="text-zinc-200">{item.name}</span>
            </div>
            <span className="text-zinc-300 font-mono">
              {formatValue(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};