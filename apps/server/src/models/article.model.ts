import { Schema, Types, model } from 'mongoose';

export type ArticleStatus = 'draft' | 'published';
export type ArticleBodyType = 'plain' | 'markdown';

export interface ArticleDocument {
  title: string;
  slug: string;
  summary?: string;
  bodyType: ArticleBodyType;
  content: string;
  coverAssetId?: Types.ObjectId;
  status: ArticleStatus;
  authorId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<ArticleDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    summary: {
      type: String,
      default: '',
      trim: true,
      maxlength: 240
    },
    bodyType: {
      type: String,
      enum: ['plain', 'markdown'],
      default: 'plain'
    },
    content: {
      type: String,
      required: true
    },
    coverAssetId: {
      type: Schema.Types.ObjectId,
      ref: 'Asset'
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const ArticleModel = model<ArticleDocument>('Article', articleSchema);