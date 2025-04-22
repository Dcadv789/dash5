import React from 'react';
import { FileText } from 'lucide-react';

interface DREHeaderProps {
  companies: { id: string; trading_name: string; }[];
  selectedCompanyId: string;
  selectedYear: number;
  selectedMonth: string;
  onCompanyChange: (id: string) => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: string) => void;
}

export const DREHeader: React.FC<DREHeaderProps> = ({
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
    <div className="bg-zinc-900 rounded-xl p-8 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">
            Demonstrativo de Resultados
          </h1>
          <p className="text-zinc-400 mt-1">
            Visualize o DRE por período
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="text-zinc-500" size={20} />
          <span className="text-zinc-400">
            {selectedMonth} de {selectedYear}
          </span>
        </div>
      </div>

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
    </div>
  );
};