import React from 'react';
import { Copy, Search } from 'lucide-react';
import { Company } from '../../../types/financial';

interface CategoryHeaderProps {
  showCopyModal: boolean;
  setShowCopyModal: (show: boolean) => void;
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
  companies: Company[];
  categoryFilter: 'all' | 'revenue' | 'expense';
  setCategoryFilter: (filter: 'all' | 'revenue' | 'expense') => void;
  error: string | null;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  showCopyModal,
  setShowCopyModal,
  selectedCompanyId,
  setSelectedCompanyId,
  companies,
  categoryFilter,
  setCategoryFilter,
  error
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Categorias</h1>
          <p className="text-zinc-400 mt-1">Gerencie as categorias financeiras por empresa</p>
        </div>

        <button
          onClick={() => setShowCopyModal(true)}
          className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 flex items-center gap-3"
        >
          <Copy size={20} />
          Copiar Categorias
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        {/* Filtros existentes */}
      </div>
    </>
  );
};