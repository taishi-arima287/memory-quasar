import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { createId } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const userId = createId();
  const spaceId = createId();

  await prisma.space.upsert({
    where: { id: spaceId },
    update: {},
    create: {
      id: spaceId,
      name: "Admin Space",
      ownerId: userId,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      id: userId,
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
      spaceId: spaceId,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
