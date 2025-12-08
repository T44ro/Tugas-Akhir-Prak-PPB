import { supabase } from '../config/supabaseClient.js';

export const RegistrationModel = {
  // 1. Simpan data pendaftaran baru
  async create(userId, eventId) {
    const { data, error } = await supabase
      .from('registrations')
      .insert([{ user_id: userId, event_id: eventId }])
      .select();
    
    if (error) throw error;
    return data;
  },

  // 2. Ambil semua event yang diikuti user (Relasi JOIN)
  async getByUserId(userId) {
    // Syntax ini mengambil data registrasi DAN detail event-nya sekaligus
    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        events (*) 
      `) 
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  },
  
  // 3. Hapus pendaftaran (Unregister)
  async delete(userId, eventId) {
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('user_id', userId)
      .eq('event_id', eventId); // Hapus berdasarkan user_id DAN event_id
      
    if (error) throw error;
    return true;
  }
};