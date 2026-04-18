import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const filter = {};

  // 🔍 фильтр по тегу
  if (tag) {
    filter.tag = tag;
  }

  // 🔍 текстовый поиск
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

export const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
    returnDocument: 'after',
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
