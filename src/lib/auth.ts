import NextAuth from "next-auth";
import { validateCredentials } from "@/utils/CredentialsValidate";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  type User = {
    role: "admin" | "doctor" | "patient";
  }
}

export const {
  auth,
  handlers: { GET, POST }
} = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: validateCredentials
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 // 30 days
      }
    }
  },
  callbacks: {
    // @ts-expect-error jjj
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email,
          id: token.id,
          role: token.role,
          randomKey: token.randomKey
        }
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          role: u.role,
          email: u.email,
          randomKey: u.randomKey
        };
      }
      return token;
    }
  },
  pages: { signIn: "/login", error: "/login" }
});
