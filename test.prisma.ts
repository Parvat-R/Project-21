import { PrismaClient, Prisma } from "./app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});



export async function main() {
    const usr=await prisma.user.findMany();
   console.log(usr);
}

main();