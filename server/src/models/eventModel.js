import { supabase } from '../config/supabaseClient.js';

export const EventModel = {
  // ... (fungsi getAll, getById, create yang sudah ada TETAP SAMA) ...
  async getAll() {
    const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async create(eventData) {
    const { data, error } = await supabase.from('events').insert([eventData]).select();
    if (error) throw error;
    return data;
  },

  // [BARU] Fungsi Hapus Event
  async delete(id) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};