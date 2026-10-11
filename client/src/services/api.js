/**
 * Centralized API Service for Client
 * Points to backend via environment variable (import.meta.env.VITE_API_URL)
 * or defaults to http://localhost:5000/api
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Custom error class for API responses
 */
export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Universal request wrapper with header formatting, auth token injection, and error handling.
 */
async function request(endpoint, options = {}) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${path}`;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  const token = localStorage.getItem('token');
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const startTime = performance.now();
    const response = await fetch(url, config);
    const duration = Math.round(performance.now() - startTime);

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage =
        (typeof data === 'object' && data?.message) ||
        `HTTP Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return {
      data,
      status: response.status,
      duration,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network request failed', 0, null);
  }
}

/**
 * REST API client instance
 */
export const api = {
  baseUrl: BASE_URL,

  async get(endpoint, options = {}) {
    const res = await request(endpoint, { ...options, method: 'GET' });
    return res.data;
  },

  async post(endpoint, body, options = {}) {
    const res = await request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
    return res.data;
  },

  async put(endpoint, body, options = {}) {
    const res = await request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return res.data;
  },

  async patch(endpoint, body, options = {}) {
    const res = await request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    return res.data;
  },

  async delete(endpoint, options = {}) {
    const res = await request(endpoint, { ...options, method: 'DELETE' });
    return res.data;
  },

  // Raw request with timing metadata
  raw: request,
};

/**
 * Domain-specific services
 */
export const statusService = {
  async getStatus() {
    return api.get('/status');
  },
  async getHealth() {
    // Health endpoint lives directly at root /health on port 5000
    const rawRes = await api.raw('/status');
    return rawRes.data;
  },
};

export default api;
