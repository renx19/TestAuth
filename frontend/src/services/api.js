const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include', // include cookies
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await res.json().catch(() => ({}));

    // Handle 401 explicitly
    if (res.status === 401) {
      throw new Error(data.message || 'Unauthorized: Invalid credentials');
    }

    // Handle other errors
    if (!res.ok) {
      throw new Error(data.message || `API error: ${res.status}`);
    }

    return data;
  } catch (err) {
    // Network errors or JSON parsing errors
    throw new Error(err.message || 'Network error');
  }
}

export const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getProfile: () => request('/me'),
};
