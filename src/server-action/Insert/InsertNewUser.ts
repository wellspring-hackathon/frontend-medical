"use server";

import { db } from "@/db/connect";
import { user } from "@/db/schema";
import { type UserInsert } from "@/db/schema/user";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function insertCoreUser(data:UserInsert) {
  const {
    email,
    firstName,
    lastName,
    password,
    phone,
    licenseNo,
    role,
    specialization
  } = data;
  try {
    const hashedPassword = await hash(password, 10);
    const checkIfEmailExists = await db.query.user.findFirst({
      where: eq(user.email, email)
    });
    if (checkIfEmailExists) return { duplicate: true };
    await db
      .insert(user)
      .values({
        email,
        password: hashedPassword,

        firstName,
        lastName,
        licenseNo,
        phone,
        role,
        specialization
      })
      .returning();
    return { success: true };
  } catch (error: unknown) {
    console.error(error);
    return { error: true, errorMsg: "Error while registering" };
  }
}
