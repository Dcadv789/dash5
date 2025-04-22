import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CompanyList } from './components/CompanyList';
import { CompanyModal } from '../../components/CompanyModal';
import { CompanyViewModal } from '../../components/CompanyViewModal';
import { useCompanies } from './hooks/useCompanies';
import type { Company } from '../../types/company';

export const Companies = () => {
  const { companies, loading, error, saveCompany, deleteCompany } = useCompanies();
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);

  const handleSave = async (companyData: any) => {
    const success = await saveCompany(companyData);
    if (success) {
      setShowModal(false);
      setEditingCompany(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      return;
    }
    await deleteCompany(id);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Gerenciamento de Empresas</h1>
          <p className="text-zinc-400 mt-1">Visualize e gerencie todas as empresas do sistema</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Nova Empresa
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-zinc-900 rounded-xl p-8 text-center">
          <p className="text-zinc-400">Carregando empresas...</p>
        </div>
      ) : (
        <CompanyList
          companies={companies}
          onView={setViewingCompany}
          onEdit={setEditingCompany}
          onDelete={handleDelete}
        />
      )}

      <CompanyModal
        isOpen={showModal || editingCompany !== null}
        onClose={() => {
          setShowModal(false);
          setEditingCompany(null);
        }}
        onSave={handleSave}
        editingCompany={editingCompany}
      />

      <CompanyViewModal
        isOpen={viewingCompany !== null}
        onClose={() => setViewingCompany(null)}
        company={viewingCompany}
      />
    </div>
  );
};