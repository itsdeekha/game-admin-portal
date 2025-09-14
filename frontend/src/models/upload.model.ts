export interface GenPresignedUrlDto {
  filename: string;
  mimetype: string;
  filesize: number;
}

export interface GenPresignedUrlResDto {
  uploadUrl: string;
  fileUrl: string;
  fields: Record<string, string>;
}

export interface UploadProgress {
  percentage: number;
  loaded: number;
  total: number;
}
