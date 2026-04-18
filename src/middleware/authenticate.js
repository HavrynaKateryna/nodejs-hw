import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  // ❌ нет токена
  if (!accessToken) {
    return next(createHttpError(401, 'Missing access token'));
  }

  // 🔍 ищем сессию ТОЛЬКО по accessToken
  const session = await Session.findOne({ accessToken });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // ⏳ проверка срока жизни
  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // 👤 ищем пользователя
  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401));
  }

  // ✅ кладём пользователя в req
  req.user = user;

  return next();
};
