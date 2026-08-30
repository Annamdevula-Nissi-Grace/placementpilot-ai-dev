import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  api,
  type AuthUser,
  type UserProfile,
} from '../services/api';

import { authStorage } from '../services/storage';

type AuthContextValue = {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  signup: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<string>;

  logout: () => void;

  refreshUser: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refreshUser() {
    const token =
      authStorage.getAccessToken();

    if (!token) {
      setUser(null);
      setProfile(null);
      return;
    }

    try {
      const response =
        await api.getCurrentUser();

      setUser(response.data.user);
      setProfile(response.data.profile);
    } catch (error) {
      api.logout();

      setUser(null);
      setProfile(null);

      throw error;
    }
  }

  async function login(
    email: string,
    password: string
  ) {
    const response =
      await api.login(email, password);

    if (!response.data.user) {
      throw new Error(
        'Login succeeded but no user was returned.'
      );
    }

    setUser(response.data.user);

    await refreshUser();
  }

  async function signup(
    fullName: string,
    email: string,
    password: string
  ) {
    const response =
      await api.signup(
        fullName,
        email,
        password
      );

    if (response.data.session) {
      authStorage.setSession(
        response.data.session.accessToken,
        response.data.session.refreshToken
      );

      await refreshUser();
    }

    return (
      response.message ||
      'Account created successfully.'
    );
  }

  function logout() {
    api.logout();

    setUser(null);
    setProfile(null);
  }

  useEffect(() => {
    let active = true;

    async function initializeAuth() {
      try {
        if (
          authStorage.getAccessToken()
        ) {
          const response =
            await api.getCurrentUser();

          if (!active) {
            return;
          }

          setUser(response.data.user);
          setProfile(
            response.data.profile
          );
        }
      } catch {
        api.logout();

        if (active) {
          setUser(null);
          setProfile(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    return () => {
      active = false;
    };
  }, []);

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider.'
    );
  }

  return context;
}