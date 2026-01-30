# 🔐 Setup Keys - Week 2

## Step 1: Set Up Clerk (15 minutes)

### 1.1 Create Clerk Application
1. Go to https://dashboard.clerk.com
2. Click **"Create Application"**
3. Name it **"HustleBooks"**
4. Select **"Email + Password"** as authentication method
5. Skip the "Add social providers" step (we'll add them later if needed)

### 1.2 Get Clerk Keys
1. In the Clerk dashboard, go to **"API Keys"** (left sidebar)
2. Copy the **"Publishable Key"** (starts with `pk_test_`)
3. Copy the **"Secret Key"** (starts with `sk_test_`)

### 1.3 Update .env.local
Replace the placeholder values in `/Users/sarwarhome/hustlebooks/.env.local`:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # Paste your key here
CLERK_SECRET_KEY=sk_test_...                   # Paste your key here
```

---

## Step 2: Set Up Supabase (10 minutes)

### 2.1 Create Supabase Project
1. Go to https://supabase.co/dashboard/project/frsqsleusagftubikiwh
2. If you don't have a project, create one:
   - Click **"New Project"**
   - Name: **"HustleBooks"**
   - Database password: **Generate a strong password**
   - Region: **Closest to you** (e.g., "Canada - Central")
   - Click **"Create New Database"**

### 2.2 Run Database Schema
1. In the Supabase dashboard, go to **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Copy the entire content of `/Users/sarwarhome/hustlebooks/supabase-schema.sql`
4. Paste it into the SQL Editor
5. Click **"Run"** (or press Cmd+Enter)

### 2.3 Get Supabase Keys
1. In the Supabase dashboard, go to **"Project Settings"** → **"API"**
2. Copy the **"URL"** (starts with `https://`)
3. Copy the **"anon public"** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2.4 Update .env.local
Replace the placeholder values in `/Users/sarwarhome/hustlebooks/.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co  # Paste your URL here
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Paste your anon key here
```

---

## Step 3: Set Up Stripe (30 minutes)

### 3.1 Create Stripe Account
1. Go to https://dashboard.stripe.com
2. Click **"Sign up"**
3. Enter your email and create a password
4. Complete the onboarding (business details, bank info)
5. Skip the "Add payment methods" step for now

### 3.2 Get Stripe API Keys
1. In the Stripe dashboard, go to **"Developers"** → **"API Keys"**
2. Copy the **"Publishable Key"** (starts with `pk_test_`)
3. Copy the **"Secret Key"** (starts with `sk_test_`)

### 3.3 Create Products
1. In the Stripe dashboard, go to **"Products"**
2. Click **"Add Product"**
3. Create **"HustleBooks Pro"**:
   - Name: **"HustleBooks Pro"**
   - Description: **"Unlock unlimited income sources, advanced tax calculations, and CRA-compliant reports"**
   - Price: **$9.99/month**
   - Click **"Save Product"**

### 3.4 Get Webhook Secret
1. In the Stripe dashboard, go to **"Developers"** → **"Webhooks"**
2. Click **"Add Endpoint"**
3. Endpoint URL: **`https://your-domain.com/api/webhooks/stripe`** (use `http://localhost:3000/api/webhooks/stripe` for testing)
4. Events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **"Add Endpoint"**
6. Copy the **"Signing secret"** (starts with `whsec_`)

### 3.5 Update .env.local
Replace the placeholder values in `/Users/sarwarhome/hustlebooks/.env.local`:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...                   # Paste your secret key here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Paste your publishable key here
STRIPE_WEBHOOK_SECRET=whsec_...                 # Paste your webhook secret here
```

---

## Step 4: Test Everything

### 4.1 Start the Development Server
```bash
cd /Users/sarwarhome/hustlebooks
npm run dev
```

### 4.2 Test Authentication
1. Go to http://localhost:3000/sign-up
2. Create a test account
3. Go to http://localhost:3000/sign-in
4. Sign in with your test account

### 4.3 Test Database
1. Go to http://localhost:3000/dashboard
2. Click **"Add Income Source"**
3. Fill out the form and submit
4. Check the Supabase dashboard → **"Table Editor"** → **"income_sources"** table
5. Verify the data was saved

### 4.4 Test Stripe (Optional)
1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Go to http://localhost:3000/pricing (once created)
5. Click **"Upgrade to Pro"**
6. Use Stripe test card: `4242 4242 4242 4242`
7. Check Stripe dashboard → **"Payments"** to verify

---

## 📝 Quick Reference

### Clerk Dashboard
- **URL**: https://dashboard.clerk.com
- **API Keys**: https://dashboard.clerk.com/projects/.../api-keys
- **Users**: https://dashboard.clerk.com/projects/.../users

### Supabase Dashboard
- **URL**: https://supabase.co/dashboard/project/frsqsleusagftubikiwh
- **SQL Editor**: https://supabase.co/dashboard/project/frsqsleusagftubikiwh/sql
- **Table Editor**: https://supabase.co/dashboard/project/frsqsleusagftubikiwh/editor

### Stripe Dashboard
- **URL**: https://dashboard.stripe.com
- **API Keys**: https://dashboard.stripe.com/apikeys
- **Products**: https://dashboard.stripe.com/products
- **Webhooks**: https://dashboard.stripe.com/webhooks
- **Test Cards**: https://stripe.com/docs/testing

---

## ⚠️ Important Notes

### Security
- **NEVER** commit `.env.local` to git
- **NEVER** share your secret keys
- Use test keys for development
- Use production keys only when deploying

### Testing
- Use test cards for Stripe: `4242 4242 4242 4242`
- Use test email for Clerk: any email works in test mode
- Use test data for Supabase

### Troubleshooting
- **Clerk not working**: Check that keys are correct and Clerk is enabled
- **Supabase not working**: Check that schema was run and keys are correct
- **Stripe not working**: Check that webhook secret is correct and endpoint is reachable

---

## 🎯 Next Steps After Setup

Once all keys are set up:

1. **Update dashboard with real data** (2 hours)
2. **Create subscription management page** (1 hour)
3. **Create pricing page** (1 hour)
4. **Create reports dashboard** (2 hours)
5. **Test all user flows** (1 hour)
6. **Deploy to Vercel** (30 minutes)

---

**Estimated time to complete**: 55 minutes  
**Difficulty**: Medium  
**Status**: Ready to start

---

**Date**: January 29, 2026  
**Task**: Set up Clerk, Supabase, Stripe keys  
**Next**: Update dashboard with real data
