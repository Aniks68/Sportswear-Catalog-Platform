import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase"; // ✅ use existing instance

// Validate image file
export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
  }

  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }

  return true;
};

// Upload single image
export const uploadImage = async (
  file: File,
  productId: string
): Promise<string> => {
  validateImageFile(file);

  const filePath = `products/${productId}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, filePath);

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
};

// Upload multiple images
export const uploadMultipleImages = async (
  files: FileList | File[],
  productId: string
): Promise<string[]> => {
  const filesArray = Array.from(files);

  return await Promise.all(
    filesArray.map(file => uploadImage(file, productId))
  );
};

// Convert Firebase download URL → storage path
const getPathFromUrl = (url: string): string => {
  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
  const path = url.replace(baseUrl, "");

  const parts = path.split("/o/");
  if (parts.length < 2) throw new Error("Invalid Firebase URL");

  const encodedPath = parts[1].split("?")[0];

  return decodeURIComponent(encodedPath);
};

// Delete multiple images from storage
export const deleteMultipleImages = async (urls: string[]) => {
  const deletePromises = urls.map(url => {
    const filePath = getPathFromUrl(url);
    const fileRef = ref(storage, filePath);
    return deleteObject(fileRef);
  });

  await Promise.all(deletePromises);
};