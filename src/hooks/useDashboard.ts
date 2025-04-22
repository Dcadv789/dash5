import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboard';

export const useDashboard = (companyId: string) => {
  const [config, setConfig] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (companyId) {
      loadConfig();
    }
  }, [companyId]);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getConfig(companyId);
      setConfig(data);
      setError(null);
    } catch (err) {
      console.error('Error loading dashboard config:', err);
      setError('Error loading dashboard configuration');
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (id: string, newConfig: any) => {
    try {
      const updated = await dashboardService.updateConfig(id, newConfig);
      setConfig(prev => prev.map(item => item.id === id ? updated : item));
      return updated;
    } catch (err) {
      console.error('Error updating config:', err);
      throw err;
    }
  };

  const createConfig = async (newConfig: any) => {
    try {
      const created = await dashboardService.createConfig(newConfig);
      setConfig(prev => [...prev, created]);
      return created;
    } catch (err) {
      console.error('Error creating config:', err);
      throw err;
    }
  };

  const deleteConfig = async (id: string) => {
    try {
      await dashboardService.deleteConfig(id);
      setConfig(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting config:', err);
      throw err;
    }
  };

  return {
    config,
    loading,
    error,
    updateConfig,
    createConfig,
    deleteConfig,
    refreshConfig: loadConfig
  };
};