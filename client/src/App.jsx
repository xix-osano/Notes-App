import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    if (res.status !== 200) {
      console.error('Failed to fetch notes');
      return;
    }
    if (!res.data || !Array.isArray(res.data)) {
      console.error('Invalid notes data format');
      return;
    }
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    await axios.post('http://localhost:5000/api/notes', form);
    setForm({ title: '', content: '' });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`'http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Notes App</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Note
          </button>
        </form>

        <hr className="my-6" />

        <div className="space-y-4">
          {notes.map(note => (
            <div key={note._id} className="bg-gray-50 border border-gray-300 rounded p-4 shadow-sm">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-gray-700">{note.content}</p>
              <button
                onClick={() => deleteNote(note._id)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

