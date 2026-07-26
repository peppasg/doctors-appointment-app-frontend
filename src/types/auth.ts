export interface LoginFields {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    access_token: string;
    token_type: string;
    role: "patient";
  }