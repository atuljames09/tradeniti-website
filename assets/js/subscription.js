/**
 * ============================================================================
 * Trade Niti - Subscription & Feature Access Management System
 * Company: AK Smart IT Solutions Pvt Ltd
 * ============================================================================
 * Categorized Plans:
 * 1. 7-Day Free Trial (₹0 / 7 Days)
 *    - DAY 1 TO 7 (Active Trial):
 *      ✓ ALL Web Pro Features Unlocked (360+ Screener, EMA Collide, SMC ±3% MTR, FII/DII, Analysis Center)
 *      ✓ Basic Swing Confluence Calculator
 *      ✓ Top 10 Gainers & Losers Summary
 *      ✓ Public Market Articles & News Reader
 *      ✓ Community Support & Forum
 *      ✕ Android Mobile App APK & PIN: Locked (Annual VIP ya App License required)
 *
 *    - FROM DAY 8 ONWARDS (Trial Expired - Free Starter Tier):
 *      ✓ Basic Swing Confluence Calculator (Unlocked)
 *      ✓ Top 10 Gainers & Losers Summary (Unlocked)
 *      ✓ Read Public Market Articles & News Reader (Unlocked)
 *      ✓ Community Forum / Support (Unlocked)
 *      ✓ NIFTY 50 Benchmark Analysis Center (Unlocked)
 *      🔒 360+ Stocks Market Screener (Top 10 Preview Only + Row 11 Pro Lock Banner)
 *      🔒 Live EMA-9 / EMA-21 Collide Radar (Feature Gate Modal)
 *      🔒 Stock Monitoring Center (SMC) ±3% MTR (SMC Pro Gating Warning Banner)
 *      🔒 Daily FII / DII Flow Intelligence (Locked Modal)
 *      🔒 Android Mobile App APK & PIN (Locked)
 *
 * 2. Monthly Pro - ₹499 / Month
 *    ✓ Full 360+ Stocks Market Screener (Frozen Sticky Columns)
 *    ✓ Live EMA-9 / EMA-21 Collide Radar (5m, 15m, 1h)
 *    ✓ Stock Monitoring Center (SMC) ±3% MTR
 *    ✓ In-Depth Stock Analysis Center (All Stocks + Nifty 50)
 *    ✓ Daily FII / DII Flow Intelligence
 *    ✓ Web-App Unlimited Access
 *    ✕ Android Mobile App APK Included (Annual VIP ya App License required)
 *
 * 3. Pro Annual + Mobile App (Annual VIP Bundle) - ₹3,999 / Year
 *    ✓ Everything in Pro Monthly for 365 Days
 *    ✓ Trade Niti Android App APK Download (23.1 MB)
 *    ✓ Hardware-Bound App Activation PIN (e.g. TN-7842-9914)
 *    ✓ Background 30s MTR Audio Notification Alerts
 *    ✓ Priority WhatsApp & Email Developer Support
 *    ✓ All Future Web & App Version Updates
 *
 * 4. Android App License (Mobile App APK) - ₹1,499 One-Time Lifetime
 *    ✓ Direct Download TradeNiti_v1.0.apk (23.1 MB)
 *    ✓ 1 Device Hardware Activation PIN
 *    ✓ 100% Offline SQLite Room Database Engine
 *    ✓ Background Android WorkManager Alerts
 *    ✓ Native Jetpack Compose 60 FPS UI
 */

