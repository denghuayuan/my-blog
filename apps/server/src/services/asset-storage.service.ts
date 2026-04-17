import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';

import { env } from '../config/env.js';

export interface StoreFileInput {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}

export interface StoredFileResult {
  filename: string;
  storageKey: string;
}

export interface FileStorageService {
  storeFile(input: StoreFileInput): Promise<StoredFileResult>;
  deleteFile(storageKey: string): Promise<void>;
}

function getSafeExtension(originalName: string) {
  const extension = path.extname(originalName).toLowerCase();
  return extension.replace(/[^.a-z0-9]/g, '');
}

class LocalFileStorageService implements FileStorageService {
  async storeFile(input: StoreFileInput): Promise<StoredFileResult> {
    const uploadDirectory = path.resolve(process.cwd(), '../../', env.uploadDir);
    const extension = getSafeExtension(input.originalName);
    const filename = `${randomUUID()}${extension}`;
    const storageKey = filename;
    const destination = path.join(uploadDirectory, filename);

    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(destination, input.buffer);

    return {
      filename,
      storageKey
    };
  }

  async deleteFile(storageKey: string): Promise<void> {
    const uploadDirectory = path.resolve(process.cwd(), '../../', env.uploadDir);
    const destination = path.join(uploadDirectory, storageKey);

    try {
      await unlink(destination);
    } catch (error: unknown) {
      if (typeof error === 'object' && error && 'code' in error && error.code === 'ENOENT') {
        return;
      }

      throw error;
    }
  }
}

export const fileStorageService: FileStorageService = new LocalFileStorageService();