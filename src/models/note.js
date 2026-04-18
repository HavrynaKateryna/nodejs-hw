import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: false, // 🔥 ОБЯЗАТЕЛЬНО ПО ПРОВЕРКЕ
      default: '',
      trim: true,
    },

    tag: {
      type: String,
      enum: TAGS, // 🔥 БЕРЁМ ИЗ КОНСТАНТЫ
      default: 'Todo',
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 текстовый индекс для поиска
noteSchema.index({ title: 'text', content: 'text' });

export const Note = mongoose.model('Note', noteSchema);
