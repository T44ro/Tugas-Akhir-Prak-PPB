import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const AuthController = {
  // Fitur Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Cari user berdasarkan email
      const user = await UserModel.getByEmail(email);
      if (!user) {
        return res.status(404).json({ success: false, message: "Email tidak ditemukan" });
      }

      // 2. Cek apakah password cocok (khusus user manual 'admin123' kita bypass dulu hash-nya untuk tes)
      // Nanti di production harus pakai bcrypt.compare sepenuhnya
      let isMatch = false;
      if (user.password === password) { 
          isMatch = true; // Fallback untuk user manual yg belum di-hash
      } else {
          isMatch = await bcrypt.compare(password, user.password);
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Password salah" });
      }

      // 3. Login sukses
      res.status(200).json({ 
        success: true, 
        message: "Login berhasil",
        user: { id: user.id, name: user.name, email: user.email }
      });

    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Fitur Register (Daftar Akun Baru)
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // 1. Cek email sudah ada belum
      const existingUser = await UserModel.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email sudah terdaftar" });
      }

      // 2. Enkripsi Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 3. Simpan ke DB
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