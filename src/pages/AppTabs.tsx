import Link from 'next/link';

export default function AppTabs() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2">
      <Link href="/notes" className="text-blue-500 font-bold">Заметки</Link>
      <Link href="/tasks" className="text-blue-500 font-bold">Задачи</Link>
    </nav>
  );
}
