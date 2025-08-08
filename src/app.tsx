import { IonApp } from '@ionic/react';
import { BrowserRouter } from 'react-router-dom';
import AppTabs from './pages/AppTabs';
import '@ionic/react/css/core.css';
import '@ionic/react/css/ionic.bundle.css';
import '../styles/globals.css';

export default function MyApp() {
  return (
    <IonApp>
      <BrowserRouter>
        <AppTabs />
      </BrowserRouter>
    </IonApp>
  );
}
