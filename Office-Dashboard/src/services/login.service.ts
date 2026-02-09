import { LOGIN } from "../constants/urls";

export interface LoginData {
  username: string;
  password: string;
}

export interface CustomJwtPayload {
  sub: string;
  role_id: string;
  role: string;
  type: string;
  exp: number;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  [key: string]: any;
}

export const LoginServices = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch(LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result: LoginResponse & { detail?: string } = await response.json();

  if (!response.ok) throw new Error(result.detail || "Login failed");

  return result;
};
