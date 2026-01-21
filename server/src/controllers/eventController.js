import { EventModel } from '../models/eventModel.js';

export const EventController = {
  // ... (getAll, getById, create yang lama TETAP SAMA) ...
  
  async getAll(req, res) {
    try {
      const events = await EventModel.getAll();
      res.status(200).json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) { /* ... kode lama ... */ },

  async create(req, res) {
    try {
      const newEvent = await EventModel.create(req.body);
      res.status(201).json({ success: true, data: newEvent });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // [BARU] Fungsi Update Event
  async updateEvent(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body; // Data baru yang dikirim dari frontend

      // Panggil Model (pastikan model Supabase Anda mendukung update)
      const { data, error } = await EventModel.update(id, updates);

      if (error) {
        throw new Error(error.message);
      }

      res.status(200).json({
        success: true,
        message: "Event berhasil diperbarui",
        data
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // [BARU] Hapus Event
  async delete(req, res) {
    try {
      await EventModel.delete(req.params.id);
      res.status(200).json({ success: true, message: "Event berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};