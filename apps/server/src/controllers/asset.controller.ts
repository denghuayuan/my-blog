import type { Request, Response } from 'express';

import { createAsset, deleteAssetById, listAssets } from '../services/asset.service.js';

export async function listAssetsHandler(request: Request, response: Response) {
  const kind = typeof request.query.kind === 'string' ? request.query.kind : undefined;
  const query = typeof request.query.q === 'string' ? request.query.q : undefined;
  const assets = await listAssets({
    kind: kind === 'image' || kind === 'file' || kind === 'all' ? kind : undefined,
    query
  });

  response.json({
    code: 0,
    message: 'ok',
    data: assets
  });
}

export async function uploadAssetHandler(request: Request, response: Response) {
  const file = request.file;

  if (!file) {
    response.status(400).json({
      code: 400,
      message: 'file is required',
      data: null
    });
    return;
  }

  const asset = await createAsset({
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    buffer: file.buffer,
    uploaderEmail: request.auth?.email
  });

  response.status(201).json({
    code: 0,
    message: 'asset uploaded',
    data: asset
  });
}

export async function deleteAssetHandler(request: Request, response: Response) {
  const idParam = request.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  if (!id) {
    response.status(400).json({
      code: 400,
      message: 'id is required',
      data: null
    });
    return;
  }

  const result = await deleteAssetById(id);

  if (result === false) {
    response.status(400).json({
      code: 400,
      message: 'asset is still in use',
      data: null
    });
    return;
  }

  if (!result) {
    response.status(404).json({
      code: 404,
      message: 'asset not found',
      data: null
    });
    return;
  }

  response.json({
    code: 0,
    message: 'asset deleted',
    data: true
  });
}