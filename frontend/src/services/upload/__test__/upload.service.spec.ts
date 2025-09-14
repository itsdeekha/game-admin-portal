import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import http from '../../http';
import { genUploadPresignedUrl, uploadFileToS3 } from '../upload.service';
import {
  createMockFile,
  mockGenPresignedUrlDto,
  mockPresignedData,
} from './upload.service.fixture';

vi.mock('../../http', () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

const mockFormData = {
  append: vi.fn(),
};

global.FormData = vi.fn(() => mockFormData) as any;

describe('genUploadPresignedUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Successful API Calls', () => {
    it('calls HTTP POST with correct endpoint and data', async () => {
      vi.mocked(http.post).mockResolvedValueOnce(mockPresignedData);

      const result = await genUploadPresignedUrl(mockGenPresignedUrlDto);

      expect(http.post).toHaveBeenCalledWith(
        '/api/v1/upload/gen-presigned-url',
        mockGenPresignedUrlDto
      );
      expect(http.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPresignedData);
    });

    it('returns the response from HTTP module', async () => {
      vi.mocked(http.post).mockResolvedValueOnce(mockPresignedData);

      const result = await genUploadPresignedUrl(mockGenPresignedUrlDto);

      expect(result).toBe(mockPresignedData);
      expect(result.uploadUrl).toBe(mockPresignedData.uploadUrl);
      expect(result.fileUrl).toBe(mockPresignedData.fileUrl);
      expect(result.fields).toEqual(mockPresignedData.fields);
    });
  });

  describe('Error Handling', () => {
    it('propagates HTTP errors', async () => {
      const mockError = new Error('API Error: File too large');

      vi.mocked(http.post).mockRejectedValueOnce(mockError);

      await expect(
        genUploadPresignedUrl(mockGenPresignedUrlDto)
      ).rejects.toThrow('API Error: File too large');
      expect(http.post).toHaveBeenCalledWith(
        '/api/v1/upload/gen-presigned-url',
        mockGenPresignedUrlDto
      );
    });

    it('handles network errors', async () => {
      const networkError = new Error('Network Error');

      vi.mocked(http.post).mockRejectedValueOnce(networkError);

      await expect(
        genUploadPresignedUrl(mockGenPresignedUrlDto)
      ).rejects.toThrow('Network Error');
    });

    it('handles server validation errors', async () => {
      const validationError = {
        message: 'Validation failed',
        errors: { fileName: 'Invalid file name' },
      };

      vi.mocked(http.post).mockRejectedValueOnce(validationError);

      await expect(
        genUploadPresignedUrl(mockGenPresignedUrlDto)
      ).rejects.toEqual(validationError);
    });
  });
});

describe('uploadFileToS3', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFormData.append.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Successful Upload Flow', () => {
    it('uploads file successfully and returns fileUrl', async () => {
      const mockFile = createMockFile();

      vi.mocked(axios.post).mockResolvedValueOnce({ data: 'success' });

      const result = await uploadFileToS3(mockFile, mockPresignedData);

      expect(result).toBe(mockPresignedData.fileUrl);
    });

    it('constructs FormData correctly with presigned fields', async () => {
      const mockFile = createMockFile();

      vi.mocked(axios.post).mockResolvedValueOnce({ data: 'success' });

      await uploadFileToS3(mockFile, mockPresignedData);

      // Verify FormData constructor called
      expect(FormData).toHaveBeenCalledTimes(1);

      // Verify all presigned fields were appended
      Object.entries(mockPresignedData.fields).forEach(([key, value]) => {
        expect(mockFormData.append).toHaveBeenCalledWith(key, value);
      });

      // Verify file was appended last
      expect(mockFormData.append).toHaveBeenCalledWith('file', mockFile);
    });

    it('makes axios POST request with correct configuration', async () => {
      const mockFile = createMockFile();

      vi.mocked(axios.post).mockResolvedValueOnce({ data: 'success' });

      await uploadFileToS3(mockFile, mockPresignedData);

      expect(axios.post).toHaveBeenCalledWith(
        mockPresignedData.uploadUrl,
        mockFormData,
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
    });
  });
});
