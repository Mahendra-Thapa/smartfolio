import Cookies from "js-cookie";
import { UserDetails } from "@/types/userDetails";
import { decodeJwt } from "./decodejwt"; // ✅ FIXED NAME

export interface UserTokenData {
  token: string;
  email: string;
  role: string;
}

// Set cookie
export function setUserCookie(data: UserTokenData) {
  Cookies.set("smartfolio-DBMTJLFB", JSON.stringify(data), {
    expires: 1 / 3, // 8 hours
    secure: window.location.protocol === "https:",
    sameSite: "lax",
  });
}

// Get raw token data
export function getTokenFromCookies(): UserTokenData | null {
  const cookie = Cookies.get("smartfolio-DBMTJLFB");
  if (!cookie) return null;

  try {
    return JSON.parse(cookie) as UserTokenData;
  } catch {
    return null;
  }
}

// Decode JWT safely
export function getUserFromCookies(): UserDetails | null {
  const tokenData = getTokenFromCookies();
  if (!tokenData?.token) return null;

  try {
    return decodeJwt(tokenData.token);
  } catch {
    return null;
  }
}

// Clear cookie
export function clearCookies() {
  Cookies.remove("smartfolio-DBMTJLFB");
}
