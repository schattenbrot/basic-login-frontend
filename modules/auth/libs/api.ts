import { AuthUser } from '../models/loginResponse';

const serverURL = 'http://localhost:8080';

export const login = async (email: string, image: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/login', {
    method: 'POST',
    body: JSON.stringify({ email, image }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = (await response.json()) as AuthUser;

  return data;
};
