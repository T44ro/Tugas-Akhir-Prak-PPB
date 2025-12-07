import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
// Gunakan PORT dari .env atau default ke 3000
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:5173", "https://tugas-akhir-prak-ppb-3bzz.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API BinaKarier Running...');
});

// --- PERBAIKAN LOGIKA SERVER ---

// 1. Jika dijalankan LOKAL (bukan di Vercel), jalankan server di Port
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
}

// 2. Export app untuk Vercel (Gunakan export default, BUKAN module.exports)
export default app;