import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DashboardChartProps {
  type: 'line' | 'bar';
  data: any[];
  lines: { name: string; color: string }[];
  formatValue?: (value: number) => string;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  type,
  data,
  lines,
  formatValue = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}) => {
  const commonProps = {
    data,
    width: "100%",
    height: 300
  };

  const commonAxisProps = {
    stroke: "#9CA3AF",
    tick: { fill: '#9CA3AF' }
  };

  const tooltipStyle = {
    contentStyle: { 
      backgroundColor: '#1F2937',
      border: '1px solid #374151',
      borderRadius: '0.5rem'
    },
    labelStyle: { color: '#9CA3AF' }
  };

  if (type === 'bar') {
    return (
      <ResponsiveContainer {...commonProps}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" {...commonAxisProps} />
          <YAxis {...commonAxisProps} tickFormatter={formatValue} />
          <Tooltip {...tooltipStyle} formatter={formatValue} />
          {lines.map((line) => (
            <Bar
              key={line.name}
              dataKey={line.name}
              fill={line.color}
              opacity={0.8}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer {...commonProps}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" {...commonAxisProps} />
        <YAxis {...commonAxisProps} tickFormatter={formatValue} />
        <Tooltip {...tooltipStyle} formatter={formatValue} />
        {lines.map((line) => (
          <Line
            key={line.name}
            type="monotone"
            dataKey={line.name}
            stroke={line.color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};