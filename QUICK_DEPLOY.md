# ⚡ Déploiement Rapide sur Vercel

Guide express pour déployer Mastech Cooling Technology sur Vercel en 10 minutes.

---

## 🚀 Étape 1 : Variables d'Environnement (2 min)

### Accéder aux Settings

```
https://vercel.com/plusdesavoir01-1645s-projects/mastechcoolingtech/settings/environment-variables
```

### Ajouter ces 3 variables (pour tous les environnements) :

#### 1. NEXTAUTH_SECRET

```bash
# Générer une clé :
openssl rand -base64 32

# Ou en ligne :
# https://generate-secret.vercel.app/32
```

**Nom** : `NEXTAUTH_SECRET`  
**Valeur** : `[votre-clé-générée]`  
**Environnements** : ✅ Production ✅ Preview ✅ Development

#### 2. NEXTAUTH_URL

**Nom** : `NEXTAUTH_URL`  
**Valeur** : `https://mastechcoolingtech.vercel.app`  
**Environnements** : ✅ Production ✅ Preview

> Changez `.vercel.app` par votre domaine custom plus tard

#### 3. DATABASE_URL (temporaire)

**Nom** : `DATABASE_URL`  
**Valeur** : `file:./dev.db`  
**Environnements** : ⚠️ Development uniquement

> On changera pour PostgreSQL après

---

## 🗄️ Étape 2 : Créer Vercel Postgres (3 min)

### 1. Créer le Store

```
https://vercel.com/plusdesavoir01-1645s-projects/mastechcoolingtech/stores
```

1. Cliquer **Create Database**
2. Choisir **Postgres**
3. Nom : `mastechcooling-db`
4. Région : `Frankfurt (fra1)`
5. Cliquer **Create**

### 2. Connecter au Projet

1. **Connect Project** → Sélectionner `mastechcoolingtech`
2. Les variables sont auto-ajoutées :
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

### 3. Supprimer DATABASE_URL

1. Retour dans **Environment Variables**
2. Supprimer `DATABASE_URL` (n'est plus nécessaire)

---

## 🖼️ Étape 3 : Créer Vercel Blob (2 min)

### Créer le Store

```
https://vercel.com/plusdesavoir01-1645s-projects/mastechcoolingtech/stores
```

1. Cliquer **Create Store**
2. Choisir **Blob**
3. Nom : `mastechcooling-images`
4. Région : `Frankfurt (fra1)`
5. Cliquer **Create**

### Connecter au Projet

1. **Connect Project** → `mastechcoolingtech`
2. La variable `BLOB_READ_WRITE_TOKEN` est auto-ajoutée

---

## 🔧 Étape 4 : Mettre à jour Prisma (1 min)

### Éditer `prisma/schema.prisma`

Remplacer :
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Par :
```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

### Commit et Push

```bash
git add prisma/schema.prisma
git commit -m "chore: switch to PostgreSQL for production"
git push
```

---

## 🚢 Étape 5 : Déployer (Auto)

Vercel déploie automatiquement après le push !

Suivre le déploiement :
```
https://vercel.com/plusdesavoir01-1645s-projects/mastechcoolingtech
```

---

## 🗃️ Étape 6 : Initialiser la Base (2 min)

### Attendre la fin du déploiement

Une fois **"Building"** → **"Ready"**, continuer.

### Exécuter les Migrations

```bash
# Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# Lier le projet
vercel link

# Pull les variables d'environnement
vercel env pull .env.production

# Migrer la base de données
npx prisma migrate deploy

# Créer l'admin
npx prisma db seed
```

**Credentials Admin** :
- Email : `admin@mastechcooling.com`
- Mot de passe : `Admin@2024!`

---

## ✅ Étape 7 : Tester

### Accéder au Panel Admin

```
https://mastechcoolingtech.vercel.app/admin/login
```

1. Se connecter avec les credentials ci-dessus
2. Vérifier que le dashboard s'affiche
3. Tester l'upload d'une image

**⚠️ IMPORTANT** : Changez le mot de passe après la première connexion !

---

## 🌍 Bonus : Ajouter un Domaine Custom

### 1. Ajouter le Domaine

```
https://vercel.com/plusdesavoir01-1645s-projects/mastechcoolingtech/settings/domains
```

1. Cliquer **Add**
2. Entrer : `mastechcooling.com`
3. Suivre les instructions DNS

### 2. Mettre à jour NEXTAUTH_URL

```
Settings > Environment Variables > NEXTAUTH_URL
```

Changer la valeur pour : `https://mastechcooling.com`

### 3. Redéployer

```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push
```

---

## 📊 Checklist Complète

- [ ] ✅ Variables d'environnement ajoutées
- [ ] ✅ Vercel Postgres créé et connecté
- [ ] ✅ Vercel Blob créé et connecté
- [ ] ✅ `prisma/schema.prisma` mis à jour
- [ ] ✅ Code pushé sur GitHub
- [ ] ✅ Déploiement réussi
- [ ] ✅ `prisma migrate deploy` exécuté
- [ ] ✅ `prisma db seed` exécuté
- [ ] ✅ Login admin testé
- [ ] ✅ Upload d'image testé
- [ ] ⬜ Mot de passe admin changé
- [ ] ⬜ Domaine custom configuré (optionnel)

---

## 🆘 Problèmes Courants

### Build Error: "NEXTAUTH_SECRET missing"

**Solution** : Vérifier que la variable est bien définie pour Production

### Database Connection Error

**Solution** : 
1. Vérifier que Vercel Postgres est bien connecté au projet
2. Vérifier que `POSTGRES_PRISMA_URL` existe dans les env vars
3. Redéployer

### Upload Error: "BLOB_READ_WRITE_TOKEN not found"

**Solution** :
1. Vérifier que Vercel Blob est bien connecté
2. Vérifier la variable d'environnement
3. Redéployer

### Admin Login Fails

**Solution** :
1. Vérifier que `prisma db seed` a été exécuté
2. Consulter les logs : `vercel logs`

---

## 📞 Support

- **Logs en temps réel** : `vercel logs --follow`
- **Documentation** : Voir `VERCEL_SETUP.md` pour le guide complet
- **Vérifier le système** : `node check-admin.js`

---

## 🎉 C'est Terminé !

Votre site Mastech Cooling Technology est maintenant déployé et fonctionnel sur Vercel avec :

✅ Panel admin complet  
✅ Upload d'images via Vercel Blob  
✅ Base de données PostgreSQL  
✅ SSL automatique  
✅ CI/CD automatique  

**Prochaines étapes** :
1. Changer le mot de passe admin
2. Ajouter du contenu via le panel admin
3. Configurer un domaine custom
4. Inviter d'autres administrateurs

---

**Temps total : ~10 minutes** ⚡

Bon déploiement ! 🚀
