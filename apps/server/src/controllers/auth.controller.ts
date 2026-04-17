import type { Request, Response } from 'express';

import { loginAdmin } from '../services/auth.service.js';

export async function login(request: Request, response: Response) {
  const { email, password } = request.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    response.status(400).json({
      code: 400,
      message: 'email and password are required',
      data: null
    });
    return;
  }

  const result = await loginAdmin({ email, password });

  if (!result) {
    response.status(401).json({
      code: 401,
      message: 'invalid admin credentials',
      data: null
    });
    return;
  }

  response.json({
    code: 0,
    message: 'ok',
    data: result
  });
}