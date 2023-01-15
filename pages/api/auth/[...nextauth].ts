import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { login } from '../../../modules/auth/libs/api';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        '1068699111610-kroiklkv0iu4irn98hi4kvh39lc6p0dd.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }: any) => {
      if (account) {
        const res = await login(user.email, user.image);
        token.accessToken = res.accessToken;
        token.id = res.id;
        token.roles = res.roles;
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.id = token.id;
        session.roles = token.roles;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
