import WordPressAuth from './auth';

const WP_BASE_URL = process.env.REACT_APP_WP_BASE_URL;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const token = WordPressAuth.getToken();
  
  const response = await fetch(`${WP_BASE_URL}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  return await response.json();
};

export const getMedia = async (mediaId) => {
  const response = await fetch(`${WP_BASE_URL}/wp-json/wp/v2/media/${mediaId}`);
  return await response.json();
};

export default {
  uploadImage,
  getMedia
};