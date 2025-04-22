import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getLast12Months } from '../../../utils/dateUtils';

export const useDREData = (
  selectedCompanyId: string,
  selectedYear: number,
  selectedMonth: string
) => {
  const [loading, setLoading] = useState(true);
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
      const months = getLast12Months(selectedMonth, selectedYear);

      const { data: selectedComponents, error: componentsError } = await supabase
        .from('dre_empresa_componentes')
        .select(`
          dre_conta_principal:contas_dre_modelo!inner(
            id,
            nome,
            tipo,
            simbolo,
            ordem_padrao
          ),
          dre_conta_secundaria:dre_contas_secundarias(
            id,
            nome,
            ordem
          ),
          componente:contas_dre_componentes!inner(
            id,
            referencia_tipo,
            referencia_id,
            peso,
            ordem,
            categoria:categories!contas_dre_componentes_referencia_id_fkey(
              id,
              name,
              code,
              type
            ),
            indicador:indicators(
              id,
              name,
              code
            )
          )
        `)
        .eq('empresa_id', selectedCompanyId)
        .eq('is_active', true)
        .order('dre_conta_principal(ordem_padrao)', { ascending: true });

      if (componentsError) throw componentsError;

      // Process data...
      setData(selectedComponents || []);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar dados do DRE:', err);
      setError('Erro ao carregar dados do DRE');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};