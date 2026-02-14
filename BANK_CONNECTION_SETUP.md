# Bank Connection Setup Options

## Current Status
**Bank connection is NOT yet implemented.** Users must manually enter transactions.

## Option 1: Plaid (Recommended for Canada)
**Best for:** Major Canadian banks (RBC, TD, Scotiabank, BMO, CIBC)

### Pros:
- Supports 12,000+ financial institutions
- CRA-accepted transaction data
- Automatic categorization
- Secure OAuth connection

### Cons:
- $0.50 - $2.00 per connected account/month
- Requires developer setup
- Some credit unions not supported

### Setup Steps:
1. Create account at https://plaid.com
2. Get API keys (sandbox → development → production)
3. Install Plaid SDK:
   ```bash
   npm install react-plaid-link
   ```
4. Add environment variables:
   ```
   PLAID_CLIENT_ID=your_client_id
   PLAID_SECRET=your_secret
   PLAID_PUBLIC_KEY=your_public_key
   PLAID_ENV=production
   ```
5. Create bank connection UI component
6. Store access tokens securely in Supabase

### Cost:
- First 100 connections: FREE
- Then $0.50/account/month (volume discounts available)

---

## Option 2: Stripe Financial Connections
**Best for:** Simple bank account verification + payments

### Pros:
- Already integrated (Stripe account exists)
- Instant account verification
- Direct debit setup for subscriptions
- No additional vendor

### Cons:
- Limited Canadian bank support
- US-focused
- Transaction history limited

### Setup Steps:
1. Enable in Stripe Dashboard
2. Use existing Stripe.js:
   ```javascript
   const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
   const {financialConnectionsSession} = await stripe.collectFinancialConnectionsAccounts({
     clientSecret: '{{CLIENT_SECRET}}',
   });
   ```

### Cost:
- $0.50 per verification
- Included in Stripe billing

---

## Option 3: Yodlee (Envestnet)
**Best for:** Enterprise, comprehensive Canadian coverage

### Pros:
- Best Canadian credit union support
- 17,000+ institutions
- Rich transaction data

### Cons:
- Expensive ($500+/month minimum)
- Complex integration
- Overkill for startups

### Cost:
- Enterprise pricing only

---

## Option 4: Flinks (Canadian!)
**Best for:** Canadian-focused apps

### Pros:
- 100% Canadian
- All major banks + credit unions
- Excellent CRA compliance
- Local support

### Cons:
- $200+/month minimum
- Less documentation than Plaid

### Cost:
- Starting at $200/month

---

## Recommended Implementation: Plaid

### Why Plaid:
1. Best balance of cost/features
2. Great Canadian bank coverage
3. Well-documented
4. Scales with your growth

### Implementation Timeline:
- **Week 1:** Setup Plaid account, install SDK
- **Week 2:** Build bank connection UI
- **Week 3:** Transaction sync logic
- **Week 4:** Testing & CRA compliance verification

### Code Example:
```typescript
// components/bank-connect.tsx
import { usePlaidLink } from 'react-plaid-link';

export function BankConnectButton() {
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      // Exchange public token for access token
      await fetch('/api/plaid/exchange', {
        method: 'POST',
        body: JSON.stringify({ public_token }),
      });
    },
  });

  return (
    <Button onClick={() => open()} disabled={!ready}>
      Connect Bank Account
    </Button>
  );
}
```

### Database Schema Addition:
```sql
-- Add to supabase-schema-clerk.sql
CREATE TABLE bank_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  plaid_item_id TEXT UNIQUE,
  plaid_access_token TEXT, -- Encrypt this!
  institution_name TEXT,
  institution_id TEXT,
  account_name TEXT,
  account_type TEXT,
  account_subtype TEXT,
  mask TEXT, -- Last 4 digits
  status TEXT DEFAULT 'active',
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bank_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  bank_connection_id UUID REFERENCES bank_connections(id) ON DELETE CASCADE,
  plaid_transaction_id TEXT UNIQUE,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  name TEXT NOT NULL,
  merchant_name TEXT,
  category TEXT[],
  pending BOOLEAN DEFAULT false,
  imported_at TIMESTAMPTZ DEFAULT NOW(),
  matched_expense_id UUID REFERENCES expense_transactions(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Next Steps

1. **Choose provider** (recommend: Plaid)
2. **Apply for account**
3. **Implement sandbox testing**
4. **Get CRA approval** for automated imports
5. **Launch beta with 10 users**

---

## Current Alternative (Manual Entry)

Until bank connection is built, users can:
1. Upload CSV from bank
2. Use receipt scanner (OCR)
3. Manual entry with smart categorization

The receipt scanner is already working in `/expenses/scan`!
