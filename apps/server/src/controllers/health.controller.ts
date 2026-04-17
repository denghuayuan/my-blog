import type { Request, Response } from 'express';

export function getHealth(_request: Request, response: Response) {
  response.json({
    code: 0,
    message: 'ok',
    data: {
      service: 'server',
      status: 'running'
    }
  });
}