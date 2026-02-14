-- HustleBooks Database Schema - Clerk Compatible
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles (linked to Clerk - user_id is Clerk's user ID)
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,  -- Clerk user ID (e.g., "user_abc123")
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  business_name TEXT,
  sin_last_3 TEXT,
  fiscal_year_end TEXT DEFAULT '12-31',
  incorporation_status TEXT DEFAULT 'sole_proprietor',
  home_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_type TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Income Sources
CREATE TABLE income_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT DEFAULT 'briefcase',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Income Transactions
CREATE TABLE income_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  income_source_id UUID REFERENCES income_sources(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  category TEXT,
  payment_method TEXT,
  gst_hst_collected DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expense Categories (CRA-compliant)
CREATE TABLE expense_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  cra_line_number TEXT,
  description TEXT,
  deduction_rate DECIMAL(5,2) DEFAULT 100.00,
  requires_receipt BOOLEAN DEFAULT true,
  common_for_gig_types TEXT[],
  examples TEXT[],
  icon TEXT DEFAULT 'receipt',
  sort_order INTEGER
);

-- Pre-populate expense categories
INSERT INTO expense_categories (name, cra_line_number, description, deduction_rate, examples, common_for_gig_types) VALUES
('Motor Vehicle Expenses', '9281', 'Gas, insurance, repairs, maintenance', 100.00, ARRAY['Gas', 'Oil change', 'Car insurance', 'Repairs'], ARRAY['rideshare', 'delivery']),
('Meals and Entertainment', '8523', 'Business meals', 50.00, ARRAY['Client lunch', 'Business dinner'], ARRAY['freelance', 'sales']),
('Office Expenses', '8810', 'Supplies, postage, stationery', 100.00, ARRAY['Printer paper', 'Pens', 'Envelopes'], ARRAY['freelance', 'ecommerce']),
('Advertising', '8521', 'Marketing, ads, promotions', 100.00, ARRAY['Facebook ads', 'Business cards', 'Website'], ARRAY['all']),
('Phone and Internet', '9220', 'Business use of phone/internet', 100.00, ARRAY['Cell phone bill', 'Internet bill'], ARRAY['all']),
('Professional Fees', '8862', 'Accounting, legal, consulting', 100.00, ARRAY['Accountant fees', 'Legal advice', 'Business coach'], ARRAY['all']),
('Rent', '8910', 'Commercial space rent', 100.00, ARRAY['Office rent', 'Co-working space'], ARRAY['freelance']),
('Insurance', '9804', 'Business insurance', 100.00, ARRAY['Liability insurance', 'Equipment insurance'], ARRAY['all']),
('Bank Charges', '8590', 'Business account fees, credit card fees', 100.00, ARRAY['Monthly bank fees', 'Transaction fees'], ARRAY['all']),
('Supplies', '8810', 'Materials and supplies used', 100.00, ARRAY['Packaging materials', 'Cleaning supplies'], ARRAY['ecommerce', 'services']),
('Licenses and Permits', '8760', 'Business licenses, permits', 100.00, ARRAY['Business license', 'Vendor permit'], ARRAY['all']),
('Subscriptions and Software', '8810', 'Software, tools, memberships', 100.00, ARRAY['Adobe subscription', 'Shopify', 'Canva Pro'], ARRAY['all']),
('Home Office', '9945', 'Portion of home expenses for business', 100.00, ARRAY['Portion of rent', 'Utilities', 'Property tax'], ARRAY['freelance', 'remote']),
('Equipment', '8810', 'Tools, computers, equipment under $500', 100.00, ARRAY['Laptop', 'Camera', 'Tools'], ARRAY['all']),
('Training and Education', '8760', 'Courses, books, conferences', 100.00, ARRAY['Online course', 'Business books', 'Conference ticket'], ARRAY['all']);

-- Expense Transactions
CREATE TABLE expense_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  income_source_id UUID REFERENCES income_sources(id) ON DELETE SET NULL,
  category_id UUID REFERENCES expense_categories(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  vendor TEXT,
  payment_method TEXT,
  gst_hst_paid DECIMAL(10,2) DEFAULT 0,
  receipt_url TEXT,
  receipt_ocr_data JSONB,
  is_personal BOOLEAN DEFAULT false,
  business_use_percentage DECIMAL(5,2) DEFAULT 100.00,
  notes TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mileage Logs
CREATE TABLE mileage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  income_source_id UUID REFERENCES income_sources(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  start_odometer INTEGER,
  end_odometer INTEGER,
  distance_km DECIMAL(10,2) NOT NULL,
  purpose TEXT NOT NULL,
  start_location TEXT,
  end_location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tax Settings (CRA rates change annually)
CREATE TABLE tax_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL UNIQUE,
  federal_tax_brackets JSONB,
  provincial_tax_brackets JSONB,
  cpp_rate DECIMAL(5,4),
  cpp_max_pensionable_earnings DECIMAL(10,2),
  ei_rate DECIMAL(5,4),
  basic_personal_amount DECIMAL(10,2),
  mileage_rate DECIMAL(5,4),
  meal_deduction_rate DECIMAL(5,2) DEFAULT 50.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pre-populate 2024 and 2025 tax rates
INSERT INTO tax_settings (year, federal_tax_brackets, cpp_rate, cpp_max_pensionable_earnings, ei_rate, basic_personal_amount, mileage_rate) VALUES
(2024, '[{"min": 0, "max": 53359, "rate": 0.15}, {"min": 53359, "max": 106717, "rate": 0.205}, {"min": 106717, "max": 165430, "rate": 0.26}, {"min": 165430, "max": 235675, "rate": 0.29}, {"min": 235675, "max": 999999999, "rate": 0.33}]'::jsonb, 0.0595, 66600.00, 0.0163, 15705.00, 0.70),
(2025, '[{"min": 0, "max": 55867, "rate": 0.15}, {"min": 55867, "max": 111733, "rate": 0.205}, {"min": 111733, "max": 173205, "rate": 0.26}, {"min": 173205, "max": 246752, "rate": 0.29}, {"min": 246752, "max": 999999999, "rate": 0.33}]'::jsonb, 0.0595, 68500.00, 0.0166, 16129.00, 0.70);

-- Tax Estimates
CREATE TABLE tax_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  quarter INTEGER NOT NULL,
  total_income DECIMAL(10,2),
  total_expenses DECIMAL(10,2),
  net_income DECIMAL(10,2),
  estimated_federal_tax DECIMAL(10,2),
  estimated_provincial_tax DECIMAL(10,2),
  estimated_cpp DECIMAL(10,2),
  estimated_ei DECIMAL(10,2),
  total_tax_owing DECIMAL(10,2),
  tax_paid_to_date DECIMAL(10,2),
  amount_to_set_aside DECIMAL(10,2),
  calculation_details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, year, quarter)
);

-- Saved Reports
CREATE TABLE saved_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  year INTEGER NOT NULL,
  quarter INTEGER,
  report_data JSONB NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Preferences
CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  province TEXT DEFAULT 'BC',
  currency TEXT DEFAULT 'CAD',
  date_format TEXT DEFAULT 'YYYY-MM-DD',
  fiscal_year_end TEXT DEFAULT '12-31',
  default_mileage_method TEXT DEFAULT 'simplified',
  tax_reminder_email BOOLEAN DEFAULT true,
  quarterly_report_email BOOLEAN DEFAULT true,
  low_receipt_warning BOOLEAN DEFAULT true,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications/Reminders
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_income_sources_user ON income_sources(user_id);
CREATE INDEX idx_income_sources_active ON income_sources(active);
CREATE INDEX idx_income_transactions_user ON income_transactions(user_id);
CREATE INDEX idx_income_transactions_date ON income_transactions(date);
CREATE INDEX idx_income_transactions_source ON income_transactions(income_source_id);
CREATE INDEX idx_expense_transactions_user ON expense_transactions(user_id);
CREATE INDEX idx_expense_transactions_date ON expense_transactions(date);
CREATE INDEX idx_expense_transactions_category ON expense_transactions(category_id);
CREATE INDEX idx_expense_transactions_source ON expense_transactions(income_source_id);
CREATE INDEX idx_mileage_logs_user ON mileage_logs(user_id);
CREATE INDEX idx_mileage_logs_date ON mileage_logs(date);
CREATE INDEX idx_tax_estimates_user_year ON tax_estimates(user_id, year);
CREATE INDEX idx_saved_reports_user ON saved_reports(user_id);
CREATE INDEX idx_saved_reports_type ON saved_reports(report_type);
CREATE INDEX idx_reminders_user ON reminders(user_id);
CREATE INDEX idx_reminders_due ON reminders(due_date) WHERE NOT completed;

-- Row Level Security (RLS) - Disabled for Clerk (handled in app layer)
-- If you want RLS, create a function to get user ID from JWT claim
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE income_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE income_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mileage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies using request.jwt.claim.sub (Clerk user ID from JWT)
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can manage own income sources" ON income_sources
  FOR ALL USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can manage own income transactions" ON income_transactions
  FOR ALL USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can manage own expense transactions" ON expense_transactions
  FOR ALL USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can manage own mileage logs" ON mileage_logs
  FOR ALL USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can view own tax estimates" ON tax_estimates
  FOR SELECT USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can manage own reports" ON saved_reports
  FOR ALL USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can manage own preferences" ON user_preferences
  FOR ALL USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

CREATE POLICY "Users can manage own reminders" ON reminders
  FOR ALL USING (user_id = coalesce(current_setting('request.jwt.claim.sub', true), ''));

-- Helper Functions
CREATE OR REPLACE FUNCTION calculate_net_income(p_user_id TEXT, start_date DATE, end_date DATE)
RETURNS TABLE(total_income DECIMAL, total_expenses DECIMAL, net_income DECIMAL) AS $$
BEGIN
  RETURN QUERY
  WITH income AS (
    SELECT COALESCE(SUM(amount), 0) as total
    FROM income_transactions
    WHERE income_transactions.user_id = p_user_id
    AND date BETWEEN start_date AND end_date
  ),
  expenses AS (
    SELECT COALESCE(SUM(amount * (business_use_percentage / 100)), 0) as total
    FROM expense_transactions
    WHERE expense_transactions.user_id = p_user_id
    AND date BETWEEN start_date AND end_date
  )
  SELECT 
    income.total as total_income,
    expenses.total as total_expenses,
    (income.total - expenses.total) as net_income
  FROM income, expenses;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION has_pro_access(p_user_id TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM subscriptions
    WHERE subscriptions.user_id = p_user_id
    AND status = 'active'
    AND plan_type = 'pro'
    AND current_period_end > NOW()
  );
$$ LANGUAGE SQL SECURITY DEFINER;
