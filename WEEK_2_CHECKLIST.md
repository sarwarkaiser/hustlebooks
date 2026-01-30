# 🚀 HustleBooks - Week 2 Checklist

## ✅ Week 1 Complete
- [x] 17 routes created
- [x] 7 UI components built
- [x] Income management (sources + transactions)
- [x] Expense tracking (22 CRA categories)
- [x] Mileage tracking
- [x] Tax estimator (federal, provincial, CPP, EI)
- [x] Database schema (12 tables)
- [x] Complete documentation

---

## 🎯 Week 2 - Revenue-Ready MVP

### Day 1: Authentication & Database Setup (1 hour)

#### 🔐 Clerk Authentication (15 min)
- [ ] Go to https://dashboard.clerk.com
- [ ] Create application "HustleBooks"
- [ ] Select "Email + Password" authentication
- [ ] Copy Publishable Key
- [ ] Copy Secret Key
- [ ] Update `.env.local` with Clerk keys

#### 🗄️ Supabase Database (10 min)
- [ ] Go to https://supabase.co/dashboard/project/frsqsleusagftubikiwh
- [ ] Run `supabase-schema.sql` in SQL Editor
- [ ] Copy Supabase URL
- [ ] Copy Supabase anon key
- [ ] Update `.env.local` with Supabase keys

#### ✅ Test Authentication (5 min)
- [ ] Start dev server: `npm run dev`
- [ ] Test sign up: http://localhost:3000/sign-up
- [ ] Test sign in: http://localhost:3000/sign-in
- [ ] Verify user appears in Clerk dashboard

#### ✅ Test Database (10 min)
- [ ] Go to http://localhost:3000/dashboard
- [ ] Click "Add Income Source"
- [ ] Fill form and submit
- [ ] Check Supabase Table Editor
- [ ] Verify data saved in `income_sources` table

**Day 1 Total: 40 minutes**

---

### Day 2: Stripe Integration (1.5 hours)

#### 💳 Stripe Setup (30 min)
- [ ] Go to https://dashboard.stripe.com
- [ ] Create Stripe account
- [ ] Complete onboarding (business details)
- [ ] Copy Secret Key
- [ ] Copy Publishable Key
- [ ] Create product "HustleBooks Pro" ($9.99/month)
- [ ] Set up webhook endpoint
- [ ] Copy Webhook Secret
- [ ] Update `.env.local` with Stripe keys

#### 🔧 Create Checkout API (1 hour)
- [ ] Create `src/app/api/checkout/route.ts`
- [ ] Create checkout session function
- [ ] Handle Stripe webhook
- [ ] Test with Stripe CLI

**Day 2 Total: 1.5 hours**

---

### Day 3: Dashboard with Real Data (2 hours)

#### 📊 Update Dashboard (2 hours)
- [ ] Modify `src/app/(dashboard)/dashboard/page.tsx`
- [ ] Fetch income data from Supabase
- [ ] Fetch expense data from Supabase
- [ ] Fetch mileage data from Supabase
- [ ] Calculate totals
- [ ] Add Recharts visualizations
- [ ] Display live stats

**Day 3 Total: 2 hours**

---

### Day 4: Subscription & Pricing Pages (2 hours)

#### ⚙️ Subscription Management (1 hour)
- [ ] Create `src/app/(dashboard)/settings/subscription/page.tsx`
- [ ] Show current plan (Free/Pro)
- [ ] Display billing history
- [ ] Add upgrade/downgrade buttons
- [ ] Add cancel subscription option

#### 💰 Pricing Page (1 hour)
- [ ] Create `src/app/(marketing)/pricing/page.tsx`
- [ ] Feature comparison table
- [ ] Pro tier benefits
- [ ] Checkout buttons

**Day 4 Total: 2 hours**

---

### Day 5: Reports Dashboard (2 hours)

#### 📄 Reports (2 hours)
- [ ] Create `src/app/(dashboard)/reports/page.tsx`
- [ ] Create Profit & Loss report
- [ ] Create Tax Summary report
- [ ] Create T2125 form generator
- [ ] Add PDF export
- [ ] Add CSV export

**Day 5 Total: 2 hours**

---

### Weekend: Testing & Polish (2 hours)

