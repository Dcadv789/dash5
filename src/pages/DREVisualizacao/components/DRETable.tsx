import React from 'react';
import { ChevronDown, ChevronRight, Plus, Minus, Equal } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface DRETableProps {
  data: any[];
  months: { month: string; year: number }[];
  expandedAccounts: Set<string>;
  onToggleAccount: (accountId: string) => void;
}

export const DRETable: React.FC<DRETableProps> = ({
  data,
  months,
  expandedAccounts,
  onToggleAccount
}) => {
  const getSymbolIcon = (simbolo: string | null) => {
    switch (simbolo) {
      case '+': return <Plus size={16} className="text-green-400" />;
      case '-': return <Minus size={16} className="text-red-400" />;
      default: return <Equal size={16} className="text-blue-400" />;
    }
  };

  const getValueColor = (value: number, symbol: string) => {
    if (symbol === '+') return value >= 0 ? 'text-green-400' : 'text-red-400';
    if (symbol === '-') return value <= 0 ? 'text-green-400' : 'text-red-400';
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                Conta
              </th>
              {months.map(({ month, year }) => (
                <th key={`${month}-${year}`} className="px-3 py-4 text-right text-sm font-semibold text-zinc-400">
                  {`${month.slice(0, 3)}/${year.toString().slice(2)}`}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-400">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((account) => (
              <React.Fragment key={account.id}>
                <tr className="border-b border-zinc-800">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleAccount(account.id)}
                        className="p-1 hover:bg-zinc-700 rounded-lg"
                      >
                        {expandedAccounts.has(account.id) ? (
                          <ChevronDown size={16} className="text-zinc-400" />
                        ) : (
                          <ChevronRight size={16} className="text-zinc-400" />
                        )}
                      </button>
                      {getSymbolIcon(account.symbol)}
                      <span className="text-zinc-100 font-medium">{account.name}</span>
                    </div>
                  </td>
                  {months.map(({ month, year }) => {
                    const value = account.monthlyValues[`${month}-${year}`] || 0;
                    return (
                      <td key={`${month}-${year}`} className="px-3 py-4 text-right">
                        <span className={getValueColor(value, account.symbol)}>
                          {formatCurrency(value)}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 text-right">
                    <span className={getValueColor(account.total, account.symbol)}>
                      {formatCurrency(account.total)}
                    </span>
                  </td>
                </tr>
                {/* Render child accounts if expanded */}
                {expandedAccounts.has(account.id) && account.children?.map((child: any) => (
                  <tr key={child.id} className="border-b border-zinc-800 bg-zinc-800/30">
                    {/* Render child row content */}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};