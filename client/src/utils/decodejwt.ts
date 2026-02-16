import jwt from "jwt-decode";

export interface DecodedToken {
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}

export function decodeJWT(token: string): DecodedToken {
  // Use the default property for CJS build
  return (jwt as any)(token) as DecodedToken;
}
