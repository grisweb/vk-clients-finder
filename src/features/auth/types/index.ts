export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
