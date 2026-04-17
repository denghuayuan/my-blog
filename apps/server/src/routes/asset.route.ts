import multer from 'multer';
import { Router } from 'express';

import { deleteAssetHandler, listAssetsHandler, uploadAssetHandler } from '../controllers/asset.controller.js';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';

const assetRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

assetRouter.get('/', requireAuth, requireAdmin, listAssetsHandler);
assetRouter.delete('/:id', requireAuth, requireAdmin, deleteAssetHandler);
assetRouter.post('/upload', requireAuth, requireAdmin, upload.single('file'), uploadAssetHandler);

export default assetRouter;