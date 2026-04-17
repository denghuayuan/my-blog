import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { UserModel } from '../models/user.model.js';

export interface LoginInput {
  email: string;
  password: string;
}

export async function loginAdmin(input: LoginInput) {
  const email = input.email.trim().toLowerCase();

  const user = await UserModel.findOne({ email, role: 'admin' });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);

  if (!isPasswordValid) {
    return null;
  }

  const accessToken = jwt.sign(
    {
      email: user.email,
      role: user.role
    },
    env.jwtAccessSecret,
    {
      expiresIn: env.jwtAccessExpiresInSeconds,
      subject: user.email
    }
  );

  return {
    accessToken,
    user: {
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      username: user.username
    }
  };
}