export interface User {
  id: string;
  name: string;
  email: string;
  vk_access_token: string;
}

export interface AuthState {
  token: string | null;
  vk_token: string | null;
}

export interface LoginResponse {
  user: User;
  access_token: string;
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
