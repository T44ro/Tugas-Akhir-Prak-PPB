import { EventModel } from '../models/eventModel.js';

export const EventController = {
  async getAll(req, res) {
    try {
      const events = await EventModel.getAll();
      res.status(200).json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const event = await EventModel.getById(req.params.id);
      res.status(200).json({ success: true, data: event });
    } catch (error) {
      res.status(404).json({ success: false, message: "Event not found" });
    }
  },

  async create(req, res) {
    try {
      const newEvent = await EventModel.create(req.body);
      res.status(201).json({ success: true, data: newEvent });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};