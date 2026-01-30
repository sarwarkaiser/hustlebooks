#!/bin/bash

# 🚀 HustleBooks - Update Keys Script
# This script helps you update your Clerk, Supabase, and Stripe keys

echo "🔐 HustleBooks - Update Keys"
echo "=============================="
echo ""

# Check if .env.local exists
if [ ! -f "/Users/sarwarhome/hustlebooks/.env.local" ]; then
    echo "❌ Error: .env.local not found"
    echo "Please create it first: touch /Users/sarwarhome/hustlebooks/.env.local"
    exit 1
fi

# Ask for Clerk keys
echo "📝 Enter your Clerk keys:"
echo "   Get them from: https://dashboard.clerk.com"
echo ""
read -p "   Clerk Publishable Key (pk_test_...): " clerk_publishable
read -p "   Clerk Secret Key (sk_test_...): " clerk_secret
echo ""

# Ask for Supabase keys
echo "📝 Enter your Supabase keys:"
echo "   Get them from: https://supabase.co/dashboard"
echo ""
read -p "   Supabase URL (https://...): " supabase_url
read -p "   Supabase Anon Key (eyJ...): " supabase_anon
echo ""

# Ask for Stripe keys
echo "📝 Enter your Stripe keys:"
echo "   Get them from: https://dashboard.stripe.com"
echo ""
read -p "   Stripe Secret Key (sk_test_...): " stripe_secret
read -p "   Stripe Publishable Key (pk_test_...): " stripe_publishable
read -p "   Stripe Webhook Secret (whsec_...): " stripe_webhook
echo ""

# Update .env.local
echo "🔄 Updating .env.local..."

cat > /Users/sarwarhome/hustlebooks/.env.local << EOF
# Supabase
NEXT_PUBLIC_SUPABASE_URL=$supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabase_anon

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$clerk_publishable
CLERK_SECRET_KEY=$clerk_secret

# Stripe
STRIPE_SECRET_KEY=$stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$stripe_publishable
STRIPE_WEBHOOK_SECRET=$stripe_webhook

# Mindee OCR
MINDEE_API_KEY=YOUR_KEY

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

echo "✅ Keys updated successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Run: cd /Users/sarwarhome/hustlebooks && npm run dev"
echo "   2. Test authentication: http://localhost:3000/sign-up"
echo "   3. Test database: http://localhost:3000/dashboard"
echo ""
echo "📖 For detailed instructions, see: SETUP_KEYS.md"
