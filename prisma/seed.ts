import prisma from "../src/lib/prisma";

export async function main() {
  console.log( await prisma.user.findMany() )
}

main();
