# 🔐 Admin Panel Setup Guide

Guide complet pour configurer et utiliser le panel d'administration Mastech.

## 📋 Table des matières

1. [Configuration initiale](#configuration-initiale)
2. [Structure de la base de données](#structure-de-la-base-de-données)
3. [Accès au panel admin](#accès-au-panel-admin)
4. [Fonctionnalités disponibles](#fonctionnalités-disponibles)
5. [APIs CRUD](#apis-crud)
6. [Sécurité](#sécurité)

---

## 🚀 Configuration initiale

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```bash
cp .env.example .env.local
```

Modifier `.env.local` :

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="CHANGEZ_CETTE_VALEUR_PAR_UNE_CLE_ALEATOIRE"
```

**IMPORTANT**: Générez une clé secrète forte :

```bash
# Option 1: avec OpenSSL
openssl rand -base64 32

# Option 2: avec Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Initialiser la base de données

```bash
# Créer les tables
npm run db:push

# Créer l'admin par défaut
npm run db:seed
```

### 4. Démarrer le serveur

```bash
npm run dev
```

---

## 🗄️ Structure de la base de données

### Modèles principaux

- **Admin**: Comptes administrateurs
- **HeroSlide**: Slides du carrousel
- **Service**: Services (avec relations Benefits, Process, Features, FAQs)
- **Testimonial**: Témoignages clients
- **SectionContent**: Contenus des sections (About, Why Choose, FAQ)
- **ContactInfo**: Informations de contact
- **Media**: Gestionnaire de médias

### Relations

```
Service
  ├── ServiceBenefit (1:N)
  ├── ServiceProcess (1:N)
  ├── ServiceFeature (1:N)
  └── ServiceFAQ (1:N)
```

---

## 🔑 Accès au panel admin

### URL de connexion

```
http://localhost:3000/admin/login
```

### Identifiants par défaut

Après avoir exécuté `npm run db:seed` :

```
Email: admin@mastechcooling.com
Mot de passe: Admin@2024!
```

**⚠️ IMPORTANT**: Changez le mot de passe après la première connexion !

---

## ✨ Fonctionnalités disponibles

### 1. Hero Slides (`/admin/hero`)

- ✅ Créer/Éditer/Supprimer des slides
- ✅ Gérer l'ordre d'affichage
- ✅ Activer/Désactiver des slides
- ✅ Configurer titre, description, image, badge

### 2. Services (`/admin/services`)

- ✅ 4 services principaux (Diagnostic, Repair, Recharge, Cleaning)
- ✅ Édition complète avec relations
- ✅ Avantages, Processus, Features, FAQs
- ✅ Gestion des images et icônes

### 3. Témoignages (`/admin/testimonials`)

- ✅ Ajouter des avis clients
- ✅ Système de notation (1-5 étoiles)
- ✅ Gestion de l'ordre d'affichage
- ✅ Activer/Désactiver

### 4. Contenus (`/admin/content`)

- ✅ Section About
- ✅ Section Why Choose Us
- ✅ Section FAQ
- ✅ Format JSON flexible

### 5. Contact Info (`/admin/contact-info`)

- ✅ Téléphone, email, adresse
- ✅ Lien Google Maps
- ✅ Horaires d'ouverture
- ✅ Coordonnées GPS

### 6. Médias (`/admin/media`)

- ✅ Gestionnaire d'images et vidéos
- ✅ Filtres par type
- ✅ Copier URL
- ✅ Suppression

---

## 🔌 APIs CRUD

Toutes les APIs sont protégées par NextAuth (session requise).

### Hero Slides

```bash
GET    /api/admin/hero-slides          # Liste tous les slides
POST   /api/admin/hero-slides          # Créer un slide
GET    /api/admin/hero-slides/[id]     # Récupérer un slide
PUT    /api/admin/hero-slides/[id]     # Modifier un slide
DELETE /api/admin/hero-slides/[id]     # Supprimer un slide
```

### Services

```bash
GET    /api/admin/services             # Liste tous les services
POST   /api/admin/services             # Créer un service
GET    /api/admin/services/[id]        # Récupérer un service
PUT    /api/admin/services/[id]        # Modifier un service
DELETE /api/admin/services/[id]        # Supprimer un service
```

### Testimonials

```bash
GET    /api/admin/testimonials         # Liste tous les témoignages
POST   /api/admin/testimonials         # Créer un témoignage
GET    /api/admin/testimonials/[id]    # Récupérer un témoignage
PUT    /api/admin/testimonials/[id]    # Modifier un témoignage
DELETE /api/admin/testimonials/[id]    # Supprimer un témoignage
```

### Contact Info

```bash
GET    /api/admin/contact-info         # Récupérer les infos
PUT    /api/admin/contact-info         # Mettre à jour les infos
```

### Section Content

```bash
GET    /api/admin/content              # Liste tous les contenus
GET    /api/admin/content?slug=about   # Récupérer par slug
POST   /api/admin/content              # Créer un contenu
PUT    /api/admin/content              # Mettre à jour (upsert)
```

### Media

```bash
GET    /api/admin/media                # Liste tous les médias
GET    /api/admin/media?type=image     # Filtrer par type
POST   /api/admin/media                # Créer un média
DELETE /api/admin/media/[id]           # Supprimer un média
```

---

## 🔒 Sécurité

### Authentification

- ✅ NextAuth avec stratégie JWT
- ✅ Middleware protégeant `/admin/*`
- ✅ Sessions de 24h
- ✅ Mots de passe hashés avec bcrypt (10 rounds)

### Validation

- ✅ Validation Zod sur toutes les APIs
- ✅ Validation côté client (formulaires)
- ✅ Messages d'erreur génériques (pas de leak d'info)

### Bonnes pratiques

1. **Changez le mot de passe par défaut**
2. **Utilisez HTTPS en production**
3. **Générez un `NEXTAUTH_SECRET` fort**
4. **N'exposez jamais vos credentials**
5. **Activez CSRF protection en production**

---

## 🚧 TODO (Améliorations futures)

### Priorité Haute

- [ ] Upload d'images (Vercel Blob / Cloudinary)
- [ ] Changement de mot de passe dans l'admin
- [ ] Logs d'activité admin
- [ ] Export/Import de données

### Priorité Moyenne

- [ ] Rôles et permissions (Admin, Editor, Viewer)
- [ ] Multi-langue
- [ ] Preview des modifications avant publication
- [ ] Historique des modifications

### Priorité Basse

- [ ] Dashboard avec statistiques
- [ ] Notifications push
- [ ] API webhooks
- [ ] Intégration analytics

---

## 🆘 Dépannage

### Problème: "Error: No secret"

**Solution**: Vérifiez que `NEXTAUTH_SECRET` est défini dans `.env.local`

### Problème: "Cannot find module '@prisma/client'"

**Solution**:
```bash
npm run db:generate
```

### Problème: "Admin not found"

**Solution**:
```bash
npm run db:seed
```

### Problème: Session expirée

**Solution**: Reconnectez-vous à `/admin/login`

---

## 📞 Support

Pour toute question ou bug, contactez l'équipe de développement.

**Développé avec ❤️ pour Mastech Cooling Technology**
