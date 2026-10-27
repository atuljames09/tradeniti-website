/**
 * ============================================================================
 * Trade Niti - Subscription & Payment Management System
 * Company: AK Smart IT Solutions Pvt Ltd
 * ============================================================================
 * Supports:
 * 1. Razorpay Gateway (UPI: GPay, PhonePe, Paytm, Cards, NetBanking)
 * 2. Monthly (₹499) and Annual (₹3,999) Subscriptions
 * 3. Mobile App (APK) Direct Purchase (₹1,499)
 * 4. Activation License Key Generator & Direct APK Delivery
 * 5. Feature Access Gating (Checking active plan before unlocking Pro tools)
 */

const TRADE_NITI_PLANS = {
  free_trial: {
    id: 'free_trial',
    name: 'Starter / Free Trial',
    price: 0,
    period: '7 Days',
    features: [
      'Basic Swing Confluence Calculator',
      'Top 10 NSE Gainers & Losers',
      'Public Technical Notes',
      'Community Support'
    ]
  },
  pro_monthly: {
    id: 'pro_monthly',
    name: 'Pro Monthly',
    price: 499,
    period: 'Per Month',
    features: [
      'Full 360+ Stocks Market Screener',
      'Live EMA-9 / EMA-21 Collide Radar',
      'Stock Monitoring Center (SMC) with ±3% MTR Alerts',
      'Complete In-Depth Stock Analysis Center',
      'FII / DII Institutional Flow Tracker',
      'Web-App Unlimited Access'
    ]
  },
  pro_annual: {
    id: 'pro_annual',
    name: 'Pro Annual + Mobile App Bundle',
    price: 3999,
    period: 'Per Year',
    popular: true,
    saveText: 'Save 33% (₹1,989/yr)',
    features: [
      'Everything in Pro Monthly for 1 Full Year',
      '⭐ Full Access to Trade Niti Android Mobile App (APK)',
      'Hardware-Bound App Activation PIN',
      'Priority Confluence VIP Alerts',
      'Direct WhatsApp & Email Support'
    ]
  },
  app_standalone: {
    id: 'app_standalone',
    name: 'Trade Niti Android App (APK Only)',
    price: 1499,
    period: 'One-Time Lifetime',
    features: [
      'Direct Download TradeNiti_v1.0.apk (23.1 MB)',
      'Lifetime Device Activation License Key',
      'Offline SQLite Room Database Engine',
      'Real-Time Background 30s MTR Polling Alerts',
      'All Future App Version Updates'
    ]
  }
};

// Razorpay Key Configuration (Replace with your Razorpay Key ID: rzp_live_... or rzp_test_...)
const RAZORPAY_KEY_ID = 'rzp_test_TradeNitiDemo2026';

// Check if user has an active subscription
function checkUserSubscription() {
  const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
  if (!user) return { active: false, plan: null };

  const plan = user.plan || 'free_trial';
  const expires = user.planExpires ? new Date(user.planExpires).getTime() : 0;
  const now = Date.now();

  const isPro = (plan === 'pro_monthly' || plan === 'pro_annual' || plan === 'app_standalone');
  const isTrialActive = plan === 'free_trial' && expires > now;

  return {
    active: isPro || isTrialActive,
    isPro: isPro,
    plan: plan,
    planName: TRADE_NITI_PLANS[plan] ? TRADE_NITI_PLANS[plan].name : 'Free',
    expires: user.planExpires || 'Active',
    hasAppAccess: plan === 'pro_annual' || plan === 'app_standalone'
  };
}

// Generate unique hardware/session license PIN (e.g. TN-7842-9914)
function generateLicensePin() {
  const seg1 = Math.floor(1000 + Math.random() * 9000);
  const seg2 = Math.floor(1000 + Math.random() * 9000);
  return `TN-${seg1}-${seg2}`;
}

