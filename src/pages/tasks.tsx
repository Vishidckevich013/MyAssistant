import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type Task = { id: string; title: string; status: string; created_at: string };

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newStatus, setNewStatus] = useState('todo');

  const fetchTasks = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    const { data } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setTasks((data as Task[]) || []);
  };

  const addTask = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user || !newTask.trim()) return;
    await supabase.from('tasks').insert({ user_id: user.id, title: newTask, status: newStatus });
    setNewTask('');
    setNewStatus('todo');
    fetchTasks();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('tasks').update({ status }).eq('id', id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Задачи</h2>
      <input
        className="w-full border rounded p-2 mb-2"
        placeholder="Новая задача"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <select
        className="w-full border rounded p-2 mb-2"
        value={newStatus}
        onChange={e => setNewStatus(e.target.value)}
      >
        <option value="todo">В работе</option>
        <option value="done">Выполнено</option>
      </select>
      <button className="w-full bg-blue-500 text-white py-2 rounded mb-4" onClick={addTask}>Добавить задачу</button>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="border rounded p-2 bg-white shadow flex items-center justify-between">
            <span>{task.title}</span>
            <select
              className="border rounded p-1"
              value={task.status}
              onChange={e => updateStatus(task.id, e.target.value)}
            >
              <option value="todo">В работе</option>
              <option value="done">Выполнено</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
