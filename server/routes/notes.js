import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// Get all notes
router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// Create a note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const newNote = await Note.create({ title, content });
  res.json(newNote);
});

// Delete a note
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: 'Note deleted' });
});

export default router;
