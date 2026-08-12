import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("Admin@2024!", 10);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@mastechcooling.com" },
    update: {},
    create: {
      email: "admin@mastechcooling.com",
      password: hashedPassword,
      name: "Christopher Andorful",
    },
  });

  console.log("✅ Admin créé:", admin.email);
  console.log("📧 Email: admin@mastechcooling.com");
  console.log("🔑 Mot de passe: Admin@2024!");
  console.log("\n⚠️  N'oubliez pas de changer le mot de passe après la première connexion!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
