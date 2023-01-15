export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type AuthUser = {
  id: string;
  accessToken: string;
  exp: number;
  roles: string[];
};

type LoginResponse = AuthUser & ErrorResponse;

export default LoginResponse;
