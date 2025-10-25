const WP_BASE_URL = process.env.REACT_APP_WP_BASE_URL;

class WordPressAuth {
  static async login(username, password) {
    const response = await fetch(`${WP_BASE_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed. Check your WordPress credentials.');
    }

    const data = await response.json();
    
    localStorage.setItem('wp_token', data.token);
    localStorage.setItem('wp_user', JSON.stringify({
      username: data.user_nicename,
      displayName: data.user_display_name,
      email: data.user_email,
    }));

    return data;
  }

  static getToken() {
    return localStorage.getItem('wp_token');
  }

  static getCurrentUser() {
    const user = localStorage.getItem('wp_user');
    return user ? JSON.parse(user) : null;
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static logout() {
    localStorage.removeItem('wp_token');
    localStorage.removeItem('wp_user');
  }

  static getAuthHeaders() {
    const token = this.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}

export default WordPressAuth;