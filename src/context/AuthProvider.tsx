import type { LoginFields } from "@/schemas/auth";
import type { LoginResponse } from "@/types/auth";
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookies";
import { login } from "@/api/auth";

type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  username: string | null;
  loginUser: (fields: LoginFields) => Promise<LoginResponse>;
  logoutUser: () => void;
};

type JwtPayload = {
  username?: string;
  email?: string;
  
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);



function readUsernameFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token).username ?? null;
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const cookieAccessToken = getCookie("access_token");

  const [accessToken, setAccessToken] = useState<string | null>(() => cookieAccessToken ?? null);
  const [username, setUsername] = useState<string | null>(
    () => readUsernameFromToken(cookieAccessToken ?? null) ?? localStorage.getItem("currentUser"),
  );

  const loginUser = async (fields: LoginFields) => {
    const res = await login(fields);
    localStorage.setItem("currentUser", fields.username.trim());
    setCookie("access_token", res.access_token, {
      expires: 1,
      SameSite: "Lax",
      secure: false,
      path: "/",
    });
    setAccessToken(res.access_token);
    setUsername(readUsernameFromToken(res.access_token) ?? fields.username.trim());
    localStorage.setItem("role", res.role);
    return res;
  };

  const logoutUser = () => {
    deleteCookie("access_token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    setAccessToken(null);
    setUsername(null);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated: !!accessToken,
          accessToken,
          username,
          loginUser,
          logoutUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export function useAuth() { 
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
