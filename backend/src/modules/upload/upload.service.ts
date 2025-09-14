import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import path from 'path';
import slugify from 'slugify';
import { config } from '~/config';
import { GenPresignedUrlDto, GenPresignedUrlResDto } from './upload.interface';

export const uploadService = {
  async genPresignedUrl(
    dto: GenPresignedUrlDto
  ): Promise<GenPresignedUrlResDto> {
    const fileKey = this.getFileKey(dto.filename);
    const result = await this.genUploadUrl(fileKey, {
      contentLength: dto.filesize,
      contentType: dto.mimetype,
      expireIn: 60,
      isPublic: true,
    });

    return {
      uploadUrl: `${result.url}`,
      fileUrl: this.getPublicFileUrl(fileKey),
      fields: {
        ...result.fields,
        'Content-Type': dto.mimetype,
      },
    };
  },

  getPublicFileUrl(fileKey: string): string {
    return `https://${config.s3.s3Bucket}.s3.${config.s3.s3Region}.amazonaws.com/${fileKey}`;
  },

  async genUploadUrl(
    fileKey: string,
    options: {
      contentType: string;
      isPublic: boolean;
      expireIn: number;
      contentLength: number;
    }
  ): Promise<{ url: string; fields: Record<string, string> }> {
    try {
      // S3 client should be set up separately
      const s3Client = new S3Client({
        region: config.s3.s3Region,
        credentials: {
          accessKeyId: config.s3.accessKeyId,
          secretAccessKey: config.s3.secretAccessKey,
        },
        logger: console,
      });

      return await createPresignedPost(s3Client, {
        Bucket: config.s3.s3Bucket,
        Key: fileKey,
        Conditions: [
          ['content-length-range', 0, options.contentLength],
          ['eq', '$Content-Type', options.contentType],
        ],
        Fields: {
          acl: options.isPublic ? 'public-read' : 'private',
        },
        Expires: options.expireIn,
      });
    } catch (error) {
      throw error;
    }
  },

  getFileKey(fullFilename: string, prefix?: string): string {
    const { ext, name } = path.parse(fullFilename);
    const maxFileName = 200;
    let validName = slugify(name, { strict: true, lower: true });

    if (validName.length > maxFileName) {
      validName = validName.substring(0, maxFileName);
      const parts = validName.split('-');
      if (parts.length > 2) {
        parts.pop();
        validName = parts.join('-');
      }
    }

    const realPrefix = typeof prefix === 'string' ? `${prefix}_` : '';
    const timestamp = Math.floor(Date.now() / 1000);

    return `${realPrefix}${timestamp}_${validName}${ext}`;
  },

  async deleteImageFromS3(imageUrl: string): Promise<boolean> {
    try {
      const fileKey = this.extractFileKeyFromUrl(imageUrl);
      if (!fileKey) {
        console.warn('Cannot extract file key from URL:', imageUrl);
        return false;
      }

      const s3Client = new S3Client({
        region: config.s3.s3Region,
        credentials: {
          accessKeyId: config.s3.accessKeyId,
          secretAccessKey: config.s3.secretAccessKey,
        },
      });

      const deleteCommand = new DeleteObjectCommand({
        Bucket: config.s3.s3Bucket,
        Key: fileKey,
      });

      await s3Client.send(deleteCommand);
      return true;
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      return false;
    }
  },

  extractFileKeyFromUrl(imageUrl: string): string | null {
    try {
      const url = new URL(imageUrl);

      if (!url.hostname.includes('amazonaws.com')) {
        return null;
      }

      if (url.hostname.includes('.s3.')) {
        return url.pathname.startsWith('/')
          ? url.pathname.slice(1)
          : url.pathname;
      }

      if (url.hostname.startsWith('s3.')) {
        const pathParts = url.pathname.split('/');
        if (pathParts.length >= 3) {
          pathParts.shift();
          pathParts.shift();
          return pathParts.join('/');
        }
      }

      return null;
    } catch (error) {
      console.error('Error parsing S3 URL:', error);
      return null;
    }
  },

  isValidS3Url(imageUrl: string): boolean {
    try {
      const url = new URL(imageUrl);
      const expectedHostname = `${config.s3.s3Bucket}.s3.${config.s3.s3Region}.amazonaws.com`;

      return url.hostname === expectedHostname;
    } catch (error) {
      return false;
    }
  },
};
