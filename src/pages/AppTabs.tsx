import NotesPage from './notes';
import TasksPage from './tasks';
import LoginPage from './login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

export default function AppTabs() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/notes" component={NotesPage} exact />
        <Route path="/tasks" component={TasksPage} exact />
        <Redirect exact from="/" to="/login" />
      </Switch>
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2">
        <a href="/notes" className="text-blue-500 font-bold">Заметки</a>
        <a href="/tasks" className="text-blue-500 font-bold">Задачи</a>
      </nav>
    </BrowserRouter>
  );
}
