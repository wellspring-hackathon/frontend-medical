import { NextResponse } from "next/server";
import { db } from "@/db/connect"; // your drizzle setup
import { doctor, healthcareProviders } from "@/db/schema"; // adjust as needed
import { ilike } from "drizzle-orm";

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) return NextResponse.json({ results: [] });

  const doctorResults = await db
    .select()
    .from(doctor)
    .where(ilike(doctor.name, `%${query}%`));

  const providerResults = await db
    .select()
    .from(healthcareProviders)
    .where(ilike(healthcareProviders.name, `%${query}%`));

  const results = [
    ...doctorResults.map((r) => ({ ...r, type: "doctor" })),
    ...providerResults.map((r) => ({ ...r, type: "provider" })),
  ];

  return NextResponse.json({ results });
}