const TRADE_NITI_PLANS = {
  free_trial: {
    id: 'free_trial',
    name: 'Starter / 7-Day Free Trial',
    badge: '7-DAY FREE TRIAL',
    price: 0,
    period: '7 Days',
    durationDays: 7,
    features: [
      '⭐ All Web Pro Tools Unlocked for 7 Days',
      'Full 360+ Stocks Screener (Frozen Sticky Cols)',
      'Live EMA-9 / EMA-21 Collide (5m, 15m, 1h)',
      'Stock Monitoring Center (SMC) ±3% MTR',
      'Basic Swing Confluence Calculator',
      'Top 10 NSE Gainers & Losers',
      'Read Public Market Articles & News'
    ],
    locked: [
      'Android Mobile App APK Download (Annual VIP ya App License required)'
    ]
  },
  pro_monthly: {
    id: 'pro_monthly',
    name: 'Monthly Pro',
    badge: 'PRO MONTHLY',
    price: 499,
    period: 'Per Month',
    durationDays: 30,
    features: [
      'Full 360+ Stocks Screener (Frozen Sticky Cols)',
      'Live EMA-9 / EMA-21 Collide (5m, 15m, 1h)',
      'Stock Monitoring Center (SMC) ±3% MTR',
      'In-Depth Stock Analysis Center',
      'Daily FII / DII Flow Intelligence',
      'Web-App Unlimited Access'
    ],
    locked: [
      'Android Mobile App APK Included'
    ]
  },
  pro_annual: {
    id: 'pro_annual',
    name: 'Pro Annual + Mobile App',
    badge: 'ANNUAL VIP BUNDLE',
    price: 3999,
    period: 'Per Year',
    popular: true,
    durationDays: 365,
    saveText: 'Save ₹1,989 compared to monthly',
    features: [
      'Everything in Pro Monthly for 365 Days',
      '⭐ Trade Niti Android App APK Download (23.1 MB)',
      'Hardware-Bound App Activation PIN',
      'Background 30s MTR Audio Notification Alerts',
      'Priority WhatsApp & Email Developer Support',
      'All Future Web & App Version Updates'
    ],
    locked: []
  },
  app_standalone: {
    id: 'app_standalone',
    name: 'Android App License',
    badge: 'MOBILE APP APK',
    price: 1499,
    period: 'One-Time Lifetime',
    durationDays: 3650,
    features: [
      'Direct Download TradeNiti_v1.0.apk (23.1 MB)',
      '1 Device Hardware Activation PIN',
      '100% Offline SQLite Room Database Engine',
      'Background Android WorkManager Alerts',
      'Native Jetpack Compose 60 FPS UI'
    ],
    locked: [
      'Full 360+ Web Screener Terminal Access',
      'Web Live EMA-9 / EMA-21 Collide Radar'
    ]
  }
};

// Razorpay Key Configuration (rzp_test_... or rzp_live_...)
const RAZORPAY_KEY_ID = 'rzp_test_TradeNitiDemo2026';

/**
 * 1. Check User Subscription Status & Validity
 */
function checkUserSubscription() {
  const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
  if (!user) {
    return {
      authenticated: false,
      active: false,
      plan: null,
      planName: 'Guest',
      isPro: false,
      isProWeb: false,
      hasAppAccess: false
    };
  }

  const plan = user.plan || 'free_trial';
  const expires = user.planExpires ? new Date(user.planExpires).getTime() : 0;
  const now = Date.now();

  const isPaidProWeb = (plan === 'pro_monthly' || plan === 'pro_annual');
  const hasAppAccess = (plan === 'pro_annual' || plan === 'app_standalone');

  // Active 7-Day Free Trial (Day 1 - 7)
  const isTrialActive = (plan === 'free_trial') && (expires === 0 || expires > now);

  // Expired 7-Day Free Trial (Day 8 onwards)
  const isTrialExpired = (plan === 'free_trial') && (expires > 0 && expires <= now);

  // User has Web Pro access if:
  // 1) In their 7-Day Free Trial (Day 1 - 7), OR
  // 2) Subscribed to Monthly Pro or Annual VIP Bundle!
  const hasWebProAccess = isPaidProWeb || isTrialActive;

  let daysRemaining = 0;
  if (expires > now) {
    daysRemaining = Math.ceil((expires - now) / (1000 * 60 * 60 * 24));
  }

  return {
    authenticated: true,
    active: hasWebProAccess || hasAppAccess,
    isTrialActive: isTrialActive,
    isExpired: isTrialExpired,
    isPro: isPaidProWeb,
    isProWeb: hasWebProAccess, // true during Day 1-7 trial and paid pro
    hasAppAccess: hasAppAccess, // true ONLY for Annual VIP or App License
    plan: plan,
    planData: TRADE_NITI_PLANS[plan] || TRADE_NITI_PLANS.free_trial,
    planName: isTrialExpired ? 'Starter Free (Trial Expired)' : (TRADE_NITI_PLANS[plan] ? TRADE_NITI_PLANS[plan].name : '7-Day Free Trial'),
    badge: isTrialExpired ? 'TRIAL EXPIRED' : (TRADE_NITI_PLANS[plan] ? TRADE_NITI_PLANS[plan].badge : 'FREE TRIAL'),
    expires: user.planExpires || 'Active',
    daysRemaining: daysRemaining,
    licensePin: user.licensePin || null
  };
}

