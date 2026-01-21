import React, { useState } from 'react';
import { Loader, LogIn, UserPlus } from 'lucide-react';

export default function Login({ onLogin }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://tugas-akhir-prak-ppb-lknt.vercel.app/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      if (isLoginView) {
        // Login Sukses
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        // Register Sukses, pindah ke login
        alert('Registrasi berhasil! Silakan login.');
        setIsLoginView(true);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-900">{isLoginView ? 'Selamat Datang' : 'Buat Akun'}</h1>
          <p className="text-blue-900 text-sm">Steppers!!</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" required className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" 
              onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" 
              onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2">
            {loading ? <Loader className="animate-spin" size={20}/> : (isLoginView ? <><LogIn size={20}/> Masuk</> : <><UserPlus size={20}/> Daftar</>)}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLoginView ? "Belum punya akun? " : "Sudah punya akun? "}
          <button onClick={() => setIsLoginView(!isLoginView)} className="text-blue-600 font-bold hover:underline">
            {isLoginView ? 'Daftar Sekarang' : 'Login Disini'}
          </button>
        </div>
      </div>
    </div>
  );
}