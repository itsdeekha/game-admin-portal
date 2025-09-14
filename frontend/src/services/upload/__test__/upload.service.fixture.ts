import {
  GenPresignedUrlDto,
  GenPresignedUrlResDto,
} from '~/models/upload.model';

export function createMockFile(
  name = 'test.jpg',
  type = 'image/jpeg',
  size = 1024
): File {
  const file = new File(['file content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

export const mockGenPresignedUrlDto: GenPresignedUrlDto = {
  filename: 'filename.jpg',
  mimetype: 'image/jpeg',
  filesize: 1024000,
};

export const mockPresignedData: GenPresignedUrlResDto = {
  uploadUrl: 'https://itsdeekha-game-portal.s3.us-east-1.amazonaws.com/',
  fileUrl:
    'https://itsdeekha-game-portal.s3.us-east-1.amazonaws.com/1757800915_49b9d06e2f20a47643b777763d071879.jpg',
  fields: {
    acl: 'public-read',
    bucket: 'itsdeekha-game-portal',
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential':
      'AKIA325GPJB5RYBLWMID/20250913/us-east-1/s3/aws4_request',
    'X-Amz-Date': '20250913T220155Z',
    key: '1757800915_filename.jpg',
    Policy:
      'eyJleHBpcmF0aW9uIjoiMjAyNS0wOS0xM1QyMjowMjo1NVoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw3NzkxMF0sWyJlcSIsIiRDb250ZW50LVR5cGUiLCJpbWFnZS9qcGVnIl0seyJhY2wiOiJwdWJsaWMtcmVhZCJ9LHsiYnVja2V0IjoiaXRzZGVla2hhLWdhbWUtcG9ydGFsIn0seyJYLUFtei1BbGdvcml0aG0iOiJBV1M0LUhNQUMtU0hBMjU2In0seyJYLUFtei1DcmVkZW50aWFsIjoiQUtJQTMyNUdQSkI1UllCTFdNSUQvMjAyNTA5MTMvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMjUwOTEzVDIyMDE1NVoifSx7ImtleSI6IjE3NTc4MDA5MTVfNDliOWQwNmUyZjIwYTQ3NjQzYjc3Nzc2M2QwNzE4NzkuanBnIn1dfQ==',
    'X-Amz-Signature':
      'c0eab96a9d0d2c9a53ed98820d6361a0a4f7c540c3856a8fa0c09ffb0b5e28ff',
    'Content-Type': 'image/jpeg',
  },
};
