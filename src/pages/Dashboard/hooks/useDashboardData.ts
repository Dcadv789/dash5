import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getLast12Months } from '../../../utils/dateUtils';

export const useDashboardData = (
  selectedCompanyId: string,
  selectedYear: number,
  selectedMonth: string
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (selectedCompanyId && selectedYear && selectedMonth) {
      fetchData();
    }
  }, [selectedCompanyId, selectedYear, selectedMonth]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const months = getLast12Months(selectedMonth, selectedYear);

      const { data: configData, error: configError } = await supabase
        .from('dashboard_visual_config')
        .select('*')
        .eq('empresa_id', selectedCompanyId)
        .eq('is_active', true)
        .order('ordem');

      if (configError) throw configError;

      // Process data...
      setData(configData || []);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refreshData: fetchData };
};