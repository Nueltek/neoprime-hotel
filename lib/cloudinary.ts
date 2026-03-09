import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
}

export async function uploadImage(
  base64Image: string,
  folder: string = 'neoprime'
): Promise<UploadResult> {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: `neoprime/${folder}`,
      transformation: [
        { quality: 'auto:best' },
        { fetch_format: 'auto' },
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
}

export async function uploadMultipleImages(
  images: string[],
  folder: string = 'neoprime'
): Promise<UploadResult[]> {
  const uploadPromises = images.map((image) => uploadImage(image, folder));
  return Promise.all(uploadPromises);
}

export default cloudinary;
