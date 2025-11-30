import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useEvents({ search } = {}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Query dasar ke tabel 'events'
      let query = supabase.from('events').select('*');

      // 2. Tambahkan filter pencarian jika ada input search
      // 'ilike' digunakan untuk pencarian case-insensitive (huruf besar/kecil dianggap sama)
      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      // 3. Eksekusi query
      const { data, error } = await query;

      if (error) throw error;

      // 4. Simpan data ke state
      setEvents(data || []);
      
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Gagal memuat data dari server. Periksa koneksi atau konfigurasi database.');
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Jalankan fetch saat komponen dimuat atau query pencarian berubah
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
}