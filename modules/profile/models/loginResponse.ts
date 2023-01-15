export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type AuthUser = {
  id: string;
  token: string;
  exp: number;
  roles: string[];
};

type LoginResponse = AuthUser & ErrorResponse;

export default LoginResponse;
