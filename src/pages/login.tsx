import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { IonPage, IonContent, IonInput, IonButton, IonText } from '@ionic/react';

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
    <IonPage>
      <IonContent className="ion-padding">
        <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
        <IonInput
          placeholder="Email"
          value={email}
          onIonChange={e => setEmail(e.detail.value!)}
          type="email"
        />
        <IonInput
          placeholder="Пароль"
          value={password}
          onIonChange={e => setPassword(e.detail.value!)}
          type="password"
        />
        {isRegister ? (
          <IonButton expand="block" onClick={handleRegister}>Зарегистрироваться</IonButton>
        ) : (
          <IonButton expand="block" onClick={handleLogin}>Войти</IonButton>
        )}
        <IonButton fill="clear" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </IonButton>
        {error && <IonText color="danger">{error}</IonText>}
      </IonContent>
    </IonPage>
  );
}
