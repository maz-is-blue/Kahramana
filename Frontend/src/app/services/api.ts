const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('kahramana-token');

const h = (isJson = true) => {
  const headers: Record<string, string> = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const handle = async (res: Response) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const authAPI = {
  login: (email: string, password: string) =>
    fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: h(), body: JSON.stringify({ email, password }) }).then(handle),
  register: (name: string, email: string, password: string) =>
    fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: h(), body: JSON.stringify({ name, email, password }) }).then(handle),
  getMe: () => fetch(`${BASE_URL}/auth/me`, { headers: h() }).then(handle),
  updateProfile: (data: object) =>
    fetch(`${BASE_URL}/auth/profile`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }).then(handle),
};

export const productsAPI = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetch(`${BASE_URL}/products${q}`).then(handle);
  },
  getById: (id: string) => fetch(`${BASE_URL}/products/${id}`).then(handle),
  create: (data: object) =>
    fetch(`${BASE_URL}/products`, { method: 'POST', headers: h(), body: JSON.stringify(data) }).then(handle),
  update: (id: string, data: object) =>
    fetch(`${BASE_URL}/products/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }).then(handle),
  delete: (id: string) =>
    fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE', headers: h() }).then(handle),
};

export const ordersAPI = {
  create: (data: object) =>
    fetch(`${BASE_URL}/orders`, { method: 'POST', headers: h(), body: JSON.stringify(data) }).then(handle),
  getMyOrders: () => fetch(`${BASE_URL}/orders/my`, { headers: h() }).then(handle),
  getAll: () => fetch(`${BASE_URL}/orders`, { headers: h() }).then(handle),
  updateStatus: (id: string, status: string, trackingNumber?: string) =>
    fetch(`${BASE_URL}/orders/${id}/status`, { method: 'PUT', headers: h(), body: JSON.stringify({ status, trackingNumber }) }).then(handle),
};

export const wishlistAPI = {
  get: () => fetch(`${BASE_URL}/wishlist`, { headers: h() }).then(handle),
  toggle: (productId: string) =>
    fetch(`${BASE_URL}/wishlist/${productId}`, { method: 'POST', headers: h() }).then(handle),
};

export const reviewsAPI = {
  getByProduct: (productId: string) => fetch(`${BASE_URL}/reviews/${productId}`).then(handle),
  create: (productId: string, data: { rating: number; text: string }) =>
    fetch(`${BASE_URL}/reviews/${productId}`, { method: 'POST', headers: h(), body: JSON.stringify(data) }).then(handle),
};

export const uploadAPI = {
  uploadImages: (files: File[]) => {
    const formData = new FormData();
    files.forEach((f) => formData.append('images', f));
    return fetch(`${BASE_URL}/upload`, { method: 'POST', headers: h(false), body: formData }).then(handle);
  },
};
