'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/cervecero');
    } else {
      const data = await res.json();
      setError(data.error || 'Contraseña incorrecta');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='theme2 grid grid-flow-row place-content-center place-items-center place-self-center gap-4 p-16'>
        <div className='grid grid-flow-row place-content-center place-items-center place-self-center gap-2'>
          <div>Ingrese la contraseña:</div>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='theme1 rounded-md py-1 px-2'
          />
        </div>
        <div className='grid grid-flow-row place-content-center place-items-center place-self-center gap-2'>
          <button className='theme5 py-2 px-4 rounded-md font-bold' type="submit">Entrar</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>


      </div>

    </form>
  );
}