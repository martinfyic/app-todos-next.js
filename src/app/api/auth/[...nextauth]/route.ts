import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? '' },
      });
      if (dbUser?.isActive === false) {
        throw new Error('Usuario no activo');
      }
      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';
      token.isActive = dbUser?.isActive;
      return token;
    },

    async session({ session, token }) {
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
        session.user.isActive = token.isActive;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