/**
 * 2. Feature Access Gating Function
 * Evaluates whether a given feature is accessible by the current user's plan.
 */
function checkFeatureAccess(featureKey) {
  const sub = checkUserSubscription();
  if (!sub.authenticated) {
    return {
      allowed: false,
      reason: 'unauthenticated',
      title: 'Sign In Required',
      message: 'Please sign in or register to access Trade Niti features.',
      requiredPlan: 'free_trial'
    };
  }

  switch (featureKey) {
    // 1. Basic features: ALWAYS UNLOCKED (Free forever, even after 7-day trial expires)
    case 'confluence_calculator':
    case 'top_gainers_losers':
    case 'news_articles':
    case 'community':
    case 'nifty_analysis':
      return { allowed: true, plan: sub.plan };

    // 2. Web Pro features:
    // UNLOCKED during active 7-Day Free Trial (Day 1 - 7) & on Pro Monthly / Annual VIP.
    // LOCKED on Day 8+ (Trial Expired) if user has not upgraded.
    case 'screener_full':
    case 'screener':
      if (sub.isProWeb) return { allowed: true, plan: sub.plan };
      return {
        allowed: false,
        reason: 'trial_expired',
        title: '360+ Stocks Market Screener (Pro Feature)',
        message: 'Your 7-Day Free Trial has expired. Top 10 stocks preview is available below. Upgrade to Monthly Pro (₹499) or Annual VIP Bundle to unlock all 360+ stocks with frozen sticky columns.',
        requiredPlan: 'pro_monthly',
        features: [
          'Full live quote tick feed across all 360+ stocks',
          'Sticky frozen stock name column for effortless horizontal scrolling',
          '9 Vital Technicals & Confluence sorting',
          'Real-time sector and volume breakout filters'
        ]
      };

    case 'ema_collide':
      if (sub.isProWeb) return { allowed: true, plan: sub.plan };
      return {
        allowed: false,
        reason: 'trial_expired',
        title: 'Live EMA-9 / EMA-21 Collide Radar (Pro Feature)',
        message: 'Pro Monthly (₹499) ya Annual VIP par available. Upgrade now to unlock real-time crossover radar across 5m, 15m, and 1h intervals.',
        requiredPlan: 'pro_monthly',
        features: [
          '5m, 15m, and 1h live collision radar',
          'Automatic trend slope angle verification',
          'Audio chimes on high-probability crossovers',
          'Direct 1-click Analysis Center integration'
        ]
      };

    case 'smc':
      if (sub.isProWeb) return { allowed: true, plan: sub.plan };
      return {
        allowed: false,
        reason: 'trial_expired',
        title: 'Stock Monitoring Center (SMC) ±3% MTR (Pro Feature)',
        message: 'Your 7-Day Free Trial has ended. Upgrade to Monthly Pro (₹499) or Annual VIP to track real-time institutional swing breakouts and Momentum Threshold Ratio (MTR).',
        requiredPlan: 'pro_monthly',
        features: [
          'Real-time ±3% MTR swing breakout radar',
          'Institutional price channel violation detection',
          '30-second background polling audio notifications',
          'Automated support & resistance level validation'
        ]
      };

    case 'fiidii':
      if (sub.isProWeb) return { allowed: true, plan: sub.plan };
      return {
        allowed: false,
        reason: 'trial_expired',
        title: 'Daily FII / DII Flow Intelligence (Pro Feature)',
        message: 'Daily foreign and domestic institutional equity buying/selling flow data is available on Monthly Pro (₹499) and Annual VIP Bundle.',
        requiredPlan: 'pro_monthly',
        features: [
          'Provisional net turnover cash market values',
          'Institutional absorption and support analysis',
          'Impact analysis on Indian equity swing setups',
          'Direct historical activity table with live refresh'
        ]
      };

    case 'analysis_center':
      // During active 7-day trial or paid pro: All 360+ stocks accessible
      // When trial expired: Nifty 50 accessible, others prompt upgrade
      if (sub.isProWeb) return { allowed: true, plan: sub.plan };
      return {
        allowed: true,
        isTrialExpired: true,
        plan: sub.plan
      };

    // 3. Mobile App APK Download & Hardware Activation PIN:
    // LOCKED on 7-Day Free Trial (both active and expired) and on Monthly Pro!
    // UNLOCKED ONLY on Annual VIP Bundle (₹3,999) or Standalone App License (₹1,499)!
    case 'mobile_app':
    case 'apk_download':
    case 'hardware_pin':
      if (sub.hasAppAccess) return { allowed: true, plan: sub.plan };
      return {
        allowed: false,
        reason: 'app_required',
        title: 'Trade Niti Android Mobile App (APK)',
        message: 'Android Mobile App APK & PIN: Locked (Annual VIP ya App License required). Trade Niti Android APK (23.1 MB) and 1-Device Hardware-Bound Activation PIN are included with Pro Annual VIP Bundle (₹3,999/yr) or Standalone App License (₹1,499).',
        requiredPlan: 'pro_annual',
        features: [
          'Direct download TradeNiti_v1.0.apk (23.1 MB)',
          '1-Device Hardware-Bound Activation PIN',
          '100% Offline SQLite Room Database Engine',
          'Native Jetpack Compose 60 FPS UI with background MTR alerts'
        ]
      };

    default:
      return { allowed: true, plan: sub.plan };
  }
}

