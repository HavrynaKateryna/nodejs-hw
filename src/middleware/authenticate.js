import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  // ❌ нет токена
  if (!accessToken) {
    return next(createHttpError(401, 'Missing access token'));
  }

  let decoded;

  try {
    decoded = jwt.verify(accessToken, JWT_SECRET);
  } catch (err) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // 🔍 ищем сессию
  const session = await Session.findOne({ accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // ⏳ проверка срока accessToken
  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // 👤 ищем пользователя
  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401));
  }

  // ✅ добавляем пользователя в req
  req.user = user;

  next();
};
