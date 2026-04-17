import { Schema, model } from 'mongoose';

export type UserRole = 'admin' | 'user';

export interface UserDocument {
  username: string;
  displayName: string;
  bio?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 30
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    bio: {
      type: String,
      default: '',
      trim: true,
      maxlength: 160
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

userSchema.index({ username: 1 }, { unique: true });

export const UserModel = model<UserDocument>('User', userSchema);