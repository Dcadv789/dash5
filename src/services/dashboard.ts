import { supabase } from './supabase';

export const dashboardService = {
  getConfig: async (companyId: string) => {
    const { data, error } = await supabase
      .from('dashboard_visual_config')
      .select('*')
      .eq('empresa_id', companyId)
      .eq('is_active', true)
      .order('ordem');

    if (error) throw error;
    return data;
  },

  updateConfig: async (id: string, config: any) => {
    const { data, error } = await supabase
      .from('dashboard_visual_config')
      .update(config)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  createConfig: async (config: any) => {
    const { data, error } = await supabase
      .from('dashboard_visual_config')
      .insert([config])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteConfig: async (id: string) => {
    const { error } = await supabase
      .from('dashboard_visual_config')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};