// Open Razorpay Checkout for a Plan
function initiatePlanSubscription(planId) {
  const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
  
  // 1. If not logged in, prompt sign in first
  if (!user) {
    if (typeof window.openAuthModal === 'function') {
      window.openAuthModal('signin');
      if (typeof window.showToast === 'function') {
        window.showToast('Please sign in or register with Google to subscribe', '🔐');
      }
    }
    return;
  }

  const selectedPlan = TRADE_NITI_PLANS[planId];
  if (!selectedPlan) return;

  // 2. Instant Free Trial Activation (No Payment Gateway Needed)
  if (planId === 'free_trial') {
    handlePaymentSuccess({ razorpay_payment_id: `FREE_TRIAL_${Date.now()}` }, selectedPlan, user);
    return;
  }

  // 3. Setup Razorpay Options
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: selectedPlan.price * 100, // Amount in paise (e.g., 49900 for ₹499)
    currency: 'INR',
    name: 'Trade Niti',
    description: `${selectedPlan.name} (${selectedPlan.period})`,
    image: './assets/images/app_icon.png',
    prefill: {
      name: user.fullName || user.username || 'Trader',
      email: user.email || 'user@example.com',
      contact: '9999999999'
    },
    theme: {
      color: '#1E3A8A'
    },
    handler: function (response) {
      handlePaymentSuccess(response, selectedPlan, user);
    },
    modal: {
      ondismiss: function() {
        console.log('Payment checkout closed');
      }
    }
  };

  // Launch official Razorpay if real key is configured, else open stylish in-app checkout modal
  const isRealRazorpayKey = RAZORPAY_KEY_ID && !RAZORPAY_KEY_ID.includes('TradeNitiDemo') && !RAZORPAY_KEY_ID.includes('YOUR_KEY');
  if (typeof Razorpay !== 'undefined' && isRealRazorpayKey) {
    try {
      const rzp = new Razorpay(options);
      rzp.open();
      return;
    } catch (e) {
      console.warn('Razorpay live init failed, opening checkout modal fallback:', e);
    }
  }

  // Interactive Test Checkout Modal (when running locally or before adding live API keys)
  openDemoPaymentModal(selectedPlan, user);
}

// Process Payment Success
function handlePaymentSuccess(paymentResponse, plan, user) {
  const licensePin = generateLicensePin();
  const durationDays = plan.id === 'pro_annual' ? 365 : (plan.id === 'pro_monthly' ? 30 : (plan.id === 'free_trial' ? 7 : 3650));
  const expiryDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

  // Update user profile
  user.plan = plan.id;
  user.subscriptionActive = true;
  user.planExpires = expiryDate;
  user.licensePin = licensePin;
  user.paymentId = paymentResponse.razorpay_payment_id || `PAY_${Date.now()}`;

  if (typeof window.setCurrentUser === 'function') {
    window.setCurrentUser(user);
  }
  if (typeof window.renderAuthState === 'function') {
    window.renderAuthState();
  }

  // Show Success Modal
  showSubscriptionSuccessModal(plan, licensePin, user);
}

// Demo Payment Modal Fallback (for instant local preview)
function openDemoPaymentModal(plan, user) {
  const modal = document.getElementById('paymentCheckoutModal');
  if (!modal) return;

  const planTitleEl = document.getElementById('checkoutPlanTitle');
  const planPriceEl = document.getElementById('checkoutPlanPrice');
  const planPeriodEl = document.getElementById('checkoutPlanPeriod');
  const userEmailEl = document.getElementById('checkoutUserEmail');

  if (planTitleEl) planTitleEl.textContent = plan.name;
  if (planPriceEl) planPriceEl.textContent = `₹${plan.price.toLocaleString('en-IN')}`;
  if (planPeriodEl) planPeriodEl.textContent = plan.period;
  if (userEmailEl) userEmailEl.textContent = user.email || user.username;

  modal.classList.add('active');

  const confirmBtn = document.getElementById('btnConfirmDemoPayment');
  if (confirmBtn) {
    confirmBtn.onclick = function() {
      modal.classList.remove('active');
      handlePaymentSuccess({ razorpay_payment_id: `rzp_test_${Date.now()}` }, plan, user);
    };
  }
}

// Show Congratulations Modal after Subscription / App Purchase
function showSubscriptionSuccessModal(plan, licensePin, user) {
  const modal = document.getElementById('subscriptionSuccessModal');
  if (!modal) return;

  const titleEl = document.getElementById('successPlanTitle');
  const pinEl = document.getElementById('successLicensePin');
  const appDownloadRow = document.getElementById('successAppDownloadRow');

  if (titleEl) titleEl.textContent = `${plan.name} Activated!`;
  if (pinEl) pinEl.textContent = licensePin;
  if (appDownloadRow) {
    appDownloadRow.style.display = (plan.id === 'pro_annual' || plan.id === 'app_standalone') ? 'block' : 'none';
  }

  modal.classList.add('active');
  if (typeof window.showToast === 'function') {
    window.showToast(`🎉 Subscription Active: Welcome to Trade Niti ${plan.name}!`, '⭐');
  }
}

// Export to window
window.tradeNitiSubscription = {
  plans: TRADE_NITI_PLANS,
  check: checkUserSubscription,
  subscribe: initiatePlanSubscription,
  handleSuccess: handlePaymentSuccess
};
