import { supabase } from '../config/supabaseClient.js';

export const UserModel = {
  async getByEmail(email) {
    // PENTING: Gunakan select('*') agar kolom 'role' ikut terambil
    const { data, error } = await supabase
      .from('users')
      .select('*') 
      .eq('email', email)
      .single();

    if (error) return null;
    return data;
  },

  async create(userData) {
    // Pastikan saat register, role default diset (biasanya diatur default di Supabase, atau di sini)
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: 'user' // Default role untuk user baru
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};