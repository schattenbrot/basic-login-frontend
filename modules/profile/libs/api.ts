import { User } from '../../../models/user';

const serverURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;

export const getOwnUser = async (authToken: string) => {
  const res = await fetch(serverURL + '/own', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });

  if (!res.ok) {
    const error = (await res.json()).message as string;
    return error;
  }

  const user = (await res.json()) as User;

  return user;
};
