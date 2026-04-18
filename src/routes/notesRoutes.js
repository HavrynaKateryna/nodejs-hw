import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

// 🔍 GET all notes (pagination + search + tag validation)
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// 🔍 GET by id
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

// ➕ CREATE
router.post('/notes', celebrate(createNoteSchema), createNote);

// ✏️ UPDATE
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

// ❌ DELETE
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

export default router;
