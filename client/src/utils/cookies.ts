import Cookies from "js-cookie";
import { UserDetails } from "@/types/userDetails";
import { decodeJWT } from "./decodejwt";

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

// Get cookie
export function getTokenFromCookies(): UserTokenData | null {
  const cookie = Cookies.get("smartfolio-DBMTJLFB");
  if (!cookie) return null;
  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
}

// Get decoded JWT
export function getUserFromCookies(): UserDetails | null {
  const tokenData = getTokenFromCookies();
  if (!tokenData?.token) return null;
  try {
    return decodeJWT(tokenData.token);
  } catch {
    return null;
  }
}

// Clear cookie
export function clearCookies() {
  Cookies.remove("smartfolio-DBMTJLFB");
}
