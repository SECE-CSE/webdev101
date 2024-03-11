// Login.tsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function Login() {
    const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      // Redirect or handle the authenticated state as needed
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}


