import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

export interface AuthPayload {
  email: string;
  role: 'admin' | 'user';
}

declare module 'express-serve-static-core' {
  interface Request {
    auth?: AuthPayload;
  }
}

export function requireAuth(request: Request, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    response.status(401).json({
      code: 401,
      message: 'authorization token is required',
      data: null
    });
    return;
  }

  const token = authorization.slice('Bearer '.length).trim();

  try {
    const payload = jwt.verify(token, env.jwtAccessSecret) as AuthPayload;
    request.auth = payload;
    next();
  } catch {
    response.status(401).json({
      code: 401,
      message: 'invalid token',
      data: null
    });
  }
}

export function requireAdmin(request: Request, response: Response, next: NextFunction) {
  if (!request.auth || request.auth.role !== 'admin') {
    response.status(403).json({
      code: 403,
      message: 'admin access required',
      data: null
    });
    return;
  }

  next();
}