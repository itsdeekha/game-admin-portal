import { GenPresignedUrlReq } from './upload.interface';
import { uploadService } from './upload.service';

export const uploadHandlers = {
  async genPresignedUrl(req: GenPresignedUrlReq) {
    return uploadService.genPresignedUrl(req.body);
  },
};
