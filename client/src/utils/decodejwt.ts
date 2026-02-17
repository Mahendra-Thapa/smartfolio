import { jwtDecode } from "jwt-decode";
import { UserDetails } from "@/types/userDetails";

export const decodeJwt = (token: string): UserDetails => {
  return jwtDecode<UserDetails>(token);
};