/**
 * 3. Generate Unique Hardware Activation PIN (e.g. TN-7842-9914)
 */
function generateLicensePin() {
  const seg1 = Math.floor(1000 + Math.random() * 9000);
  const seg2 = Math.floor(1000 + Math.random() * 9000);
  return `TN-${seg1}-${seg2}`;
}

/**
 * 4. Open Feature Gate / Pro Upgrade Modal
 */
function openFeatureGateModal(featureKey) {
  const access = checkFeatureAccess(featureKey);
  const sub = checkUserSubscription();

  const modal = document.getElementById('featureGateModal');
  if (!modal) {
    alert(`${access.title}\n\n${access.message}`);
    return;
  }

  const titleEl = document.getElementById('gateModalTitle');
  const badgeEl = document.getElementById('gateRequiredBadge');
  const currentPlanEl = document.getElementById('gateCurrentPlanPill');
  const msgEl = document.getElementById('gateModalMessage');
  const listEl = document.getElementById('gateFeaturesList');

  if (titleEl) titleEl.textContent = access.title || 'Feature Locked';
  if (badgeEl) badgeEl.textContent = (access.requiredPlan === 'pro_annual' || access.requiredPlan === 'app_standalone') ? 'ANNUAL VIP / APP' : 'PRO FEATURE';
  if (currentPlanEl) currentPlanEl.textContent = `Current: ${sub.planName || 'Starter Trial'}`;
  if (msgEl) msgEl.textContent = access.message || 'Upgrade your subscription to unlock this feature.';

  if (listEl) {
    const feats = access.features || [
      'Full institutional algorithm access',
      'Real-time tick updates',
      'Unlimited analysis center tools'
    ];
    listEl.innerHTML = feats.map(f => `<li style="margin-bottom: 4px;">${f}</li>`).join('');
  }

  // Configure action buttons inside Gate modal
  const btnMonthly = document.getElementById('btnGateUpgradeMonthly');
  const btnAnnual = document.getElementById('btnGateUpgradeAnnual');
  const btnDismiss = document.getElementById('btnGateDismiss');
  const closeBtn = document.getElementById('closeFeatureGateModalBtn');

  if (btnMonthly) {
    if (featureKey === 'mobile_app' || featureKey === 'apk_download') {
      btnMonthly.innerHTML = `<span>Buy App APK (₹1,499 Lifetime)</span>`;
      btnMonthly.onclick = () => {
        modal.classList.remove('active');
        initiatePlanSubscription('app_standalone');
      };
    } else {
      btnMonthly.innerHTML = `<span>Subscribe Monthly (₹499/mo)</span>`;
      btnMonthly.onclick = () => {
        modal.classList.remove('active');
        initiatePlanSubscription('pro_monthly');
      };
    }
  }

  if (btnAnnual) {
    btnAnnual.onclick = () => {
      modal.classList.remove('active');
      initiatePlanSubscription('pro_annual');
    };
  }

  if (btnDismiss) {
    btnDismiss.onclick = () => modal.classList.remove('active');
  }
  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.remove('active');
  }

  modal.classList.add('active');
}

