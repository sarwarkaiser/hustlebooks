# HustleBooks Quick Reference

## 🚀 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck

# Lint code
npm run lint

# Start production server
npm start
```

## 📁 Project Structure

```
hustlebooks/
├── src/
│   ├── app/
│   │   ├── (dashboard)/          # Protected routes
│   │   │   ├── dashboard/        # Dashboard page
│   │   │   ├── income/           # Income management
│   │   │   ├── expenses/         # Expense tracking
│   │   │   ├── mileage/          # Mileage tracking
│   │   │   ├── tax-estimator/    # Tax calculator
│   │   │   └── layout.tsx        # Dashboard layout
│   │   ├── (auth)/               # Authentication
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   └── ui/                   # UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── label.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   ├── hooks/
│   │   └── use-toast.ts          # Toast hook
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts         # Browser client
│   │   │   └── server.ts         # Server client
│   │   └── utils.ts              # Utilities
│   └── middleware.ts             # Auth middleware
├── supabase-schema.sql           # Database schema
├── .env.local                    # Environment variables
└── package.json                  # Dependencies
```

## 🔑 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://frsqsleusagftubikiwh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) → Purple (#8B5CF6)
- **Background**: Slate-950
- **Cards**: Slate-800/50 (glassmorphism)
- **Text**: White, slate-300, slate-400

### Components
- **Button**: Gradient, hover scale (1.05x)
- **Card**: Glassmorphism, hover lift (1.02x)
- **Input**: Styled with focus states
- **Toast**: Success/error notifications

## 📊 Database Tables

1. **profiles** - User profiles
2. **subscriptions** - Subscription status
3. **income_sources** - Income streams
4. **income_transactions** - Income records
5. **expense_categories** - 22 CRA categories
6. **expense_transactions** - Expense records
7. **mileage_logs** - Trip records
8. **tax_settings** - User tax preferences
9. **tax_estimates** - Historical calculations
10. **saved_reports** - Generated reports
11. **user_preferences** - App settings
12. **reminders** - Tax deadlines

## 🧮 Tax Calculations

### Federal Tax (2024)
- 15% on $0-$55,867
- 20.5% on $55,868-$111,733
- 26% on $111,734-$173,205
- 29% on $173,206-$246,750
- 33% on $246,751+

### Provincial Tax (BC 2024)
- 5.06% on $0-$47,937
- 7.7% on $47,938-$95,875
- 10.5% on $95,876-$110,076
- 12.29% on $110,077-$133,664
- 14.7% on $133,665-$222,420
- 16.8% on $222,421+

### CPP (2024)
- Rate: 5.95%
- Exemption: $3,500
- Max income: $68,500
- Max contribution: $3,867.50

### EI (2024)
- Rate: 1.66%
- Max income: $63,200
- Max contribution: $1,049.12

### Mileage Deduction (2024)
- First 5,000 km: $0.70/km
- Over 5,000 km: $0.64/km

## 📋 Routes

### Public
- `/` - Landing page
- `/sign-in` - Sign in
- `/sign-up` - Sign up

### Protected (Dashboard)
- `/dashboard` - Main dashboard
- `/income` - Income dashboard
- `/income/sources` - Income sources
- `/income/sources/new` - Add income source
- `/income/new` - Add income transaction
- `/expenses` - Expenses dashboard
- `/expenses/new` - Add expense
- `/expenses/scan` - Receipt scanner
- `/mileage` - Mileage dashboard
- `/mileage/new` - Add trip
- `/tax-estimator` - Tax calculator
- `/tax-estimator/settings` - Tax settings

## 🎯 Next Steps

### 1. Set Up Clerk (Required)
```bash
# Go to https://dashboard.clerk.com
# Create application
# Get keys and update .env.local
```

### 2. Set Up Supabase (Required)
```bash
# Go to https://supabase.co/dashboard
# Run supabase-schema.sql
# Update .env.local with keys
```

### 3. Set Up Stripe (For Revenue)
```bash
# Go to https://dashboard.stripe.com
# Create products (Free & Pro)
# Get API keys
# Create checkout session API
```

### 4. Update Dashboard
- Fetch real data from Supabase
- Add Recharts visualizations
- Display live stats

### 5. Create Reports
- Profit & Loss statement
- Tax summary
- T2125 form generator
- PDF export

## 📚 Documentation

- `PROJECT_STATUS.md` - Current status & next steps
- `IMPLEMENTATION_SUMMARY.md` - Complete feature list
- `SETUP_CHECKLIST.md` - Setup instructions
- `QUICK_START.md` - 5-minute setup guide
- `README.md` - Project overview

## 🚀 Launch Checklist

- [ ] Clerk authentication configured
- [ ] Supabase database populated
- [ ] Stripe integration complete
- [ ] Dashboard with real data
- [ ] Reports working
- [ ] Testing complete
- [ ] Deploy to Vercel
- [ ] Marketing materials ready

---

**Status**: ✅ Week 1 Complete

**Server**: http://localhost:3000

**Build**: ✅ 17 routes, 0 TypeScript errors
