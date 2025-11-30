import { apiClient } from '../config/api';

// Data Mock Sementara (Pindahkan dari App.jsx ke sini)
const MOCK_EVENTS = [
  {
    id: 'evt-001',
    title: 'Webinar: Membangun Personal Branding di LinkedIn',
    category: 'Webinar',
    date: '12 Okt 2025',
    time: '19:00 WIB',
    type: 'Online',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    description: 'Pelajari cara mengoptimalkan profil LinkedIn agar dilirik rekruter top.',
    price: 'Gratis',
    prep_time: 90, // menit (contoh adaptasi field)
    difficulty: 'Pemula'
  },
  {
    id: 'evt-002',
    title: 'Bootcamp: Fullstack Developer Zero to Hero',
    category: 'Bootcamp',
    date: '20 Okt 2025',
    time: '09:00 WIB',
    type: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    description: 'Program intensif 2 bulan belajar coding dari dasar hingga siap kerja.',
    price: 'Beasiswa',
    prep_time: 120,
    difficulty: 'Menengah'
  },
  {
    id: 'evt-003',
    title: 'Seminar: Mental Health di Dunia Kerja',
    category: 'Seminar',
    date: '25 Okt 2025',
    time: '13:00 WIB',
    type: 'Online',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    description: 'Menjaga kewarasan dan keseimbangan hidup saat menghadapi tekanan deadline.',
    price: 'Gratis',
    prep_time: 60,
    difficulty: 'Umum'
  },
  {
    id: 'evt-004',
    title: 'Workshop: Public Speaking Mastery',
    category: 'Workshop',
    date: '1 Nov 2025',
    time: '10:00 WIB',
    type: 'Offline',
    image: 'https://images.unsplash.com/photo-1475721027767-pika4?auto=format&fit=crop&q=80&w=800',
    description: 'Teknik berbicara di depan umum dengan percaya diri.',
    price: 'Rp 50rb',
    prep_time: 180,
    difficulty: 'Lanjut'
  }
];

class EventService {
  /**
   * Mengambil semua event (Simulasi API Call)
   */
  async getEvents(params = {}) {
    // KODE ASLI JIKA ADA BACKEND:
    // return await apiClient.get('/api/v1/events', { params });

    // SIMULASI (MOCK):
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter sederhana (jika ada search query)
        let data = MOCK_EVENTS;
        if (params.search) {
          data = data.filter(e => e.title.toLowerCase().includes(params.search.toLowerCase()));
        }
        
        resolve({
          success: true,
          data: data,
          pagination: { total_pages: 1, page: 1 }
        });
      }, 800); // Delay 0.8 detik biar terasa seperti loading
    });
  }

  /**
   * Mengambil detail event by ID
   */
  async getEventById(id) {
    // KODE ASLI:
    // return await apiClient.get(`/api/v1/events/${id}`);

    // SIMULASI:
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const event = MOCK_EVENTS.find(e => e.id === id);
        if (event) {
          resolve({ success: true, data: event });
        } else {
          reject({ message: 'Event tidak ditemukan' });
        }
      }, 500);
    });
  }
}

export default new EventService();