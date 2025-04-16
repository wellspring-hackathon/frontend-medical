import NextAuth, { type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "@/db/connect";
import { user } from "@/db/schema";

export const {
  auth,
  handlers: { GET, POST }
} = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials1 At Lag");
        }

        try {
          const existingUser = await db
            .selectDistinct()
            .from(user)
            .where(eq(user.email, credentials?.email as string));

          // console.log("hahahahahah  ", existingUsersssss);
          if (existingUser.length < 1) {
            throw new Error("Invalid credentials");
          }

          if (existingUser[0].password !== credentials?.password) {
            throw new Error("Password Incorrect");
          }

          const userInfo: User = {
            id: existingUser[0].id,
            email: existingUser[0].email,
            name: existingUser[0].firstName + " " + existingUser[0].lastName
          };
          return userInfo;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.log(error);
          throw new Error("Invalid credentials");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
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
          randomKey: u.randomKey
        };
      }
      return token;
    }
  },
  pages: { signIn: "/login", error: "/login" }
});
