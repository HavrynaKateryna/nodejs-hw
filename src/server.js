import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// 🔌 MongoDB connection
await connectMongoDB();

// 🧩 Middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// 🛣 Routes
app.use(notesRoutes);

// ❌ 404
app.use(notFoundHandler);

// ⚠️ Celebrate validation errors (ОБЯЗАТЕЛЬНО ПО ЗАДАНИЮ)
app.use(errors());

// ⚠️ Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
