import React from 'react';
import { Building2, User, Calendar, FileText, Eye, Edit, Trash2 } from 'lucide-react';
import { Company } from '../../../types/company';
import { formatDate, calculateMonthsAsCostumer } from '../../../utils/dateUtils';

interface CompanyListProps {
  companies: Company[];
  onView: (company: Company) => void;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => {
        const monthsAsCostumer = company.contractStartDate 
          ? calculateMonthsAsCostumer(company.contractStartDate)
          : 0;

        return (
          <div key={company.id} className="bg-zinc-900 rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-zinc-100">{company.tradingName}</h3>
                    <p className="text-sm text-zinc-400">{company.name}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  company.isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {company.isActive ? 'Ativa' : 'Inativa'}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-zinc-500" />
                  <div>
                    <p className="text-sm text-zinc-400">CNPJ</p>
                    <p className="text-zinc-200">{company.cnpj}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-zinc-500" />
                  <div>
                    <p className="text-sm text-zinc-400">Data de Início do Contrato</p>
                    <p className="text-zinc-200">
                      {company.contractStartDate ? formatDate(company.contractStartDate) : 'Não definido'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User size={20} className="text-zinc-500" />
                  <div>
                    <p className="text-sm text-zinc-400">Sócios</p>
                    <p className="text-zinc-200">{company.partners?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  onClick={() => onView(company)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit(company)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(company.id)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};