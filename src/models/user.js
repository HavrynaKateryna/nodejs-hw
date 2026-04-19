import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const DEFAULT_AVATAR =
  'https://ac.goit.global/fullstack/react/default-avatar.jpg';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    avatar: {
      type: String,
      default: DEFAULT_AVATAR,
    },
  },
  {
    timestamps: true,
  }
);

//
// 🔐 username = email
//
userSchema.pre('save', function (next) {
  if (!this.username) {
    this.username = this.email;
  }
  next();
});

//
// 🚫 remove password from responses
//
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

//
// 🔑 compare password
//
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
