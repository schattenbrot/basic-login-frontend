import { AuthUser } from '../models/loginResponse';

export const saveAuthUserToLocalStorage = (authUser: AuthUser) => {
  localStorage.setItem('authUser', JSON.stringify(authUser));
  localStorage.setItem('id', authUser.id);
  localStorage.setItem('token', authUser.accessToken);
  localStorage.setItem('exp', authUser.exp.toString());
  localStorage.setItem('roles', JSON.stringify(authUser.roles));
};

export const clearAuthUserFromLocalStorage = () => {
  localStorage.removeItem('authUser');
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  localStorage.removeItem('exp');
  localStorage.removeItem('roles');
};
