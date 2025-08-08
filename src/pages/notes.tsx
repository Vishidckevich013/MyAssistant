import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type Note = { id: string; content: string; created_at: string };

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    const { data } = await supabase.from('notes').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setNotes((data as Note[]) || []);
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
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Заметки</h2>
      <input
        className="w-full border rounded p-2 mb-2"
        placeholder="Новая заметка"
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
      />
      <button className="w-full bg-blue-500 text-white py-2 rounded mb-4" onClick={addNote}>Добавить заметку</button>
      <ul className="space-y-2">
        {notes.map(note => (
          <li key={note.id} className="border rounded p-2 bg-white shadow">
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
