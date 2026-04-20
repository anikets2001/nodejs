import Notes from '../models/notes.js';

export async function getAllNotes(req, res) {
    try {
    const notes = await Notes.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function searchNotes(req, res) {
    try {
    const { title } = req.query;
    const notes = await Notes.find({ title: new RegExp(title, 'i') });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createNote(req, res){
    try {
    const note = new Notes(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateNote(req, res) {
    try {
    const note = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteNote(req, res){
    try {
    const note = await Notes.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}