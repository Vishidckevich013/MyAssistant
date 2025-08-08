import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonInput } from '@ionic/react';

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
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Задачи</h2>
        <IonInput
          placeholder="Новая задача"
          value={newTask}
          onIonChange={e => setNewTask(e.detail.value!)}
        />
        <IonSelect value={newStatus} placeholder="Статус" onIonChange={e => setNewStatus(e.detail.value)}>
          <IonSelectOption value="todo">В работе</IonSelectOption>
          <IonSelectOption value="done">Выполнено</IonSelectOption>
        </IonSelect>
        <IonButton expand="block" onClick={addTask}>Добавить задачу</IonButton>
        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id}>
              <IonLabel>{task.title}</IonLabel>
              <IonSelect value={task.status} onIonChange={e => updateStatus(task.id, e.detail.value)}>
                <IonSelectOption value="todo">В работе</IonSelectOption>
                <IonSelectOption value="done">Выполнено</IonSelectOption>
              </IonSelect>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
