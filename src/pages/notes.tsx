import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonInput } from '@ionic/react';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    const { data } = await supabase.from('notes').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setNotes(data || []);
  };

  const addNote = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user || !newNote.trim()) return;
    await supabase.from('notes').insert({ user_id: user.id, content: newNote });
    setNewNote('');
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Заметки</h2>
        <IonInput
          placeholder="Новая заметка"
          value={newNote}
          onIonChange={e => setNewNote(e.detail.value!)}
        />
        <IonButton expand="block" onClick={addNote}>Добавить заметку</IonButton>
        <IonList>
          {notes.map(note => (
            <IonItem key={note.id}>
              <IonLabel>{note.content}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
