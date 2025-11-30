import { supabase } from '../config/supabaseClient.js';

export const EventModel = {
  async getAll() {
    const { data, error } = await supabase.from('events').select('*');
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
  }
};