/**
 * 5. Open User Account & Subscription Management Modal
 */
function openUserAccountModal() {
  const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
  if (!user) {
    if (typeof window.openAuthModal === 'function') window.openAuthModal('signin');
    return;
  }

  const sub = checkUserSubscription();
  const modal = document.getElementById('userAccountModal');
  if (!modal) return;

  const avatarEl = document.getElementById('uamUserAvatar');
  const nameEl = document.getElementById('uamUserName');
  const emailEl = document.getElementById('uamUserEmail');
  const planBadgeEl = document.getElementById('uamPlanBadge');
  const planNameEl = document.getElementById('uamPlanName');
  const planExpiryEl = document.getElementById('uamPlanExpiry');
  const pinRow = document.getElementById('uamPinRow');
  const pinEl = document.getElementById('uamLicensePin');
  const appDownloadRow = document.getElementById('uamAppDownloadRow');

  const initial = user.initial || (user.fullName ? user.fullName.charAt(0).toUpperCase() : 'T');
  if (avatarEl) {
    avatarEl.textContent = initial;
    avatarEl.style.background = user.color || '#2563EB';
  }
  if (nameEl) nameEl.textContent = user.fullName || user.username || 'Trader';
  if (emailEl) emailEl.textContent = user.email || 'Google User';

  const planClass = sub.plan === 'pro_annual' ? 'annual' : (sub.plan === 'pro_monthly' ? 'pro' : (sub.plan === 'app_standalone' ? 'app' : (sub.isExpired ? 'expired' : 'free')));
  if (planBadgeEl) {
    planBadgeEl.innerHTML = `<span class="user-plan-pill ${planClass}">${sub.badge}</span>`;
  }
  if (planNameEl) planNameEl.textContent = sub.planName;

  if (planExpiryEl) {
    if (sub.isTrialActive) {
      planExpiryEl.textContent = `Trial Active (${sub.daysRemaining} days left • All Web Tools Unlocked)`;
      planExpiryEl.style.color = 'var(--profit-green)';
    } else if (sub.isExpired) {
      planExpiryEl.textContent = '7-Day Free Trial Expired (Day 8+) • Pro Tools Locked';
      planExpiryEl.style.color = 'var(--loss-red)';
    } else if (sub.daysRemaining > 0) {
      planExpiryEl.textContent = `Active (${sub.daysRemaining} days remaining)`;
      planExpiryEl.style.color = 'var(--profit-green)';
    } else {
      planExpiryEl.textContent = 'Active Lifetime';
      planExpiryEl.style.color = 'var(--profit-green)';
    }
  }

  if (pinRow && pinEl) {
    if (sub.hasAppAccess && user.licensePin) {
      pinRow.style.display = 'flex';
      pinEl.textContent = user.licensePin;
    } else {
      pinRow.style.display = 'none';
    }
  }

  if (appDownloadRow) {
    appDownloadRow.style.display = sub.hasAppAccess ? 'block' : 'none';
  }

  // Wire interactive plan switch testing buttons
  modal.querySelectorAll('.btn-switch-test-plan').forEach(btn => {
    btn.onclick = () => {
      const pId = btn.getAttribute('data-plan');
      switchTestPlan(pId);
    };
  });

  const closeBtn = document.getElementById('closeUserAccountModalBtn');
  const dismissBtn = document.getElementById('btnDismissUserAccountModal');
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');
  if (dismissBtn) dismissBtn.onclick = () => modal.classList.remove('active');

  modal.classList.add('active');
}

/**
 * 6. Quick Interactive Plan Switcher (For testing all scenarios)
 */
