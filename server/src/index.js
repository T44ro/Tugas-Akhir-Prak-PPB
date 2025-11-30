import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Penting agar bisa diakses frontend
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Izinkan akses dari frontend
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('API BinaKarier Running...');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Cek apakah sedang berjalan di Vercel
if (process.env.VERCEL) {
    module.exports = app;
} else {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}