#### 🧪 Testing (1 hour)
- [ ] Test sign up flow
- [ ] Test sign in flow
- [ ] Test income management
- [ ] Test expense tracking
- [ ] Test mileage tracking
- [ ] Test tax estimator
- [ ] Test subscription upgrade
- [ ] Test reports generation

#### 🎨 Polish (1 hour)
- [ ] Add loading states
- [ ] Add empty states
- [ ] Add confirmation dialogs
- [ ] Fix any UI issues
- [ ] Update documentation

**Weekend Total: 2 hours**

---

## 📊 Week 2 Summary

### Time Breakdown
- **Day 1**: 40 minutes (Authentication & Database)
- **Day 2**: 1.5 hours (Stripe Integration)
- **Day 3**: 2 hours (Dashboard with Real Data)
- **Day 4**: 2 hours (Subscription & Pricing)
- **Day 5**: 2 hours (Reports)
- **Weekend**: 2 hours (Testing & Polish)

**Total Week 2 Time: 10 hours 40 minutes**

### Deliverables
- [ ] Clerk authentication working
- [ ] Supabase database populated
- [ ] Stripe integration complete
- [ ] Dashboard shows real data
- [ ] Subscription management working
- [ ] Pricing page created
- [ ] Reports dashboard functional
- [ ] All user flows tested

### Success Metrics
- [ ] 10 beta testers
- [ ] 1 paying subscriber
- [ ] $9.99 MRR
- [ ] <10% churn

---

## 🚀 Week 3 Preview

### Marketing & Polish (10 hours)
- [ ] Marketing pages (pricing, how it works, tax guide)
- [ ] UI polish (loading states, empty states, confirmation dialogs)
- [ ] Email notifications (basic)
- [ ] Analytics tracking
- [ ] 50 beta testers, 10 paying subscribers

### Week 3 Goal: 50 beta testers, 10 paying subscribers

---

## 🚀 Week 4 Preview

### Advanced Features (15 hours)
- [ ] OCR receipt scanning (Mindee API)
- [ ] Advanced notifications
- [ ] Integrations (QuickBooks, Wave)
- [ ] Error monitoring
- [ ] 100 beta testers, 50 paying subscribers

### Week 4 Goal: 100 beta testers, 50 paying subscribers

---

## 📋 Quick Commands

### Start Development
```bash
cd /Users/sarwarhome/hustlebooks
npm run dev
```

### Run Type Check
```bash
cd /Users/sarwarhome/hustlebooks
npm run typecheck
```

### Run Linter
```bash
cd /Users/sarwarhome/hustlebooks
npm run lint
```

### Run Build
```bash
cd /Users/sarwarhome/hustlebooks
npm run build
```

### Update Keys (Interactive)
```bash
cd /Users/sarwarhome/hustlebooks
./update-keys.sh
```

---

## 📞 Support

### Documentation
- `SETUP_KEYS.md` - Detailed setup instructions
- `README.md` - Project overview
- `QUICK_START_COMPLETE.md` - 5-minute setup guide

### Dashboard Links
- **Clerk**: https://dashboard.clerk.com
- **Supabase**: https://supabase.co/dashboard/project/frsqsleusagftubikiwh
- **Stripe**: https://dashboard.stripe.com

### Testing
- **Stripe Test Card**: `4242 4242 4242 4242`
- **Any CVC**: `123`
- **Any Future Date**: `12/34`

---

## 🎯 Today's Action Items

### Immediate (Next 30 minutes)
1. [ ] Go to https://dashboard.clerk.com
2. [ ] Create HustleBooks application
3. [ ] Copy Clerk keys
4. [ ] Run `./update-keys.sh` or manually update `.env.local`
5. [ ] Start dev server: `npm run dev`
6. [ ] Test sign up: http://localhost:3000/sign-up

### This Week
7. [ ] Set up Supabase database
8. [ ] Set up Stripe account
9. [ ] Update dashboard with real data
10. [ ] Create subscription management
11. [ ] Create pricing page
12. [ ] Create reports dashboard

---

**Date**: January 29, 2026  
**Status**: Week 2 Starting  
**Next**: Set up Clerk, Supabase, Stripe keys  
**Goal**: Revenue-ready MVP by end of week
