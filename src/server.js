import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

//
// 🔌 DB
//
await connectMongoDB();

//
// 🧩 MIDDLEWARE
//
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//
// 🛣 ROUTES
//
app.use(authRoutes);
app.use(notesRoutes);

//
// ❌ 404
//
app.use(notFoundHandler);

//
// ⚠️ ERROR HANDLER
//
app.use(errorHandler);

//
// 🚀 START SERVER
//
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
