import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { fetcher } from "@memory-quasar/shared/utils/repository/fetcher";
import { LoginRequest, LoginResponse } from "@memory-quasar/shared/utils/repository/login/type";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetcher<LoginResponse, LoginRequest>({
            uri: "/auth/login",
            method: "POST",
            body: credentials,
          });

          const data = res.data;

          if (res.ok && data?.access_token && data?.user) {
            const cookieStore = await cookies();
            cookieStore.set("access_token", data.access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
              maxAge: 24 * 60 * 60,
            });

            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              spaceId: data.user.spaceId,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.spaceId = user.spaceId;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.spaceId = token.spaceId as string | undefined;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
