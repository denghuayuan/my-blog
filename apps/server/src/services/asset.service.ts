import { env } from '../config/env.js';
import { ArticleModel } from '../models/article.model.js';
import { AssetModel } from '../models/asset.model.js';
import { UserModel } from '../models/user.model.js';
import { fileStorageService } from './asset-storage.service.js';

export interface AssetListFilters {
  kind?: 'all' | 'image' | 'file';
  query?: string;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function serializeAssets(assets: Array<Awaited<ReturnType<typeof AssetModel.find>>[number] | any>) {
  const assetIds = assets.map((asset) => String(asset._id));
  const usageCounts = await Promise.all(
    assetIds.map((assetId) => ArticleModel.countDocuments({ coverAssetId: assetId }))
  );

  return assets.map((asset, index) => ({
    id: asset._id,
    originalName: asset.originalName,
    filename: asset.filename,
    mimeType: asset.mimeType,
    size: asset.size,
    storageProvider: asset.storageProvider,
    storageKey: asset.storageKey,
    url: asset.url,
    usageCount: usageCounts[index],
    isInUse: usageCounts[index] > 0,
    createdAt: asset.createdAt,
    updatedAt: asset.updatedAt
  }));
}

export interface CreateAssetInput {
  originalName: string;
  mimeType: string;
  size: number;
  buffer: Buffer;
  uploaderEmail?: string;
}

export async function createAsset(input: CreateAssetInput) {
  const storedFile = await fileStorageService.storeFile({
    buffer: input.buffer,
    originalName: input.originalName,
    mimeType: input.mimeType
  });

  const uploader = input.uploaderEmail
    ? await UserModel.findOne({ email: input.uploaderEmail }).lean()
    : null;

  const url = `${env.serverBaseUrl}/uploads/${storedFile.storageKey}`;

  const asset = await AssetModel.create({
    originalName: input.originalName,
    filename: storedFile.filename,
    mimeType: input.mimeType,
    size: input.size,
    storageProvider: 'local',
    storageKey: storedFile.storageKey,
    url,
    uploaderId: uploader?._id
  });

  const [serializedAsset] = await serializeAssets([asset]);

  return serializedAsset;
}

export async function listAssets(filters: AssetListFilters = {}) {
  const query: Record<string, unknown> = {};

  if (filters.kind === 'image') {
    query.mimeType = /^image\//;
  }

  if (filters.kind === 'file') {
    query.mimeType = { $not: /^image\// };
  }

  if (filters.query?.trim()) {
    const keywordPattern = new RegExp(escapeRegex(filters.query.trim()), 'i');
    query.$or = [
      { originalName: keywordPattern },
      { filename: keywordPattern },
      { mimeType: keywordPattern }
    ];
  }

  const assets = await AssetModel.find(query)
    .sort({ createdAt: -1 })
    .limit(24)
    .lean();

  return serializeAssets(assets);
}

export async function deleteAssetById(id: string) {
  const asset = await AssetModel.findById(id);

  if (!asset) {
    return null;
  }

  const usageCount = await ArticleModel.countDocuments({ coverAssetId: asset._id });

  if (usageCount > 0) {
    return false;
  }

  await fileStorageService.deleteFile(asset.storageKey);
  await asset.deleteOne();

  return true;
}