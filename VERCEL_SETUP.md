# 🚀 Configuration Vercel - Mastech Cooling Technology

Guide complet pour déployer et configurer le projet sur Vercel.

## 📋 Prérequis

- Compte Vercel : https://vercel.com
- Projet GitHub lié
- Accès au dashboard Vercel

---

## 🔧 Configuration des Variables d'Environnement

### 1. Accéder aux Variables d'Environnement

```
https://vercel.com/plusdesavoir01-1645s-projects/mastechcoolingtech/settings/environment-variables
```

### 2. Variables Requises

#### **Production, Preview & Development**

```env
# Database (PostgreSQL recommandé pour la production)
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="https://mastechcooling.com"
NEXTAUTH_SECRET="votre-cle-secrete-de-32-caracteres-minimum"

# Vercel Blob (automatiquement ajouté via le store)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxx"
```

---

## 🗄️ Configuration de la Base de Données

### Option 1 : Vercel Postgres (Recommandé)

1. **Créer une base Postgres** :
   ```
   Dashboard > Storage > Create Database > Postgres
   ```

2. **Nom** : `mastechcooling-db`

3. **Région** : Choisir la plus proche du Ghana (ex: `fra1` - Frankfurt)

4. **Les variables d'environnement sont auto-ajoutées** :
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

5. **Mettre à jour `prisma/schema.prisma`** :
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("POSTGRES_PRISMA_URL")
     directUrl = env("POSTGRES_URL_NON_POOLING")
   }
   ```

6. **Exécuter les migrations** :
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Option 2 : Neon (Alternative gratuite)

1. Créer un compte sur https://neon.tech
2. Créer une base de données
3. Copier la connection string
4. Ajouter `DATABASE_URL` dans Vercel

---

## 🖼️ Configuration Vercel Blob (Upload d'Images)

### 1. Créer un Blob Store

```
Dashboard > Storage > Create Store > Blob
```

**Configuration** :
- **Nom** : `mastechcooling-images`
- **Région** : `fra1` (Frankfurt - proche du Ghana)

### 2. Variables Automatiques

Vercel ajoute automatiquement :
- `BLOB_READ_WRITE_TOKEN`

### 3. Test Local (Optionnel)

Pour tester l'upload en local :

```bash
# Installer Vercel CLI
npm i -g vercel

# Lier le projet
vercel link

# Télécharger les variables d'environnement
vercel env pull .env.local

# Redémarrer le serveur
npm run dev
```

---

## 🔐 Génération du NEXTAUTH_SECRET

### Méthode 1 : OpenSSL
```bash
openssl rand -base64 32
```

### Méthode 2 : Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Méthode 3 : En ligne
https://generate-secret.vercel.app/32

**⚠️ Utilisez une clé différente pour chaque environnement !**

---

## 📦 Déploiement

### 1. Premier Déploiement

```bash
# Connecter le projet
vercel

# Déployer en production
vercel --prod
```

### 2. Configuration Build

Vercel détecte automatiquement Next.js. Si besoin de personnalisation :

**Build Command** : `npm run build`  
**Output Directory** : `.next`  
**Install Command** : `npm install`  
**Development Command** : `npm run dev`

### 3. Post-Déploiement

Après le premier déploiement :

1. **Migrer la base de données** :
   ```bash
   vercel env pull .env.production
   npx prisma migrate deploy
   ```

2. **Créer l'admin** :
   ```bash
   npx prisma db seed
   ```

3. **Tester le login** :
   ```
   https://mastechcooling.com/admin/login
   ```

---

## 🌍 Configuration du Domaine

### 1. Domaine Custom

```
Settings > Domains > Add Domain
```

Ajouter : `mastechcooling.com`

### 2. DNS

Configurer chez votre registrar :

**Type A** :
```
@ → 76.76.21.21
```

**Type CNAME** :
```
www → cname.vercel-dns.com
```

### 3. Mettre à jour NEXTAUTH_URL

```env
NEXTAUTH_URL="https://mastechcooling.com"
```

---

## 🔄 CI/CD Automatique

Vercel déploie automatiquement :

- **Production** : Push sur `main`
- **Preview** : Pull Requests
- **Branch Deploys** : Push sur autres branches

### Désactiver Auto-Deploy (si nécessaire)

```
Settings > Git > Production Branch
→ Décocher "Automatic Deployments"
```

---

## 📊 Monitoring & Analytics

### 1. Activer Vercel Analytics

```
Analytics > Enable Analytics
```

### 2. Activer Speed Insights

```
Speed Insights > Enable
```

Ajouter au code (déjà inclus) :
```tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Dans layout.tsx
<Analytics />
<SpeedInsights />
```

---

## 🛡️ Sécurité

### 1. Firewall (Optionnel - Pro plan)

```
Security > Firewall
```

Configurer :
- Rate Limiting
- IP Blocking
- DDoS Protection

### 2. Protection des Routes Admin

Déjà configuré via NextAuth middleware.

### 3. HTTPS

Automatique avec Vercel (certificats SSL gratuits).

---

## 🧪 Environnements

### Production
- URL : https://mastechcooling.com
- Base de données de production
- Logs : Dashboard > Logs

### Preview
- URL auto-générée pour chaque PR
- Base de données de preview (ou partagée)
- Tester avant merge

### Development
- Local : http://localhost:3000
- Base SQLite locale

---

## 📝 Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] `NEXTAUTH_SECRET` généré et ajouté
- [ ] Base de données créée (Vercel Postgres / Neon)
- [ ] Vercel Blob store créé
- [ ] `prisma/schema.prisma` mis à jour (PostgreSQL)
- [ ] Migrations exécutées (`prisma migrate deploy`)
- [ ] Admin créé (`prisma db seed`)
- [ ] Domaine custom configuré
- [ ] DNS pointé vers Vercel
- [ ] `NEXTAUTH_URL` mis à jour
- [ ] Test du login admin
- [ ] Test de l'upload d'images
- [ ] Analytics activées
- [ ] Monitoring configuré

---

## 🆘 Dépannage

### Build Errors

**Erreur** : `Type error: ...`

**Solution** :
```bash
# Localement
npm run build

# Fixer les erreurs TypeScript
# Puis push
```

### Database Connection

**Erreur** : `Can't reach database server`

**Solution** :
1. Vérifier `DATABASE_URL` dans Vercel
2. Vérifier que la DB est bien démarrée
3. Vérifier le SSL mode (`?sslmode=require`)

### Upload d'images

**Erreur** : `BLOB_READ_WRITE_TOKEN not found`

**Solution** :
1. Vérifier que le Blob store est créé
2. Vérifier les variables d'environnement
3. Redéployer

### NextAuth Errors

**Erreur** : `NEXTAUTH_SECRET missing`

**Solution** :
1. Générer une clé sécurisée
2. Ajouter dans Vercel env vars
3. Redéployer

---

## 📞 Support

- **Documentation Vercel** : https://vercel.com/docs
- **Next.js Deployment** : https://nextjs.org/docs/deployment
- **Prisma on Vercel** : https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel

---

## 🚀 Commandes Utiles

```bash
# Lier le projet local à Vercel
vercel link

# Pull des variables d'environnement
vercel env pull

# Déployer en preview
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les déploiements
vercel ls
```

---

**Développé avec ❤️ pour Mastech Cooling Technology**
