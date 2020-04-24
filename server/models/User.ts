/* eslint-disable consistent-return */
import mongoose, { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  account: string;
  password: string;
  nickname: string;
  gender: boolean;
  tel: string;
  avatar: string;

  comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: mongoose.Error, isMatch: boolean) => void,
) => void;

const userSchema: Schema = new Schema(
  {
    account: {
      unique: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: String,
    gender: Boolean, // 0-男 1-女
    tel: {
      type: String,
      max: 20,
    },
    avatar: String,
  },
  { timestamps: true },
);

userSchema.pre('save', function save(next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // eslint-disable-next-line no-shadow
    bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (this: IUser, candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};
userSchema.methods.comparePassword = comparePassword;

export default model<IUser>('User', userSchema);
