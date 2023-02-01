import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { login } from '../../../modules/auth/libs/api';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }: any) => {
      if (account) {
        const res = await login(user.email, user.image, account.access_token);
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
