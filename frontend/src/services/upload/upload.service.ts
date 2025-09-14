import axios from 'axios';
import {
  GenPresignedUrlDto,
  GenPresignedUrlResDto,
} from '~/models/upload.model';
import http from '../http';

export async function genUploadPresignedUrl(
  req: GenPresignedUrlDto
): Promise<GenPresignedUrlResDto> {
  return http.post(`/api/v1/upload/gen-presigned-url`, req);
}

export async function uploadFileToS3(
  file: File,
  presignedData: GenPresignedUrlResDto
): Promise<string> {
  const formData = new FormData();

  Object.entries(presignedData.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append('file', file);

  await axios.post(presignedData.uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return presignedData.fileUrl;
}
