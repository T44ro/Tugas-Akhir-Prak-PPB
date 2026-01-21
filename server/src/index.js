import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// [PENTING] Izinkan CORS agar frontend bisa akses backend
app.use(cors({
    origin: true, // Izinkan semua domain (termasuk vercel app)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());

// --- ROUTES ---
// Pastikan path ini sesuai dengan request dari frontend
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);

// [FIX 1] Tambahkan Route untuk '/api' agar tidak error "Cannot GET /api"
app.get('/api', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: "Welcome to FSJ API Endpoint" 
    });
});

// Route Root '/'
app.get('/', (req, res) => {
  res.send('API FSJ Server is Running...');
});

// Jalankan server jika local
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
}

export default app;