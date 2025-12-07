import { supabase } from '../config/supabaseClient.js';

export const UserModel = {
  async getByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    // Jangan throw error jika data null (user tidak ketemu), return null saja
    if (error && error.code !== 'PGRST116') throw error; 
    return data;
  },

  async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();

    if (error) throw error;
    return data;
  }
};