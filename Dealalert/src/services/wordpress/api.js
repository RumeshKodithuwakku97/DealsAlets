import WordPressAuth from './auth';

const WP_BASE_URL = process.env.REACT_APP_WP_BASE_URL;

class WordPressAPI {
  static async request(endpoint, options = {}) {
    const url = `${WP_BASE_URL}${endpoint}`;
    const authHeaders = WordPressAuth.getAuthHeaders();
    
    const config = {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        WordPressAuth.logout();
        window.location.href = '/admin/login';
        throw new Error('Authentication expired. Please login again.');
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async get(endpoint) {
    return this.request(endpoint);
  }

  static async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export default WordPressAPI;