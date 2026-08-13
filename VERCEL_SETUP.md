# 🚀 Configuration Vercel Postgres

Ce guide vous explique comment configurer PostgreSQL pour votre projet Mastech Cooling Technology sur Vercel.

## ✅ Migrations déjà effectuées

Le code a déjà été migré de SQLite vers PostgreSQL :
- ✅ Schéma Prisma mis à jour
- ✅ Dépendances PostgreSQL installées (`pg`, `@prisma/client`)
- ✅ Script de seed créé pour le compte admin

## 📋 Étapes à suivre sur Vercel Dashboard

### 1. Créer la base de données Postgres

1. Allez sur https://vercel.com/plusdesavoir01-1645s-projects/mastechcoolingtech
2. Cliquez sur l'onglet **Storage** dans le menu
3. Cliquez sur **Create Database**
4. Sélectionnez **Postgres** (powered by Neon)
5. Donnez un nom à votre base : `mastech-db` (ou autre)
6. Sélectionnez la région : **Washington, D.C., USA (us-east-1)** (plus proche des utilisateurs)
7. Cliquez sur **Create**

### 2. Connecter la base au projet

Vercel va automatiquement créer et ajouter ces variables d'environnement :
- `POSTGRES_URL` - URL complète de connexion
- `POSTGRES_PRISMA_URL` - URL optimisée pour Prisma (pooling)
- `POSTGRES_URL_NON_POOLING` - URL directe (pour migrations)

**Important** : Vous devez renommer ces variables pour correspondre à votre code :

1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez ces variables **manuellement** :
   - `DATABASE_URL` = copiez la valeur de `POSTGRES_PRISMA_URL`
   - `DIRECT_URL` = copiez la valeur de `POSTGRES_URL_NON_POOLING`

### 3. Configurer NextAuth

Ajoutez également ces variables d'environnement :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `NEXTAUTH_URL` | `https://mastechcoolingtech.vercel.app` | Production |
| `NEXTAUTH_SECRET` | (gardez la valeur actuelle ou générez-en une nouvelle) | Production, Preview |

Pour générer un nouveau secret :
```bash
openssl rand -base64 32
```

### 4. Déployer et exécuter les migrations

Maintenant que les variables sont configurées :

1. **Option A : Redéployer via Git**
   ```bash
   git add .
   git commit -m "feat: migrate to PostgreSQL"
   git push
   ```

2. **Option B : Redéployer via CLI**
   ```bash
   vercel --prod
   ```

### 5. Créer le compte admin

Une fois le déploiement terminé, vous devez initialiser la base de données :

**Via CLI local (recommandé) :**
```bash
# Télécharger les variables d'environnement
vercel env pull .env.local

# Appliquer le schéma
npm run db:push

# Créer le compte admin
npm run db:seed
```

**Identifiants admin par défaut :**
- Email : `admin@mastechcooling.com`
- Mot de passe : `Admin@2024!`

⚠️ **IMPORTANT** : Changez ce mot de passe après votre première connexion !

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. Allez sur https://mastechcoolingtech.vercel.app/admin/login
2. Connectez-vous avec les identifiants ci-dessus
3. Si la connexion réussit ✅ → La base de données fonctionne !
4. Si vous obtenez une erreur 401 ❌ → Vérifiez que :
   - Les variables `DATABASE_URL` et `DIRECT_URL` sont correctes
   - Le seed a bien été exécuté
   - La base de données est active

## 🆘 Dépannage

### Erreur 401 lors de la connexion
→ La base de données est vide, exécutez le seed

### "Invalid `prisma.admin.findUnique()`"
→ Les variables d'environnement ne sont pas correctes sur Vercel

### "Can't reach database server"
→ Vérifiez que `DATABASE_URL` contient bien `?sslmode=require`
