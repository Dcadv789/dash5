import React from 'react';
import { Search } from 'lucide-react';

interface Company {
  id: string;
  trading_name: string;
}

interface DashboardFiltersProps {
  companies: Company[];
  selectedCompanyId: string;
  selectedYear: number;
  selectedMonth: string;
  onCompanyChange: (id: string) => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: string) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  companies,
  selectedCompanyId,
  selectedYear,
  selectedMonth,
  onCompanyChange,
  onYearChange,
  onMonthChange
}) => {
  const MONTHS = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Empresa
        </label>
        <select
          value={selectedCompanyId}
          onChange={(e) => onCompanyChange(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-zinc-100"
        >
          <option value="">Selecione uma empresa</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>
              {company.trading_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Ano
        </label>
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-zinc-100"
        >
          {Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Mês
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-zinc-100"
        >
          {MONTHS.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
    </div>
  );
};