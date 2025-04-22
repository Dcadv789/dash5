import { supabase } from './supabase';
import type { Company } from '../types/company';

export const companyService = {
  getCompanies: async () => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('is_active', true)
      .order('trading_name');

    if (error) throw error;
    return data;
  },

  getCompany: async (id: string) => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  createCompany: async (company: Partial<Company>) => {
    const { data, error } = await supabase
      .from('companies')
      .insert([company])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateCompany: async (id: string, company: Partial<Company>) => {
    const { data, error } = await supabase
      .from('companies')
      .update(company)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteCompany: async (id: string) => {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};