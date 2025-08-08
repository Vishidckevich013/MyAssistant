import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { pencil, list } from 'ionicons/icons';
import LoginPage from './login';
import NotesPage from './notes';
import TasksPage from './tasks';

export default function AppTabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/notes" component={NotesPage} exact />
        <Route path="/tasks" component={TasksPage} exact />
        <Redirect exact from="/" to="/login" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="notes" href="/notes">
          <IonIcon icon={pencil} />
          <IonLabel>Заметки</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasks" href="/tasks">
          <IonIcon icon={list} />
          <IonLabel>Задачи</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
