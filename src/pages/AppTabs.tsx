import NotesPage from './notes';
import TasksPage from './tasks';
import LoginPage from './login';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AppTabs() {
  const router = useRouter();
  return (
    <div>
      {router.pathname === '/login' && <LoginPage />}
      {router.pathname === '/notes' && <NotesPage />}
      {router.pathname === '/tasks' && <TasksPage />}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2">
        <Link href="/notes" className="text-blue-500 font-bold">Заметки</Link>
        <Link href="/tasks" className="text-blue-500 font-bold">Задачи</Link>
      </nav>
    </div>
  );
}
