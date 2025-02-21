import { toast } from 'react-hot-toast';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
  error?: string;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate API response
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        const response = {
          success: true,
          token: 'sample_token_123',
          user: {
            id: '1',
            username: credentials.username,
            role: 'admin'
          }
        };

        this.saveSession(response);
        return response;
      }

      return {
        success: false,
        error: 'Credenciales inválidas'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Error al intentar iniciar sesión'
      };
    }
  },

  async logout(): Promise<void> {
    try {
      // TODO: Replace with actual API call if needed
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear session data
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(';').forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });

      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error al cerrar sesión');
    }
  },

  saveSession(response: AuthResponse): void {
    if (response.token) {
      localStorage.setItem(TOKEN_KEY, response.token);
    }
    if (response.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): any | null {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.clear();
  }
};