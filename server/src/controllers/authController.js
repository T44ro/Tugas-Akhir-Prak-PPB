import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const AuthController = {
  // Fitur Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Cari user (pastikan UserModel select * agar role terbawa)
      const user = await UserModel.getByEmail(email);
      if (!user) {
        return res.status(404).json({ success: false, message: "Email tidak ditemukan" });
      }

      // 2. Cek password
      let isMatch = false;
      if (user.password === password) { 
          isMatch = true; 
      } else {
          isMatch = await bcrypt.compare(password, user.password);
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Password salah" });
      }

      // 3. Login sukses
      // [PERBAIKAN DISINI]: Tambahkan role ke dalam object user
      res.status(200).json({ 
        success: true, 
        message: "Login berhasil",
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email,
          role: user.role // <--- WAJIB ADA
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Fitur Register
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await UserModel.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email sudah terdaftar" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Default role biasanya diatur di database sebagai 'user'
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
      });

      res.status(201).json({ success: true, data: newUser });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};