import {
  jobs,
  dsaProblems,
  skills,
  roadmap,
} from '../data/data';

import { authStorage } from './storage';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type AuthUser = {
  id: string;
  email?: string;
};

export type UserProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  college: string | null;
  target_role: string | null;
  graduation_date: string | null;
  location: string | null;
  career_summary: string | null;
  avatar_url: string | null;
  profile_completion: number;
  created_at: string;
  updated_at: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number;
};

export type AuthResult = {
  user: AuthUser | null;
  session: AuthSession | null;
};

export type CurrentUserResult = {
  user: AuthUser;
  profile: UserProfile;
};

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  let body: ApiResponse<T>;

  try {
    body = await response.json();
  } catch {
    throw new Error(
      `Server returned an invalid response (${response.status}).`
    );
  }

  if (!response.ok || !body.success) {
    throw new Error(
      body.message || `Request failed (${response.status}).`
    );
  }

  return body;
}

export const api = {
  async signup(
    fullName: string,
    email: string,
    password: string
  ) {
    return request<AuthResult>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });
  },

  async login(email: string, password: string) {
    const response = await request<AuthResult>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (response.data.session) {
      authStorage.setSession(
        response.data.session.accessToken,
        response.data.session.refreshToken
      );
    }

    return response;
  },

  async getCurrentUser() {
    const token = authStorage.getAccessToken();

    if (!token) {
      throw new Error('You are not signed in.');
    }

    return request<CurrentUserResult>('/api/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  logout() {
    authStorage.clearSession();
  },

  isAuthenticated() {
    return authStorage.hasSession();
  },

  /*
   * Existing frontend demo APIs are preserved for now.
   * We will replace these with real backend APIs
   * feature-by-feature.
   */

  async getDashboard() {
    return {
      readiness: 72,
      dsa: 64,
      technical: 78,
      interview: 58,
    };
  },

  async getSkills() {
    return skills;
  },

  async getRoadmap() {
    return roadmap;
  },

  async getDSA() {
    return dsaProblems;
  },

  async getJobs() {
    return jobs;
  },

  async getCompanyPrep(company: string) {
    return {
      company,
      readiness: 78,
    };
  },
};