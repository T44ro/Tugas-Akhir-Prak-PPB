import { RegistrationModel } from '../models/registrationModel.js';

export const RegistrationController = {
  // User mendaftar event
  async register(req, res) {
    try {
      const { user_id, event_id } = req.body;
      
      // Validasi sederhana
      if (!user_id || !event_id) {
        return res.status(400).json({ success: false, message: "User ID dan Event ID wajib ada" });
      }

      await RegistrationModel.create(user_id, event_id);
      res.status(201).json({ success: true, message: "Berhasil mendaftar event" });
    } catch (error) {
      // Menangani error jika user mencoba daftar event yang sama 2x (Unique Constraint)
      if (error.code === '23505') {
        return res.status(400).json({ success: false, message: "Anda sudah terdaftar di event ini" });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Ambil list event milik user
  async getMyEvents(req, res) {
    try {
      const { userId } = req.params;
      const rawData = await RegistrationModel.getByUserId(userId);
      
      // Rapikan data: Supabase mengembalikan [{ registrations..., events: {...} }]
      // Kita ubah jadi list event langsung: [{...event1}, {...event2}]
      // Filter(e => e) untuk membuang data null jika event aslinya sudah dihapus
      const cleanEvents = rawData.map(item => item.events).filter(e => e);

      res.status(200).json({ success: true, data: cleanEvents });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Batal daftar
  async unregister(req, res) {
    try {
      const { user_id, event_id } = req.body;
      await RegistrationModel.delete(user_id, event_id);
      res.status(200).json({ success: true, message: "Berhasil membatalkan pendaftaran" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};