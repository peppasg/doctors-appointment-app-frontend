import type { LoginFields, LoginResponse } from "../types/auth";
import type { CreateUserFields } from "@/schemas/user";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001");

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}

export async function signup(userData: CreateUserFields): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function login({ username, password }: LoginFields): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username: username.trim(), password }),
  });
}
