import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DREHeader } from './components/DREHeader';
import { DRETable } from './components/DRETable';
import { useDREData } from './hooks/useDREData';

export const DREVisualizacao = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<string>('Janeiro');
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());

  const { data, loading, error } = useDREData(
    selectedCompanyId,
    selectedYear,
    selectedMonth
  );

  const toggleAccountExpansion = (accountId: string) => {
    setExpandedAccounts(prev => {
      const next = new Set(prev);
      if (next.has(accountId)) {
        next.delete(accountId);
      } else {
        next.add(accountId);
      }
      return next;
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto py-8">
      <DREHeader
        companies={[]}
        selectedCompanyId={selectedCompanyId}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onCompanyChange={setSelectedCompanyId}
        onYearChange={setSelectedYear}
        onMonthChange={setSelectedMonth}
      />

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          <p className="text-red-400">{error}</p>
        </div>
      ) : loading ? (
        <div className="bg-zinc-900 rounded-xl p-8 text-center">
          <p className="text-zinc-400">Carregando dados do DRE...</p>
        </div>
      ) : !selectedCompanyId ? (
        <div className="bg-zinc-900 rounded-xl p-8 text-center">
          <p className="text-zinc-400">Selecione uma empresa para visualizar o DRE</p>
        </div>
      ) : (
        <DRETable
          data={data}
          months={[]}
          expandedAccounts={expandedAccounts}
          onToggleAccount={toggleAccountExpansion}
        />
      )}
    </div>
  );
};