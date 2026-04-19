import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

//
// ➕ CREATE NOTE
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
// 🔍 GET ALL NOTES
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

  const skip = (Number(page) - 1) * Number(perPage);

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter).skip(skip).limit(Number(perPage)),
    Note.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalNotes / Number(perPage));

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

//
// 🔍 GET BY ID
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
// ✏️ UPDATE NOTE
//
export const updateNote = async (req, res) => {
  const userId = req.user._id;

  const note = await Note.findOneAndUpdate(
    {
      _id: req.params.noteId,
      userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

//
// ❌ DELETE NOTE
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
