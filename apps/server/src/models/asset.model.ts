import { Schema, Types, model } from 'mongoose';

export interface AssetDocument {
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  storageProvider: 'local';
  storageKey: string;
  url: string;
  uploaderId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const assetSchema = new Schema<AssetDocument>(
  {
    originalName: {
      type: String,
      required: true,
      trim: true
    },
    filename: {
      type: String,
      required: true,
      trim: true
    },
    mimeType: {
      type: String,
      required: true,
      trim: true
    },
    size: {
      type: Number,
      required: true,
      min: 0
    },
    storageProvider: {
      type: String,
      enum: ['local'],
      default: 'local'
    },
    storageKey: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    uploaderId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

assetSchema.index({ storageKey: 1 }, { unique: true });

export const AssetModel = model<AssetDocument>('Asset', assetSchema);