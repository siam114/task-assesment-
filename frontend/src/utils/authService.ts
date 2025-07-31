import { AuthUser } from '@/types/auth';

  const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const authService = {
  async login(email: string, password: string): Promise<Omit<AuthUser, 'token'>> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include', // ensures cookie is set
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
    return await res.json();
  },

  async register(name: string, email: string, password: string): Promise<Omit<AuthUser, 'token'>> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error((await res.json()).message || 'Register failed');
    return await res.json();
  },

  async logout(): Promise<void> {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  },

  async getMe(): Promise<Omit<AuthUser, 'token'> | null> {
    const res = await fetch(`${BASE_URL}/user/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error('Failed to fetch user');
    return await res.json();
  }
};
