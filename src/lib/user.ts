import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

export default async function User() {
  const session = await getUser();
  return session?.user || null;
}
