import { Router } from 'express';

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

import { celebrate } from 'celebrate';

const router = Router();

//
// 🔐 ВСЕ NOTES ПОД ЗАЩИТОЙ
//
router.use(authenticate);

//
// 📄 GET ALL
//
router.get('/notes', celebrate({ query: getAllNotesSchema }), getAllNotes);

//
// 📄 GET BY ID
//
router.get('/notes/:noteId', celebrate({ params: noteIdSchema }), getNoteById);

//
// ➕ CREATE
//
router.post('/notes', celebrate({ body: createNoteSchema }), createNote);

//
// ✏️ UPDATE
//
router.patch(
  '/notes/:noteId',
  celebrate({
    params: noteIdSchema,
    body: updateNoteSchema,
  }),
  updateNote
);

//
// ❌ DELETE
//
router.delete(
  '/notes/:noteId',
  celebrate({ params: noteIdSchema }),
  deleteNote
);

export default router;
