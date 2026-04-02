import { API_URL, API_ENDPOINTS } from '../constants/config';
import { getToken } from '../utils/storage';

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized - clear auth and redirect
          window.dispatchEvent(new Event('unauthorized'));
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return response;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_URL);

// Properties API
export const propertiesApi = {
  getAll: (params = {}) => apiClient.get(API_ENDPOINTS.PROPERTIES, { params }),
  getById: (id) => apiClient.get(API_ENDPOINTS.PROPERTY(id)),
  create: (data) => apiClient.post(API_ENDPOINTS.PROPERTIES, data),
  update: (id, data) => apiClient.put(API_ENDPOINTS.PROPERTY(id), data),
  delete: (id) => apiClient.delete(API_ENDPOINTS.PROPERTY(id)),
  search: (query) => apiClient.get(API_ENDPOINTS.PROPERTIES, { params: { q: query } }),
};

// Auth API
export const authApi = {
  login: (email, password) => apiClient.post(API_ENDPOINTS.AUTH_LOGIN, { email, password }),
  register: (name, email, password) => apiClient.post(API_ENDPOINTS.AUTH_REGISTER, { name, email, password }),
  logout: () => apiClient.post(API_ENDPOINTS.AUTH_LOGOUT, {}),
  getCurrentUser: () => apiClient.get(API_ENDPOINTS.AUTH_ME),
};

// Favorites API
export const favoritesApi = {
  getAll: () => apiClient.get(API_ENDPOINTS.FAVORITES),
  add: (propertyId) => apiClient.post(`${API_ENDPOINTS.FAVORITES}/${propertyId}`, {}),
  remove: (propertyId) => apiClient.delete(`${API_ENDPOINTS.FAVORITES}/${propertyId}`),
};

// Upload API
export const uploadApi = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.request(API_ENDPOINTS.UPLOAD, {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type, browser will set it
    });
  },
};
