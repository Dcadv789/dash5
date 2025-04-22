import { useState, useEffect } from 'react';
import { Company } from '../../../types/company';
import { companyService } from '../../../services/companies';
import { useAuth } from '../../../contexts/AuthContext';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getCompanies();
      setCompanies(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Erro ao carregar empresas');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCompany = async (companyData: Partial<Company>) => {
    try {
      setLoading(true);
      if (companyData.id) {
        await companyService.updateCompany(companyData.id, companyData);
      } else {
        await companyService.createCompany(companyData);
      }
      await fetchCompanies();
      return true;
    } catch (err) {
      console.error('Error saving company:', err);
      setError('Erro ao salvar empresa');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      setLoading(true);
      await companyService.deleteCompany(id);
      await fetchCompanies();
      return true;
    } catch (err) {
      console.error('Error deleting company:', err);
      setError('Erro ao excluir empresa');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    companies,
    loading,
    error,
    refreshCompanies: fetchCompanies,
    saveCompany: handleSaveCompany,
    deleteCompany: handleDeleteCompany
  };
};