function switchTestPlan(planId) {
  const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
  if (!user) return;

  // Scenario 1: Expired Trial (Day 8+)
  if (planId === 'expired_trial') {
    user.plan = 'free_trial';
    user.subscriptionActive = false;
    user.planExpires = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Expired 1 day ago
    user.licensePin = null;

    if (typeof window.setCurrentUser === 'function') window.setCurrentUser(user);
    if (typeof window.renderAuthState === 'function') window.renderAuthState();

    const modal = document.getElementById('userAccountModal');
    if (modal) modal.classList.remove('active');

    if (typeof window.showToast === 'function') {
      window.showToast('Switched to Expired Trial (Day 8+): Basic tools active, Pro tools locked.', '🔒');
    }
    return;
  }

  // Scenario 2: Active 7-Day Free Trial (Day 1 - 7)
  if (planId === 'free_trial') {
    user.plan = 'free_trial';
    user.subscriptionActive = true;
    user.planExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
    user.licensePin = null;

    if (typeof window.setCurrentUser === 'function') window.setCurrentUser(user);
    if (typeof window.renderAuthState === 'function') window.renderAuthState();

    const modal = document.getElementById('userAccountModal');
    if (modal) modal.classList.remove('active');

    if (typeof window.showToast === 'function') {
      window.showToast('Switched to 7-Day Free Trial (Active): All Web Pro tools UNLOCKED!', '🎉');
    }
    return;
  }

  // Scenario 3: Monthly Pro, Annual VIP, or App License
  const targetPlan = TRADE_NITI_PLANS[planId];
  if (!targetPlan) return;

  const durationDays = targetPlan.durationDays || 30;
  const expiryDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();
  const licensePin = (planId === 'pro_annual' || planId === 'app_standalone') ? (user.licensePin || generateLicensePin()) : null;

  user.plan = planId;
  user.subscriptionActive = true;
  user.planExpires = expiryDate;
  user.licensePin = licensePin;

  if (typeof window.setCurrentUser === 'function') {
    window.setCurrentUser(user);
  }
  if (typeof window.renderAuthState === 'function') {
    window.renderAuthState();
  }

  const modal = document.getElementById('userAccountModal');
  if (modal) modal.classList.remove('active');

  if (typeof window.showToast === 'function') {
    window.showToast(`Switched plan to: ${targetPlan.name}. Access updated!`, '⚡');
  }
}

/**
 * 7. Initiate Plan Subscription (Razorpay or Demo Checkout)
 */
function initiatePlanSubscription(planId) {
  const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
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

  if (planId === 'free_trial') {
    handlePaymentSuccess({ razorpay_payment_id: `FREE_TRIAL_${Date.now()}` }, selectedPlan, user);
    return;
  }

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: selectedPlan.price * 100,
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
    }
  };

  const isRealRazorpayKey = RAZORPAY_KEY_ID && !RAZORPAY_KEY_ID.includes('TradeNitiDemo') && !RAZORPAY_KEY_ID.includes('YOUR_KEY');
  if (typeof Razorpay !== 'undefined' && isRealRazorpayKey) {
    try {
      const rzp = new Razorpay(options);
      rzp.open();
      return;
    } catch (e) {
      console.warn('Razorpay live init failed, opening test checkout fallback:', e);
    }
  }

  openDemoPaymentModal(selectedPlan, user);
}

/**
 * 8. Process Payment Success & Update User Profile
 */
function handlePaymentSuccess(paymentResponse, plan, user) {
  const licensePin = (plan.id === 'pro_annual' || plan.id === 'app_standalone') ? generateLicensePin() : null;
  const durationDays = plan.durationDays || 30;
  const expiryDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

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

  showSubscriptionSuccessModal(plan, licensePin, user);
}

/**
 * 9. Demo Checkout Modal Fallback
 */
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

/**
 * 10. Show Success Modal
 */
function showSubscriptionSuccessModal(plan, licensePin, user) {
  const modal = document.getElementById('subscriptionSuccessModal');
  if (!modal) return;

  const titleEl = document.getElementById('successPlanTitle');
  const pinEl = document.getElementById('successLicensePin');
  const pinBox = pinEl ? pinEl.parentElement : null;
  const appDownloadRow = document.getElementById('successAppDownloadRow');

  if (titleEl) titleEl.textContent = `${plan.name} Activated!`;
  if (pinEl && licensePin) {
    pinEl.textContent = licensePin;
    if (pinBox) pinBox.style.display = 'block';
  } else if (pinBox) {
    pinBox.style.display = 'none';
  }

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
  canAccess: checkFeatureAccess,
  openGateModal: openFeatureGateModal,
  openAccountModal: openUserAccountModal,
  switchPlan: switchTestPlan,
  subscribe: initiatePlanSubscription,
  handleSuccess: handlePaymentSuccess
};

window.checkFeatureAccess = checkFeatureAccess;
window.openFeatureGateModal = openFeatureGateModal;
window.openUserAccountModal = openUserAccountModal;
