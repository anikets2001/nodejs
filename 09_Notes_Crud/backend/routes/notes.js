import { Router } from "express";
import { createNote, getAllNotes, updateNote, deleteNote, searchNotes } from "../controllers/notes.js";

const router = Router();

// get all notes
router.get('/', getAllNotes);

// autosuggestion (search for notes by title)
router.get('/search', searchNotes);

// create a new note
router.post('/', createNote);

// update a note
router.put('/:id', updateNote);

// delete a note
router.delete('/:id', deleteNote);

export default router;