const allowedImageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];

const maxFileSize = 5 * 1024 * 1024; // 5MB

export function validateImageFile(file: File): string | null {
  if (!allowedImageTypes.includes(file.type)) {
    return `Please select an image file (JPEG, PNG, GIF, or WebP).`;
  }

  if (file.size > maxFileSize) {
    return `File size too large. Please select an image smaller than ${
      maxFileSize / (1024 * 1024)
    }MB.`;
  }

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const fileExtension = file.name
    .toLowerCase()
    .substring(file.name.lastIndexOf('.'));

  if (!allowedExtensions.includes(fileExtension)) {
    return `Invalid file extension. Please select a valid image file.`;
  }

  return null;
}
