import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

//
// ➕ CREATE NOTE (привязка к user)
//
export const createNote = async (req, res) => {
  const userId = req.user._id;

  const newNote = await Note.create({
    ...req.body,
    userId,
  });

  res.status(201).json(newNote);
};

//
// 🔍 GET ALL NOTES (ТОЛЬКО СВОИ)
//
export const getAllNotes = async (req, res) => {
  const userId = req.user._id;

  const { page = 1, perPage = 10, tag, search } = req.query;

  const filter = { userId };

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const skip = (page - 1) * perPage;

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter).skip(skip).limit(perPage),
    Note.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

//
// 🔍 GET NOTE BY ID (ТОЛЬКО СВОЯ)
//
export const getNoteById = async (req, res) => {
  const userId = req.user._id;

  const note = await Note.findOne({
    _id: req.params.noteId,
    userId,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

//
// ✏️ UPDATE NOTE (ТОЛЬКО СВОЯ)
//
export const updateNote = async (req, res) => {
  const userId = req.user._id;

  const note = await Note.findOneAndUpdate(
    {
      _id: req.params.noteId,
      userId,
    },
    req.body,
    { new: true }
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

//
// ❌ DELETE NOTE (ТОЛЬКО СВОЯ)
//
export const deleteNote = async (req, res) => {
  const userId = req.user._id;

  const note = await Note.findOneAndDelete({
    _id: req.params.noteId,
    userId,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
