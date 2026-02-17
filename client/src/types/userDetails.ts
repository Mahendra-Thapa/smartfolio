export interface UserDetails {
  exp: number;
  iat: number;
  id: string;
  sub: string;
  userType: string;
  roles: string[];
}
