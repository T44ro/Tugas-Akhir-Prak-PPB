import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const AuthController = {
  // Fitur Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log("👉 [LOGIN DEBUG] Mencoba login email:", email);

      // 1. Cari user
      const user = await UserModel.getByEmail(email);
      
      // --- DEBUGGING POINT: LIHAT TERMINAL ANDA ---
      console.log("👉 [LOGIN DEBUG] Data mentah dari Database:", JSON.stringify(user, null, 2));

      if (!user) {
        console.log("❌ [LOGIN DEBUG] User tidak ditemukan di DB");
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
        console.log("❌ [LOGIN DEBUG] Password Salah");
        return res.status(400).json({ success: false, message: "Password salah" });
      }

      // 3. Login sukses
      const userDataToSend = { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        // Fallback: Jika role null/undefined, set ke 'user' atau string kosong untuk cek
        role: user.role || "ROLE_MISSING" 
      };

      console.log("✅ [LOGIN DEBUG] Mengirim respon ke frontend:", userDataToSend);

      res.status(200).json({ 
        success: true, 
        message: "Login berhasil",
        user: userDataToSend
      });

    } catch (error) {
      console.error("❌ [LOGIN DEBUG] Error:", error);
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

      // Default role 'user'
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role: 'user' 
      });

      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};