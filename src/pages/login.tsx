import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    // ...добавьте редирект после успешного входа
  };

  const handleRegister = async () => {
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    // ...добавьте редирект или сообщение после успешной регистрации
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{isRegister ? 'Регистрация' : 'Вход'}</h2>
      <input
        className="w-full border rounded p-2 mb-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
      />
      <input
        className="w-full border rounded p-2 mb-2"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />
      {isRegister ? (
        <button className="w-full bg-blue-500 text-white py-2 rounded mb-2" onClick={handleRegister}>Зарегистрироваться</button>
      ) : (
        <button className="w-full bg-blue-500 text-white py-2 rounded mb-2" onClick={handleLogin}>Войти</button>
      )}
      <button className="w-full text-blue-500 py-2" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
