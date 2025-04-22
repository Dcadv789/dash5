import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardFilters } from './components/DashboardFilters';
import { DashboardCard } from './components/DashboardCard';
import { DashboardChart } from './components/DashboardChart';
import { useDashboardData } from './hooks/useDashboardData';

export const Dashboard = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<string>('Janeiro');
  
  const { data, loading, error } = useDashboardData(
    selectedCompanyId,
    selectedYear,
    selectedMonth
  );

  // Render dashboard with modularized components...
  return (
    <div className="max-w-[1600px] mx-auto py-8">
      {/* Filters */}
      <DashboardFilters
        companies={[]}
        selectedCompanyId={selectedCompanyId}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onCompanyChange={setSelectedCompanyId}
        onYearChange={setSelectedYear}
        onMonthChange={setSelectedMonth}
      />

      {/* Content */}
      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          <p className="text-red-400">{error}</p>
        </div>
      ) : loading ? (
        <div className="text-center py-8">
          <p className="text-zinc-400">Carregando dados...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.slice(0, 4).map((item, index) => (
              <DashboardCard
                key={index}
                title={item.title}
                value={item.value}
                previousValue={item.previousValue}
                color={item.color}
                symbol={item.symbol}
              />
            ))}
          </div>

          {/* Charts */}
          <div className="bg-zinc-800 rounded-xl p-6">
            <DashboardChart
              type="line"
              data={[]}
              lines={[]}
            />
          </div>
        </div>
      )}
    </div>
  );
};