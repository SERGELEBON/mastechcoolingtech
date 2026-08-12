#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const db = new PrismaClient();

async function checkAdmin() {
  console.log('\n🔍 VÉRIFICATION DU SYSTÈME ADMIN\n');
  console.log('═══════════════════════════════════════\n');

  // 1. Check env variables
  console.log('1️⃣  Variables d\'environnement:');
  console.log('   DATABASE_URL:', process.env.DATABASE_URL ? '✅' : '❌ MANQUANT');
  console.log('   NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅' : '❌ MANQUANT');
  console.log('   NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Non défini');
  console.log('');

  // 2. Check database connection
  console.log('2️⃣  Connexion à la base de données:');
  try {
    await db.$connect();
    console.log('   ✅ Connecté\n');
  } catch (error) {
    console.log('   ❌ Erreur:', error.message, '\n');
    await db.$disconnect();
    return;
  }

  // 3. Check admin user
  console.log('3️⃣  Utilisateur admin:');
  try {
    const admin = await db.admin.findUnique({
      where: { email: 'admin@mastechcooling.com' }
    });

    if (!admin) {
      console.log('   ❌ Admin non trouvé');
      console.log('   💡 Exécutez: npm run db:seed\n');
      await db.$disconnect();
      return;
    }

    console.log('   ✅ Email:', admin.email);
    console.log('   ✅ Nom:', admin.name);
    console.log('   ✅ Créé le:', new Date(admin.createdAt).toLocaleString('fr-FR'));
    console.log('');

    // 4. Test password
    console.log('4️⃣  Test du mot de passe "Admin@2024!":');
    const isValid = await bcrypt.compare('Admin@2024!', admin.password);
    console.log('   ', isValid ? '✅ VALIDE' : '❌ INVALIDE');
    console.log('');

    // 5. Summary
    console.log('═══════════════════════════════════════\n');
    if (isValid) {
      console.log('✅ TOUT EST OK - Le système est prêt!\n');
      console.log('📝 Pour vous connecter:');
      console.log('   URL: http://localhost:3000/admin/login');
      console.log('   Email: admin@mastechcooling.com');
      console.log('   Password: Admin@2024!\n');
      console.log('⚠️  REDÉMARREZ LE SERVEUR pour appliquer les changements:\n');
      console.log('   1. Ctrl+C pour arrêter');
      console.log('   2. npm run dev pour redémarrer\n');
    } else {
      console.log('❌ PROBLÈME DÉTECTÉ\n');
      console.log('💡 Solution: Recréer l\'admin:\n');
      console.log('   npm run db:seed\n');
    }

  } catch (error) {
    console.log('   ❌ Erreur:', error.message, '\n');
  } finally {
    await db.$disconnect();
  }
}

checkAdmin().catch(console.error);
