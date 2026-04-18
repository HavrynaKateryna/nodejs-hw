import Joi from 'joi';

//
// 🟢 REGISTER VALIDATION
//
export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

//
// 🟡 LOGIN VALIDATION
//
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
