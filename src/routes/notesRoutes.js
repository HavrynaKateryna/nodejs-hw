import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import { authenticate } from '../middleware/authenticate.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

//
// 🔐 AUTH MIDDLEWARE
//
router.use(authenticate);

//
// 📄 GET ALL NOTES
//
router.get('/', celebrate({ query: getAllNotesSchema }), getAllNotes);

//
// 📄 GET NOTE BY ID
//
router.get('/:noteId', celebrate({ params: noteIdSchema }), getNoteById);

//
// ➕ CREATE NOTE
//
router.post('/', celebrate({ body: createNoteSchema }), createNote);

//
// ✏️ UPDATE NOTE
//
router.patch(
  '/:noteId',
  celebrate({
    params: noteIdSchema,
    body: updateNoteSchema,
  }),
  updateNote
);

//
// ❌ DELETE NOTE
//
router.delete('/:noteId', celebrate({ params: noteIdSchema }), deleteNote);

export default router;
