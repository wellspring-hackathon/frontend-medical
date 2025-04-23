import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { user } from "@/db/schema";
import { db } from "@/db/connect";

export const validateCredentials = async (
  credentials: Record<string, unknown>
) => {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and password are required");
  }

  try {
    const userInfo = await db
      .select()
      .from(user)
      .where(eq(user.email, credentials.email as string))
      .limit(1);
    if (userInfo.length === 0) {
      throw new Error("Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(
      credentials.password as string,
      userInfo[0].password
    );
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    return {
      id: userInfo[0].id.toString(),
      email: userInfo[0].email,
      role: userInfo[0].role
    };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication failed");
  }
};
