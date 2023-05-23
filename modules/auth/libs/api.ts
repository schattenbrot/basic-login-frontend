import { AuthUser } from '../models/loginResponse';

const serverURL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8080';

export const login = async (email: string, image: string, token: string) => {
  const response = await fetch(serverURL + '/login', {
    method: 'POST',
    body: JSON.stringify({ email, image, token }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = (await response.json()) as AuthUser;

  return data;
};
