import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

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

app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//
// 🛣 ROUTES
//
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/users', userRoutes);

//
// 🚨 CELEBRATE ERRORS
//
app.use(errors());

//
// ❌ 404
//
app.use(notFoundHandler);

//
// ⚠️ GLOBAL ERROR HANDLER
//
app.use(errorHandler);

//
// 🚀 START
//
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
