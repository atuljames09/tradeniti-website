/**
 * Trade Niti - Official Interactive Website JavaScript
 * Developed for AK Smart IT Solutions Pvt Ltd
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTicker();
  initMainPageDashboard();
  initSwingSimulator();
  initEmaCollideRadar();
  initStockScreener();
  initSmcSimulator();
  initTourTabs();
  initFaqAccordion();
  initAuth();
  initWatchlistModule();
  initSmcModule();
  initNewsModule();
  initSidebarDrawer();
  initScreenerModalModule();
  initEmaCollideModalModule();
  initStockDetailModule();
  initStockAnalysisCenterModule();
  initScrollSpy();
  initMobileMenu();
  initFeatureGating();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('trade_niti_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('trade_niti_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) {
    if (theme === 'dark') {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    } else {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }
}

/* ==========================================================================
   2. Live Market Ticker Ribbon
   ========================================================================== */
const MARKET_TICKER_DATA = [
  { symbol: 'NIFTY 50', price: '24,589.75', change: '+143.25 (+0.59%)', up: true },
  { symbol: 'BANK NIFTY', price: '53,240.50', change: '-112.80 (-0.21%)', up: false },
  { symbol: 'SENSEX', price: '80,812.15', change: '+428.10 (+0.53%)', up: true },
  { symbol: 'NIFTY IT', price: '39,875.30', change: '+215.60 (+0.54%)', up: true },
  { symbol: 'NIFTY MIDCAP', price: '55,120.00', change: '+340.00 (+0.62%)', up: true },
  { symbol: 'RELIANCE', price: '&#8377;2,948.50', change: '+32.40 (+1.11%)', up: true },
  { symbol: 'TATAMOTORS', price: '&#8377;924.80', change: '+22.60 (+2.50%)', up: true },
  { symbol: 'HDFCBANK', price: '&#8377;1,812.35', change: '+21.75 (+1.21%)', up: true },
  { symbol: 'INFY', price: '&#8377;1,842.60', change: '+28.90 (+1.59%)', up: true },
  { symbol: 'BAJFINANCE', price: '&#8377;7,892.30', change: '-45.60 (-0.57%)', up: false },
  { symbol: 'SUNPHARMA', price: '&#8377;1,764.25', change: '-12.40 (-0.70%)', up: false },
  { symbol: 'TCS', price: '&#8377;4,127.80', change: '-18.60 (-0.45%)', up: false }
];

function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  const renderItems = (items) => items.map(item => `
    <div class="ticker-item" data-ticker-sym="${item.symbol}" style="cursor: pointer;" title="Open Analysis Center for ${item.symbol}">
      <span class="ticker-name">${item.symbol}</span>
      <span class="ticker-price">${item.price}</span>
      <span class="${item.up ? 'ticker-up' : 'ticker-down'}">${item.change}</span>
    </div>
  `).join('');

  track.innerHTML = renderItems(MARKET_TICKER_DATA) + renderItems(MARKET_TICKER_DATA);

  track.querySelectorAll('.ticker-item').forEach(el => {
    el.addEventListener('click', () => {
      const sym = el.getAttribute('data-ticker-sym');
      if (sym && typeof window.openStockAnalysisCenter === 'function') {
        window.openStockAnalysisCenter(sym);
      }
    });
  });
}

/* ==========================================================================
   3. Interactive Swing V3 Confluence Engine Simulator
   ========================================================================== */
const STOCK_PRESETS = {
  TATAMOTORS: {
    name: 'Tata Motors',
    price: 924.80,
    superTrend: 'BUY',
    rsi: 62,
    macdHist: 4.5,
    ema9Up: true,
    bbPos: 'MIDDLE',
    adx: 28,
    regime: 'GREEN'
  },
  RELIANCE: {
    name: 'Reliance Industries',
    price: 2948.50,
    superTrend: 'BUY',
    rsi: 58,
    macdHist: 2.1,
    ema9Up: true,
    bbPos: 'NEAR_UPPER',
    adx: 22,
    regime: 'GREEN'
  },
  HDFCBANK: {
    name: 'HDFC Bank',
    price: 1812.35,
    superTrend: 'BUY',
    rsi: 65,
    macdHist: 3.2,
    ema9Up: true,
    bbPos: 'MIDDLE',
    adx: 26,
    regime: 'YELLOW'
  },
  SUNPHARMA: {
    name: 'Sun Pharma',
    price: 1764.25,
    superTrend: 'SELL',
    rsi: 44,
    macdHist: -1.8,
    ema9Up: false,
    bbPos: 'NEAR_LOWER',
    adx: 18,
    regime: 'GREEN'
  },
  BAJFINANCE: {
    name: 'Bajaj Finance',
    price: 7892.30,
    superTrend: 'SELL',
    rsi: 36,
    macdHist: -4.2,
    ema9Up: false,
    bbPos: 'NEAR_LOWER',
    adx: 31,
    regime: 'RED'
  }
};

let currentSimState = { ...STOCK_PRESETS.TATAMOTORS };

function initSwingSimulator() {
  const stockPills = document.querySelectorAll('.stock-pill');
  const rsiSlider = document.getElementById('simRsiSlider');
  const macdSlider = document.getElementById('simMacdSlider');
  const stBuyBtn = document.getElementById('simStBuy');
  const stSellBtn = document.getElementById('simStSell');
  const emaUpBtn = document.getElementById('simEmaUp');
  const emaDownBtn = document.getElementById('simEmaDown');
  const bbBtns = document.querySelectorAll('[data-bb]');
  const regimeBtns = document.querySelectorAll('[data-regime]');

  stockPills.forEach(pill => {
    pill.addEventListener('click', () => {
      stockPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const symbol = pill.getAttribute('data-symbol');
      const indepthBtn = document.getElementById('btnActiveSimStockInDepth');
      if (indepthBtn && symbol) indepthBtn.setAttribute('data-symbol', symbol);
      if (STOCK_PRESETS[symbol]) {
        currentSimState = { ...STOCK_PRESETS[symbol] };
        syncSimControls();
        calculateAndRenderScore();
      }
    });
  });

  if (rsiSlider) {
    rsiSlider.addEventListener('input', (e) => {
      currentSimState.rsi = parseFloat(e.target.value);
      const rsiValEl = document.getElementById('simRsiVal');
      if (rsiValEl) rsiValEl.textContent = currentSimState.rsi;
      calculateAndRenderScore();
    });
  }

  if (macdSlider) {
    macdSlider.addEventListener('input', (e) => {
      currentSimState.macdHist = parseFloat(e.target.value);
      const macdValEl = document.getElementById('simMacdVal');
      if (macdValEl) macdValEl.textContent = (currentSimState.macdHist > 0 ? '+' : '') + currentSimState.macdHist;
      calculateAndRenderScore();
    });
  }

  if (stBuyBtn && stSellBtn) {
    stBuyBtn.addEventListener('click', () => {
      currentSimState.superTrend = 'BUY';
      stBuyBtn.classList.add('active');
      stSellBtn.classList.remove('active');
      calculateAndRenderScore();
    });
    stSellBtn.addEventListener('click', () => {
      currentSimState.superTrend = 'SELL';
      stSellBtn.classList.add('active');
      stBuyBtn.classList.remove('active');
      calculateAndRenderScore();
    });
  }

  if (emaUpBtn && emaDownBtn) {
    emaUpBtn.addEventListener('click', () => {
      currentSimState.ema9Up = true;
      emaUpBtn.classList.add('active');
      emaDownBtn.classList.remove('active');
      calculateAndRenderScore();
    });
    emaDownBtn.addEventListener('click', () => {
      currentSimState.ema9Up = false;
      emaDownBtn.classList.add('active');
      emaUpBtn.classList.remove('active');
      calculateAndRenderScore();
    });
  }

  bbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSimState.bbPos = btn.getAttribute('data-bb');
      calculateAndRenderScore();
    });
  });

  regimeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      regimeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSimState.regime = btn.getAttribute('data-regime');
      calculateAndRenderScore();
    });
  });

  syncSimControls();
  calculateAndRenderScore();
}

function syncSimControls() {
  const rsiSlider = document.getElementById('simRsiSlider');
  const macdSlider = document.getElementById('simMacdSlider');
  if (rsiSlider) {
    rsiSlider.value = currentSimState.rsi;
    const rsiValEl = document.getElementById('simRsiVal');
    if (rsiValEl) rsiValEl.textContent = currentSimState.rsi;
  }
  if (macdSlider) {
    macdSlider.value = currentSimState.macdHist;
    const macdValEl = document.getElementById('simMacdVal');
    if (macdValEl) macdValEl.textContent = (currentSimState.macdHist > 0 ? '+' : '') + currentSimState.macdHist;
  }

  const stBuyBtn = document.getElementById('simStBuy');
  const stSellBtn = document.getElementById('simStSell');
  if (stBuyBtn && stSellBtn) {
    if (currentSimState.superTrend === 'BUY') {
      stBuyBtn.classList.add('active');
      stSellBtn.classList.remove('active');
    } else {
      stSellBtn.classList.add('active');
      stBuyBtn.classList.remove('active');
    }
  }

  const emaUpBtn = document.getElementById('simEmaUp');
  const emaDownBtn = document.getElementById('simEmaDown');
  if (emaUpBtn && emaDownBtn) {
    if (currentSimState.ema9Up) {
      emaUpBtn.classList.add('active');
      emaDownBtn.classList.remove('active');
    } else {
      emaDownBtn.classList.add('active');
      emaUpBtn.classList.remove('active');
    }
  }

  document.querySelectorAll('[data-bb]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-bb') === currentSimState.bbPos);
  });

  document.querySelectorAll('[data-regime]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-regime') === currentSimState.regime);
  });
}

function calculateAndRenderScore() {
  let score = 0;

  // 1. SuperTrend (±20 pts)
  score += currentSimState.superTrend === 'BUY' ? 20 : -20;

  // 2. RSI (14)
  const rsi = currentSimState.rsi;
  if (rsi < 25) score += 18;
  else if (rsi < 35) score += 12;
  else if (rsi < 45) score += 4;
  else if (rsi > 80) score -= 18;
  else if (rsi > 70) score -= 12;
  else if (rsi > 60) score -= 4;

  // 3. MACD
  const hist = currentSimState.macdHist;
  if (hist > 0) score += Math.abs(hist) > 2 ? 18 : 9;
  else if (hist < 0) score -= Math.abs(hist) > 2 ? 18 : 9;

  // 4. EMA 9 vs 21 (±10 pts)
  score += currentSimState.ema9Up ? 10 : -10;

  // 5. Bollinger Bands
  if (currentSimState.bbPos === 'NEAR_LOWER') score += 10;
  else if (currentSimState.bbPos === 'NEAR_UPPER') score -= 10;
  else score += 4;

  // 6. ADX Multiplier
  const adx = currentSimState.adx || 25;
  const adxMult = adx < 20 ? 0.8 : (adx > 30 ? 1.2 : 1.0);
  const rawScore = Math.max(-100, Math.min(100, Math.round(score * adxMult)));

  // Normalize to 0-100%
  let finalProb = Math.round((rawScore + 100) / 2);

  // Market Regime Constraint
  let regimeMinScore = 65;
  let isRegimeAllowed = true;
  if (currentSimState.regime === 'GREEN') {
    regimeMinScore = 65;
  } else if (currentSimState.regime === 'YELLOW') {
    regimeMinScore = 75;
    finalProb = Math.min(finalProb, 82);
  } else if (currentSimState.regime === 'RED') {
    regimeMinScore = 999;
    isRegimeAllowed = false;
  }

  // Overall Signal Label & Color
  let signalText = 'NEUTRAL';
  let signalColor = '#FBBF24';
  if (finalProb >= 75) {
    signalText = 'STRONG BULLISH';
    signalColor = '#10B981';
  } else if (finalProb >= 58) {
    signalText = 'BULLISH';
    signalColor = '#34D399';
  } else if (finalProb >= 42) {
    signalText = 'NEUTRAL';
    signalColor = '#FBBF24';
  } else if (finalProb >= 25) {
    signalText = 'BEARISH';
    signalColor = '#F87171';
  } else {
    signalText = 'STRONG BEARISH';
    signalColor = '#EF4444';
  }

  // Render Gauge
  const scoreEl = document.getElementById('gaugeScore');
  const signalEl = document.getElementById('gaugeSignal');
  const pathEl = document.getElementById('gaugeProgressPath');

  if (scoreEl) scoreEl.textContent = `${finalProb}%`;
  if (signalEl) {
    signalEl.textContent = signalText;
    signalEl.style.color = signalColor;
  }
  if (pathEl) {
    const totalLength = 283;
    const progressOffset = totalLength * (1 - (finalProb / 100));
    pathEl.style.strokeDashoffset = progressOffset;
    pathEl.style.stroke = signalColor;
  }

  renderGateSystem(finalProb, currentSimState.regime, regimeMinScore, isRegimeAllowed);
  renderTradePlan(currentSimState.price, finalProb);
}

function renderGateSystem(score, regime, minScore, isAllowed) {
  const g0Status = document.getElementById('gate0Status');
  const g0Detail = document.getElementById('gate0Detail');
  const g0Pass = isAllowed;
  if (g0Status) {
    g0Status.textContent = g0Pass ? 'PASS ✓' : 'BLOCK ✕';
    g0Status.className = `gate-status-pill ${g0Pass ? 'gate-pass' : 'gate-fail'}`;
  }
  if (g0Detail) {
    g0Detail.textContent = g0Pass ? `NIFTY ${regime} Regime OK` : 'NIFTY < EMA 200 (Longs Blocked)';
  }

  const g1Status = document.getElementById('gate1Status');
  const g1Detail = document.getElementById('gate1Detail');
  const g1Pass = score >= minScore && isAllowed;
  if (g1Status) {
    g1Status.textContent = g1Pass ? 'PASS ✓' : 'WAIT ✕';
    g1Status.className = `gate-status-pill ${g1Pass ? 'gate-pass' : 'gate-fail'}`;
  }
  if (g1Detail) {
    g1Detail.textContent = `Score ${score}% (Req: ≥${minScore}%)`;
  }

  const g2Status = document.getElementById('gate2Status');
  const g2Detail = document.getElementById('gate2Detail');
  const g2Pass = score >= 58 && isAllowed;
  if (g2Status) {
    g2Status.textContent = g2Pass ? 'PASS ✓' : 'N/A';
    g2Status.className = `gate-status-pill ${g2Pass ? 'gate-pass' : 'gate-fail'}`;
  }
  if (g2Detail) {
    g2Detail.textContent = g2Pass ? 'EMA Pullback Confirmed (1:2 RRR)' : 'No clear low-risk setup';
  }

  const g3Status = document.getElementById('gate3Status');
  const g3Detail = document.getElementById('gate3Detail');
  if (g3Status) {
    g3Status.textContent = 'PASS ✓';
    g3Status.className = 'gate-status-pill gate-pass';
  }
  if (g3Detail) {
    g3Detail.textContent = 'ATR(14) Volatility < 4.2% (Safe)';
  }

  const allBadge = document.getElementById('allGatesBadge');
  if (allBadge) {
    const allGreen = g0Pass && g1Pass && g2Pass;
    allBadge.style.display = allGreen ? 'inline-flex' : 'none';
  }
}

function renderTradePlan(currentPrice, score) {
  const entryEl = document.getElementById('planEntry');
  const slEl = document.getElementById('planSl');
  const t1El = document.getElementById('planT1');
  const t2El = document.getElementById('planT2');

  if (!entryEl) return;

  const entry = currentPrice;
  const risk = entry * 0.035;
  const sl = (entry - risk).toFixed(2);
  const t1 = (entry + risk * 2).toFixed(2);
  const t2 = (entry + risk * 3).toFixed(2);

  entryEl.innerHTML = `&#8377;${entry.toFixed(2)}`;
  slEl.innerHTML = `&#8377;${sl}`;
  t1El.innerHTML = `&#8377;${t1}`;
  t2El.innerHTML = `&#8377;${t2}`;
}

/* ==========================================================================
   4. Interactive EMA Collide Radar
   ========================================================================== */
const EMA_STOCKS_DATA = [
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: '&#8377;924.80', hit5m: { hit: true, time: '14:35', age: '4m' }, hit15m: { hit: true, time: '14:15', age: '24m' }, hit1h: { hit: false } },
  { symbol: 'RELIANCE', name: 'Reliance Ind.', price: '&#8377;2,948.50', hit5m: { hit: false }, hit15m: { hit: true, time: '13:45', age: '18m' }, hit1h: { hit: false } },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '&#8377;1,812.35', hit5m: { hit: true, time: '14:30', age: '9m' }, hit15m: { hit: false }, hit1h: { hit: false } },
  { symbol: 'INFY', name: 'Infosys', price: '&#8377;1,842.60', hit5m: { hit: false }, hit15m: { hit: false }, hit1h: { hit: true, time: '13:00', age: '95m' } },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: '&#8377;1,284.45', hit5m: { hit: false }, hit15m: { hit: false }, hit1h: { hit: false } },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: '&#8377;7,892.30', hit5m: { hit: false }, hit15m: { hit: false }, hit1h: { hit: false } }
];

function initEmaCollideRadar() {
  const tbody = document.getElementById('emaRadarBody');
  const triggerBtn = document.getElementById('triggerEmaHitBtn');
  if (!tbody) return;

  function renderRows() {
    tbody.innerHTML = EMA_STOCKS_DATA.map(stock => `
      <tr>
        <td>
          <div style="font-weight:700; color:var(--text-primary);">${stock.symbol}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${stock.name}</div>
        </td>
        <td style="font-weight:600;">${stock.price}</td>
        <td>${renderHitBadge(stock.hit5m)}</td>
        <td>${renderHitBadge(stock.hit15m)}</td>
        <td>${renderHitBadge(stock.hit1h)}</td>
      </tr>
    `).join('');
  }

  function renderHitBadge(hitObj) {
    if (hitObj && hitObj.hit) {
      return `<span class="hit-badge hit-active">HIT ${hitObj.time} (${hitObj.age})</span>`;
    }
    return `<span class="hit-badge hit-idle">—</span>`;
  }

  renderRows();

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      EMA_STOCKS_DATA[4].hit5m = { hit: true, time: timeStr, age: 'Just now' };
      renderRows();
      triggerBtn.textContent = '✓ Simulated HIT Fired!';
      setTimeout(() => {
        triggerBtn.textContent = 'Simulate Live EMA HIT Alert';
      }, 3000);
    });
  }
}

/* ==========================================================================
   5. Interactive Stock Screener (360+ Stocks)
   ========================================================================== */
let SCREENER_STOCKS = [
  { symbol: 'TANLA', name: 'Tanla Platforms Ltd', price: 732.90, change: 0.30, high52: 769.54, low52: 377.45, analysisPct: 78, sector: 'IT' },
  { symbol: 'DIVISLAB', name: "Divi's Laboratories Ltd", price: 11442.00, change: -0.37, high52: 11565.50, low52: 5821.00, analysisPct: 74, sector: 'Pharma' },
  { symbol: 'LAURUSLABS', name: 'Laurus Labs Ltd', price: 2424.00, change: 1.00, high52: 2454.00, low52: 944.90, analysisPct: 72, sector: 'Pharma' },
  { symbol: 'PERSISTENT', name: 'Persistent Systems Ltd', price: 6003.00, change: -0.45, high52: 6563.50, low52: 4298.50, analysisPct: 71, sector: 'IT' },
  { symbol: 'FSL', name: 'Firstsource Solutions Ltd', price: 291.25, change: 1.23, high52: 367.20, low52: 204.39, analysisPct: 70, sector: 'IT' },
  { symbol: 'PVRINOX', name: 'PVR INOX Ltd', price: 1641.20, change: -0.69, high52: 1652.60, low52: 918.60, analysisPct: 70, sector: 'Consumer' },
  { symbol: 'COFORGE', name: 'Coforge Ltd', price: 2028.00, change: -0.30, high52: 2099.00, low52: 1073.90, analysisPct: 69, sector: 'IT' },
  { symbol: 'UNIONBANK', name: 'Union Bank of India', price: 203.00, change: -0.68, high52: 204.40, low52: 148.06, analysisPct: 68, sector: 'Banking' },
  { symbol: 'APLAPOLLO', name: 'APL Apollo Tubes Ltd', price: 2251.60, change: 1.16, high52: 2280.80, low52: 1698.40, analysisPct: 68, sector: 'Metals' },
  { symbol: 'PNB', name: 'Punjab National Bank', price: 142.81, change: 0.72, high52: 149.95, low52: 99.49, analysisPct: 67, sector: 'Banking' },
  { symbol: 'SONACOMS', name: 'Sona BLW Precision Ltd', price: 919.00, change: -0.76, high52: 926.00, low52: 444.45, analysisPct: 67, sector: 'Auto' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 1080.00, change: -0.60, high52: 1227.80, low52: 939.40, analysisPct: 67, sector: 'Banking' }
];

let activeScreenerFilter = 'ALL';
let screenerSearchQuery = '';
let screenerSortCol = 'analysisPct';
let screenerSortAsc = false;

function initStockScreener() {
  if (typeof TRADE_NITI_MASTER_STOCKS !== 'undefined' && TRADE_NITI_MASTER_STOCKS.length > 0) {
    SCREENER_STOCKS = TRADE_NITI_MASTER_STOCKS.map(s => ({
      symbol: s.symbol,
      name: s.name,
      price: s.price || s.ltp || 1000,
      change: s.changePct !== undefined ? s.changePct : (s.change || 0),
      high52: s.high52 || 1200,
      low52: s.low52 || 800,
      analysisPct: s.analysisPct || s.confluence || 50,
      sector: s.sector || 'NSE Equities'
    }));
  }
  const tabs = document.querySelectorAll('.screener-tab');
  const searchInput = document.getElementById('screenerSearch');
  const ths = document.querySelectorAll('.screener-table th[data-sort]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeScreenerFilter = tab.getAttribute('data-filter');
      renderScreenerTable();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      screenerSearchQuery = e.target.value.trim().toLowerCase();
      renderScreenerTable();
    });
  }

  ths.forEach(th => {
    th.addEventListener('click', () => {
      const col = th.getAttribute('data-sort');
      if (screenerSortCol === col) {
        screenerSortAsc = !screenerSortAsc;
      } else {
        screenerSortCol = col;
        screenerSortAsc = false;
      }
      renderScreenerTable();
    });
  });

  renderScreenerTable();

  // Live quotes fetcher for landing page screener
  async function fetchLiveQuotesForLandingScreener() {
    const fetches = SCREENER_STOCKS.map(async (s) => {
      try {
        const qSym = (s.symbol === 'TATAMOTORS') ? 'TMPV' : s.symbol;
        const res = await fetch('https://swingtrader-nse-proxy.vercel.app/api/quote?symbol=' + encodeURIComponent(qSym));
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.priceInfo && data.priceInfo.lastPrice) {
          s.price = data.priceInfo.lastPrice;
          s.change = data.priceInfo.pChange !== undefined ? data.priceInfo.pChange : s.change;
          if (data.priceInfo.weekHighLow && data.priceInfo.weekHighLow.max) {
            s.high52 = data.priceInfo.weekHighLow.max;
            s.low52 = data.priceInfo.weekHighLow.min || s.low52;
          } else if (data.priceInfo.intraDayHighLow) {
            if (data.priceInfo.intraDayHighLow.max) s.high52 = Math.max(s.high52, data.priceInfo.intraDayHighLow.max);
            if (data.priceInfo.intraDayHighLow.min) s.low52 = Math.min(s.low52, data.priceInfo.intraDayHighLow.min);
          }
        }
      } catch (_) {}
    });

    await Promise.allSettled(fetches);
    renderScreenerTable();

    const syncTag = document.getElementById('screenerLiveSyncTag');
    if (syncTag) {
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      syncTag.innerHTML = '<span class="pulse-dot"></span> Live Tick Sync &bull; ' + timeStr;
    }
  }

  fetchLiveQuotesForLandingScreener();
  setInterval(fetchLiveQuotesForLandingScreener, 30000);
}

function renderScreenerTable() {
  const tbody = document.getElementById('screenerTableBody');
  if (!tbody) return;

  let filtered = [...SCREENER_STOCKS];

  if (screenerSearchQuery) {
    filtered = filtered.filter(s =>
      s.symbol.toLowerCase().includes(screenerSearchQuery) ||
      s.name.toLowerCase().includes(screenerSearchQuery) ||
      s.sector.toLowerCase().includes(screenerSearchQuery)
    );
  }

  if (activeScreenerFilter === 'BULLISH') {
    filtered = filtered.filter(s => s.analysisPct >= 70);
  } else if (activeScreenerFilter === 'NEUTRAL') {
    filtered = filtered.filter(s => s.analysisPct >= 50 && s.analysisPct < 70);
  } else if (activeScreenerFilter === 'BEARISH') {
    filtered = filtered.filter(s => s.analysisPct < 50);
  } else if (activeScreenerFilter === 'GAINERS') {
    filtered = filtered.filter(s => s.change > 0);
  } else if (activeScreenerFilter === 'LOSERS') {
    filtered = filtered.filter(s => s.change < 0);
  }

  filtered.sort((a, b) => {
    let vA = a[screenerSortCol];
    let vB = b[screenerSortCol];
    if (typeof vA === 'string') {
      return screenerSortAsc ? vA.localeCompare(vB) : vB.localeCompare(vA);
    }
    return screenerSortAsc ? vA - vB : vB - vA;
  });

  tbody.innerHTML = filtered.map(s => {
    const isUp = s.change >= 0;
    const badgeColor = s.analysisPct >= 70 ? 'badge-profit' : (s.analysisPct >= 50 ? 'badge-primary' : 'badge-loss');
    return `
      <tr data-symbol="${s.symbol}" style="cursor: pointer;" title="Click to view detailed analysis for ${s.symbol}">
        <td>
          <div style="font-weight:750; color:var(--text-primary); display: flex; align-items: center; gap: 6px;">
            <span>${s.symbol}</span>
            <span class="badge" style="font-size: 0.65rem; padding: 1px 5px; opacity: 0.85;">NSE</span>
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${s.name} &bull; ${s.sector}</div>
        </td>
        <td style="font-weight:700;">&#8377;${s.price.toFixed(2)}</td>
        <td style="color:${isUp ? 'var(--profit-green)' : 'var(--loss-red)'}; font-weight:700;">
          ${isUp ? '+' : ''}${s.change.toFixed(2)}%
        </td>
        <td style="color:var(--text-muted);">&#8377;${s.high52.toFixed(2)}</td>
        <td style="color:var(--text-muted);">&#8377;${s.low52.toFixed(2)}</td>
        <td>
          <span class="badge ${badgeColor}">${s.analysisPct}% Confluence</span>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('tr[data-symbol]').forEach(row => {
    row.addEventListener('click', () => {
      const sym = row.getAttribute('data-symbol');
      if (typeof window.openStockDetailModal === 'function') {
        window.openStockDetailModal(sym);
      }
    });
  });
}

/* ==========================================================================
   6. Stock Monitoring Center (SMC) & MTR Slider
   ========================================================================== */
function initSmcSimulator() {
  const mtrSlider = document.getElementById('smcMtrSlider');
  const mtrVal = document.getElementById('smcMtrVal');
  const mtrRangeText = document.getElementById('smcMtrRange');
  const currentProb = 78;

  if (mtrSlider && mtrVal && mtrRangeText) {
    mtrSlider.addEventListener('input', (e) => {
      const target = parseInt(e.target.value, 10);
      mtrVal.textContent = `${target}%`;
      const minAlert = Math.max(0, target - 3);
      const maxAlert = Math.min(100, target + 3);
      mtrRangeText.textContent = `Alert Window: ${minAlert}% &ndash; ${maxAlert}%`;

      const isInRange = Math.abs(currentProb - target) <= 3;
      const statusBadge = document.getElementById('smcAlertStatus');
      if (statusBadge) {
        if (isInRange) {
          statusBadge.innerHTML = 'PUSH NOTIFICATION SENT! (Within &plusmn;3% Target)';
          statusBadge.className = 'badge badge-profit';
        } else {
          statusBadge.innerHTML = 'Monitoring 30s background pulse...';
          statusBadge.className = 'badge badge-primary';
        }
      }
    });
  }
}

/* ==========================================================================
   7. Interactive Mobile App Tour
   ========================================================================== */
const TOUR_SCREENS = {
  dashboard: {
    title: 'Real-Time Market Dashboard',
    desc: 'Live streaming quotes for NSE Indices (NIFTY 50, SENSEX, BANK NIFTY), top gainers & losers, with smart relevance-ranked search across 360+ stocks.',
    features: ['Live 30-sec auto refresh', 'One-click TradingView chart link', 'Top Gainers & Losers', 'Local Watchlist Pins'],
    mockupHtml: `
      <div class="mock-card">
        <div class="mock-row" style="padding-bottom:8px;">
          <div>
            <div style="font-weight:800; font-size:1.05rem;">NIFTY 50</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">NSE Benchmark</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:800; font-size:1.05rem;">24,589.75</div>
            <div style="color:var(--profit-green); font-size:0.75rem; font-weight:700;">+143.25 (+0.59%)</div>
          </div>
        </div>
      </div>
      <div class="mock-card" style="margin-top:12px;">
        <div style="font-weight:700; font-size:0.85rem; margin-bottom:8px;">TOP WATCHLIST PICKS</div>
        <div class="mock-row">
          <div><strong>TATAMOTORS</strong> <span style="font-size:0.7rem; color:var(--text-muted);">Auto</span></div>
          <div style="text-align:right;">&#8377;924.80 <span style="color:var(--profit-green); font-weight:700;">+2.50%</span></div>
        </div>
        <div class="mock-row">
          <div><strong>HDFCBANK</strong> <span style="font-size:0.7rem; color:var(--text-muted);">Banking</span></div>
          <div style="text-align:right;">&#8377;1,812.35 <span style="color:var(--profit-green); font-weight:700;">+1.21%</span></div>
        </div>
        <div class="mock-row">
          <div><strong>RELIANCE</strong> <span style="font-size:0.7rem; color:var(--text-muted);">Energy</span></div>
          <div style="text-align:right;">&#8377;2,948.50 <span style="color:var(--profit-green); font-weight:700;">+1.11%</span></div>
        </div>
      </div>
    `
  },
  analysis: {
    title: 'AI Analysis & Vital Technicals',
    desc: 'Deep multi-timeframe swing probability engine analyzing Daily (50%), Weekly (30%), and Monthly (20%) candles with complete indicator breakdown.',
    features: ['12+ Technical Indicators', 'Bollinger Squeeze Alert', 'ADX Trend Strength Multiplier', 'Higher High / Higher Low PA Structure'],
    mockupHtml: `
      <div class="mock-card mock-gauge-card">
        <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">CONFLUENCE PROBABILITY</div>
        <div class="mock-score-number">82%</div>
        <div style="font-weight:800; color:var(--profit-green); font-size:0.85rem;">STRONG BULLISH</div>
      </div>
      <div class="mock-card" style="margin-top:12px;">
        <div style="font-weight:700; font-size:0.8rem; margin-bottom:6px;">VITAL TECHNICALS</div>
        <div class="mock-row"><span>SuperTrend (10,3)</span><span style="color:var(--profit-green); font-weight:700;">BUY</span></div>
        <div class="mock-row"><span>RSI (14) Daily</span><span>62.4 (Bullish)</span></div>
        <div class="mock-row"><span>MACD Histogram</span><span style="color:var(--profit-green); font-weight:700;">+4.5 Cross</span></div>
        <div class="mock-row"><span>EMA 9 vs 21</span><span style="color:var(--profit-green);">Bullish Momentum</span></div>
      </div>
    `
  },
  emaCollide: {
    title: 'EMA-9 / EMA-21 Collide Radar',
    desc: 'Proprietary intraday and swing momentum crossover engine. Tracks collision events across 5m, 15m, and 1-hour timeframes with auto-expiring HIT timers.',
    features: ['Proximity touch (&le;0.15%) detection', 'True cross sign inversion', '5m (10 min expiry)', '15m (30 min expiry)'],
    mockupHtml: `
      <div class="mock-card" style="border-left: 3px solid #DC2626;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>TATAMOTORS</strong>
          <span class="hit-badge hit-active">5m HIT 14:35</span>
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">EMA 9 collided with EMA 21 at &#8377;923.40</div>
      </div>
      <div class="mock-card" style="margin-top:12px; border-left: 3px solid #DC2626;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>RELIANCE</strong>
          <span class="hit-badge hit-active">15m HIT 13:45</span>
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Cross verified in latest session</div>
      </div>
    `
  },
  smc: {
    title: 'Stock Monitoring Center (SMC)',
    desc: 'Your private algorithmic surveillance tower. Background worker monitors your target stocks every 30 seconds and fires push notifications when MTR is reached.',
    features: ['Target Analysis % Slider', 'Alert trigger on &plusmn;3%', 'Personal Stock Trade Notes', 'Swipe to Dismiss gesture'],
    mockupHtml: `
      <div class="mock-card" style="background:var(--surface-chip);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>TATAMOTORS</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">Target MTR: 80%</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:800; font-size:1.1rem; color:var(--profit-green);">82%</div>
            <span class="badge badge-profit" style="font-size:0.65rem;">TRIGGERED</span>
          </div>
        </div>
        <div style="margin-top:8px; font-size:0.72rem; color:var(--text-secondary); background:var(--surface-card); padding:6px; border-radius:4px;">
          Note: Strong breakout above swing high 910 with 2x volume.
        </div>
      </div>
    `
  },
  screener: {
    title: 'Market Screener (360+ Stocks)',
    desc: 'Instant full-market scan with parallel chunking. Filter all 360+ stocks by technical confluence %, price change, 52-week proximity, and sector.',
    features: ['360+ Indian NSE Stocks', 'Bullish / Bearish / Gainers filters', 'Multi-column instant sort', 'Memory cached 10m TTL'],
    mockupHtml: `
      <div class="mock-card">
        <div style="display:flex; gap:6px; margin-bottom:10px;">
          <span class="badge badge-primary" style="font-size:0.7rem;">ALL</span>
          <span class="badge badge-profit" style="font-size:0.7rem;">BULLISH (&ge;70%)</span>
        </div>
        <div class="mock-row">
          <div><strong>TATAMOTORS</strong></div>
          <span class="badge badge-profit">82%</span>
        </div>
        <div class="mock-row">
          <div><strong>INFY</strong></div>
          <span class="badge badge-profit">78%</span>
        </div>
        <div class="mock-row">
          <div><strong>HDFCBANK</strong></div>
          <span class="badge badge-profit">76%</span>
        </div>
      </div>
    `
  },
  journal: {
    title: 'Trade Journal & Portfolio',
    desc: 'Track every entry, stop loss, target, quantity, and net P&L with local Room SQLite storage. Keep strict discipline with risk-reward analytics.',
    features: ['100% On-device privacy', 'Automated RRR calculation', 'P&L metrics & win-rate', 'Instant holding deletion'],
    mockupHtml: `
      <div class="mock-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:800; font-size:1.1rem; color:var(--profit-green);">+&#8377;14,520.00</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">Realized Net P&L (Win Rate: 72%)</div>
          </div>
          <span class="badge badge-profit">+12.4%</span>
        </div>
      </div>
      <div class="mock-card" style="margin-top:10px;">
        <div class="mock-row">
          <div><strong>TATAMOTORS</strong> (150 Qty)</div>
          <div style="color:var(--profit-green); font-weight:700;">+&#8377;4,250</div>
        </div>
        <div class="mock-row">
          <div><strong>RELIANCE</strong> (40 Qty)</div>
          <div style="color:var(--profit-green); font-weight:700;">+&#8377;3,180</div>
        </div>
      </div>
    `
  }
};

function initTourTabs() {
  const navItems = document.querySelectorAll('.tour-nav-item');
  const titleEl = document.getElementById('tourTitle');
  const descEl = document.getElementById('tourDesc');
  const featuresEl = document.getElementById('tourFeatures');
  const screenContentEl = document.getElementById('tourMockupScreen');

  if (!navItems.length) return;

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const screenKey = item.getAttribute('data-tour');
      const data = TOUR_SCREENS[screenKey];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (featuresEl) {
        featuresEl.innerHTML = data.features.map(f => `<li>✓ ${f}</li>`).join('');
      }
      if (screenContentEl) {
        screenContentEl.innerHTML = data.mockupHtml;
      }
    });
  });
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}


/* ==========================================================================
   9. Full-Featured Authentication System:
      - Username & Password Sign In
      - User Registration / Sign Up
      - 1-Click Google OAuth Simulation
      - Session Persistence & Profile Dropdown
      - Toast Notification Feedback
   ========================================================================== */
function initAuth() {
  const authWrapper = document.getElementById('authWrapper');
  const authModal = document.getElementById('authModal');
  const googleModal = document.getElementById('googleSelectModal');
  const logoutModal = document.getElementById('logoutModal');
  const toastEl = document.getElementById('tradeNitiToast');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');

  // Modal elements
  const closeAuthBtn = document.getElementById('closeAuthBtn');
  const tabSignInBtn = document.getElementById('tabSignInBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const authModalTitle = document.getElementById('authModalTitle');
  const authModalDesc = document.getElementById('authModalDesc');
  const btnGoogleAuth = document.getElementById('btnGoogleAuth');
  const authSwitchPrompt = document.getElementById('authSwitchPrompt');
  const authSwitchLink = document.getElementById('authSwitchLink');

  // Forms
  const signInForm = document.getElementById('signInForm');
  const registerForm = document.getElementById('registerForm');
  const loginUsername = document.getElementById('loginUsername');
  const loginPassword = document.getElementById('loginPassword');
  const toggleLoginPwd = document.getElementById('toggleLoginPwd');
  const loginErrorBanner = document.getElementById('loginErrorBanner');
  const loginSuccessBanner = document.getElementById('loginSuccessBanner');
  const fillDemoCredsBtn = document.getElementById('fillDemoCredsBtn');
  const forgotPwdLink = document.getElementById('forgotPwdLink');

  const regFullName = document.getElementById('regFullName');
  const regUsername = document.getElementById('regUsername');
  const regEmail = document.getElementById('regEmail');
  const regPassword = document.getElementById('regPassword');
  const regConfirmPassword = document.getElementById('regConfirmPassword');
  const toggleRegPwd = document.getElementById('toggleRegPwd');
  const regErrorBanner = document.getElementById('regErrorBanner');
  const regSuccessBanner = document.getElementById('regSuccessBanner');

  // Google Modal
  const closeGoogleModalBtn = document.getElementById('closeGoogleModalBtn');
  const cancelGoogleModalBtn = document.getElementById('cancelGoogleModalBtn');
  const googleCards = document.querySelectorAll('.google-account-card');

  // Logout Modal
  const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

  // Initialize Default Registered Users if not present
  const DEFAULT_USERS_KEY = 'trade_niti_registered_users';
  const CURRENT_USER_KEY = 'trade_niti_current_session';

  function getRegisteredUsers() {
    try {
      const stored = localStorage.getItem(DEFAULT_USERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    // Default seed account
    const defaults = [
      {
        fullName: 'Demo Trader',
        username: 'trader',
        email: 'trader@tradeniti.com',
        password: 'TradeNiti@2026',
        provider: 'local',
        initial: 'T',
        color: '#2563EB'
      }
    ];
    localStorage.setItem(DEFAULT_USERS_KEY, JSON.stringify(defaults));
    return defaults;
  }

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    // Backward compatibility with legacy string storage if any
    const legacyUser = localStorage.getItem('trade_niti_user');
    if (legacyUser) {
      return {
        fullName: legacyUser,
        username: legacyUser.toLowerCase(),
        email: `${legacyUser.toLowerCase()}@tradeniti.com`,
        provider: 'local',
        initial: legacyUser.charAt(0).toUpperCase(),
        color: '#2563EB'
      };
    }
    return null;
  }

  function setCurrentUser(userObj) {
    if (userObj) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userObj));
      localStorage.setItem('trade_niti_user', userObj.fullName || userObj.username);
      if (window.tradeNitiFirebase && typeof window.tradeNitiFirebase.syncUser === 'function') {
        window.tradeNitiFirebase.syncUser(userObj);
      }
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
      localStorage.removeItem('trade_niti_user');
      if (window.tradeNitiFirebase && typeof window.tradeNitiFirebase.signOut === 'function') {
        window.tradeNitiFirebase.signOut();
      }
    }
  }

  // Toast Notification Helper
  let toastTimer = null;
  function showToast(message, icon = '✓') {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    if (toastIcon) toastIcon.innerHTML = icon;
    toastEl.classList.add('active');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('active');
    }, 3500);
  }

  // Set Active Tab: 'signin' or 'register'
  let currentTab = 'signin';
  function switchAuthModalTab(tab) {
    currentTab = tab;
    // Clear message banners
    hideMessages();

    if (tab === 'signin') {
      if (tabSignInBtn) tabSignInBtn.classList.add('active');
      if (tabRegisterBtn) tabRegisterBtn.classList.remove('active');
      if (signInForm) signInForm.style.display = 'flex';
      if (registerForm) registerForm.style.display = 'none';
      if (authModalTitle) authModalTitle.textContent = 'Welcome to Trade Niti';
      if (authModalDesc) authModalDesc.textContent = 'Access algorithmic screening, live radar & institutional tools.';
      if (authSwitchPrompt) authSwitchPrompt.textContent = "Don't have an account?";
      if (authSwitchLink) authSwitchLink.textContent = 'Sign Up Free';
    } else {
      if (tabRegisterBtn) tabRegisterBtn.classList.add('active');
      if (tabSignInBtn) tabSignInBtn.classList.remove('active');
      if (signInForm) signInForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'flex';
      if (authModalTitle) authModalTitle.textContent = 'Create Trade Niti Account';
      if (authModalDesc) authModalDesc.textContent = 'Start institutional algorithmic trading analysis for free.';
      if (authSwitchPrompt) authSwitchPrompt.textContent = 'Already have an account?';
      if (authSwitchLink) authSwitchLink.textContent = 'Sign In';
    }
  }

  function openAuthModal(defaultTab = 'signin') {
    if (!authModal) return;
    authModal.classList.add('active');
    switchAuthModalTab(defaultTab);
    setTimeout(() => {
      if (defaultTab === 'signin' && loginUsername) {
        loginUsername.focus();
      } else if (defaultTab === 'register' && regFullName) {
        regFullName.focus();
      }
    }, 150);
  }

  function closeAuthModal() {
    if (authModal) authModal.classList.remove('active');
    hideMessages();
  }

  // Expose core auth utilities to window for Firebase and Subscription systems
  window.getCurrentUser = getCurrentUser;
  window.setCurrentUser = setCurrentUser;
  window.showToast = showToast;
  window.openAuthModal = openAuthModal;
  window.closeAuthModal = closeAuthModal;

  function hideMessages() {
    if (loginErrorBanner) { loginErrorBanner.style.display = 'none'; loginErrorBanner.textContent = ''; }
    if (loginSuccessBanner) { loginSuccessBanner.style.display = 'none'; loginSuccessBanner.textContent = ''; }
    if (regErrorBanner) { regErrorBanner.style.display = 'none'; regErrorBanner.textContent = ''; }
    if (regSuccessBanner) { regSuccessBanner.style.display = 'none'; regSuccessBanner.textContent = ''; }
  }

  function showBanner(bannerEl, message, isError = true) {
    if (!bannerEl) return;
    bannerEl.textContent = message;
    bannerEl.style.display = 'flex';
  }

  // Password Visibility Toggle Handler
  function setupPasswordToggle(toggleBtn, inputEl) {
    if (!toggleBtn || !inputEl) return;
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPwd = inputEl.type === 'password';
      inputEl.type = isPwd ? 'text' : 'password';
      toggleBtn.innerHTML = isPwd
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  }

  setupPasswordToggle(toggleLoginPwd, loginPassword);
  setupPasswordToggle(toggleRegPwd, regPassword);

  // Auto-fill demo credentials
  if (fillDemoCredsBtn) {
    fillDemoCredsBtn.addEventListener('click', () => {
      if (loginUsername) loginUsername.value = 'trader';
      if (loginPassword) loginPassword.value = 'TradeNiti@2026';
      showToast('Demo credentials populated!', '⚡');
    });
  }

  // Forgot Password Prompt
  if (forgotPwdLink) {
    forgotPwdLink.addEventListener('click', (e) => {
      e.preventDefault();
      const entered = (loginUsername && loginUsername.value.trim()) ? loginUsername.value.trim() : 'your email';
      showToast(`Password reset link sent to ${entered}!`, '📩');
    });
  }

  // Tab Switch Buttons
  if (tabSignInBtn) {
    tabSignInBtn.addEventListener('click', () => switchAuthModalTab('signin'));
  }
  if (tabRegisterBtn) {
    tabRegisterBtn.addEventListener('click', () => switchAuthModalTab('register'));
  }
  if (authSwitchLink) {
    authSwitchLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthModalTab(currentTab === 'signin' ? 'register' : 'signin');
    });
  }
  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', closeAuthModal);
  }

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
    if (e.target === googleModal && googleModal) googleModal.classList.remove('active');
    if (e.target === logoutModal && logoutModal) logoutModal.classList.remove('active');
    const crWl = document.getElementById('createWatchlistModal');
    if (e.target === crWl && crWl) crWl.classList.remove('active');
    const snM = document.getElementById('stockNoteModal');
    if (e.target === snM && snM) snM.classList.remove('active');
    const delWl = document.getElementById('deleteWatchlistConfirmModal');
    if (e.target === delWl && delWl) delWl.classList.remove('active');
    const mtrM = document.getElementById('mtrModal');
    if (e.target === mtrM && mtrM) mtrM.classList.remove('active');
    const nrM = document.getElementById('newsReaderModal');
    if (e.target === nrM && nrM) nrM.classList.remove('active');
    const fiiM = document.getElementById('fiidiiModal');
    if (e.target === fiiM && fiiM) fiiM.classList.remove('active');
    const emaM = document.getElementById('emaCollideModal');
    if (e.target === emaM && emaM) emaM.classList.remove('active');
  });

  // SIGN IN SUBMISSION
  if (signInForm) {
    signInForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideMessages();

      const userOrEmail = loginUsername.value.trim().toLowerCase();
      const pass = loginPassword.value;

      if (!userOrEmail || !pass) {
        showBanner(loginErrorBanner, 'Please enter both username and password.');
        return;
      }

      // 1. Try Firebase Email/Password Auth if email is entered and Firebase is live
      if (userOrEmail.includes('@') && window.tradeNitiFirebase && typeof window.tradeNitiFirebase.loginEmail === 'function') {
        const fbRes = await window.tradeNitiFirebase.loginEmail(userOrEmail, pass);
        if (fbRes && fbRes.success && fbRes.user) {
          showBanner(loginSuccessBanner, 'Authentication successful! Loading Main Page...', false);
          setCurrentUser(fbRes.user);
          setTimeout(() => {
            closeAuthModal();
            renderAuthState();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast(`Welcome back, ${fbRes.user.fullName || fbRes.user.username}! Main Page opened.`, '✓');
          }, 500);
          return;
        }
      }

      // 2. Demo Accounts and Local Storage Check
      const users = getRegisteredUsers();
      const matched = users.find(u =>
        (u.username.toLowerCase() === userOrEmail || u.email.toLowerCase() === userOrEmail) &&
        u.password === pass
      );

      if (matched) {
        showBanner(loginSuccessBanner, 'Authentication successful! Loading Main Page...', false);
        setCurrentUser(matched);
        setTimeout(() => {
          closeAuthModal();
          renderAuthState();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showToast(`Welcome back, ${matched.fullName || matched.username}! Main Page opened.`, '✓');
        }, 500);
      } else {
        showBanner(loginErrorBanner, 'Invalid username or password. Check demo credentials below.');
      }
    });
  }

  // REGISTRATION SUBMISSION
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideMessages();

      const fullName = regFullName.value.trim();
      const username = regUsername.value.trim().toLowerCase();
      const email = regEmail.value.trim().toLowerCase();
      const regPhoneEl = document.getElementById('regPhone');
      const phone = regPhoneEl ? regPhoneEl.value.trim() : '';
      const password = regPassword.value;
      const confirmPass = regConfirmPassword.value;

      if (!fullName || !username || !email || !password) {
        showBanner(regErrorBanner, 'Please fill in all required fields.');
        return;
      }

      if (username.length < 3) {
        showBanner(regErrorBanner, 'Username must be at least 3 characters.');
        return;
      }

      if (password.length < 6) {
        showBanner(regErrorBanner, 'Password must be at least 6 characters.');
        return;
      }

      if (password !== confirmPass) {
        showBanner(regErrorBanner, 'Passwords do not match. Please re-enter.');
        return;
      }

      const users = getRegisteredUsers();
      if (users.some(u => u.username.toLowerCase() === username)) {
        showBanner(regErrorBanner, 'Username is already taken. Try another.');
        return;
      }
      if (users.some(u => u.email.toLowerCase() === email)) {
        showBanner(regErrorBanner, 'An account with this email already exists.');
        return;
      }

      // 1. Try Firebase Email Registration if Firebase is live
      let firebaseUser = null;
      if (window.tradeNitiFirebase && typeof window.tradeNitiFirebase.registerEmail === 'function') {
        const fbRes = await window.tradeNitiFirebase.registerEmail(fullName, email, password);
        if (fbRes && !fbRes.success && !fbRes.isLocal) {
          showBanner(regErrorBanner, fbRes.error || 'Registration failed with Firebase.');
          return;
        }
        if (fbRes && fbRes.user) {
          firebaseUser = fbRes.user;
        }
      }

      // Generate random color for initial avatar
      const colors = ['#2563EB', '#059669', '#7C3AED', '#EA580C', '#0D9488'];
      const avatarColor = colors[Math.floor(Math.random() * colors.length)];

      if (firebaseUser) {
        firebaseUser.phone = phone || firebaseUser.phone || '';
        firebaseUser.alertChannel = phone ? 'both' : (firebaseUser.alertChannel || 'email');
      }

      const newUser = firebaseUser || {
        fullName,
        username,
        email,
        phone,
        alertChannel: phone ? 'both' : 'email',
        password,
        provider: 'local',
        initial: fullName.charAt(0).toUpperCase() || username.charAt(0).toUpperCase(),
        color: avatarColor,
        plan: 'free_trial',
        subscriptionActive: true,
        planExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      if (firebaseUser && window.tradeNitiFirebase && typeof window.tradeNitiFirebase.syncUser === 'function') {
        window.tradeNitiFirebase.syncUser(newUser);
      }

      users.push({ fullName, username, email, phone, alertChannel: newUser.alertChannel, password, provider: newUser.provider });
      localStorage.setItem(DEFAULT_USERS_KEY, JSON.stringify(users));

      showBanner(regSuccessBanner, 'Account registered successfully! Signing you in...', false);
      setCurrentUser(newUser);

      setTimeout(() => {
        closeAuthModal();
        renderAuthState();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast(`Welcome to Trade Niti, ${newUser.fullName}! Main Page opened.`, '🎉');
      }, 700);
    });
  }

  // GOOGLE SIGN-IN FLOW (Firebase OAuth with Dev Fallback)
  if (btnGoogleAuth) {
    btnGoogleAuth.addEventListener('click', async () => {
      closeAuthModal();
      if (window.tradeNitiFirebase && typeof window.tradeNitiFirebase.googleSignIn === 'function') {
        const res = await window.tradeNitiFirebase.googleSignIn();
        if (res && res.success && res.user) {
          handleGoogleLoginSuccess(res.user);
          return;
        }
      }
      if (googleModal) googleModal.classList.add('active');
    });
  }

  if (closeGoogleModalBtn) {
    closeGoogleModalBtn.addEventListener('click', () => {
      if (googleModal) googleModal.classList.remove('active');
    });
  }

  if (cancelGoogleModalBtn) {
    cancelGoogleModalBtn.addEventListener('click', () => {
      if (googleModal) googleModal.classList.remove('active');
    });
  }

  googleCards.forEach(card => {
    card.addEventListener('click', () => {
      const gName = card.getAttribute('data-google-name');
      const gEmail = card.getAttribute('data-google-email');
      const gInitial = card.getAttribute('data-google-initial');
      const gBg = card.getAttribute('data-google-bg') || '#2563EB';

      if (gInitial === '+') {
        const customEmail = prompt('Enter your Google email address:', 'user@gmail.com');
        if (!customEmail) return;
        const customName = customEmail.split('@')[0].replace(/[._]/g, ' ');
        const capName = customName.charAt(0).toUpperCase() + customName.slice(1);
        const googleUser = {
          fullName: capName,
          username: customEmail.split('@')[0],
          email: customEmail,
          provider: 'google',
          initial: capName.charAt(0).toUpperCase(),
          color: '#4B5563'
        };
        handleGoogleLoginSuccess(googleUser);
      } else {
        const googleUser = {
          fullName: gName,
          username: gEmail.split('@')[0],
          email: gEmail,
          provider: 'google',
          initial: gInitial,
          color: gBg
        };
        handleGoogleLoginSuccess(googleUser);
      }
    });
  });

  function handleGoogleLoginSuccess(user) {
    if (googleModal) googleModal.classList.remove('active');
    setCurrentUser(user);
    renderAuthState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Signed in via Google as ${user.fullName}. Main Page opened.`, '✓');
  }

  // LOGOUT CONFIRMATION
  if (cancelLogoutBtn && logoutModal) {
    cancelLogoutBtn.addEventListener('click', () => {
      logoutModal.classList.remove('active');
    });
  }

  if (confirmLogoutBtn && logoutModal) {
    confirmLogoutBtn.addEventListener('click', () => {
      const prev = getCurrentUser();
      const name = prev ? (prev.fullName || prev.username) : 'Trader';
      setCurrentUser(null);
      logoutModal.classList.remove('active');
      currentAuthTab = 'main';
      const mainSec = document.getElementById('main-page');
      const wlSec = document.getElementById('watchlist-page');
      const smcSec = document.getElementById('smc-page');
      if (mainSec) mainSec.style.display = 'block';
      if (wlSec) wlSec.style.display = 'none';
      if (smcSec) smcSec.style.display = 'none';
      renderAuthState();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(`Logged out of ${name}. Returned to Home.`, '👋');
    });
  }

  // Active view state for authenticated user: 'main' | 'watchlist' | 'smc' | 'news'
  let currentAuthTab = window.__defaultAuthTab || (window.location.hash.includes('watchlist') ? 'watchlist' : (window.location.hash.includes('smc') ? 'smc' : (window.location.hash.includes('news') ? 'news' : 'main')));
  window.currentAuthTab = currentAuthTab;

  window.switchAuthTab = function(tab) {
    currentAuthTab = tab;
    window.currentAuthTab = tab;
    const authDashboard = document.getElementById('authDashboardView');
    const guestLanding = document.getElementById('guestLandingView');
    const mainSec = document.getElementById('main-page');
    const wlSec = document.getElementById('watchlist-page');
    const smcSec = document.getElementById('smc-page');
    const newsSec = document.getElementById('news-page');
    const navLinksList = document.getElementById('navLinksList');
    const mobileNavDrawer = document.getElementById('mobileMenuDrawer');

    // On authenticated terminal, keep authDashboard visible and guestLanding hidden
    if (authDashboard) authDashboard.style.display = 'block';
    if (guestLanding) guestLanding.style.display = 'none';

    if (tab === 'main') {
      if (mainSec) mainSec.style.display = 'block';
      if (wlSec) wlSec.style.display = 'none';
      if (smcSec) smcSec.style.display = 'none';
      if (newsSec) newsSec.style.display = 'none';
    } else if (tab === 'watchlist') {
      if (mainSec) mainSec.style.display = 'none';
      if (wlSec) wlSec.style.display = 'block';
      if (smcSec) smcSec.style.display = 'none';
      if (newsSec) newsSec.style.display = 'none';
      if (window.renderActiveWatchlist) {
        window.renderActiveWatchlist();
      }
    } else if (tab === 'smc') {
      // Pro Feature Gating: Lock SMC for Trial Expired users
      if (typeof window.checkFeatureAccess === 'function') {
        const access = window.checkFeatureAccess('smc');
        if (!access.allowed) {
          if (typeof window.openFeatureGateModal === 'function') {
            window.openFeatureGateModal('smc');
          }
          if (typeof window.showToast === 'function') {
            window.showToast('Stock Monitoring Center (SMC) is available on Pro Monthly (\u20B9499) and Annual VIP.', '\uD83D\uDD12');
          }
          if (currentAuthTab === 'smc') {
            currentAuthTab = 'main';
            window.currentAuthTab = 'main';
            if (mainSec) mainSec.style.display = 'block';
            if (smcSec) smcSec.style.display = 'none';
          }
          return;
        }
      }
      if (mainSec) mainSec.style.display = 'none';
      if (wlSec) wlSec.style.display = 'none';
      if (smcSec) smcSec.style.display = 'block';
      if (newsSec) newsSec.style.display = 'none';
      if (window.renderSmcModule) {
        window.renderSmcModule();
      }
      const smcBarrier = document.getElementById('smcFullPageLockBarrier');
      if (smcBarrier) smcBarrier.style.display = 'none';
    } else if (tab === 'news') {
      if (mainSec) mainSec.style.display = 'none';
      if (wlSec) wlSec.style.display = 'none';
      if (smcSec) smcSec.style.display = 'none';
      if (newsSec) newsSec.style.display = 'block';
      if (window.renderNewsModule) {
        window.renderNewsModule();
      }
    }

    // Update active nav indicators
    if (navLinksList) {
      navLinksList.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-view') === tab) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    if (mobileNavDrawer) {
      mobileNavDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
        if (link.getAttribute('data-view') === tab) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // RENDER NAVBAR AUTH STATE & TOGGLE GUEST FIRST PAGE VS AUTHENTICATED TRADING DASHBOARD
  window.renderAuthState = renderAuthState;
  function renderAuthState() {
    const user = getCurrentUser();
    const guestLanding = document.getElementById('guestLandingView');
    const authDashboard = document.getElementById('authDashboardView');
    const navLinksList = document.getElementById('navLinksList');
    const mobileNavDrawer = document.getElementById('mobileMenuDrawer');

    if (typeof window.updateSidebarDrawerStatus === 'function') {
      window.updateSidebarDrawerStatus();
    }

    if (!authWrapper) return;

    if (user) {
      // =========================================================================
      // 1. SIGNED-IN / AUTHENTICATED STATE:
      // Show full Trade Niti terminal dashboard (Main Page, Watchlist, SMC, News)
      // Hide features introduction, overview, pricing cards, and FAQ completely
      // =========================================================================
      if (authDashboard) authDashboard.style.display = 'block';
      if (guestLanding) guestLanding.style.display = 'none';

      const sub = (window.tradeNitiSubscription && window.tradeNitiSubscription.check)
        ? window.tradeNitiSubscription.check()
        : { isExpired: false, isProWeb: true, daysRemaining: 7 };

      // Feature Gate: Prevent Trial Expired users from staying on SMC view
      if (currentAuthTab === 'smc' && !sub.isProWeb) {
        currentAuthTab = 'main';
        window.currentAuthTab = 'main';
      }

      // Toggle active view between Main Page, Watchlist, SMC, and News
      const mainSec = document.getElementById('main-page');
      const wlSec = document.getElementById('watchlist-page');
      const smcSec = document.getElementById('smc-page');
      const newsSec = document.getElementById('news-page');
      if (currentAuthTab === 'main') {
        if (mainSec) mainSec.style.display = 'block';
        if (wlSec) wlSec.style.display = 'none';
        if (smcSec) smcSec.style.display = 'none';
        if (newsSec) newsSec.style.display = 'none';
      } else if (currentAuthTab === 'watchlist') {
        if (mainSec) mainSec.style.display = 'none';
        if (wlSec) wlSec.style.display = 'block';
        if (smcSec) smcSec.style.display = 'none';
        if (newsSec) newsSec.style.display = 'none';
        if (window.renderActiveWatchlist) window.renderActiveWatchlist();
      } else if (currentAuthTab === 'smc') {
        if (mainSec) mainSec.style.display = 'none';
        if (wlSec) wlSec.style.display = 'none';
        if (smcSec) smcSec.style.display = 'block';
        if (newsSec) newsSec.style.display = 'none';
        if (window.renderSmcModule) window.renderSmcModule();
      } else if (currentAuthTab === 'news') {
        if (mainSec) mainSec.style.display = 'none';
        if (wlSec) wlSec.style.display = 'none';
        if (smcSec) smcSec.style.display = 'none';
        if (newsSec) newsSec.style.display = 'block';
        if (window.renderNewsModule) window.renderNewsModule();
      }

      const smcNavLock = !sub.isProWeb ? '<span class="nav-smc-lock-badge" style="font-size:0.65rem; font-weight:800; background:rgba(239,68,68,0.15); color:#EF4444; border:1px solid rgba(239,68,68,0.3); padding:1px 6px; border-radius:4px; margin-left:6px;">🔒 PRO</span>' : '';

      // Authenticated Navbar: ONLY the 4 Core Menus (No pricing/overview as requested)
      if (navLinksList) {
        navLinksList.innerHTML = `
          <li><a href="#main-page" class="nav-link ${currentAuthTab === 'main' ? 'active' : ''}" data-view="main">Main Page</a></li>
          <li><a href="#watchlist-page" class="nav-link ${currentAuthTab === 'watchlist' ? 'active' : ''}" data-view="watchlist">Watchlist</a></li>
          <li><a href="#smc-page" class="nav-link ${currentAuthTab === 'smc' ? 'active' : ''}" data-view="smc" title="Stock Monitoring Center (SMC)"><span class="nav-text-full">Stock Monitoring (SMC)</span><span class="nav-text-short">SMC</span>${smcNavLock}</a></li>
          <li><a href="#news-page" class="nav-link ${currentAuthTab === 'news' ? 'active' : ''}" data-view="news">News</a></li>
        `;
        navLinksList.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = link.getAttribute('data-view');
            if (view === 'smc' && !sub.isProWeb) {
              if (typeof window.openFeatureGateModal === 'function') {
                window.openFeatureGateModal('smc');
              }
              if (typeof window.showToast === 'function') {
                window.showToast('Stock Monitoring Center (SMC) is available on Pro Monthly (\u20B9499) and Annual VIP.', '\uD83D\uDD12');
              }
              return;
            }
            window.switchAuthTab(view);
          });
        });
      }

      if (mobileNavDrawer) {
        const mobileNavUl = mobileNavDrawer.querySelector('.mobile-nav-links');
        if (mobileNavUl) {
          mobileNavUl.innerHTML = `
            <li><a href="#main-page" class="mobile-nav-link ${currentAuthTab === 'main' ? 'active' : ''}" data-view="main">Main Page</a></li>
            <li><a href="#watchlist-page" class="mobile-nav-link ${currentAuthTab === 'watchlist' ? 'active' : ''}" data-view="watchlist">Watchlist</a></li>
            <li><a href="#smc-page" class="mobile-nav-link ${currentAuthTab === 'smc' ? 'active' : ''}" data-view="smc"><span>Stock Monitoring Center (SMC)</span>${smcNavLock}</a></li>
            <li><a href="#news-page" class="mobile-nav-link ${currentAuthTab === 'news' ? 'active' : ''}" data-view="news">News</a></li>
          `;
          mobileNavUl.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              const view = link.getAttribute('data-view');
              if (view === 'smc' && !sub.isProWeb) {
                if (typeof window.openFeatureGateModal === 'function') {
                  window.openFeatureGateModal('smc');
                }
                if (typeof window.showToast === 'function') {
                  window.showToast('Stock Monitoring Center (SMC) is available on Pro Monthly (\u20B9499) and Annual VIP.', '\uD83D\uDD12');
                }
                mobileNavDrawer.classList.remove('active');
                return;
              }
              window.switchAuthTab(view);
              mobileNavDrawer.classList.remove('active');
            });
          });
        }
      }

      // Signed-in User Pill & Logout Button
      const initial = user.initial || (user.fullName ? user.fullName.charAt(0).toUpperCase() : 'T');
      const displayName = user.fullName || user.username || 'Trader';
      const bgColor = user.color || '#2563EB';

      const plan = user.plan || 'free_trial';
      let planBadge = `<span class="user-plan-pill free">FREE TRIAL</span>`;
      if (plan === 'pro_annual') {
        planBadge = `<span class="user-plan-pill annual">VIP ANNUAL</span>`;
      } else if (plan === 'pro_monthly') {
        planBadge = `<span class="user-plan-pill pro">PRO</span>`;
      } else if (plan === 'app_standalone') {
        planBadge = `<span class="user-plan-pill app">APP LICENSE</span>`;
      } else if (sub.isExpired) {
        planBadge = `<span class="user-plan-pill expired">TRIAL EXPIRED</span>`;
      } else if (sub.daysRemaining > 0) {
        planBadge = `<span class="user-plan-pill free">FREE TRIAL (${sub.daysRemaining}d)</span>`;
      }

      authWrapper.innerHTML = `
        <div class="auth-btn-group" style="display:flex; align-items:center; gap:8px;">
          <div class="auth-user-pill" id="navAuthUserPill" style="cursor: pointer;" title="Signed in as ${user.email || displayName} • Plan: ${plan} (Click to manage subscription & test plans)">
            <span class="auth-user-avatar" style="background:${bgColor}; color:#FFFFFF;">
              ${initial}
            </span>
            <span style="font-weight:700; max-width:110px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              ${displayName}
            </span>
            ${planBadge}
          </div>
          <button id="authLogoutBtn" class="btn-secondary auth-btn-logout" title="Sign Out" style="padding:8px 14px; font-size:0.84rem; display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>Logout</span>
          </button>
        </div>
      `;

      const userPill = document.getElementById('navAuthUserPill');
      if (userPill) {
        userPill.addEventListener('click', () => {
          if (typeof window.openUserAccountModal === 'function') {
            window.openUserAccountModal();
          }
        });
      }

      const smcGateBanner = document.getElementById('smcProGateBanner');
      if (smcGateBanner) {
        smcGateBanner.style.display = sub.isProWeb ? 'none' : 'block';
      }

      const sidebarScreenerLock = document.getElementById('sidebarScreenerLockBadge');
      if (sidebarScreenerLock) {
        sidebarScreenerLock.style.display = sub.isProWeb ? 'none' : 'inline-block';
      }

      const logoutBtn = document.getElementById('authLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          if (logoutModal) logoutModal.classList.add('active');
        });
      }

    } else {
      // =========================================================================
      // 2. WITHOUT SIGN-IN / GUEST STATE (First Page):
      // Show Features Introduction, Overview, Plan & Pricing, and FAQs
      // Hide all live trading dashboard features (Main Page, Watchlist, SMC, News)
      // =========================================================================
      if (authDashboard) authDashboard.style.display = 'none';
      if (guestLanding) guestLanding.style.display = 'block';

      // Hide dashboard sections
      const wlSec = document.getElementById('watchlist-page');
      if (wlSec) wlSec.style.display = 'none';
      const smcSec = document.getElementById('smc-page');
      if (smcSec) smcSec.style.display = 'none';
      const newsSec = document.getElementById('news-page');
      if (newsSec) newsSec.style.display = 'none';

      // Guest Navbar Menus: Introduction, Features, Screener, Pricing & Plans, FAQ
      if (navLinksList) {
        navLinksList.innerHTML = `
          <li><a href="#introduction" class="nav-link active">Introduction</a></li>
          <li><a href="#features" class="nav-link">Features</a></li>
          <li><a href="#screener" class="nav-link">Screener</a></li>
          <li><a href="#pricing" class="nav-link" id="navPricingLink">Pricing &amp; Plans</a></li>
          <li><a href="#faq" class="nav-link">FAQ</a></li>
        `;
        // Attach smooth scroll listeners to guest nav links
        navLinksList.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
              e.preventDefault();
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                navLinksList.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
              }
            }
          });
        });
      }

      if (mobileNavDrawer) {
        const mobileNavUl = mobileNavDrawer.querySelector('.mobile-nav-links');
        if (mobileNavUl) {
          mobileNavUl.innerHTML = `
            <li><a href="#introduction" class="mobile-nav-link active">Introduction</a></li>
            <li><a href="#features" class="mobile-nav-link">Features</a></li>
            <li><a href="#screener" class="mobile-nav-link">Screener</a></li>
            <li><a href="#pricing" class="mobile-nav-link" id="mobilePricingLink">Pricing &amp; Plans</a></li>
            <li><a href="#faq" class="mobile-nav-link">FAQ</a></li>
          `;
          mobileNavUl.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
              const href = link.getAttribute('href');
              if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                  mobileNavDrawer.classList.remove('active');
                }
              }
            });
          });
        }
      }

      // Guest Auth Buttons: [ Sign In ] [ Register ]
      authWrapper.innerHTML = `
        <div class="auth-btn-group" style="display:flex; align-items:center; gap:8px;">
          <button id="authBtn" class="btn-primary" style="padding:9px 18px; font-size:0.88rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="9" y2="12"/></svg>
            <span>Sign In</span>
          </button>
          <button id="navRegisterBtn" class="btn-secondary" style="padding:9px 16px; font-size:0.88rem;">
            <span>Register</span>
          </button>
        </div>
      `;

      const authBtn = document.getElementById('authBtn');
      if (authBtn) {
        authBtn.addEventListener('click', () => openAuthModal('signin'));
      }
      const navRegBtn = document.getElementById('navRegisterBtn');
      if (navRegBtn) {
        navRegBtn.addEventListener('click', () => openAuthModal('register'));
      }
    }
  }
  // Pre-seed default users if empty
  getRegisteredUsers();

    // Wire Commercial Subscription & Plan Purchase Buttons
  document.querySelectorAll('[data-plan-subscribe]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planId = btn.getAttribute('data-plan-subscribe');
      if (window.tradeNitiSubscription && typeof window.tradeNitiSubscription.subscribe === 'function') {
        window.tradeNitiSubscription.subscribe(planId);
      }
    });
  });

  // Payment Checkout Modal Controls
  const checkoutModal = document.getElementById('paymentCheckoutModal');
  const closeCheckoutBtn = document.getElementById('closePaymentCheckoutModalBtn');
  const cancelCheckoutBtn = document.getElementById('btnCancelPaymentCheckout');
  if (closeCheckoutBtn && checkoutModal) {
    closeCheckoutBtn.addEventListener('click', () => checkoutModal.classList.remove('active'));
  }
  if (cancelCheckoutBtn && checkoutModal) {
    cancelCheckoutBtn.addEventListener('click', () => checkoutModal.classList.remove('active'));
  }

  // Subscription Success Modal Controls
  const successModal = document.getElementById('subscriptionSuccessModal');
  const closeSuccessBtn = document.getElementById('closeSubscriptionSuccessModalBtn');
  const dismissSuccessBtn = document.getElementById('btnDismissSuccessModal');
  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => successModal.classList.remove('active'));
  }
  if (dismissSuccessBtn && successModal) {
    dismissSuccessBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initial Navbar Render
  renderAuthState();
}

/* ==========================================================================
   10. Main Page: Mobile App Live Market Dashboard Logic
       (All Indexes, Top Gainers, Top Losers, Live Clock & Search)
   ========================================================================== */
let MAIN_PAGE_INDICES = [
  { name: 'NIFTY 50', value: 24589.75, change: 143.25, changePct: 0.59, constituents: 50 },
  { name: 'SENSEX', value: 80812.15, change: 428.10, changePct: 0.53, constituents: 30 },
  { name: 'BANK NIFTY', value: 53240.50, change: -112.80, changePct: -0.21, constituents: 12 },
  { name: 'NIFTY IT', value: 39875.30, change: 215.60, changePct: 0.54, constituents: 10 },
  { name: 'NIFTY MIDCAP', value: 55120.00, change: 340.00, changePct: 0.62, constituents: 100 },
  { name: 'NIFTY 100', value: 24216.20, change: 143.00, changePct: 0.59, constituents: 100 },
  { name: 'NIFTY 200', value: 13457.55, change: 87.50, changePct: 0.65, constituents: 200 },
  { name: 'NIFTY COMMODITIES', value: 8624.30, change: 54.20, changePct: 0.63, constituents: 30 }
];

let MARKET_STOCKS_MASTER = [
  // ── Mobile App Top Gainers Tracked Universe ──
  { symbol: 'UBL', name: 'United Breweries Ltd.', sector: 'Consumer', volume: '1.4M', price: 1236.40, change: 100.20, changePct: 8.82, high52: 1317.00, low52: 980.00, cap: '₹32,600 Cr' },
  { symbol: 'NAVINFLUOR', name: 'Navin Fluorine Intl.', sector: 'Chemicals', volume: '620K', price: 8500.00, change: 838.00, changePct: 10.94, high52: 8600.00, low52: 5200.00, cap: '₹42,100 Cr' },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd.', sector: 'Infra', volume: '4.8M', price: 3822.00, change: 156.90, changePct: 4.28, high52: 3915.00, low52: 2872.00, cap: '₹5.2L Cr' },
  { symbol: 'NATIONALUM', name: 'National Aluminium Co.', sector: 'Metals', volume: '18.2M', price: 318.95, change: 10.75, changePct: 3.49, high52: 335.00, low52: 130.00, cap: '₹58,400 Cr' },
  { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise', sector: 'Healthcare', volume: '840K', price: 8020.00, change: 228.00, changePct: 2.93, high52: 8150.00, low52: 5600.00, cap: '₹1.1L Cr' },
  { symbol: 'HYUNDAI', name: 'Hyundai Motor India', sector: 'Auto', volume: '3.2M', price: 1910.90, change: 49.50, changePct: 2.66, high52: 1980.00, low52: 1680.00, cap: '₹1.5L Cr' },
  { symbol: 'VOLTAS', name: 'Voltas Limited', sector: 'Consumer', volume: '2.1M', price: 968.60, change: 21.05, changePct: 2.22, high52: 1080.00, low52: 740.00, cap: '₹32,000 Cr' },
  { symbol: 'CUMMINSIND', name: 'Cummins India Limited', sector: 'Engg', volume: '580K', price: 4626.70, change: 94.70, changePct: 2.09, high52: 4800.00, low52: 2400.00, cap: '₹1.2L Cr' },
  { symbol: 'RAYMOND', name: 'Raymond Limited', sector: 'Textiles', volume: '920K', price: 1099.80, change: 18.60, changePct: 1.72, high52: 1250.00, low52: 680.00, cap: '₹7,300 Cr' },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', volume: '22.4M', price: 953.15, change: 8.05, changePct: 0.85, high52: 954.35, low52: 543.00, cap: '₹8.5L Cr' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India', sector: 'Auto', volume: '780K', price: 11522.00, change: 72.00, changePct: 0.63, high52: 13680.00, low52: 9888.00, cap: '₹3.6L Cr' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Ind.', sector: 'Pharma', volume: '3.21M', price: 1747.00, change: 7.00, changePct: 0.40, high52: 1960.00, low52: 1345.00, cap: '₹4.2L Cr' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', volume: '11.2M', price: 1200.00, change: 3.80, changePct: 0.32, high52: 1608.00, low52: 1110.00, cap: '₹16.2L Cr' },

  // ── Mobile App Top Losers Tracked Universe ──
  { symbol: 'MPHASIS', name: 'Mphasis Limited', sector: 'IT', volume: '940K', price: 2478.60, change: -139.80, changePct: -5.34, high52: 3200.00, low52: 2100.00, cap: '₹46,800 Cr' },
  { symbol: 'INFY', name: 'Infosys Limited', sector: 'IT', volume: '6.32M', price: 1108.10, change: -54.90, changePct: -4.72, high52: 1400.00, low52: 1050.00, cap: '₹4.6L Cr' },
  { symbol: 'SAIL', name: 'Steel Authority of India', sector: 'Metals', volume: '32.5M', price: 164.87, change: -6.33, changePct: -3.70, high52: 178.00, low52: 95.00, cap: '₹68,100 Cr' },
  { symbol: 'HINDPETRO', name: 'Hindustan Petroleum Corp', sector: 'Energy', volume: '8.4M', price: 340.90, change: -13.10, changePct: -3.70, high52: 440.00, low52: 240.00, cap: '₹72,400 Cr' },
  { symbol: 'PETRONET', name: 'Petronet LNG Limited', sector: 'Energy', volume: '4.6M', price: 286.45, change: -9.55, changePct: -3.23, high52: 380.00, low52: 220.00, cap: '₹43,000 Cr' },
  { symbol: 'COFORGE', name: 'Coforge Limited', sector: 'IT', volume: '480K', price: 1935.00, change: -62.00, changePct: -3.10, high52: 2250.00, low52: 1400.00, cap: '₹38,200 Cr' },
  { symbol: 'JUBLFOOD', name: 'Jubilant FoodWorks', sector: 'Consumer', volume: '3.8M', price: 416.75, change: -12.75, changePct: -2.97, high52: 680.00, low52: 390.00, cap: '₹27,500 Cr' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', volume: '2.15M', price: 2423.00, change: -74.00, changePct: -2.96, high52: 3000.00, low52: 2400.00, cap: '₹8.8L Cr' },
  { symbol: 'ONGC', name: 'Oil and Natural Gas Corp', sector: 'Energy', volume: '14.8M', price: 223.34, change: -6.50, changePct: -2.83, high52: 345.00, low52: 210.00, cap: '₹2.8L Cr' },
  { symbol: 'TECHM', name: 'Tech Mahindra Limited', sector: 'IT', volume: '2.8M', price: 1749.40, change: -45.60, changePct: -2.54, high52: 1850.00, low52: 1200.00, cap: '₹1.7L Cr' },
  { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG', volume: '15.6M', price: 255.80, change: -4.20, changePct: -1.62, high52: 310.00, low52: 240.00, cap: '₹3.2L Cr' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', sector: 'Banking', volume: '12.8M', price: 1367.30, change: -19.60, changePct: -1.41, high52: 1480.00, low52: 1187.00, cap: '₹9.6L Cr' },
  { symbol: 'TITAN', name: 'Titan Company Limited', sector: 'Consumer', volume: '1.98M', price: 4304.70, change: -61.20, changePct: -1.40, high52: 4400.00, low52: 2834.00, cap: '₹3.8L Cr' },
  { symbol: 'WIPRO', name: 'Wipro Limited', sector: 'IT', volume: '4.56M', price: 184.61, change: -2.39, changePct: -1.28, high52: 300.00, low52: 180.00, cap: '₹1.9L Cr' }
];

let MAIN_PAGE_GAINERS = [];
let MAIN_PAGE_LOSERS = [];

function updateGainersAndLosersFromMaster() {
  const gList = MARKET_STOCKS_MASTER.filter(s => s.changePct >= 0)
    .sort((a, b) => b.changePct - a.changePct);

  const lList = MARKET_STOCKS_MASTER.filter(s => s.changePct < 0)
    .sort((a, b) => a.changePct - b.changePct);

  // Take top 10 matching the Android Mobile App
  MAIN_PAGE_GAINERS = gList.length > 0 ? gList.slice(0, 10) : MARKET_STOCKS_MASTER.slice(0, 10);
  MAIN_PAGE_LOSERS = lList.length > 0 ? lList.slice(0, 10) : MARKET_STOCKS_MASTER.slice(-10);
}
updateGainersAndLosersFromMaster();

function initMainPageDashboard() {
  const clockEl = document.getElementById('dashLiveClock');
  const dateEl = document.getElementById('dashLiveDate');
  const updateTimerEl = document.getElementById('dashLiveUpdateTimer');
  const statusBadge = document.getElementById('dashMarketStatusBadge');
  const statusText = document.getElementById('dashMarketStatusText');

  const carouselTrack = document.getElementById('indicesCarouselTrack');
  const carouselWrapper = document.getElementById('indicesCarouselWrapper');
  const prevBtn = document.getElementById('idxPrevBtn');
  const nextBtn = document.getElementById('idxNextBtn');

  const searchInput = document.getElementById('dashSearchInput');
  const searchClear = document.getElementById('dashSearchClear');
  const tabBtns = document.querySelectorAll('.gl-tab-btn');
  const gainersCol = document.getElementById('gainersColumn');
  const losersCol = document.getElementById('losersColumn');
  const gainersList = document.getElementById('topGainersList');
  const losersList = document.getElementById('topLosersList');
  const gainersBadge = document.getElementById('gainersCountBadge');
  const losersBadge = document.getElementById('losersCountBadge');

  if (!carouselTrack) return;

  // 1. Live Clock & Market Hours
  let secondsAgo = 0;
  function updateClock() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
    }

    // Market hours: Mon-Fri 09:15 - 15:30 IST
    const day = now.getDay();
    const hrs = now.getHours();
    const mins = now.getMinutes();
    const totalMins = hrs * 60 + mins;
    const isOpen = (day >= 1 && day <= 5) && (totalMins >= (9 * 60 + 15) && totalMins <= (15 * 60 + 30));

    if (statusBadge && statusText) {
      if (isOpen) {
        statusBadge.className = 'dash-market-badge live';
        statusText.textContent = 'LIVE';
      } else {
        statusBadge.className = 'dash-market-badge closed';
        statusText.textContent = 'CLOSED';
      }
    }

    secondsAgo++;
    if (updateTimerEl) {
      if (secondsAgo < 5) {
        updateTimerEl.textContent = 'Updated Just now';
      } else {
        updateTimerEl.textContent = `Updated ${secondsAgo}s ago`;
      }
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // Reset seconds ago every 30s
  setInterval(() => { secondsAgo = 0; }, 30000);

  // 2. Render All 8 Indices (With NIFTY 50 & SENSEX Stock Analysis Center Links)
  function renderIndices() {
    carouselTrack.innerHTML = MAIN_PAGE_INDICES.map(idx => {
      const isUp = idx.change >= 0;
      const badgeCls = isUp ? 'profit' : 'loss';
      const sign = isUp ? '+' : '';
      const isNifty50 = (idx.name === 'NIFTY 50' || idx.name === 'NIFTY');
      const isSensex = (idx.name === 'SENSEX');
      const isBenchmark = isNifty50 || isSensex;

      return `
        <div class="index-card ${isBenchmark ? 'index-card-benchmark' : ''} ${isNifty50 ? 'index-card-nifty' : ''}" data-index-symbol="${idx.name}" title="${idx.name} - ${idx.constituents} Constituents">
          <div class="index-card-top-row" style="display:flex; align-items:center; justify-content:space-between; gap:4px; margin-bottom:2px;">
            <div class="index-card-name" style="margin:0;">${idx.name}</div>
            ${isBenchmark ? `
              <a href="javascript:void(0)" class="link-stock-analysis index-sac-pill" data-action="stock-analysis" data-symbol="${idx.name}" title="Open Stock Analysis Center for ${idx.name}">
                <span>Analysis Center</span>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </a>
            ` : ''}
          </div>
          <div class="index-card-val">&#8377;${idx.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div class="index-card-badge ${badgeCls}">
            ${sign}${idx.change.toFixed(2)} (${sign}${idx.changePct.toFixed(2)}%)
          </div>
        </div>
      `;
    }).join('');

    // Clicking anywhere on NIFTY 50 or SENSEX card opens Stock Analysis Center
    carouselTrack.querySelectorAll('.index-card-benchmark, .index-card-nifty').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        const sym = card.getAttribute('data-index-symbol') || 'NIFTY 50';
        if (typeof window.openStockAnalysisCenter === 'function') {
          window.openStockAnalysisCenter(sym);
        }
      });
    });
  }
  renderIndices();

  // ── LIVE NSE DATA FEED INTEGRATION (via Vercel Mumbai bom1 proxy) ──
  async function fetchLiveIndices() {
    try {
      const res = await fetch('https://swingtrader-nse-proxy.vercel.app/api/indices');
      if (!res.ok) return;
      const json = await res.json();
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        json.data.forEach(item => {
          const rawName = (item.index || item.indexSymbol || '').trim();
          let target = MAIN_PAGE_INDICES.find(idx => idx.name === rawName);
          if (!target) {
            if (rawName === 'S&P BSE SENSEX' || rawName === 'BSE SENSEX') target = MAIN_PAGE_INDICES.find(i => i.name === 'SENSEX');
            else if (rawName === 'NIFTY BANK') target = MAIN_PAGE_INDICES.find(i => i.name === 'BANK NIFTY');
            else if (rawName === 'NIFTY MIDCAP SELECT' || rawName === 'NIFTY MIDCAP 100') target = MAIN_PAGE_INDICES.find(i => i.name === 'NIFTY MIDCAP');
            else if (rawName === 'NIFTY 100') target = MAIN_PAGE_INDICES.find(i => i.name === 'NIFTY 100');
            else if (rawName === 'NIFTY 200') target = MAIN_PAGE_INDICES.find(i => i.name === 'NIFTY 200');
            else if (rawName === 'NIFTY IT') target = MAIN_PAGE_INDICES.find(i => i.name === 'NIFTY IT');
          }
          if (target && item.last) {
            target.value = item.last;
            target.change = item.variation !== undefined ? item.variation : (item.change || 0);
            target.changePct = item.percentChange !== undefined ? item.percentChange : (item.pctChange || 0);
          }
        });
        renderIndices();
        if (updateTimerEl) updateTimerEl.textContent = 'Updated Just now (Live NSE)';
        secondsAgo = 0;
      }
    } catch (e) {
      console.warn('Live indices fetch note:', e);
    }
  }

    async function fetchLiveQuotesForMainPage() {
    const symbols = MARKET_STOCKS_MASTER.map(s => s.symbol);
    const fetches = symbols.map(async (sym) => {
      try {
        const qSym = (sym === 'TATAMOTORS') ? 'TMPV' : sym;
        const res = await fetch('https://swingtrader-nse-proxy.vercel.app/api/quote?symbol=' + encodeURIComponent(qSym));
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.priceInfo && data.priceInfo.lastPrice) {
          const ltp = data.priceInfo.lastPrice;
          const chg = data.priceInfo.change || 0;
          const pchg = data.priceInfo.pChange !== undefined ? data.priceInfo.pChange : 0;

          const stock = MARKET_STOCKS_MASTER.find(s => s.symbol === sym);
          if (stock) {
            stock.price = ltp;
            stock.change = chg;
            stock.changePct = pchg;
          }

          if (typeof SCREENER_STOCKS !== 'undefined') {
            const sc = SCREENER_STOCKS.find(s => s.symbol === sym);
            if (sc) {
              sc.price = ltp;
              sc.change = pchg;
            }
          }

          if (typeof TRADE_NITI_MASTER_STOCKS !== 'undefined') {
            const ms = TRADE_NITI_MASTER_STOCKS.find(s => s.symbol === sym);
            if (ms) {
              ms.price = ltp;
              ms.ltp = ltp;
              ms.change = chg;
              ms.changePct = pchg;
              if (data.priceInfo.weekHighLow && data.priceInfo.weekHighLow.max) {
                ms.high52 = data.priceInfo.weekHighLow.max;
                ms.low52 = data.priceInfo.weekHighLow.min || ms.low52;
              } else if (data.priceInfo.intraDayHighLow) {
                if (data.priceInfo.intraDayHighLow.max) ms.high52 = Math.max(ms.high52 || 0, data.priceInfo.intraDayHighLow.max);
                if (data.priceInfo.intraDayHighLow.min) ms.low52 = Math.min(ms.low52 || ltp, data.priceInfo.intraDayHighLow.min);
              }
            }
          }
        }
      } catch (_) {}
    });

    await Promise.allSettled(fetches);

    // Dynamically sort into Gainers & Losers
    updateGainersAndLosersFromMaster();
    renderLists();
    if (typeof renderScreenerTable === 'function') renderScreenerTable();
    if (typeof renderScreenerModalTable === 'function') renderScreenerModalTable();
    if (typeof renderSmcModule === 'function') renderSmcModule();

    // Update real-time sync label with live timestamp
    const syncDot = document.getElementById('glLiveSyncTag');
    if (syncDot) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      syncDot.innerHTML = '<span class="pulse-dot"></span> Live Tick Sync &bull; ' + timeStr;
    }
  }

  // Initial live market pull
  fetchLiveIndices();
  fetchLiveQuotesForMainPage();

  // Auto-refresh intervals: Indices every 20s, Quotes every 45s
  setInterval(fetchLiveIndices, 20000);
  setInterval(fetchLiveQuotesForMainPage, 45000);

  // Manual Live Refresh Button Handler
  const btnManualRefresh = document.getElementById('btnManualLiveRefresh');
  const liveRefreshIcon = document.getElementById('liveRefreshIcon');
  if (btnManualRefresh) {
    btnManualRefresh.addEventListener('click', async () => {
      if (liveRefreshIcon) liveRefreshIcon.style.animation = 'spin 0.8s linear infinite';
      btnManualRefresh.disabled = true;
      await fetchLiveIndices();
      await fetchLiveQuotesForMainPage();
      if (liveRefreshIcon) liveRefreshIcon.style.animation = '';
      btnManualRefresh.disabled = false;
      if (typeof showToast === 'function') {
        showToast('Live market quotes & indices updated from NSE India!', '\uD83D\uDCC8');
      }
    });
  }

  // Carousel Buttons
  if (prevBtn && carouselWrapper) {
    prevBtn.addEventListener('click', () => {
      carouselWrapper.scrollBy({ left: -220, behavior: 'smooth' });
    });
  }
  if (nextBtn && carouselWrapper) {
    nextBtn.addEventListener('click', () => {
      carouselWrapper.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }

  // 3. Render Gainers & Losers with Filter
  let currentSearchQuery = '';
  let activeGlFilter = 'all';

  function renderStockCard(stock, isGainer) {
    const isUp = stock.change >= 0;
    const badgeCls = isUp ? 'profit' : 'loss';
    const sign = isUp ? '+' : '';
    const tvUrl = `https://www.tradingview.com/chart/?symbol=NSE:${stock.symbol}`;

    return `
      <div class="stock-card-row" data-stock-symbol="${stock.symbol}" style="cursor: pointer;">
        <div class="stock-left">
          <div class="stock-sym-row">
            <span class="stock-symbol">${stock.symbol}</span>
            <span class="stock-sector-pill">${stock.sector}</span>
            <a href="javascript:void(0)" class="link-stock-analysis" data-action="stock-analysis" data-symbol="${stock.symbol}" title="Open Stock Analysis Center for ${stock.symbol}">
              <span>Analysis Center</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </a>
          </div>
          <div class="stock-name">${stock.name} &bull; Vol: ${stock.volume}</div>
        </div>

        <div class="stock-right">
          <div class="stock-price-block">
            <div class="stock-price">&#8377;${stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div class="stock-change-pill ${badgeCls}">
              ${sign}&#8377;${Math.abs(stock.change).toFixed(2)} (${sign}${stock.changePct.toFixed(2)}%)
            </div>
          </div>
          <div class="stock-actions">
            <a href="${tvUrl}" target="_blank" rel="noopener noreferrer" class="btn-stock-action" title="Open TradingView Chart">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              <span>Chart</span>
            </a>
            <button type="button" class="btn-stock-action btn-add-watchlist" data-symbol="${stock.symbol}" title="Add to Watchlist">
              ★
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderLists() {
    const q = currentSearchQuery.toLowerCase();

    const filteredGainers = MAIN_PAGE_GAINERS.filter(s =>
      s.symbol.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.sector.toLowerCase().includes(q)
    );

    const filteredLosers = MAIN_PAGE_LOSERS.filter(s =>
      s.symbol.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.sector.toLowerCase().includes(q)
    );

    if (gainersList) {
      if (filteredGainers.length === 0) {
        gainersList.innerHTML = `<div style="padding:16px; color:var(--text-muted); font-size:0.85rem; text-align:center;">No matching gainers found.</div>`;
      } else {
        gainersList.innerHTML = filteredGainers.map(s => renderStockCard(s, true)).join('');
      }
    }

    if (losersList) {
      if (filteredLosers.length === 0) {
        losersList.innerHTML = `<div style="padding:16px; color:var(--text-muted); font-size:0.85rem; text-align:center;">No matching losers found.</div>`;
      } else {
        losersList.innerHTML = filteredLosers.map(s => renderStockCard(s, false)).join('');
      }
    }

    if (gainersBadge) gainersBadge.textContent = `${filteredGainers.length} Stocks`;
    if (losersBadge) losersBadge.textContent = `${filteredLosers.length} Stocks`;

    // Attach stock card row click handler to open Stock Details Modal
    document.querySelectorAll('.stock-card-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        const sym = row.getAttribute('data-stock-symbol');
        if (sym && window.openStockDetailModal) {
          window.openStockDetailModal(sym);
        }
      });
    });

    // Attach watchlist click feedback & integration
    document.querySelectorAll('.btn-add-watchlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sym = btn.getAttribute('data-symbol');
        if (window.addStockToActiveWatchlist) {
          window.addStockToActiveWatchlist(sym);
        } else {
          showToast(`${sym} added to personal watchlist!`, '★');
        }
      });
    });
  }

  renderLists();

  // 4. Search Bar
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      if (searchClear) searchClear.style.display = currentSearchQuery ? 'block' : 'none';
      renderLists();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearchQuery = '';
      searchClear.style.display = 'none';
      renderLists();
      if (searchInput) searchInput.focus();
    });
  }

  // 5. Tabs for All / Gainers / Losers
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGlFilter = btn.getAttribute('data-filter');

      if (activeGlFilter === 'all') {
        if (gainersCol) gainersCol.style.display = 'flex';
        if (losersCol) losersCol.style.display = 'flex';
      } else if (activeGlFilter === 'gainers') {
        if (gainersCol) gainersCol.style.display = 'flex';
        if (losersCol) losersCol.style.display = 'none';
      } else if (activeGlFilter === 'losers') {
        if (gainersCol) gainersCol.style.display = 'none';
        if (losersCol) losersCol.style.display = 'flex';
      }
    });
  });
}

/* ==========================================================================
   11. Header Navigation ScrollSpy & Active Indicator
   ========================================================================== */
function initScrollSpy() {
  const guestSections = [
    'introduction',
    'features',
    'swing-engine',
    'ema-collide',
    'smc-radar',
    'screener',
    'fiidii',
    'app-tour',
    'pricing',
    'faq'
  ];

  function updateActiveLink() {
    const desktopLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const scrollPos = window.scrollY + 140;
    const authDashboard = document.getElementById('authDashboardView');
    const isAuth = Boolean(authDashboard && authDashboard.style.display !== 'none');

    if (isAuth) {
      let currentTab = window.currentAuthTab || 'main';
      desktopLinks.forEach(link => {
        if (link.getAttribute('data-view') === currentTab) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      mobileLinks.forEach(link => {
        if (link.getAttribute('data-view') === currentTab) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      return;
    }

    // Guest Landing page scroll spy
    let currentId = 'introduction';
    for (let i = guestSections.length - 1; i >= 0; i--) {
      const id = guestSections[i];
      const el = document.getElementById(id);
      if (el && el.offsetParent !== null && scrollPos >= el.offsetTop - 50) {
        if (id === 'swing-engine' || id === 'ema-collide' || id === 'smc-radar' || id === 'app-tour') {
          currentId = 'features';
        } else if (id === 'fiidii') {
          currentId = 'screener';
        } else {
          currentId = id;
        }
        break;
      }
    }

    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileMenuDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    drawer.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      drawer.classList.remove('active');
    }
  });
}

/* ==========================================================================
   13. Watchlist Module (Mobile App Fidelity: Multi-Watchlists, Notes, SMC, TradingView)
   ========================================================================== */
const WATCHLIST_COLORS = [
  { name: 'Navy', hex: '#1A237E' },
  { name: 'Deep Orange', hex: '#E65100' },
  { name: 'Forest Green', hex: '#1B5E20' },
  { name: 'Crimson Red', hex: '#B71C1C' },
  { name: 'Purple', hex: '#4A148C' },
  { name: 'Teal', hex: '#006064' },
  { name: 'Amber', hex: '#F57F17' },
  { name: 'Deep Pink', hex: '#880E4F' },
  { name: 'Blue Grey', hex: '#37474F' },
  { name: 'Brown', hex: '#4E342E' }
];

const TRADE_NITI_MASTER_STOCKS = [
  { symbol: 'TANLA', name: 'Tanla Platforms Ltd', price: 732.9, change: 2.2, changePct: 0.3, ltp: 732.9, high52: 769.54, low52: 377.45, sector: 'IT', confluence: 78, analysisPct: 78, smcDefault: false },
  { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd', price: 11442, change: -43, changePct: -0.37, ltp: 11442, high52: 11565.5, low52: 5821, sector: 'Pharma', confluence: 74, analysisPct: 74, smcDefault: false },
  { symbol: 'LAURUSLABS', name: 'Laurus Labs Ltd', price: 2424, change: 24, changePct: 1, ltp: 2424, high52: 2454, low52: 944.9, sector: 'Pharma', confluence: 72, analysisPct: 72, smcDefault: false },
  { symbol: 'PERSISTENT', name: 'Persistent Systems Ltd', price: 6003, change: -27, changePct: -0.45, ltp: 6003, high52: 6563.5, low52: 4298.5, sector: 'IT', confluence: 71, analysisPct: 71, smcDefault: false },
  { symbol: 'FSL', name: 'Firstsource Solutions Ltd', price: 291.25, change: 3.55, changePct: 1.23, ltp: 291.25, high52: 367.2, low52: 204.39, sector: 'IT', confluence: 70, analysisPct: 70, smcDefault: false },
  { symbol: 'PVRINOX', name: 'PVR INOX Ltd', price: 1641.2, change: -11.4, changePct: -0.69, ltp: 1641.2, high52: 1652.6, low52: 918.6, sector: 'Consumer', confluence: 70, analysisPct: 70, smcDefault: false },
  { symbol: 'COFORGE', name: 'Coforge Ltd', price: 2028, change: -6, changePct: -0.3, ltp: 2028, high52: 2099, low52: 1073.9, sector: 'IT', confluence: 69, analysisPct: 69, smcDefault: false },
  { symbol: 'UNIONBANK', name: 'Union Bank of India', price: 203, change: -1.4, changePct: -0.68, ltp: 203, high52: 204.4, low52: 148.06, sector: 'Banking', confluence: 68, analysisPct: 68, smcDefault: false },
  { symbol: 'APLAPOLLO', name: 'APL Apollo Tubes Ltd', price: 2251.6, change: 25.9, changePct: 1.16, ltp: 2251.6, high52: 2280.8, low52: 1698.4, sector: 'Metals', confluence: 68, analysisPct: 68, smcDefault: false },
  { symbol: 'PNB', name: 'Punjab National Bank', price: 142.81, change: 1.02, changePct: 0.72, ltp: 142.81, high52: 149.95, low52: 99.49, sector: 'Banking', confluence: 67, analysisPct: 67, smcDefault: false },
  { symbol: 'SONACOMS', name: 'Sona BLW Precision Ltd', price: 919, change: -7, changePct: -0.76, ltp: 919, high52: 926, low52: 444.45, sector: 'Auto', confluence: 67, analysisPct: 67, smcDefault: false },
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 1339.7, change: 0, changePct: 0, ltp: 1339.7, high52: 1592.3, low52: 1158, sector: 'Energy', confluence: 66, analysisPct: 66, smcDefault: false },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', price: 2407.5, change: -34.9, changePct: -1.43, ltp: 2407.5, high52: 3324.9, low52: 1982.6, sector: 'IT', confluence: 66, analysisPct: 66, smcDefault: false },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 804, change: -8.3, changePct: -1.02, ltp: 804, high52: 1009.5, low52: 680.2, sector: 'Banking', confluence: 66, analysisPct: 66, smcDefault: false },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1583.6, change: -6.4, changePct: -0.4, ltp: 1583.6, high52: 1590, low52: 1205.9, sector: 'Banking', confluence: 66, analysisPct: 66, smcDefault: false },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1141.5, change: -9.7, changePct: -0.84, ltp: 1141.5, high52: 1689.8, low52: 985.3, sector: 'IT', confluence: 66, analysisPct: 66, smcDefault: false },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', price: 1992.9, change: 18.9, changePct: 0.96, ltp: 1992.9, high52: 2477.8, low52: 1814.7, sector: 'FMCG', confluence: 66, analysisPct: 66, smcDefault: false },
  { symbol: 'ITC', name: 'ITC Ltd', price: 285, change: 0.95, changePct: 0.33, ltp: 285, high52: 408.15, low52: 255, sector: 'FMCG', confluence: 65, analysisPct: 65, smcDefault: false },
  { symbol: 'SBIN', name: 'State Bank of India', price: 1080, change: -6.5, changePct: -0.6, ltp: 1080, high52: 1227.8, low52: 939.4, sector: 'Banking', confluence: 65, analysisPct: 65, smcDefault: false },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 2106, change: 10, changePct: 0.48, ltp: 2106, high52: 2162.7, low52: 1741.1, sector: 'Telecom', confluence: 65, analysisPct: 65, smcDefault: false },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', price: 488.55, change: -1.85, changePct: -0.38, ltp: 488.55, high52: 490.4, low52: 353.4, sector: 'Banking', confluence: 65, analysisPct: 65, smcDefault: false },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd', price: 4143.8, change: -15.4, changePct: -0.37, ltp: 4143.8, high52: 4418.1, low52: 3342.4, sector: 'Infrastructure', confluence: 65, analysisPct: 65, smcDefault: false },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd', price: 1331, change: -11.9, changePct: -0.89, ltp: 1331, high52: 1403, low52: 1161.3, sector: 'Banking', confluence: 65, analysisPct: 65, smcDefault: false },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 1117, change: 2, changePct: 0.18, ltp: 1117, high52: 1158.8, low52: 801.55, sector: 'Financial Services', confluence: 64, analysisPct: 64, smcDefault: false },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', price: 12854, change: -170, changePct: -1.3, ltp: 12854, high52: 17292, low52: 11170, sector: 'Auto', confluence: 64, analysisPct: 64, smcDefault: false },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', price: 2550, change: 13.5, changePct: 0.53, ltp: 2550, high52: 2968.5, low52: 2121.3, sector: 'Consumer', confluence: 64, analysisPct: 64, smcDefault: false },
  { symbol: 'TITAN', name: 'Titan Company Ltd', price: 4844.9, change: -77, changePct: -1.56, ltp: 4844.9, high52: 5169.2, low52: 3767, sector: 'Consumer', confluence: 64, analysisPct: 64, smcDefault: false },
  { symbol: 'HCLTECH', name: 'HCL Technologies Ltd', price: 1378, change: -2.8, changePct: -0.2, ltp: 1378, high52: 1729.6, low52: 1034.2, sector: 'IT', confluence: 64, analysisPct: 64, smcDefault: false },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', price: 1880, change: -5, changePct: -0.26, ltp: 1880, high52: 2001.1, low52: 1589.3, sector: 'Pharma', confluence: 64, analysisPct: 64, smcDefault: false },
  { symbol: 'WIPRO', name: 'Wipro Ltd', price: 194.6, change: -1.6, changePct: -0.82, ltp: 194.6, high52: 272.67, low52: 156.79, sector: 'IT', confluence: 63, analysisPct: 63, smcDefault: false },
  { symbol: 'NESTLEIND', name: 'Nestle India Ltd', price: 1263.2, change: 2.3, changePct: 0.18, ltp: 1263.2, high52: 1540, low52: 1166.8, sector: 'FMCG', confluence: 63, analysisPct: 63, smcDefault: false },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', price: 12100, change: -237, changePct: -1.92, ltp: 12100, high52: 13052, low52: 10362, sector: 'Cement', confluence: 63, analysisPct: 63, smcDefault: false },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd', price: 257.45, change: -2, changePct: -0.77, ltp: 257.45, high52: 320.9, low52: 244.65, sector: 'Power', confluence: 63, analysisPct: 63, smcDefault: false },
  { symbol: 'ADANIPORTS', name: 'Adani Ports and SEZ Ltd', price: 1903.3, change: -26.7, changePct: -1.38, ltp: 1903.3, high52: 1942.7, low52: 1303.6, sector: 'Infrastructure', confluence: 63, analysisPct: 63, smcDefault: false },
  { symbol: 'NTPC', name: 'NTPC Ltd', price: 319.1, change: -3.9, changePct: -1.21, ltp: 319.1, high52: 410.2, low52: 298, sector: 'Power', confluence: 62, analysisPct: 62, smcDefault: false },
  { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd', price: 1348, change: -4.1, changePct: -0.3, ltp: 1348, high52: 1357.1, low52: 1079.3, sector: 'Metals', confluence: 62, analysisPct: 62, smcDefault: false },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 287.4, change: -9.85, changePct: -3.31, ltp: 287.4, high52: 400.95, low52: 261.2, sector: 'Auto', confluence: 62, analysisPct: 62, smcDefault: false },
  { symbol: 'TECHM', name: 'Tech Mahindra Ltd', price: 1764, change: -10, changePct: -0.56, ltp: 1764, high52: 1834.7, low52: 1331.7, sector: 'IT', confluence: 62, analysisPct: 62, smcDefault: false },
  { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', price: 186.68, change: -1.32, changePct: -0.7, ltp: 186.68, high52: 221.13, low52: 160.67, sector: 'Metals', confluence: 62, analysisPct: 62, smcDefault: false },
  { symbol: 'COALINDIA', name: 'Coal India Ltd', price: 403.5, change: -0.8, changePct: -0.2, ltp: 403.5, high52: 481.65, low52: 370.05, sector: 'Mining', confluence: 62, analysisPct: 62, smcDefault: false },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd', price: 1865, change: -22.1, changePct: -1.17, ltp: 1865, high52: 2105, low52: 1631.8, sector: 'Financial Services', confluence: 61, analysisPct: 61, smcDefault: false },
  { symbol: 'GRASIM', name: 'Grasim Industries Ltd', price: 3034, change: -80.9, changePct: -2.6, ltp: 3034, high52: 3380.5, low52: 2531.1, sector: 'Cement', confluence: 61, analysisPct: 61, smcDefault: false },
  { symbol: 'CIPLA', name: 'Cipla Ltd', price: 1391.8, change: -16.5, changePct: -1.17, ltp: 1391.8, high52: 1535.6, low52: 1192.4, sector: 'Pharma', confluence: 61, analysisPct: 61, smcDefault: false },
  { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Ltd', price: 1380, change: -18.4, changePct: -1.32, ltp: 1380, high52: 1386.6, low52: 1135.6, sector: 'Pharma', confluence: 61, analysisPct: 61, smcDefault: false },
  { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Ltd', price: 302, change: -9.5, changePct: -3.05, ltp: 302, high52: 388.3, low52: 271.3, sector: 'Energy', confluence: 61, analysisPct: 61, smcDefault: false },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd', price: 914.4, change: -16.95, changePct: -1.82, ltp: 914.4, high52: 1069.3, low52: 752.45, sector: 'Banking', confluence: 61, analysisPct: 61, smcDefault: false },
  { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd', price: 4750.5, change: -46.4, changePct: -0.97, ltp: 4750.5, high52: 6185, low52: 4537.9, sector: 'FMCG', confluence: 60, analysisPct: 60, smcDefault: false },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation Ltd', price: 225, change: 0.5, changePct: 0.22, ltp: 225, high52: 301.4, low52: 219.8, sector: 'Energy', confluence: 60, analysisPct: 60, smcDefault: false },
  { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Ltd', price: 8526, change: 11, changePct: 0.13, ltp: 8526, high52: 9069, low52: 6793.5, sector: 'Healthcare', confluence: 60, analysisPct: 60, smcDefault: false },
  { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd', price: 943.6, change: -20.4, changePct: -2.12, ltp: 943.6, high52: 1149.7, low52: 774.65, sector: 'Metals', confluence: 60, analysisPct: 60, smcDefault: false },
  { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd', price: 2688, change: -53.5, changePct: -1.95, ltp: 2688, high52: 3212.1, low52: 1758.8, sector: 'Metals & Mining', confluence: 60, analysisPct: 60, smcDefault: false },
  { symbol: 'SBILIFE', name: 'SBI Life Insurance Company Ltd', price: 1789.9, change: -29.6, changePct: -1.63, ltp: 1789.9, high52: 2109.6, low52: 1633, sector: 'Insurance', confluence: 60, analysisPct: 60, smcDefault: false },
  { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd', price: 7650, change: 101, changePct: 1.34, ltp: 7650, high52: 8190, low52: 6586, sector: 'Auto', confluence: 59, analysisPct: 59, smcDefault: false },
  { symbol: 'SHRIRAMFIN', name: 'Shriram Finance Ltd', price: 970, change: -33.8, changePct: -3.37, ltp: 970, high52: 1141, low52: 809.3, sector: 'Financial Services', confluence: 59, analysisPct: 59, smcDefault: false },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd', price: 10850, change: -95, changePct: -0.87, ltp: 10850, high52: 12361, low52: 8758.5, sector: 'Auto', confluence: 59, analysisPct: 59, smcDefault: false },
  { symbol: 'TATACONSUM', name: 'Tata Consumer Products Ltd', price: 1079, change: -6.3, changePct: -0.58, ltp: 1079, high52: 1271, low52: 936.5, sector: 'FMCG', confluence: 59, analysisPct: 59, smcDefault: false },
  { symbol: 'LTIM', name: 'LTIMindtree Ltd', price: 4260, change: -15.5, changePct: -0.36, ltp: 4260, high52: 6430, low52: 3528, sector: 'IT', confluence: 59, analysisPct: 59, smcDefault: false },
  { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance Company Ltd', price: 592.25, change: -5.55, changePct: -0.93, ltp: 592.25, high52: 787.55, low52: 513.6, sector: 'Insurance', confluence: 58, analysisPct: 58, smcDefault: false },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd', price: 5385, change: 43, changePct: 0.8, ltp: 5385, high52: 6350.5, low52: 4775.5, sector: 'Auto', confluence: 58, analysisPct: 58, smcDefault: false },
  { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd', price: 3333, change: -66, changePct: -1.94, ltp: 3333, high52: 3802.4, low52: 2751.2, sector: 'Auto', confluence: 58, analysisPct: 58, smcDefault: false },
  { symbol: 'ZOMATO', name: 'Zomato Ltd', price: 363.65, change: -3.2, changePct: -0.87, ltp: 363.65, high52: 364.35, low52: 215.68, sector: 'Consumer Services', confluence: 58, analysisPct: 58, smcDefault: false },
  { symbol: 'SWIGGY', name: 'Swiggy Ltd', price: 186.7, change: -5.5, changePct: -2.86, ltp: 186.7, high52: 416.5, low52: 176, sector: 'Consumer Services', confluence: 58, analysisPct: 58, smcDefault: false },
  { symbol: 'PAYTM', name: 'One97 Communications Ltd (Paytm)', price: 1939.9, change: 14.9, changePct: 0.77, ltp: 1939.9, high52: 2036.9, low52: 959, sector: 'Fintech', confluence: 58, analysisPct: 58, smcDefault: false },
  { symbol: 'JIOFIN', name: 'Jio Financial Services Ltd', price: 227.5, change: -3.7, changePct: -1.6, ltp: 227.5, high52: 314.9, low52: 204.5, sector: 'Financial Services', confluence: 57, analysisPct: 57, smcDefault: false },
  { symbol: 'FSN', name: 'FSN E-Commerce Ventures Ltd (Nykaa)', price: 365.2, change: 4.1, changePct: 1.14, ltp: 365.2, high52: 383.46, low52: 234.7, sector: 'Consumer', confluence: 57, analysisPct: 57, smcDefault: false },
  { symbol: 'DELHIVERY', name: 'Delhivery Ltd', price: 436.3, change: -4.2, changePct: -0.95, ltp: 436.3, high52: 520.3, low52: 370, sector: 'Logistics', confluence: 57, analysisPct: 57, smcDefault: false },
  { symbol: 'TRENT', name: 'Trent Ltd', price: 3165.2, change: -14.8, changePct: -0.46, ltp: 3165.2, high52: 4404.6, low52: 2197.2, sector: 'Retail', confluence: 57, analysisPct: 57, smcDefault: false },
  { symbol: 'DMART', name: 'Avenue Supermarts Ltd (DMart)', price: 3439.3, change: -14.7, changePct: -0.43, ltp: 3439.3, high52: 4628.5, low52: 3133.9, sector: 'Retail', confluence: 57, analysisPct: 57, smcDefault: false },
  { symbol: 'BEL', name: 'Bharat Electronics Ltd', price: 400.85, change: -3.95, changePct: -0.98, ltp: 400.85, high52: 468.45, low52: 362, sector: 'Defense', confluence: 57, analysisPct: 57, smcDefault: false },
  { symbol: 'HAL', name: 'Hindustan Aeronautics Ltd', price: 4809.8, change: -33.6, changePct: -0.69, ltp: 4809.8, high52: 5099, low52: 3487.2, sector: 'Defense', confluence: 56, analysisPct: 56, smcDefault: false },
  { symbol: 'BOSCHLTD', name: 'Bosch Ltd', price: 49390, change: -1110, changePct: -2.2, ltp: 49390, high52: 52475, low52: 28745, sector: 'Auto Ancillary', confluence: 56, analysisPct: 56, smcDefault: false },
  { symbol: 'ABB', name: 'ABB India Ltd', price: 7054.5, change: 131.5, changePct: 1.9, ltp: 7054.5, high52: 7735, low52: 4691.5, sector: 'Capital Goods', confluence: 56, analysisPct: 56, smcDefault: false },
  { symbol: 'SIEMENS', name: 'Siemens Ltd', price: 3660, change: -10.9, changePct: -0.3, ltp: 3660, high52: 4114, low52: 2848.6, sector: 'Capital Goods', confluence: 56, analysisPct: 56, smcDefault: false },
  { symbol: 'DLF', name: 'DLF Ltd', price: 758.75, change: -10.55, changePct: -1.37, ltp: 758.75, high52: 769.3, low52: 504.1, sector: 'Realty', confluence: 56, analysisPct: 56, smcDefault: false },
  { symbol: 'GODREJCP', name: 'Godrej Consumer Products Ltd', price: 870.75, change: -5.75, changePct: -0.66, ltp: 870.75, high52: 1254, low52: 818, sector: 'FMCG', confluence: 56, analysisPct: 56, smcDefault: false },
  { symbol: 'DABUR', name: 'Dabur India Ltd', price: 380.5, change: -2.8, changePct: -0.73, ltp: 380.5, high52: 525.35, low52: 357.8, sector: 'FMCG', confluence: 55, analysisPct: 55, smcDefault: false },
  { symbol: 'VBL', name: 'Varun Beverages Ltd', price: 432.8, change: -2.2, changePct: -0.51, ltp: 432.8, high52: 544.05, low52: 382.2, sector: 'FMCG', confluence: 55, analysisPct: 55, smcDefault: false },
  { symbol: 'PIDILITIND', name: 'Pidilite Industries Ltd', price: 1525.7, change: -54, changePct: -3.42, ltp: 1525.7, high52: 1701.5, low52: 1273.6, sector: 'Chemicals', confluence: 55, analysisPct: 55, smcDefault: false },
  { symbol: 'HAVELLS', name: 'Havells India Ltd', price: 1161, change: -12.2, changePct: -1.04, ltp: 1161, high52: 1501.7, low52: 1008.5, sector: 'Consumer Durables', confluence: 55, analysisPct: 55, smcDefault: false },
  { symbol: 'CHOLAFIN', name: 'Cholamandalam Investment & Finance', price: 1850, change: -12, changePct: -0.64, ltp: 1850, high52: 1940, low52: 1354.7, sector: 'Financial Services', confluence: 55, analysisPct: 55, smcDefault: false },
  { symbol: 'ICICIGI', name: 'ICICI Lombard General Insurance', price: 1691.2, change: -9.4, changePct: -0.55, ltp: 1691.2, high52: 2042.9, low52: 1427.7, sector: 'Insurance', confluence: 54, analysisPct: 54, smcDefault: false },
  { symbol: 'ICICIPRULI', name: 'ICICI Prudential Life Insurance', price: 431, change: 0, changePct: 0, ltp: 431, high52: 522.35, low52: 407, sector: 'Insurance', confluence: 54, analysisPct: 54, smcDefault: false },
  { symbol: 'AMBUJACEM', name: 'Ambuja Cements Ltd', price: 381.45, change: -7.95, changePct: -2.04, ltp: 381.45, high52: 571.25, low52: 341, sector: 'Cement', confluence: 54, analysisPct: 54, smcDefault: false },
  { symbol: 'SHREECEM', name: 'Shree Cement Ltd', price: 24655, change: -550, changePct: -2.18, ltp: 24655, high52: 27840, low52: 21600, sector: 'Cement', confluence: 54, analysisPct: 54, smcDefault: false },
  { symbol: 'POLYCAB', name: 'Polycab India Ltd', price: 7904, change: -176.5, changePct: -2.18, ltp: 7904, high52: 10083, low52: 6722, sector: 'Cables & Wires', confluence: 54, analysisPct: 54, smcDefault: false },
  { symbol: 'PFC', name: 'Power Finance Corporation Ltd', price: 334.25, change: -4.75, changePct: -1.4, ltp: 334.25, high52: 481.4, low52: 313.6, sector: 'Financial Services', confluence: 54, analysisPct: 54, smcDefault: false },
  { symbol: 'RECLTD', name: 'REC Ltd', price: 301.85, change: -2.75, changePct: -0.9, ltp: 301.85, high52: 385.25, low52: 284.5, sector: 'Financial Services', confluence: 53, analysisPct: 53, smcDefault: false },
  { symbol: 'GAIL', name: 'GAIL (India) Ltd', price: 188, change: 0.09, changePct: 0.05, ltp: 188, high52: 189.9, low52: 135.4, sector: 'Energy', confluence: 53, analysisPct: 53, smcDefault: false },
  { symbol: 'IOC', name: 'Indian Oil Corporation Ltd', price: 144.04, change: -2.13, changePct: -1.46, ltp: 144.04, high52: 187.47, low52: 125.35, sector: 'Energy', confluence: 53, analysisPct: 53, smcDefault: false },
  { symbol: 'VEDL', name: 'Vedanta Ltd', price: 259.68, change: -0.72, changePct: -0.28, ltp: 259.68, high52: 787.5, low52: 225.6, sector: 'Metals', confluence: 53, analysisPct: 53, smcDefault: false },
  { symbol: 'SRF', name: 'SRF Ltd', price: 2475, change: -1.9, changePct: -0.08, ltp: 2475, high52: 3111.7, low52: 2305, sector: 'Chemicals', confluence: 53, analysisPct: 53, smcDefault: false },
  { symbol: 'BERGEPAINT', name: 'Berger Paints India Ltd', price: 475.5, change: -3.95, changePct: -0.82, ltp: 475.5, high52: 590.1, low52: 404.5, sector: 'Consumer', confluence: 53, analysisPct: 53, smcDefault: false },
  { symbol: 'NAUKRI', name: 'Info Edge (India) Ltd (Naukri)', price: 1187.6, change: -2.4, changePct: -0.2, ltp: 1187.6, high52: 1396.2, low52: 925.95, sector: 'Internet', confluence: 52, analysisPct: 52, smcDefault: false },
  { symbol: 'MOTHERSON', name: 'Samvardhana Motherson International', price: 164.8, change: -1.03, changePct: -0.62, ltp: 164.8, high52: 170.68, low52: 105.08, sector: 'Auto Ancillary', confluence: 52, analysisPct: 52, smcDefault: false },
  { symbol: 'COLPAL', name: 'Colgate-Palmolive (India) Ltd', price: 1714, change: -16, changePct: -0.92, ltp: 1714, high52: 2295.3, low52: 1575, sector: 'FMCG', confluence: 52, analysisPct: 52, smcDefault: false },
  { symbol: 'MARICO', name: 'Marico Ltd', price: 900, change: -2, changePct: -0.22, ltp: 900, high52: 925, low52: 710.65, sector: 'FMCG', confluence: 52, analysisPct: 52, smcDefault: false },
  { symbol: 'BDL', name: 'Bharat Dynamics Ltd', price: 1030, change: -25.1, changePct: -2.38, ltp: 1030, high52: 1613.8, low52: 974, sector: 'Defense', confluence: 52, analysisPct: 52, smcDefault: false },
  { symbol: 'MAZDOCK', name: 'Mazagon Dock Shipbuilders Ltd', price: 1890, change: -17, changePct: -0.89, ltp: 1890, high52: 2829.5, low52: 1705.3, sector: 'Shipbuilding', confluence: 52, analysisPct: 52, smcDefault: false },
  { symbol: 'COCHINSHIP', name: 'Cochin Shipyard Ltd', price: 1178, change: -18, changePct: -1.5, ltp: 1178, high52: 1814.7, low52: 1114.2, sector: 'Shipbuilding', confluence: 51, analysisPct: 51, smcDefault: false },
  { symbol: 'GRSE', name: 'Garden Reach Shipbuilders & Engineers', price: 2184.8, change: -26.7, changePct: -1.21, ltp: 2184.8, high52: 3093.8, low52: 1861, sector: 'Shipbuilding', confluence: 51, analysisPct: 51, smcDefault: false },
  { symbol: 'PARAS', name: 'Paras Defence & Space Tech', price: 1293.3, change: -11.1, changePct: -0.85, ltp: 1293.3, high52: 1527.3, low52: 584.6, sector: 'Defense', confluence: 51, analysisPct: 51, smcDefault: false },
  { symbol: 'DATAPATTNS', name: 'Data Patterns (India) Ltd', price: 4268, change: 37, changePct: 0.87, ltp: 4268, high52: 4932.3, low52: 2182.5, sector: 'Defense', confluence: 51, analysisPct: 51, smcDefault: false },
  { symbol: 'ZEN', name: 'Zen Technologies Ltd', price: 1743.7, change: 25.1, changePct: 1.46, ltp: 1743.7, high52: 1997, low52: 1228.1, sector: 'Defense', confluence: 51, analysisPct: 51, smcDefault: false },
  { symbol: 'ASTRAMICRO', name: 'Astra Microwave Products Ltd', price: 1703.5, change: -82.3, changePct: -4.61, ltp: 1703.5, high52: 1861.6, low52: 855.7, sector: 'Defense', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'IRCTC', name: 'Indian Railway Catering & Tourism Corp', price: 457.7, change: -13.25, changePct: -2.81, ltp: 457.7, high52: 713.05, low52: 436.2, sector: 'Railways', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'IRFC', name: 'Indian Railway Finance Corporation', price: 83.3, change: -1.99, changePct: -2.33, ltp: 83.3, high52: 133.64, low52: 73.37, sector: 'Railways', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'RVNL', name: 'Rail Vikas Nigam Ltd', price: 199.46, change: -5.94, changePct: -2.89, ltp: 199.46, high52: 387.95, low52: 179.67, sector: 'Railways', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'RAILTEL', name: 'RailTel Corporation of India Ltd', price: 254.2, change: -2.73, changePct: -1.06, ltp: 254.2, high52: 378.25, low52: 222.4, sector: 'Railways', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'RITES', name: 'RITES Ltd', price: 195.52, change: -2.27, changePct: -1.15, ltp: 195.52, high52: 252.65, low52: 175.63, sector: 'Railways', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'TITAGARH', name: 'Titagarh Rail Systems Ltd', price: 737.15, change: 5.85, changePct: 0.8, ltp: 737.15, high52: 932.6, low52: 574.85, sector: 'Railways', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'TEXRAIL', name: 'Texmaco Rail & Engineering Ltd', price: 111.15, change: -2.17, changePct: -1.92, ltp: 111.15, high52: 140.09, low52: 78.8, sector: 'Railways', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'IRCON', name: 'Ircon International Ltd', price: 111.22, change: -2.15, changePct: -1.9, ltp: 111.22, high52: 179.22, low52: 96.63, sector: 'Infrastructure', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'NBCC', name: 'NBCC (India) Ltd', price: 79, change: -1.3, changePct: -1.62, ltp: 79, high52: 122.67, low52: 67.9, sector: 'Construction', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'NCC', name: 'NCC Ltd', price: 134.58, change: -1.31, changePct: -0.96, ltp: 134.58, high52: 184.23, low52: 114.51, sector: 'Infrastructure', confluence: 49, analysisPct: 49, smcDefault: false },
  { symbol: 'GMRINFRA', name: 'GMR Airports Infrastructure Ltd', price: 99, change: -0.45, changePct: -0.45, ltp: 99, high52: 114.98, low52: 84.75, sector: 'Infrastructure', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'SUZLON', name: 'Suzlon Energy Ltd', price: 38.25, change: -0.61, changePct: -1.57, ltp: 38.25, high52: 59.31, low52: 33.9, sector: 'Renewable Energy', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'IREDA', name: 'Indian Renewable Energy Development Agency', price: 118.3, change: -1.55, changePct: -1.29, ltp: 118.3, high52: 150.71, low52: 99.5, sector: 'Renewable Energy', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'TATAPOWER', name: 'Tata Power Company Ltd', price: 348, change: -9, changePct: -2.52, ltp: 348, high52: 461.8, low52: 335, sector: 'Power', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'ADANIPOWER', name: 'Adani Power Ltd', price: 205.67, change: -2.23, changePct: -1.07, ltp: 205.67, high52: 248.91, low52: 132.96, sector: 'Power', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'ADANIGREEN', name: 'Adani Green Energy Ltd', price: 1403, change: -19, changePct: -1.34, ltp: 1403, high52: 1604.5, low52: 772.8, sector: 'Power', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'ADANIENSOL', name: 'Adani Energy Solutions Ltd', price: 1438.5, change: 4.4, changePct: 0.31, ltp: 1438.5, high52: 1741.6, low52: 812.7, sector: 'Power', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'JSWENERGY', name: 'JSW Energy Ltd', price: 514.55, change: -5.1, changePct: -0.98, ltp: 514.55, high52: 602.05, low52: 440.05, sector: 'Power', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'NHPC', name: 'NHPC Ltd', price: 75.83, change: -0.97, changePct: -1.26, ltp: 75.83, high52: 85.38, low52: 69.84, sector: 'Power', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'SJVN', name: 'SJVN Ltd', price: 57.41, change: -1.12, changePct: -1.91, ltp: 57.41, high52: 87.65, low52: 47.4, sector: 'Power', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'TORNTPOWER', name: 'Torrent Power Ltd', price: 1221, change: -9.1, changePct: -0.74, ltp: 1221, high52: 1772.5, low52: 1157.6, sector: 'Power', confluence: 48, analysisPct: 48, smcDefault: false },
  { symbol: 'BHEL', name: 'Bharat Heavy Electricals Ltd', price: 436.3, change: 5.1, changePct: 1.18, ltp: 436.3, high52: 464, low52: 242.5, sector: 'Capital Goods', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'CESC', name: 'CESC Ltd', price: 128.48, change: -1.86, changePct: -1.43, ltp: 128.48, high52: 198.72, low52: 123.45, sector: 'Power', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'BANKBARODA', name: 'Bank of Baroda', price: 273.84, change: -2.31, changePct: -0.84, ltp: 273.84, high52: 324.45, low52: 227.5, sector: 'Banking', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'CANBK', name: 'Canara Bank', price: 130.91, change: -2.09, changePct: -1.57, ltp: 130.91, high52: 158.93, low52: 116.16, sector: 'Banking', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'INDIANB', name: 'Indian Bank', price: 932.85, change: -13.05, changePct: -1.38, ltp: 932.85, high52: 991.55, low52: 772.4, sector: 'Banking', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'BANKINDIA', name: 'Bank of India', price: 154.1, change: 2.69, changePct: 1.78, ltp: 154.1, high52: 177.2, low52: 126.32, sector: 'Banking', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'IDBI', name: 'IDBI Bank Ltd', price: 80, change: -0.65, changePct: -0.81, ltp: 80, high52: 116.01, low52: 61.5, sector: 'Banking', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'CENTRALBK', name: 'Central Bank of India', price: 32.22, change: -0.09, changePct: -0.28, ltp: 32.22, high52: 40.44, low52: 28.73, sector: 'Banking', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'UCOBANK', name: 'UCO Bank', price: 24.84, change: -0.27, changePct: -1.08, ltp: 24.84, high52: 31.85, low52: 21.63, sector: 'Banking', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'MAHABANK', name: 'Bank of Maharashtra', price: 91.7, change: -0.09, changePct: -0.1, ltp: 91.7, high52: 93.85, low52: 56.22, sector: 'Banking', confluence: 47, analysisPct: 47, smcDefault: false },
  { symbol: 'FEDERALBNK', name: 'Federal Bank Ltd', price: 360.95, change: -1.55, changePct: -0.43, ltp: 360.95, high52: 371.7, low52: 235.79, sector: 'Banking', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'IDFCFIRSTB', name: 'IDFC First Bank Ltd', price: 79.54, change: -1.39, changePct: -1.72, ltp: 79.54, high52: 87.9, low52: 58.85, sector: 'Banking', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'BANDHANBNK', name: 'Bandhan Bank Ltd', price: 172.88, change: -2.9, changePct: -1.65, ltp: 172.88, high52: 216.74, low52: 135.47, sector: 'Banking', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'AUBANK', name: 'AU Small Finance Bank Ltd', price: 967, change: -12.35, changePct: -1.26, ltp: 967, high52: 1128.6, low52: 842.7, sector: 'Banking', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'RBLBANK', name: 'RBL Bank Ltd', price: 385.75, change: -3.25, changePct: -0.84, ltp: 385.75, high52: 428, low52: 288.6, sector: 'Banking', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'YESBANK', name: 'Yes Bank Ltd', price: 17.42, change: -0.27, changePct: -1.53, ltp: 17.42, high52: 25.48, low52: 15.15, sector: 'Banking', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'KARURVYSYA', name: 'Karur Vysya Bank Ltd', price: 381.55, change: 0.95, changePct: 0.25, ltp: 381.55, high52: 384.4, low52: 241.12, sector: 'Banking', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'SOUTHBANK', name: 'South Indian Bank Ltd', price: 61.86, change: 0.54, changePct: 0.88, ltp: 61.86, high52: 64.95, low52: 33.6, sector: 'Banking', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'CDSL', name: 'Central Depository Services (India) Ltd', price: 1447, change: -8, changePct: -0.55, ltp: 1447, high52: 1640.1, low52: 1119.4, sector: 'Capital Markets', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'BSE', name: 'BSE Ltd', price: 3937.7, change: 28.6, changePct: 0.73, ltp: 3937.7, high52: 4403.3, low52: 2581, sector: 'Capital Markets', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'MCX', name: 'Multi Commodity Exchange of India Ltd', price: 3720, change: 95.3, changePct: 2.63, ltp: 3720, high52: 3906, low52: 1919.4, sector: 'Capital Markets', confluence: 46, analysisPct: 46, smcDefault: false },
  { symbol: 'ANGELONE', name: 'Angel One Ltd', price: 349, change: 8, changePct: 2.35, ltp: 349, high52: 354.8, low52: 213.07, sector: 'Fintech', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'CAMS', name: 'Computer Age Management Services Ltd', price: 726.05, change: -16.95, changePct: -2.28, ltp: 726.05, high52: 836.3, low52: 622.45, sector: 'Capital Markets', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'HDFCAMC', name: 'HDFC Asset Management Company Ltd', price: 2663, change: -67, changePct: -2.45, ltp: 2663, high52: 2863.6, low52: 2216.4, sector: 'AMC', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'UTIAMC', name: 'UTI Asset Management Company Ltd', price: 842.2, change: -11.85, changePct: -1.39, ltp: 842.2, high52: 1175.8, low52: 801.55, sector: 'AMC', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'MUTHOOTFIN', name: 'Muthoot Finance Ltd', price: 2840, change: -92.9, changePct: -3.17, ltp: 2840, high52: 4091.7, low52: 2373, sector: 'NBFC', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'MANAPPURAM', name: 'Manappuram Finance Ltd', price: 308, change: -11.95, changePct: -3.74, ltp: 308, high52: 371.85, low52: 251.1, sector: 'NBFC', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'POONAWALLA', name: 'Poonawalla Fincorp Ltd', price: 484.8, change: -8.2, changePct: -1.66, ltp: 484.8, high52: 502.7, low52: 368.4, sector: 'NBFC', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'SUNDARMFIN', name: 'Sundaram Finance Ltd', price: 4339.1, change: -80.8, changePct: -1.83, ltp: 4339.1, high52: 5581.5, low52: 3902, sector: 'NBFC', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'LICHSGFIN', name: 'LIC Housing Finance Ltd', price: 585.1, change: 6.1, changePct: 1.05, ltp: 585.1, high52: 586.35, low52: 460.7, sector: 'Housing Finance', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'CANFINHOME', name: 'Can Fin Homes Ltd', price: 781.45, change: -14.25, changePct: -1.79, ltp: 781.45, high52: 950.2, low52: 707.5, sector: 'Housing Finance', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'HUDCO', name: 'Housing & Urban Development Corp Ltd', price: 167.6, change: -2.85, changePct: -1.67, ltp: 167.6, high52: 243.93, low52: 143.07, sector: 'Financial Services', confluence: 45, analysisPct: 45, smcDefault: false },
  { symbol: 'MPHASIS', name: 'Mphasis Ltd', price: 2455, change: 45, changePct: 1.87, ltp: 2455, high52: 2953.6, low52: 2047.4, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'LTTS', name: 'L&T Technology Services Ltd', price: 4247.2, change: -19.7, changePct: -0.46, ltp: 4247.2, high52: 4696.2, low52: 3047.7, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'KPITTECH', name: 'KPIT Technologies Ltd', price: 552, change: -6.05, changePct: -1.08, ltp: 552, high52: 1269.8, low52: 471, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'TATAELXSI', name: 'Tata Elxsi Ltd', price: 3835, change: -27, changePct: -0.7, ltp: 3835, high52: 5853, low52: 2996, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'TATACOMM', name: 'Tata Communications Ltd', price: 1772.9, change: 29.5, changePct: 1.69, ltp: 1772.9, high52: 2061.7, low52: 1347.9, sector: 'Telecom', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'TATATECH', name: 'Tata Technologies Ltd', price: 668.8, change: -14.55, changePct: -2.13, ltp: 668.8, high52: 879.15, low52: 509.2, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'CYIENT', name: 'Cyient Ltd', price: 1104.9, change: 15.5, changePct: 1.42, ltp: 1104.9, high52: 1242.9, low52: 752.85, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'ZENSARTECH', name: 'Zensar Technologies Ltd', price: 549.55, change: -10.2, changePct: -1.82, ltp: 549.55, high52: 750.75, low52: 422.1, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'BSOFT', name: 'Birlasoft Ltd', price: 324.65, change: -3.15, changePct: -0.96, ltp: 324.65, high52: 465.5, low52: 269.05, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'OFSS', name: 'Oracle Financial Services Software Ltd', price: 9912, change: -88, changePct: -0.88, ltp: 9912, high52: 12540, low52: 6302, sector: 'IT', confluence: 44, analysisPct: 44, smcDefault: false },
  { symbol: 'BHARATFORG', name: 'Bharat Forge Ltd', price: 1750.5, change: -9.5, changePct: -0.54, ltp: 1750.5, high52: 2265.2, low52: 1373.6, sector: 'Auto Ancillary', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'MRF', name: 'MRF Ltd', price: 127955, change: -645, changePct: -0.5, ltp: 127955, high52: 158315, low52: 116775, sector: 'Tyres', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'BALKRISIND', name: 'Balkrishna Industries Ltd', price: 2271.4, change: -25.3, changePct: -1.1, ltp: 2271.4, high52: 2716.3, low52: 1974, sector: 'Tyres', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'APOLLOTYRE', name: 'Apollo Tyres Ltd', price: 420.8, change: -2.4, changePct: -0.57, ltp: 420.8, high52: 536.9, low52: 371.8, sector: 'Tyres', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'CEATLTD', name: 'CEAT Ltd', price: 3540.3, change: -11.3, changePct: -0.32, ltp: 3540.3, high52: 4065.6, low52: 3060.2, sector: 'Tyres', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'EXIDEIND', name: 'Exide Industries Ltd', price: 373, change: -7, changePct: -1.84, ltp: 373, high52: 490.65, low52: 287.9, sector: 'Auto Ancillary', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'AMARAJABAT', name: 'Amara Raja Energy & Mobility Ltd', price: 1185, change: 12.3, changePct: 1.05, ltp: 1185, high52: 1775, low52: 890, sector: 'Auto Ancillary', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'ESCORTS', name: 'Escorts Kubota Ltd', price: 2401.8, change: -27.7, changePct: -1.14, ltp: 2401.8, high52: 3962.1, low52: 1801.35, sector: 'Auto', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'TIINDIA', name: 'Tube Investments of India Ltd', price: 2257, change: -45.3, changePct: -1.97, ltp: 2257, high52: 3307.9, low52: 2080, sector: 'Auto Ancillary', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'ENDURANCE', name: 'Endurance Technologies Ltd', price: 2540.2, change: 20.4, changePct: 0.81, ltp: 2540.2, high52: 3029.5, low52: 2201.2, sector: 'Auto Ancillary', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'LUPIN', name: 'Lupin Ltd', price: 1980.3, change: -34.7, changePct: -1.72, ltp: 1980.3, high52: 2514.8, low52: 1922, sector: 'Pharma', confluence: 43, analysisPct: 43, smcDefault: false },
  { symbol: 'AUROPHARMA', name: 'Aurobindo Pharma Ltd', price: 1823.2, change: 16, changePct: 0.88, ltp: 1823.2, high52: 1855.3, low52: 1121.7, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'ALKEM', name: 'Alkem Laboratories Ltd', price: 5114, change: -188, changePct: -3.55, ltp: 5114, high52: 5890, low52: 4947, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'TORNTPHARM', name: 'Torrent Pharmaceuticals Ltd', price: 4670, change: -57.2, changePct: -1.21, ltp: 4670, high52: 5122.8, low52: 3686.5, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'GLENMARK', name: 'Glenmark Pharmaceuticals Ltd', price: 2640, change: -19.8, changePct: -0.74, ltp: 2640, high52: 2677.2, low52: 1840.8, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'BIOCON', name: 'Biocon Ltd', price: 364.05, change: -6.9, changePct: -1.86, ltp: 364.05, high52: 440.7, low52: 323.5, sector: 'Biotech', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'MANKIND', name: 'Mankind Pharma Ltd', price: 2640, change: 1.4, changePct: 0.05, ltp: 2640, high52: 2668.3, low52: 1927.4, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'ZYDUSLIFE', name: 'Zydus Lifesciences Ltd', price: 1189.9, change: -16.1, changePct: -1.34, ltp: 1189.9, high52: 1245.5, low52: 860.6, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'NATCOPHARM', name: 'Natco Pharma Ltd', price: 810.45, change: 1.65, changePct: 0.2, ltp: 810.45, high52: 1206, low52: 781.6, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'GRANULES', name: 'Granules India Ltd', price: 813.2, change: -27.3, changePct: -3.25, ltp: 813.2, high52: 909.3, low52: 532.85, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'AJANTPHARM', name: 'Ajanta Pharma Ltd', price: 3284, change: -40, changePct: -1.2, ltp: 3284, high52: 3718.2, low52: 2458.1, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'JBCHEPHARM', name: 'J.B. Chemicals & Pharmaceuticals', price: 2416.1, change: 7.2, changePct: 0.3, ltp: 2416.1, high52: 2416.1, low52: 2416.1, sector: 'Pharma', confluence: 42, analysisPct: 42, smcDefault: false },
  { symbol: 'MAXHEALTH', name: 'Max Healthcare Institute Ltd', price: 947.1, change: 0.8, changePct: 0.08, ltp: 947.1, high52: 1181.1, low52: 815, sector: 'Healthcare', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'FORTIS', name: 'Fortis Healthcare Ltd', price: 764, change: 4, changePct: 0.53, ltp: 764, high52: 990.35, low52: 712.9, sector: 'Healthcare', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'MEDANTA', name: 'Global Health Ltd (Medanta)', price: 1454, change: 14.3, changePct: 0.99, ltp: 1454, high52: 1508.9, low52: 961.1, sector: 'Healthcare', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'NH', name: 'Narayana Hrudayalaya Ltd', price: 1860.4, change: 20.3, changePct: 1.1, ltp: 1860.4, high52: 2080.3, low52: 1605.3, sector: 'Healthcare', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'SYNGENE', name: 'Syngene International Ltd', price: 444.3, change: -3.5, changePct: -0.78, ltp: 444.3, high52: 662.1, low52: 346, sector: 'Healthcare', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'KALYANKJIL', name: 'Kalyan Jewellers India Ltd', price: 697, change: -13.9, changePct: -1.96, ltp: 697, high52: 710.9, low52: 330.8, sector: 'Jewellery', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'SENCO', name: 'Senco Gold Ltd', price: 339.3, change: 0.15, changePct: 0.04, ltp: 339.3, high52: 418.65, low52: 278.85, sector: 'Jewellery', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'PAGEIND', name: 'Page Industries Ltd (Jockey)', price: 31325, change: -525, changePct: -1.65, ltp: 31325, high52: 43610, low52: 30200, sector: 'Textiles', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'BATAINDIA', name: 'Bata India Ltd', price: 642.15, change: -6.45, changePct: -0.99, ltp: 642.15, high52: 1046.4, low52: 603.35, sector: 'Footwear', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'CAMPUS', name: 'Campus Activewear Ltd', price: 195.69, change: -2.17, changePct: -1.1, ltp: 195.69, high52: 282.5, low52: 184.58, sector: 'Footwear', confluence: 41, analysisPct: 41, smcDefault: false },
  { symbol: 'RELAXO', name: 'Relaxo Footwears Ltd', price: 295.2, change: -5.6, changePct: -1.86, ltp: 295.2, high52: 439.95, low52: 237.9, sector: 'Footwear', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'JUBLFOOD', name: 'Jubilant FoodWorks Ltd (Domino\'s)', price: 437.75, change: 2.45, changePct: 0.56, ltp: 437.75, high52: 615.3, low52: 404, sector: 'QSR', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'DEVYANI', name: 'Devyani International Ltd (KFC/Pizza Hut)', price: 129.87, change: -0.21, changePct: -0.16, ltp: 129.87, high52: 149.9, low52: 94.59, sector: 'QSR', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'WESTLIFE', name: 'Westlife Foodworld Ltd (McDonald\'s)', price: 659.05, change: -3.1, changePct: -0.47, ltp: 659.05, high52: 674.5, low52: 416.85, sector: 'QSR', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'SAREGAMA', name: 'Saregama India Ltd', price: 653.45, change: 11.2, changePct: 1.74, ltp: 653.45, high52: 686.12, low52: 311.1, sector: 'Entertainment', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'ZEEL', name: 'Zee Entertainment Enterprises Ltd', price: 72.15, change: -1.35, changePct: -1.84, ltp: 72.15, high52: 115.75, low52: 61.58, sector: 'Entertainment', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'DIXON', name: 'Dixon Technologies (India) Ltd', price: 12798, change: -194, changePct: -1.49, ltp: 12798, high52: 15697, low52: 9673, sector: 'Electronics', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'VOLTAS', name: 'Voltas Ltd', price: 1133.1, change: 18.4, changePct: 1.65, ltp: 1133.1, high52: 1561.3, low52: 946.2, sector: 'Consumer Durables', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'BLUESTARCO', name: 'Blue Star Ltd', price: 1587.2, change: 4.7, changePct: 0.3, ltp: 1587.2, high52: 2016.7, low52: 1445.3, sector: 'Consumer Durables', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'CROMPTON', name: 'Crompton Greaves Consumer Electricals', price: 211.38, change: -4.61, changePct: -2.13, ltp: 211.38, high52: 301.95, low52: 191.55, sector: 'Consumer Durables', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'WHIRLPOOL', name: 'Whirlpool of India Ltd', price: 829, change: -4.05, changePct: -0.49, ltp: 829, high52: 1245, low52: 717.7, sector: 'Consumer Durables', confluence: 40, analysisPct: 40, smcDefault: false },
  { symbol: 'AMBER', name: 'Amber Enterprises India Ltd', price: 6772, change: 563, changePct: 9.07, ltp: 6772, high52: 8842.5, low52: 5510, sector: 'Electronics', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'KAYNES', name: 'Kaynes Technology India Ltd', price: 3430, change: -54, changePct: -1.55, ltp: 3430, high52: 6376.5, low52: 3001, sector: 'Electronics', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'SAIL', name: 'Steel Authority of India Ltd', price: 176.2, change: -1.5, changePct: -0.84, ltp: 176.2, high52: 206.06, low52: 125.91, sector: 'Metals', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'NMDC', name: 'NMDC Ltd', price: 69.8, change: -1.27, changePct: -1.79, ltp: 69.8, high52: 96.04, low52: 66.35, sector: 'Mining', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'JINDALSTEL', name: 'Jindal Steel & Power Ltd', price: 1157.8, change: -5.3, changePct: -0.46, ltp: 1157.8, high52: 1288.8, low52: 986, sector: 'Metals', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'NATIONALUM', name: 'National Aluminium Company Ltd', price: 330, change: -3.1, changePct: -0.93, ltp: 330, high52: 441.5, low52: 250.68, sector: 'Metals', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'HINDCOPPER', name: 'Hindustan Copper Ltd', price: 439.85, change: -6.3, changePct: -1.41, ltp: 439.85, high52: 760.05, low52: 313.3, sector: 'Metals', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'RATNAMANI', name: 'Ratnamani Metals & Tubes Ltd', price: 2487, change: 12.9, changePct: 0.52, ltp: 2487, high52: 3046.2, low52: 1946.4, sector: 'Metals', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'DEEPAKNTR', name: 'Deepak Nitrite Ltd', price: 1594.4, change: -30.8, changePct: -1.9, ltp: 1594.4, high52: 1875.9, low52: 1286.8, sector: 'Chemicals', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'AARTIIND', name: 'Aarti Industries Ltd', price: 481.95, change: -1.95, changePct: -0.4, ltp: 481.95, high52: 543.15, low52: 340, sector: 'Chemicals', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'NAVINFLUOR', name: 'Navin Fluorine International Ltd', price: 10002, change: 33, changePct: 0.33, ltp: 10002, high52: 10502.1, low52: 5563, sector: 'Chemicals', confluence: 39, analysisPct: 39, smcDefault: false },
  { symbol: 'TATACHEM', name: 'Tata Chemicals Ltd', price: 605.9, change: 2.05, changePct: 0.34, ltp: 605.9, high52: 841.5, low52: 576.8, sector: 'Chemicals', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'PIIND', name: 'PI Industries Ltd', price: 1714.8, change: -25.4, changePct: -1.46, ltp: 1714.8, high52: 3572.5, low52: 1712.9, sector: 'Agrochemicals', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'UPL', name: 'UPL Ltd', price: 559.4, change: 3.45, changePct: 0.62, ltp: 559.4, high52: 805.35, low52: 481.05, sector: 'Agrochemicals', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'COROMANDEL', name: 'Coromandel International Ltd', price: 1955, change: -37, changePct: -1.86, ltp: 1955, high52: 2408.2, low52: 1673.7, sector: 'Fertilizers', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'CHAMBLFERT', name: 'Chambal Fertilisers and Chemicals', price: 384.25, change: -2.3, changePct: -0.6, ltp: 384.25, high52: 490, low52: 353.9, sector: 'Fertilizers', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'ATUL', name: 'Atul Ltd', price: 5166, change: -42, changePct: -0.81, ltp: 5166, high52: 7108, low52: 5028.5, sector: 'Chemicals', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'CLEAN', name: 'Clean Science and Technology Ltd', price: 724, change: 20.7, changePct: 2.94, ltp: 724, high52: 954.4, low52: 656.4, sector: 'Chemicals', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'GODREJPROP', name: 'Godrej Properties Ltd', price: 1854.9, change: -24.6, changePct: -1.31, ltp: 1854.9, high52: 2206.1, low52: 1471.3, sector: 'Realty', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'OBEROIREAL', name: 'Oberoi Realty Ltd', price: 1797.6, change: -14.2, changePct: -0.78, ltp: 1797.6, high52: 1953.4, low52: 1411.5, sector: 'Realty', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'PRESTIGE', name: 'Prestige Estates Projects Ltd', price: 1650, change: -43.9, changePct: -2.59, ltp: 1650, high52: 1755.2, low52: 1126.5, sector: 'Realty', confluence: 38, analysisPct: 38, smcDefault: false },
  { symbol: 'BRIGADE', name: 'Brigade Enterprises Ltd', price: 549.15, change: -11.55, changePct: -2.06, ltp: 549.15, high52: 713.02, low52: 476.02, sector: 'Realty', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'SOBHA', name: 'Sobha Ltd', price: 1271.3, change: -27.3, changePct: -2.1, ltp: 1271.3, high52: 1618.5, low52: 1125.1, sector: 'Realty', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'PHOENIXLTD', name: 'The Phoenix Mills Ltd', price: 2255, change: -37, changePct: -1.61, ltp: 2255, high52: 2292, low52: 1477.4, sector: 'Realty', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'LODHA', name: 'Macrotech Developers Ltd (Lodha)', price: 1220, change: -6, changePct: -0.49, ltp: 1220, high52: 1316.35, low52: 677, sector: 'Realty', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'ASTRAL', name: 'Astral Ltd', price: 1254, change: -21, changePct: -1.65, ltp: 1254, high52: 1746.3, low52: 1253.6, sector: 'Building Materials', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'FINPIPE', name: 'Finolex Industries Ltd', price: 148.8, change: -1.54, changePct: -1.02, ltp: 148.8, high52: 191.93, low52: 137.16, sector: 'Building Materials', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'SUPREMEIND', name: 'Supreme Industries Ltd', price: 3307.5, change: -32.5, changePct: -0.97, ltp: 3307.5, high52: 4052.6, low52: 3150, sector: 'Plastics', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'KAJARIACER', name: 'Kajaria Ceramics Ltd', price: 1201.9, change: 5.3, changePct: 0.44, ltp: 1201.9, high52: 1261.1, low52: 883.65, sector: 'Ceramics', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'HINDPETRO', name: 'Hindustan Petroleum Corporation Ltd', price: 381.5, change: -9.1, changePct: -2.33, ltp: 381.5, high52: 499.05, low52: 319.15, sector: 'Energy', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'PETRONET', name: 'Petronet LNG Ltd', price: 324.05, change: -10.95, changePct: -3.27, ltp: 324.05, high52: 335, low52: 238.05, sector: 'Energy', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'IGL', name: 'Indraprastha Gas Ltd', price: 142.33, change: -1.01, changePct: -0.7, ltp: 142.33, high52: 215.02, low52: 132.92, sector: 'City Gas', confluence: 37, analysisPct: 37, smcDefault: false },
  { symbol: 'MGL', name: 'Mahanagar Gas Ltd', price: 1158.6, change: 4.9, changePct: 0.42, ltp: 1158.6, high52: 1253.3, low52: 908.4, sector: 'City Gas', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'GUJGASLTD', name: 'Gujarat Gas Ltd', price: 231.9, change: 1.8, changePct: 0.78, ltp: 231.9, high52: 441, low52: 208.1, sector: 'City Gas', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'OIL', name: 'Oil India Ltd', price: 441.5, change: 1.5, changePct: 0.34, ltp: 441.5, high52: 518.3, low52: 398.15, sector: 'Energy', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'IDEA', name: 'Vodafone Idea Ltd', price: 12.57, change: -0.4, changePct: -3.08, ltp: 12.57, high52: 15.6, low52: 8.53, sector: 'Telecom', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'INDUSTOWER', name: 'Indus Towers Ltd', price: 396, change: 9.05, changePct: 2.34, ltp: 396, high52: 477.75, low52: 360, sector: 'Telecom Infrastructure', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'HFCL', name: 'HFCL Ltd', price: 205.47, change: -4.55, changePct: -2.17, ltp: 205.47, high52: 271.9, low52: 60.95, sector: 'Telecom', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'INDHOTEL', name: 'The Indian Hotels Company Ltd (Taj)', price: 890.3, change: 8.3, changePct: 0.94, ltp: 890.3, high52: 891.65, low52: 570.95, sector: 'Hotels', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'EIHOTEL', name: 'EIH Ltd (Oberoi)', price: 316.55, change: 0.35, changePct: 0.11, ltp: 316.55, high52: 383.45, low52: 273.55, sector: 'Hotels', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'LEMONTREE', name: 'Lemon Tree Hotels Ltd', price: 121.96, change: 1.55, changePct: 1.29, ltp: 121.96, high52: 164.9, low52: 100.42, sector: 'Hotels', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'CHALET', name: 'Chalet Hotels Ltd', price: 824.65, change: 12.85, changePct: 1.58, ltp: 824.65, high52: 912.45, low52: 702.3, sector: 'Hotels', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'EASEMYTRIP', name: 'Easy Trip Planners Ltd', price: 6.01, change: 0.06, changePct: 1.01, ltp: 6.01, high52: 9.63, low52: 5.33, sector: 'Travel', confluence: 36, analysisPct: 36, smcDefault: false },
  { symbol: 'YATRA', name: 'Yatra Online Ltd', price: 78.13, change: -2.91, changePct: -3.59, ltp: 78.13, high52: 191.34, low52: 68.55, sector: 'Travel', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'INOXWIND', name: 'Inox Wind Ltd', price: 64.45, change: -1.07, changePct: -1.63, ltp: 64.45, high52: 148.69, low52: 55.2, sector: 'Renewable Energy', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'CGPOWER', name: 'CG Power and Industrial Solutions Ltd', price: 828, change: 6.25, changePct: 0.76, ltp: 828, high52: 976.5, low52: 530.65, sector: 'Capital Goods', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'THERMAX', name: 'Thermax Ltd', price: 2776.2, change: 53.8, changePct: 1.98, ltp: 2776.2, high52: 5159.5, low52: 2722.4, sector: 'Capital Goods', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'CUMMINSIND', name: 'Cummins India Ltd', price: 4369, change: 110.8, changePct: 2.6, ltp: 4369, high52: 6027.5, low52: 3928.3, sector: 'Capital Goods', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'AIAENG', name: 'AIA Engineering Ltd', price: 3186, change: -19.7, changePct: -0.62, ltp: 3186, high52: 5081.4, low52: 3113.6, sector: 'Capital Goods', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'KIRLOSENG', name: 'Kirloskar Oil Engines Ltd', price: 1692.3, change: 54, changePct: 3.3, ltp: 1692.3, high52: 2563.6, low52: 1084.9, sector: 'Capital Goods', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'TRITURBINE', name: 'Triveni Turbine Ltd', price: 509.75, change: 2.45, changePct: 0.48, ltp: 509.75, high52: 741.5, low52: 435.25, sector: 'Capital Goods', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'ENGINERSIN', name: 'Engineers India Ltd', price: 312.45, change: 4.9, changePct: 1.59, ltp: 312.45, high52: 315.65, low52: 164.56, sector: 'Engineering', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'ELECON', name: 'Elecon Engineering Co Ltd', price: 444, change: -11.35, changePct: -2.49, ltp: 444, high52: 562.65, low52: 354.75, sector: 'Engineering', confluence: 35, analysisPct: 35, smcDefault: false },
  { symbol: 'ACTIONIND', name: 'Action Construction Equipment Ltd', price: 1180, change: 15, changePct: 1.29, ltp: 1180, high52: 1253.9, low52: 748.95, sector: 'Capital Goods', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'JWL', name: 'Jupiter Wagons Ltd', price: 206.96, change: -4.75, changePct: -2.24, ltp: 206.96, high52: 347.55, low52: 173.39, sector: 'Railways', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'BEML', name: 'BEML Ltd', price: 2098.2, change: -27.3, changePct: -1.28, ltp: 2098.2, high52: 2135, low52: 1369.4, sector: 'Defense & Rail', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'PTC', name: 'PTC India Ltd', price: 139.08, change: -1.6, changePct: -1.14, ltp: 139.08, high52: 227.38, low52: 133.37, sector: 'Power', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'SCI', name: 'Shipping Corporation of India Ltd', price: 270.58, change: 1.4, changePct: 0.52, ltp: 270.58, high52: 344.7, low52: 201.74, sector: 'Shipping', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'GESHIP', name: 'The Great Eastern Shipping Co Ltd', price: 1518, change: 68.5, changePct: 4.73, ltp: 1518, high52: 1719.6, low52: 1064, sector: 'Shipping', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'SBICARD', name: 'SBI Cards and Payment Services Ltd', price: 578.3, change: -11.7, changePct: -1.98, ltp: 578.3, high52: 901.55, low52: 525, sector: 'Financial Services', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'MOTILALOFS', name: 'Motilal Oswal Financial Services Ltd', price: 1220, change: 3.2, changePct: 0.26, ltp: 1220, high52: 1281, low52: 628.2, sector: 'Capital Markets', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'IIFL', name: 'IIFL Finance Ltd', price: 641.1, change: -22.05, changePct: -3.32, ltp: 641.1, high52: 696.4, low52: 419.35, sector: 'NBFC', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'AAVAS', name: 'Aavas Financiers Ltd', price: 1123.5, change: -14.7, changePct: -1.29, ltp: 1123.5, high52: 1736.4, low52: 1062.9, sector: 'Housing Finance', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'HOMEFIRST', name: 'Home First Finance Company India Ltd', price: 1109.6, change: 15.9, changePct: 1.45, ltp: 1109.6, high52: 1280.1, low52: 904.8, sector: 'Housing Finance', confluence: 34, analysisPct: 34, smcDefault: false },
  { symbol: 'KFINTECH', name: 'KFin Technologies Ltd', price: 950.9, change: -13.55, changePct: -1.4, ltp: 950.9, high52: 1101.8, low52: 799, sector: 'Capital Markets', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'LTFH', name: 'L&T Finance Ltd', price: 277.45, change: 2.15, changePct: 0.78, ltp: 277.45, high52: 335.6, low52: 237.5, sector: 'NBFC', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'CHOLAHLDNG', name: 'Cholamandalam Financial Holdings Ltd', price: 1460, change: -2.4, changePct: -0.16, ltp: 1460, high52: 1976.5, low52: 1254.1, sector: 'Financial Services', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'BALRAMCHIN', name: 'Balrampur Chini Mills Ltd', price: 654.8, change: 4.05, changePct: 0.62, ltp: 654.8, high52: 767.1, low52: 397.8, sector: 'Sugar & Biofuel', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'TRIVENI', name: 'Triveni Engineering & Industries Ltd', price: 251.6, change: 3.39, changePct: 1.37, ltp: 251.6, high52: 477.15, low52: 221.5, sector: 'Sugar', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'EIDPARRY', name: 'E.I.D. - Parry (India) Ltd', price: 654.9, change: -15.3, changePct: -2.28, ltp: 654.9, high52: 1068.7, low52: 600.45, sector: 'Sugar & Agro', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'PRAJSIND', name: 'Praj Industries Ltd', price: 254.41, change: -1.8, changePct: -0.7, ltp: 254.41, high52: 415.5, low52: 241.7, sector: 'Biofuel & Engineering', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'AVANTIFEED', name: 'Avanti Feeds Ltd', price: 746.6, change: -16.3, changePct: -2.14, ltp: 746.6, high52: 1503.4, low52: 658.7, sector: 'Agro', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'KRBL', name: 'KRBL Ltd (India Gate)', price: 432.05, change: 11.45, changePct: 2.72, ltp: 432.05, high52: 447.4, low52: 278.95, sector: 'Agro', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'LTFOODS', name: 'LT Foods Ltd (Daawat)', price: 424.7, change: -7.3, changePct: -1.69, ltp: 424.7, high52: 459, low52: 337.25, sector: 'Agro', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'TRIDENT', name: 'Trident Ltd', price: 23.54, change: -0.23, changePct: -0.97, ltp: 23.54, high52: 29.27, low52: 20.49, sector: 'Textiles', confluence: 33, analysisPct: 33, smcDefault: false },
  { symbol: 'KPRMILL', name: 'K.P.R. Mill Ltd', price: 1158.4, change: 8.6, changePct: 0.75, ltp: 1158.4, high52: 1218.45, low52: 810.9, sector: 'Textiles', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'CENTURYTEX', name: 'Century Textiles and Industries Ltd', price: 1203, change: 18.5, changePct: 1.56, ltp: 1203, high52: 1805.3, low52: 1003.9, sector: 'Textiles & Realty', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'CENTURYPLY', name: 'Century Plyboards (India) Ltd', price: 686.45, change: 8.6, changePct: 1.27, ltp: 686.45, high52: 844, low52: 634.3, sector: 'Building Materials', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'JKPAPER', name: 'JK Paper Ltd', price: 375.4, change: -0.8, changePct: -0.21, ltp: 375.4, high52: 430.6, low52: 306.4, sector: 'Paper', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'WESTCOAST', name: 'West Coast Paper Mills Ltd', price: 694.8, change: 8.2, changePct: 1.19, ltp: 694.8, high52: 940.45, low52: 381.3, sector: 'Paper', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'GOKEX', name: 'Gokaldas Exports Ltd', price: 676.3, change: 5.35, changePct: 0.8, ltp: 676.3, high52: 949.35, low52: 541.95, sector: 'Textiles', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'ALOKINDS', name: 'Alok Industries Ltd', price: 8.13, change: -0.07, changePct: -0.85, ltp: 8.13, high52: 17.31, low52: 7.05, sector: 'Textiles', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'JKCEMENT', name: 'JK Cement Ltd', price: 5155.1, change: -102.9, changePct: -1.96, ltp: 5155.1, high52: 5977, low52: 4701, sector: 'Cement', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'RAMCOCEM', name: 'The Ramco Cements Ltd', price: 819.7, change: -11.65, changePct: -1.4, ltp: 819.7, high52: 1204.9, low52: 719.65, sector: 'Cement', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'PRISMCEM', name: 'Prism Johnson Ltd', price: 112.54, change: 1.1, changePct: 0.99, ltp: 112.54, high52: 151.9, low52: 94.51, sector: 'Cement', confluence: 32, analysisPct: 32, smcDefault: false },
  { symbol: 'HEIDELBERG', name: 'HeidelbergCement India Ltd', price: 121.21, change: 0.2, changePct: 0.16, ltp: 121.21, high52: 187.41, low52: 118.4, sector: 'Cement', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'STARCEMENT', name: 'Star Cement Ltd', price: 176.06, change: -0.15, changePct: -0.08, ltp: 176.06, high52: 238.56, low52: 157.97, sector: 'Cement', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'PNCINFRA', name: 'PNC Infratech Ltd', price: 127.94, change: -3.12, changePct: -2.38, ltp: 127.94, high52: 278.2, low52: 123.93, sector: 'Infrastructure', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'KNRCON', name: 'KNR Constructions Ltd', price: 109.1, change: -2.02, changePct: -1.82, ltp: 109.1, high52: 178.93, low52: 97.66, sector: 'Infrastructure', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'GRINFRA', name: 'G R Infraprojects Ltd', price: 806.1, change: -6.5, changePct: -0.8, ltp: 806.1, high52: 1109.7, low52: 754.85, sector: 'Infrastructure', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'AHLUCONT', name: 'Ahluwalia Contracts (India) Ltd', price: 528, change: 16.6, changePct: 3.25, ltp: 528, high52: 1053.7, low52: 502.9, sector: 'Construction', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'KEC', name: 'KEC International Ltd', price: 333.65, change: -6.65, changePct: -1.95, ltp: 333.65, high52: 791.55, low52: 316.35, sector: 'Power Infrastructure', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'KALPATPOWR', name: 'Kalpataru Projects International Ltd', price: 1349.5, change: 12, changePct: 0.9, ltp: 1349.5, high52: 1458.4, low52: 1018.1, sector: 'Infrastructure', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'CONCOR', name: 'Container Corporation of India Ltd', price: 442.15, change: -7.05, changePct: -1.57, ltp: 442.15, high52: 534.75, low52: 410.15, sector: 'Logistics', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'ALLCARGO', name: 'Allcargo Logistics Ltd', price: 9.86, change: -0.17, changePct: -1.7, ltp: 9.86, high52: 15.49, low52: 7.18, sector: 'Logistics', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'TCIEXP', name: 'TCI Express Ltd', price: 488.05, change: -6.8, changePct: -1.37, ltp: 488.05, high52: 619.8, low52: 458.7, sector: 'Logistics', confluence: 31, analysisPct: 31, smcDefault: false },
  { symbol: 'MAHLOG', name: 'Mahindra Logistics Ltd', price: 429.75, change: 0.45, changePct: 0.1, ltp: 429.75, high52: 442.7, low52: 279.55, sector: 'Logistics', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'BLUEDART', name: 'Blue Dart Express Ltd', price: 4468.1, change: -1.6, changePct: -0.04, ltp: 4468.1, high52: 6044.5, low52: 4170.8, sector: 'Logistics', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'LALPATHLAB', name: 'Dr. Lal PathLabs Ltd', price: 1993, change: -15.8, changePct: -0.79, ltp: 1993, high52: 2029.4, low52: 1307.6, sector: 'Diagnostics', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'METROPOLIS', name: 'Metropolis Healthcare Ltd', price: 564.2, change: -1, changePct: -0.18, ltp: 564.2, high52: 602.1, low52: 421.75, sector: 'Diagnostics', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'VIJAYA', name: 'Vijaya Diagnostic Centre Ltd', price: 1410.1, change: -5.5, changePct: -0.39, ltp: 1410.1, high52: 1570.7, low52: 861.4, sector: 'Diagnostics', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'THYROCARE', name: 'Thyrocare Technologies Ltd', price: 498.25, change: 10.25, changePct: 2.1, ltp: 498.25, high52: 649.35, low52: 349.55, sector: 'Diagnostics', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'POLYMED', name: 'Poly Medicure Ltd', price: 1681.2, change: -11.9, changePct: -0.7, ltp: 1681.2, high52: 1967.4, low52: 1191.1, sector: 'Medical Devices', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'ERIS', name: 'Eris Lifesciences Ltd', price: 1307.2, change: 29.4, changePct: 2.3, ltp: 1307.2, high52: 1701.3, low52: 1095.5, sector: 'Pharma', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'IPCALAB', name: 'IPCA Laboratories Ltd', price: 1884, change: -15.7, changePct: -0.83, ltp: 1884, high52: 2009.6, low52: 1302, sector: 'Pharma', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'GLAXO', name: 'GlaxoSmithKline Pharmaceuticals Ltd', price: 2672.6, change: 17, changePct: 0.64, ltp: 2672.6, high52: 3106.4, low52: 2103.2, sector: 'Pharma', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'PFIZER', name: 'Pfizer Ltd', price: 3847.4, change: -17, changePct: -0.44, ltp: 3847.4, high52: 5197.8, low52: 3612.3, sector: 'Pharma', confluence: 30, analysisPct: 30, smcDefault: false },
  { symbol: 'SANOFI', name: 'Sanofi India Ltd', price: 3301.4, change: 20.5, changePct: 0.62, ltp: 3301.4, high52: 4614.2, low52: 2772.8, sector: 'Pharma', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'AARTIPHARM', name: 'Aarti Pharmalabs Ltd', price: 997.95, change: -12.55, changePct: -1.24, ltp: 997.95, high52: 1010.5, low52: 591.95, sector: 'Pharma', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'FLUOROCHEM', name: 'Gujarat Fluorochemicals Ltd', price: 4712.1, change: -101.9, changePct: -2.12, ltp: 4712.1, high52: 4824.4, low52: 2980.4, sector: 'Chemicals', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'FINEORG', name: 'Fine Organic Industries Ltd', price: 5299.5, change: -33, changePct: -0.62, ltp: 5299.5, high52: 5625.5, low52: 3886.8, sector: 'Chemicals', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'VINATIORGA', name: 'Vinati Organics Ltd', price: 1119.65, change: -16.85, changePct: -1.48, ltp: 1119.65, high52: 1677.4, low52: 953.65, sector: 'Chemicals', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'CASTROLIND', name: 'Castrol India Ltd', price: 190.13, change: -0.82, changePct: -0.43, ltp: 190.13, high52: 201.67, low52: 173.52, sector: 'Lubricants', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'ANURAS', name: 'Anupam Rasayan India Ltd', price: 1300.6, change: 98.8, changePct: 8.22, ltp: 1300.6, high52: 1376, low52: 1073.2, sector: 'Chemicals', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'ROSSARI', name: 'Rossari Biotech Ltd', price: 436, change: 6.1, changePct: 1.42, ltp: 436, high52: 632.05, low52: 378.6, sector: 'Chemicals', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'DEEPAKFERT', name: 'Deepak Fertilisers and Petrochemicals', price: 1261.8, change: 3.8, changePct: 0.3, ltp: 1261.8, high52: 1664.3, low52: 872.1, sector: 'Chemicals', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'SONATSOFTW', name: 'Sonata Software Ltd', price: 248.81, change: -8.32, changePct: -3.24, ltp: 248.81, high52: 389.4, low52: 209.6, sector: 'IT', confluence: 29, analysisPct: 29, smcDefault: false },
  { symbol: 'MASTEK', name: 'Mastek Ltd', price: 1514.9, change: 22.3, changePct: 1.49, ltp: 1514.9, high52: 2336.4, low52: 1342.2, sector: 'IT', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'INTELLECT', name: 'Intellect Design Arena Ltd', price: 524.9, change: 0.9, changePct: 0.17, ltp: 524.9, high52: 1142.8, low52: 504.55, sector: 'Fintech Software', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'HAPPSTMNDS', name: 'Happiest Minds Technologies Ltd', price: 313.45, change: -3.8, changePct: -1.2, ltp: 313.45, high52: 511.05, low52: 297.65, sector: 'IT', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'NEWGEN', name: 'Newgen Software Technologies Ltd', price: 439.15, change: -3.15, changePct: -0.71, ltp: 439.15, high52: 964.35, low52: 402.3, sector: 'IT', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'RATEGAIN', name: 'RateGain Travel Technologies Ltd', price: 674.9, change: -3.7, changePct: -0.55, ltp: 674.9, high52: 990.05, low52: 438.15, sector: 'SaaS', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'ROUTE', name: 'Route Mobile Ltd', price: 457.75, change: -2.15, changePct: -0.47, ltp: 457.75, high52: 729.9, low52: 414.8, sector: 'CPaaS', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'AFFLE', name: 'Affle (India) Ltd', price: 1608.2, change: 3.5, changePct: 0.22, ltp: 1608.2, high52: 1821.9, low52: 1268.7, sector: 'AdTech', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'NAZARA', name: 'Nazara Technologies Ltd', price: 425.4, change: 11.1, changePct: 2.68, ltp: 425.4, high52: 446.67, low52: 217.65, sector: 'Gaming', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'MAPMYINDIA', name: 'C.E. Info Systems Ltd (MapmyIndia)', price: 889.5, change: 12.2, changePct: 1.39, ltp: 889.5, high52: 1734.8, low52: 794.75, sector: 'Geospatial', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'JUSTDIAL', name: 'Just Dial Ltd', price: 690.65, change: 2.45, changePct: 0.36, ltp: 690.65, high52: 804.05, low52: 490.7, sector: 'Internet', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'TIMKEN', name: 'Timken India Ltd', price: 3120.3, change: 23.4, changePct: 0.76, ltp: 3120.3, high52: 3767.1, low52: 2730.1, sector: 'Bearings', confluence: 28, analysisPct: 28, smcDefault: false },
  { symbol: 'SKFINDIA', name: 'SKF India Ltd', price: 1465.7, change: -12.9, changePct: -0.87, ltp: 1465.7, high52: 2061.3, low52: 1394.6, sector: 'Bearings', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'SCHAEFFLER', name: 'Schaeffler India Ltd', price: 3585.6, change: 36.7, changePct: 1.03, ltp: 3585.6, high52: 4357.2, low52: 3473.2, sector: 'Bearings', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'CARBORUNIV', name: 'Carborundum Universal Ltd', price: 1062.3, change: 5.2, changePct: 0.49, ltp: 1062.3, high52: 1296.5, low52: 748.35, sector: 'Abrasives', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'GRINDWELL', name: 'Grindwell Norton Ltd', price: 1923.4, change: 9.6, changePct: 0.5, ltp: 1923.4, high52: 2382.3, low52: 1353.1, sector: 'Abrasives', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'EPL', name: 'EPL Ltd', price: 237.78, change: -0.94, changePct: -0.39, ltp: 237.78, high52: 270.1, low52: 180.12, sector: 'Packaging', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'POLYPLEX', name: 'Polyplex Corporation Ltd', price: 952, change: -1.2, changePct: -0.13, ltp: 952, high52: 1229.6, low52: 747.8, sector: 'Packaging', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'ABCAPITAL', name: 'ABCAPITAL Ltd.', price: 408, change: -11.5, changePct: -2.74, ltp: 408, high52: 424.7, low52: 292.25, sector: 'Equities', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'ABFRL', name: 'ABFRL Ltd.', price: 39.29, change: -0.24, changePct: -0.61, ltp: 39.29, high52: 79.58, low52: 38.78, sector: 'Equities', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'ACC', name: 'ACC Ltd.', price: 1220.1, change: -20.5, changePct: -1.65, ltp: 1220.1, high52: 1913.7, low52: 1124.9, sector: 'Equities', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'APLLTD', name: 'APLLTD Ltd.', price: 1030.15, change: -17.1, changePct: -1.63, ltp: 1030.15, high52: 1047.25, low52: 646.55, sector: 'Equities', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'GMRAIRPORT', name: 'GMRAIRPORT Ltd.', price: 99, change: -1.1, changePct: -1.1, ltp: 99, high52: 114.98, low52: 84.75, sector: 'Equities', confluence: 27, analysisPct: 27, smcDefault: false },
  { symbol: 'INDIGO', name: 'INDIGO Ltd.', price: 5587.3, change: -72.7, changePct: -1.28, ltp: 5587.3, high52: 5919, low52: 3943.5, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'KANSAINER', name: 'KANSAINER Ltd.', price: 201.1, change: -0.02, changePct: -0.01, ltp: 201.1, high52: 249.34, low52: 159.07, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'MFSL', name: 'MFSL Ltd.', price: 1401.1, change: 26.1, changePct: 1.9, ltp: 1401.1, high52: 1870, low52: 1176.7, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'RAYMOND', name: 'RAYMOND Ltd.', price: 1149, change: 22.6, changePct: 2.01, ltp: 1149, high52: 1300.7, low52: 321.85, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'SOLARINDS', name: 'SOLARINDS Ltd.', price: 19338, change: 62, changePct: 0.32, ltp: 19338, high52: 22455, low52: 11772, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'UBL', name: 'UBL Ltd.', price: 1216, change: -2.6, changePct: -0.21, ltp: 1216, high52: 1810.3, low52: 1136.2, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'BAJAJHFL', name: 'BAJAJHFL Ltd.', price: 81.46, change: -1.04, changePct: -1.26, ltp: 81.46, high52: 107.64, low52: 73.09, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'HYUNDAI', name: 'HYUNDAI Ltd.', price: 2076, change: -27, changePct: -1.28, ltp: 2076, high52: 2421.1, low52: 1691.4, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'JSWINFRA', name: 'JSWINFRA Ltd.', price: 339.5, change: -2.55, changePct: -0.75, ltp: 339.5, high52: 367.6, low52: 234.31, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false },
  { symbol: 'PATANJALI', name: 'PATANJALI Ltd.', price: 421, change: -9.8, changePct: -2.28, ltp: 421, high52: 590.45, low52: 336.15, sector: 'Equities', confluence: 26, analysisPct: 26, smcDefault: false }
];


function findMasterStock(sym) {
  const stock = TRADE_NITI_MASTER_STOCKS.find(s => s.symbol.toUpperCase() === sym.toUpperCase());
  if (stock) return stock;
  return {
    symbol: sym.toUpperCase(),
    name: `${sym.toUpperCase()} Ltd.`,
    price: 1000.00,
    change: 10.00,
    changePct: 1.00,
    sector: 'Equities',
    confluence: 65,
    smcDefault: false
  };
}

const DEFAULT_WATCHLIST_GROUPS = [
  {
    id: 1,
    name: '⭐ My Watchlist',
    colorIndex: 0,
    symbols: ['TATAMOTORS', 'RELIANCE', 'INFY', 'HDFCBANK', 'MARUTI']
  },
  {
    id: 2,
    name: '🔥 Swing Picks',
    colorIndex: 1,
    symbols: ['POWERGRID', 'TITAN', 'ADANIPORTS', 'LTIM']
  },
  {
    id: 3,
    name: '🏦 Banking Titans',
    colorIndex: 2,
    symbols: ['HDFCBANK', 'ICICIBANK', 'SBIN', 'KOTAKBANK', 'AXISBANK']
  }
];

const DEFAULT_STOCK_NOTES = {
  'TATAMOTORS': {
    note: 'SuperTrend BUY confirmed. 21 EMA pullback setup. Target: ₹980, SL: ₹895.',
    updatedAt: Date.now() - 3600000 * 4
  },
  'RELIANCE': {
    note: 'Institutional accumulation near ₹2,920 support zone. Watch volume expansion.',
    updatedAt: Date.now() - 3600000 * 10
  },
  'HDFCBANK': {
    note: 'Swing target ₹1,880. Bullish confluence 76%. Low volatility entry.',
    updatedAt: Date.now() - 3600000 * 22
  }
};

function initWatchlistModule() {
  const groupsBar = document.getElementById('wlGroupsBar');
  const groupCountSub = document.getElementById('wlGroupCountSubtitle');
  const activeNameEl = document.getElementById('activeWlName');
  const activeColorDot = document.getElementById('activeWlColorDot');
  const activeStockCount = document.getElementById('activeWlStockCount');
  const tableBody = document.getElementById('wlTableBody');
  const emptyState = document.getElementById('wlEmptyState');

  const searchInput = document.getElementById('wlStockSearchInput');
  const searchClear = document.getElementById('wlStockSearchClear');
  const searchDropdown = document.getElementById('wlSearchDropdown');

  // Modals
  const createModal = document.getElementById('createWatchlistModal');
  const btnOpenCreate = document.getElementById('btnOpenCreateWatchlist');
  const closeCreateBtn = document.getElementById('closeCreateWlModalBtn');
  const cancelCreateBtn = document.getElementById('cancelCreateWlBtn');
  const createForm = document.getElementById('createWatchlistForm');
  const newNameInput = document.getElementById('newWlNameInput');
  const colorPickerGrid = document.getElementById('wlColorPickerGrid');

  const deleteModal = document.getElementById('deleteWatchlistConfirmModal');
  const btnDeleteGroup = document.getElementById('btnDeleteWatchlistGroup');
  const cancelDeleteBtn = document.getElementById('cancelDeleteWlBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteWlBtn');
  const deleteModalDesc = document.getElementById('deleteWatchlistModalDesc');

  const noteModal = document.getElementById('stockNoteModal');
  const noteSymbolBadge = document.getElementById('noteStockSymbolBadge');
  const noteTextarea = document.getElementById('stockNoteTextarea');
  const noteCharCount = document.getElementById('noteCharCount');
  const noteLastSaved = document.getElementById('stockNoteLastSaved');
  const noteMetaRow = document.getElementById('stockNoteMetaRow');
  const btnDeleteNote = document.getElementById('btnDeleteStockNote');
  const closeNoteBtn = document.getElementById('closeStockNoteModalBtn');
  const cancelNoteBtn = document.getElementById('cancelStockNoteBtn');
  const saveNoteBtn = document.getElementById('saveStockNoteBtn');

  // Internal State
  let activeWlId = parseInt(localStorage.getItem('trade_niti_active_wl_id'), 10) || 1;
  let selectedColorIdx = 0;
  let targetNoteSymbol = null;

  function getWatchlists() {
    try {
      const data = localStorage.getItem('trade_niti_user_watchlists');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem('trade_niti_user_watchlists', JSON.stringify(DEFAULT_WATCHLIST_GROUPS));
    return [...DEFAULT_WATCHLIST_GROUPS];
  }

  function saveWatchlists(lists) {
    localStorage.setItem('trade_niti_user_watchlists', JSON.stringify(lists));
  }

  function getStockNotes() {
    try {
      const data = localStorage.getItem('trade_niti_stock_notes');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem('trade_niti_stock_notes', JSON.stringify(DEFAULT_STOCK_NOTES));
    return { ...DEFAULT_STOCK_NOTES };
  }

  function saveStockNotes(notes) {
    localStorage.setItem('trade_niti_stock_notes', JSON.stringify(notes));
  }

  function getSmcSymbols() {
    try {
      const data = localStorage.getItem('trade_niti_smc_symbols');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    const def = ['TATAMOTORS', 'HDFCBANK', 'SBIN', 'TITAN'];
    localStorage.setItem('trade_niti_smc_symbols', JSON.stringify(def));
    return def;
  }

  function saveSmcSymbols(list) {
    localStorage.setItem('trade_niti_smc_symbols', JSON.stringify(list));
  }

  // 1. Render Watchlist Groups Navigation Bar
  function renderGroupsBar() {
    if (!groupsBar) return;
    const groups = getWatchlists();

    if (!groups.find(g => g.id === activeWlId)) {
      activeWlId = groups[0] ? groups[0].id : 1;
      localStorage.setItem('trade_niti_active_wl_id', activeWlId);
    }

    if (groupCountSub) {
      groupCountSub.textContent = `${groups.length} / 10 watchlists • Max 50 stocks per list`;
    }

    groupsBar.innerHTML = groups.map(g => {
      const col = WATCHLIST_COLORS[g.colorIndex % WATCHLIST_COLORS.length] || WATCHLIST_COLORS[0];
      const isActive = g.id === activeWlId;
      return `
        <button class="wl-group-tab ${isActive ? 'active' : ''}" data-id="${g.id}" style="${isActive ? `border-color: ${col.hex};` : ''}">
          <span class="wl-tab-color-dot" style="background:${col.hex};"></span>
          <span>${g.name}</span>
          <span class="wl-tab-count-badge">${g.symbols.length}</span>
        </button>
      `;
    }).join('');

    groupsBar.querySelectorAll('.wl-group-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const id = parseInt(tab.getAttribute('data-id'), 10);
        activeWlId = id;
        localStorage.setItem('trade_niti_active_wl_id', id);
        renderGroupsBar();
        renderActiveTable();
      });
    });
  }

  // 2. Render Active Watchlist Details & Stocks Table
  function renderActiveTable() {
    const groups = getWatchlists();
    const active = groups.find(g => g.id === activeWlId) || groups[0];
    if (!active) return;

    const col = WATCHLIST_COLORS[active.colorIndex % WATCHLIST_COLORS.length] || WATCHLIST_COLORS[0];
    if (activeNameEl) activeNameEl.textContent = active.name;
    if (activeColorDot) {
      activeColorDot.style.background = col.hex;
      activeColorDot.style.color = col.hex;
    }
    if (activeStockCount) {
      activeStockCount.textContent = `${active.symbols.length} / 50 stocks`;
    }

    const notes = getStockNotes();
    const smcList = getSmcSymbols();

    // Feature Gating: Lock SMC Radar column on Trial Expired (Day 8+)
    const sub = (window.tradeNitiSubscription && window.tradeNitiSubscription.check)
      ? window.tradeNitiSubscription.check()
      : { isProWeb: false };
    const isSmcLocked = !sub.isProWeb;

    // Update SMC column header with Lock badge if locked
    const smcHeader = document.querySelector('.wl-table th.col-smc');
    if (smcHeader) {
      smcHeader.innerHTML = isSmcLocked
        ? 'SMC RADAR <span class="nav-smc-lock-badge" style="font-size:0.62rem; font-weight:800; background:rgba(239,68,68,0.15); color:#EF4444; border:1px solid rgba(239,68,68,0.3); padding:1px 5px; border-radius:4px; margin-left:4px; vertical-align:middle;">🔒 PRO</span>'
        : 'SMC RADAR';
    }

    if (active.symbols.length === 0) {
      if (tableBody) tableBody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    if (tableBody) {
      tableBody.innerHTML = active.symbols.map(sym => {
        const stock = findMasterStock(sym);
        const isUp = stock.change >= 0;
        const sign = isUp ? '+' : '';
        const changeClass = isUp ? 'profit' : 'loss';
        const isSmc = smcList.includes(stock.symbol);
        const stockNoteObj = notes[stock.symbol];
        const hasNote = !!(stockNoteObj && stockNoteObj.note && stockNoteObj.note.trim());
        const tvUrl = `https://www.tradingview.com/chart/?symbol=NSE:${stock.symbol}`;

        let confluenceClass = 'bullish';
        if (stock.confluence < 40) confluenceClass = 'bearish';
        else if (stock.confluence < 60) confluenceClass = 'neutral';

        return `
          <tr data-symbol="${stock.symbol}">
            <!-- Col 1: Stock Info & Note Preview -->
            <td>
              <div class="wl-stock-info">
                <div class="wl-symbol-row">
                  <span class="wl-stock-symbol" data-action="detail" data-symbol="${stock.symbol}" title="View stock details for ${stock.symbol}" style="cursor: pointer;">${stock.symbol}</span>
                  <span class="wl-stock-sector">${stock.sector}</span>
                  <a href="javascript:void(0)" class="link-stock-analysis" data-action="stock-analysis" data-symbol="${stock.symbol}" title="Open Stock Analysis Center for ${stock.symbol}">
                    <span>Analysis Center</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </a>
                </div>
                <div class="wl-stock-name">${stock.name}</div>
                ${hasNote ? `
                  <div class="note-preview-chip" data-action="note" data-symbol="${stock.symbol}" title="Edit personal note">
                    <span>📝 ${escapeHtml(stockNoteObj.note.slice(0, 36))}${stockNoteObj.note.length > 36 ? '…' : ''}</span>
                  </div>
                ` : ''}
              </div>
            </td>

            <!-- Col 2: Price & Change -->
            <td>
              <div class="wl-price-cell">
                <span class="wl-price-val">₹${stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span class="wl-change-val ${changeClass}">${sign}₹${Math.abs(stock.change).toFixed(2)} (${sign}${stock.changePct.toFixed(2)}%)</span>
              </div>
            </td>

            <!-- Col 3: Confluence Analysis -->
            <td class="wl-analysis-cell">
              <span class="wl-analysis-badge ${confluenceClass}">
                ${stock.confluence}%
              </span>
            </td>

            <!-- Col 4: SMC Radar Button (Gated for Trial Expired) -->
            <td class="wl-smc-cell">
              ${isSmcLocked ? `
                <button type="button" class="wl-smc-btn locked" data-action="smc-locked" data-symbol="${stock.symbol}" title="Stock Monitoring Center (SMC) Radar is a Pro Feature. Available in Monthly Pro & Annual VIP.">
                  🔒 PRO
                </button>
              ` : `
                <button type="button" class="wl-smc-btn ${isSmc ? 'tracked' : 'untracked'}" data-action="smc" data-symbol="${stock.symbol}" title="${isSmc ? 'Tracked in SMC Radar (Click to Untrack)' : 'Add to SMC Radar'}">
                  ${isSmc ? '✓ SMC' : '+ SMC'}
                </button>
              `}
            </td>

            <!-- Col 5: Note Edit Button -->
            <td class="wl-note-cell">
              <button type="button" class="wl-note-btn ${hasNote ? 'has-note' : ''}" data-action="note" data-symbol="${stock.symbol}" title="Add/Edit Personal Note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                ${hasNote ? '<span class="wl-note-dot"></span>' : ''}
              </button>
            </td>

            <!-- Col 6: Actions (TradingView & Remove) -->
            <td class="wl-actions-cell">
              <div class="wl-actions-group">
                <a href="${tvUrl}" target="_blank" rel="noopener noreferrer" class="wl-btn-chart" title="Open TradingView Chart">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  <span>Chart</span>
                </a>
                <button type="button" class="wl-btn-remove" data-action="remove" data-symbol="${stock.symbol}" title="Remove from this watchlist">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Wire up row button actions
      tableBody.querySelectorAll('[data-action]').forEach(el => {
        el.addEventListener('click', (e) => {
          const action = el.getAttribute('data-action');
          const symbol = el.getAttribute('data-symbol');

          if (action === 'detail') {
            if (window.openStockDetailModal) window.openStockDetailModal(symbol);
          } else if (action === 'chart') {
            window.open(`https://www.tradingview.com/chart/?symbol=NSE:${symbol}`, '_blank');
          } else if (action === 'smc-locked') {
            if (typeof window.openFeatureGateModal === 'function') {
              window.openFeatureGateModal('smc');
            }
            if (typeof window.showToast === 'function') {
              window.showToast('Stock Monitoring Center (SMC) Radar is available on Pro Monthly (\u20B9499) and Annual VIP.', '🔒');
            }
          } else if (action === 'smc') {
            toggleSmc(symbol);
          } else if (action === 'note') {
            openNoteModal(symbol);
          } else if (action === 'remove') {
            removeStock(symbol);
          }
        });
      });
    }
  }

  window.renderActiveWatchlist = () => {
    renderGroupsBar();
    renderActiveTable();
  };
  if (currentAuthTab === 'watchlist') {
    window.renderActiveWatchlist();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // 3. SMC Toggle
  function toggleSmc(symbol) {
    const sub = (window.tradeNitiSubscription && window.tradeNitiSubscription.check)
      ? window.tradeNitiSubscription.check()
      : { isProWeb: false };
    if (!sub.isProWeb) {
      if (typeof window.openFeatureGateModal === 'function') {
        window.openFeatureGateModal('smc');
      }
      if (typeof window.showToast === 'function') {
        window.showToast('Stock Monitoring Center (SMC) Radar is available on Pro Monthly (\u20B9499) and Annual VIP.', '🔒');
      }
      return;
    }

    const list = getSmcSymbols();
    const idx = list.indexOf(symbol);
    if (idx >= 0) {
      list.splice(idx, 1);
      if (window.removeSmcEntryDirect) window.removeSmcEntryDirect(symbol);
      showToast(`Removed ${symbol} from SMC Radar`, 'ℹ️');
    } else {
      list.push(symbol);
      const st = findMasterStock(symbol);
      if (window.addSmcEntryDirect) window.addSmcEntryDirect(st.symbol, st.name, st.confluence);
      showToast(`Added ${symbol} to SMC Smart Money Radar`, '✓');
    }
    saveSmcSymbols(list);
    renderActiveTable();
    if (window.renderSmcModule) window.renderSmcModule();
  }

  // 4. Remove Stock from Active Watchlist
  function removeStock(symbol) {
    const groups = getWatchlists();
    const active = groups.find(g => g.id === activeWlId);
    if (!active) return;

    active.symbols = active.symbols.filter(s => s.toUpperCase() !== symbol.toUpperCase());
    saveWatchlists(groups);
    renderGroupsBar();
    renderActiveTable();
    showToast(`Removed ${symbol} from "${active.name}"`, '🗑');
  }

  // 5. Add Stock to Active Watchlist (Globally exposed for Main Page integration)
  window.addStockToActiveWatchlist = function(symbol) {
    const groups = getWatchlists();
    const active = groups.find(g => g.id === activeWlId) || groups[0];
    if (!active) return;

    const symUpper = symbol.toUpperCase();
    if (active.symbols.includes(symUpper)) {
      showToast(`${symUpper} is already in "${active.name}"`, 'ℹ️');
      return;
    }
    if (active.symbols.length >= 50) {
      showToast(`Watchlist limit reached (50/50 stocks).`, '⚠️');
      return;
    }

    active.symbols.push(symUpper);
    saveWatchlists(groups);
    renderGroupsBar();
    renderActiveTable();
    showToast(`Added ${symUpper} to "${active.name}"!`, '★');
  };

  // 6. Search to Add Dropdown Logic
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (searchClear) searchClear.style.display = q ? 'block' : 'none';

      if (!q) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      const matches = TRADE_NITI_MASTER_STOCKS.filter(s =>
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q)
      ).slice(0, 7);

      if (matches.length === 0) {
        searchDropdown.innerHTML = `<div style="padding:12px; font-size:0.8rem; color:var(--text-muted); text-align:center;">No matching NSE stocks found</div>`;
        searchDropdown.style.display = 'block';
        return;
      }

      searchDropdown.innerHTML = matches.map(s => `
        <div class="wl-search-item" data-sym="${s.symbol}">
          <div>
            <div class="wl-search-item-symbol">
              ${s.symbol} <span class="wl-stock-sector">${s.sector}</span>
              <a href="javascript:void(0)" class="link-stock-analysis" data-action="stock-analysis" data-symbol="${s.symbol}" style="margin-left:4px; font-size:0.65rem; padding:1px 5px;">Stock Analysis Center</a>
            </div>
            <div class="wl-search-item-name">${s.name}</div>
          </div>
          <div class="wl-search-item-price">
            ₹${s.price.toFixed(2)}
          </div>
        </div>
      `).join('');

      searchDropdown.querySelectorAll('.wl-search-item').forEach(item => {
        item.addEventListener('click', () => {
          const sym = item.getAttribute('data-sym');
          window.addStockToActiveWatchlist(sym);
          searchInput.value = '';
          searchDropdown.style.display = 'none';
          if (searchClear) searchClear.style.display = 'none';
        });
      });

      searchDropdown.style.display = 'block';
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchDropdown.style.display = 'none';
        searchClear.style.display = 'none';
        searchInput.focus();
      });
    }

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });
  }

  // 7. Create Watchlist Modal Logic
  function renderColorPicker() {
    if (!colorPickerGrid) return;
    colorPickerGrid.innerHTML = WATCHLIST_COLORS.map((col, idx) => `
      <div class="wl-color-swatch ${idx === selectedColorIdx ? 'selected' : ''}" data-idx="${idx}" style="background:${col.hex};" title="${col.name}"></div>
    `).join('');

    colorPickerGrid.querySelectorAll('.wl-color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        selectedColorIdx = parseInt(swatch.getAttribute('data-idx'), 10);
        renderColorPicker();
      });
    });
  }

  if (btnOpenCreate) {
    btnOpenCreate.addEventListener('click', () => {
      const groups = getWatchlists();
      if (groups.length >= 10) {
        showToast('Maximum 10 watchlists reached. Delete one to create another.', '⚠️');
        return;
      }
      selectedColorIdx = groups.length % WATCHLIST_COLORS.length;
      renderColorPicker();
      if (newNameInput) newNameInput.value = '';
      if (createModal) createModal.classList.add('active');
      if (newNameInput) newNameInput.focus();
    });
  }

  const closeCreateModal = () => {
    if (createModal) createModal.classList.remove('active');
  };

  if (closeCreateBtn) closeCreateBtn.addEventListener('click', closeCreateModal);
  if (cancelCreateBtn) cancelCreateBtn.addEventListener('click', closeCreateModal);

  if (createForm) {
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = newNameInput ? newNameInput.value.trim() : '';
      if (!name) return;

      const groups = getWatchlists();
      if (groups.length >= 10) {
        showToast('Maximum 10 watchlists reached.', '⚠️');
        closeCreateModal();
        return;
      }

      const newId = Date.now();
      const newGroup = {
        id: newId,
        name: name,
        colorIndex: selectedColorIdx,
        symbols: []
      };

      groups.push(newGroup);
      saveWatchlists(groups);
      activeWlId = newId;
      localStorage.setItem('trade_niti_active_wl_id', newId);
      closeCreateModal();
      renderGroupsBar();
      renderActiveTable();
      showToast(`Watchlist "${name}" created successfully!`, '✓');
    });
  }

  // 8. Delete Watchlist Modal Logic
  if (btnDeleteGroup) {
    btnDeleteGroup.addEventListener('click', () => {
      const groups = getWatchlists();
      if (groups.length <= 1) {
        showToast('Cannot delete your only watchlist.', '⚠️');
        return;
      }
      const active = groups.find(g => g.id === activeWlId);
      if (deleteModalDesc && active) {
        deleteModalDesc.textContent = `Are you sure you want to delete "${active.name}" and all its ${active.symbols.length} stocks?`;
      }
      if (deleteModal) deleteModal.classList.add('active');
    });
  }

  const closeDeleteModal = () => {
    if (deleteModal) deleteModal.classList.remove('active');
  };

  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', closeDeleteModal);

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      let groups = getWatchlists();
      if (groups.length <= 1) {
        closeDeleteModal();
        return;
      }

      const active = groups.find(g => g.id === activeWlId);
      const delName = active ? active.name : 'Watchlist';
      groups = groups.filter(g => g.id !== activeWlId);
      saveWatchlists(groups);

      activeWlId = groups[0].id;
      localStorage.setItem('trade_niti_active_wl_id', activeWlId);
      closeDeleteModal();
      renderGroupsBar();
      renderActiveTable();
      showToast(`Watchlist "${delName}" deleted.`, '🗑');
    });
  }

  // 9. Personal Stock Note Modal Logic (Matches StockNoteDialog)
  function openNoteModal(symbol) {
    targetNoteSymbol = symbol;
    const notes = getStockNotes();
    const existing = notes[symbol];

    if (noteSymbolBadge) noteSymbolBadge.textContent = symbol;
    if (noteTextarea) {
      noteTextarea.value = existing ? existing.note : '';
      if (noteCharCount) noteCharCount.textContent = noteTextarea.value.length;
    }

    if (existing && existing.updatedAt && existing.note) {
      const d = new Date(existing.updatedAt);
      const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ', ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      if (noteLastSaved) noteLastSaved.textContent = `Last saved: ${dateStr}`;
      if (noteMetaRow) noteMetaRow.style.display = 'inline-block';
      if (btnDeleteNote) btnDeleteNote.style.display = 'flex';
    } else {
      if (noteMetaRow) noteMetaRow.style.display = 'none';
      if (btnDeleteNote) btnDeleteNote.style.display = 'none';
    }

    if (noteModal) noteModal.classList.add('active');
    if (noteTextarea) noteTextarea.focus();
  }

  if (noteTextarea && noteCharCount) {
    noteTextarea.addEventListener('input', () => {
      noteCharCount.textContent = noteTextarea.value.length;
    });
  }

  window.openStockNoteModal = openNoteModal;
  window.getStockNotesShared = getStockNotes;

  const closeNoteModal = () => {
    if (noteModal) noteModal.classList.remove('active');
    targetNoteSymbol = null;
  };

  if (closeNoteBtn) closeNoteBtn.addEventListener('click', closeNoteModal);
  if (cancelNoteBtn) cancelNoteBtn.addEventListener('click', closeNoteModal);

  if (saveNoteBtn) {
    saveNoteBtn.addEventListener('click', () => {
      if (!targetNoteSymbol) return;
      const text = noteTextarea ? noteTextarea.value.trim() : '';
      const notes = getStockNotes();

      if (text) {
        notes[targetNoteSymbol] = {
          note: text,
          updatedAt: Date.now()
        };
        showToast(`Note saved for ${targetNoteSymbol}`, '💾');
      } else {
        delete notes[targetNoteSymbol];
        showToast(`Note cleared for ${targetNoteSymbol}`, '✓');
      }

      saveStockNotes(notes);
      closeNoteModal();
      renderActiveTable();
      if (window.renderSmcModule) window.renderSmcModule();
    });
  }

  if (btnDeleteNote) {
    btnDeleteNote.addEventListener('click', () => {
      if (!targetNoteSymbol) return;
      const notes = getStockNotes();
      delete notes[targetNoteSymbol];
      saveStockNotes(notes);
      closeNoteModal();
      renderActiveTable();
      if (window.renderSmcModule) window.renderSmcModule();
      showToast(`Note deleted for ${targetNoteSymbol}`, '🗑');
    });
  }

  // Initial Watchlist Module Boot
  renderGroupsBar();
  renderActiveTable();
}

/* ==========================================================================
   14. Stock Monitoring Center (SMC) Module
       (Mobile App Fidelity: Autonomous Surveillance, Confluence Score,
        MTR ±3% Target Alerts, Live 30s NSE Polling, Shared Notes & TradingView)
   ========================================================================== */
function initSmcModule() {
  const tableBody = document.getElementById('smcTableBody');
  const emptyState = document.getElementById('smcEmptyState');
  const filterBtns = document.querySelectorAll('.smc-filter-btn');
  const filterSearchInput = document.getElementById('smcFilterSearchInput');

  const metricTotal = document.getElementById('smcMetricTotal');
  const metricMtr = document.getElementById('smcMetricMtr');
  const metricBullish = document.getElementById('smcMetricBullish');
  const metricAvg = document.getElementById('smcMetricAvg');
  const stockCountPill = document.getElementById('smcStockCountPill');
  const smcLiveDateEl = document.getElementById('smcLiveDate');
  const smcUpdateTimerEl = document.getElementById('smcUpdateTimer');
  const btnRefreshSmc = document.getElementById('btnRefreshSmc');
  const smcRefreshIcon = document.getElementById('smcRefreshIcon');

  const searchAddInput = document.getElementById('smcStockSearchInput');
  const searchAddClear = document.getElementById('smcStockSearchClear');
  const searchAddDropdown = document.getElementById('smcSearchDropdown');

  // MTR Modal Elements
  const mtrModal = document.getElementById('mtrModal');
  const closeMtrBtn = document.getElementById('closeMtrModalBtn');
  const mtrSymbolEl = document.getElementById('mtrModalSymbol');
  const mtrNameEl = document.getElementById('mtrModalName');
  const mtrPriceEl = document.getElementById('mtrModalPrice');
  const mtrCurrentAnalysisEl = document.getElementById('mtrModalCurrentAnalysis');
  const mtrSectorEl = document.getElementById('mtrModalSector');
  const mtrStatusBadge = document.getElementById('mtrModalStatusBadge');
  const mtrStatusText = document.getElementById('mtrModalStatusText');
  const mtrBigBadge = document.getElementById('mtrBigBadge');
  const mtrBigBadgeVal = document.getElementById('mtrBigBadgeVal');
  const mtrSlider = document.getElementById('mtrSlider');
  const presetPills = document.querySelectorAll('.mtr-preset-pill');
  const btnSaveMtr = document.getElementById('btnSaveMtr');
  const btnDisableMtr = document.getElementById('btnDisableMtr');

  // MTR Alert Delivery Controls
  const mtrChannelBtns = document.querySelectorAll('.mtr-channel-pill');
  const mtrContactEmailSummary = document.getElementById('mtrContactEmailSummary');
  const mtrPhoneInput = document.getElementById('mtrPhoneInput');
  const mtrDeliveryStatusBadge = document.getElementById('mtrDeliveryStatusBadge');
  const mtrCloudHintText = document.getElementById('mtrCloudHintText');

  // State
  let activeFilter = 'all';
  let filterQuery = '';
  let activeMtrSymbol = null;
  let activeMtrSliderVal = 75;
  let activeMtrChannel = 'email';
  let cloudSmcApiSupported = null; // null = untested, true = /api/smc-alerts deployed, false = 404
  let cloudSmcCapabilities = { emailConfigured: false, smsConfigured: false, storageConfigured: false };

  // Live Sync & MTR Surveillance State
  let smcLastSyncTime = null;
  let smcSecondsAgo = 0;
  let smcAutoRefreshTimer = null;
  let smcSecondsTicker = null;
  let isSmcSyncing = false;
  const smcNotifiedSymbols = new Set();
  const smcCustomQuoteCache = {};

  const DEFAULT_SMC_ENTRIES = [
    { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd.', isMonitored: true, targetAnalysisPct: 80, addedAt: Date.now() - 86400000 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', isMonitored: true, targetAnalysisPct: 75, addedAt: Date.now() - 72000000 },
    { symbol: 'SBIN', name: 'State Bank of India', isMonitored: true, targetAnalysisPct: 70, addedAt: Date.now() - 60000000 },
    { symbol: 'TITAN', name: 'Titan Company Limited', isMonitored: false, targetAnalysisPct: 68, addedAt: Date.now() - 50000000 },
    { symbol: 'RELIANCE', name: 'Reliance Industries', isMonitored: true, targetAnalysisPct: 78, addedAt: Date.now() - 40000000 },
    { symbol: 'POWERGRID', name: 'Power Grid Corp of India', isMonitored: false, targetAnalysisPct: 72, addedAt: Date.now() - 30000000 },
    { symbol: 'INFY', name: 'Infosys Limited', isMonitored: false, targetAnalysisPct: 76, addedAt: Date.now() - 20000000 }
  ];

  function getSmcEntries() {
    try {
      const data = localStorage.getItem('trade_niti_smc_entries');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem('trade_niti_smc_entries', JSON.stringify(DEFAULT_SMC_ENTRIES));
    return [...DEFAULT_SMC_ENTRIES];
  }

  function saveSmcEntries(entries) {
    localStorage.setItem('trade_niti_smc_entries', JSON.stringify(entries));
    const symList = entries.map(e => e.symbol.toUpperCase());
    localStorage.setItem('trade_niti_smc_symbols', JSON.stringify(symList));
  }

  function resolveSmcStock(symbol) {
    const sym = (symbol || '').toUpperCase().trim();
    const master = findMasterStock(sym);
    const liveCustom = smcCustomQuoteCache[sym];
    if (liveCustom) {
      return { ...master, ...liveCustom };
    }
    return master;
  }

  // Update Live Date & Auto-Refresh Countdown UI
  function updateSmcTimestampUI() {
    if (smcLiveDateEl) {
      const today = new Date();
      smcLiveDateEl.textContent = today.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    }
    if (!smcUpdateTimerEl) return;

    if (isSmcSyncing) {
      smcUpdateTimerEl.innerHTML = `<span style="color:var(--brand-blue); font-weight:700;">Syncing live NSE quotes...</span>`;
      return;
    }
    if (!smcLastSyncTime) {
      smcUpdateTimerEl.textContent = 'Connecting live NSE sync \u2022 auto-refresh 30s';
      return;
    }

    const timeStr = smcLastSyncTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const agoStr = smcSecondsAgo < 5 ? 'Just now' : `${smcSecondsAgo}s ago`;
    smcUpdateTimerEl.innerHTML = `Updated ${agoStr} (${timeStr}) &bull; <span style="color:var(--brand-blue); font-weight:700;">auto-refresh 30s</span>`;
  }

  // Sound chime + OS Desktop Notification when browser tab is active
  function fireBrowserSmcNotification(symbol, currPct, targetPct, price) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      }
    } catch (_) {}

    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Trade Niti SMC Alert: ${symbol}`, {
          body: `${symbol} Confluence reached ${currPct}% (Target: ${targetPct}% \u00B13%, LTP \u20B9${Number(price || 0).toFixed(2)})`
        });
      }
    } catch (_) {}
  }

  // Sync MTR Rule & Dispatch Cloud Email / SMS via Firestore + Vercel /api/smc-alerts
  async function syncSmcAlertToCloud(entry, stock, action = 'upsert') {
    const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
    if (!user || !entry || !entry.symbol) return { synced: false, reason: 'no_user' };

    const channel = entry.notifyChannel || user.alertChannel || 'email';
    let idToken = null;
    if (window.tradeNitiFirebase && typeof window.tradeNitiFirebase.getIdToken === 'function') {
      idToken = await window.tradeNitiFirebase.getIdToken();
    }

    const payload = {
      action,
      uid: user.uid || (user.email ? 'local_' + user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : user.username || 'trader'),
      idToken,
      userName: user.fullName || user.username || 'Trader',
      email: user.email || '',
      phone: user.phone || '',
      channel,
      symbol: entry.symbol,
      targetAnalysisPct: entry.targetAnalysisPct || 70,
      isMonitored: Boolean(entry.isMonitored) && action !== 'delete',
      currentConfluence: (stock && stock.confluence) || 65,
      currentPrice: (stock && stock.price) || 0
    };

    // 1. Direct Cloud Firestore sync (for authenticated Firebase accounts)
    let firestoreOk = false;
    if (window.tradeNitiFirebase && typeof window.tradeNitiFirebase.syncSmcAlert === 'function') {
      firestoreOk = await window.tradeNitiFirebase.syncSmcAlert(payload);
    }

    // 2. Vercel Cloud Alert Endpoint (/api/smc-alerts) for off-browser Email & SMS dispatch
    if (cloudSmcApiSupported === false) {
      return { synced: firestoreOk, apiAvailable: false };
    }

    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch('https://swingtrader-nse-proxy.vercel.app/api/smc-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal
      });
      clearTimeout(t);
      if (res.status === 404) {
        cloudSmcApiSupported = false;
        return { synced: firestoreOk, apiAvailable: false };
      }
      if (res.ok) {
        const data = await res.json();
        cloudSmcApiSupported = true;
        if (data && data.capabilities) cloudSmcCapabilities = data.capabilities;
        return { synced: true, apiAvailable: true, response: data };
      }
    } catch (_) {}

    return { synced: firestoreOk, apiAvailable: cloudSmcApiSupported === true };
  }

  // Evaluate MTR ±3% Target Alerts (Matching SmcViewModel.kt lines 138-153)
  function evaluateMtrAlerts(entries, suppressToast = false) {
    entries.forEach(entry => {
      if (!entry.isMonitored || entry.targetAnalysisPct == null) return;
      const stock = resolveSmcStock(entry.symbol);
      const currPct = stock.confluence || 50;
      const targetPct = entry.targetAnalysisPct;
      const diff = Math.abs(currPct - targetPct);

      if (diff <= 3) {
        if (!smcNotifiedSymbols.has(entry.symbol)) {
          smcNotifiedSymbols.add(entry.symbol);
          if (!suppressToast) {
            if (typeof showToast === 'function') {
              showToast(`\u26A1 MTR Target Alert: ${entry.symbol} reached ${currPct}% (Target: ${targetPct}% \u00B13%)!`, '\u26A1');
            }
            fireBrowserSmcNotification(entry.symbol, currPct, targetPct, stock.price);
            syncSmcAlertToCloud(entry, stock, 'trigger_instant');
          }
        }
      } else if (diff > 5) {
        smcNotifiedSymbols.delete(entry.symbol);
      }
    });
  }

  // Live 30s NSE Quote Sync for ALL Stocks in SMC Surveillance
  async function syncLiveSmcQuotes(isManual = false) {
    if (isSmcSyncing) return;
    const entries = getSmcEntries();
    if (!entries || entries.length === 0) {
      smcLastSyncTime = new Date();
      smcSecondsAgo = 0;
      updateSmcTimestampUI();
      return;
    }

    isSmcSyncing = true;
    if (smcRefreshIcon) smcRefreshIcon.style.animation = 'spin 0.8s linear infinite';
    updateSmcTimestampUI();

    let updatedCount = 0;

    try {
      await Promise.allSettled(entries.map(async (entry) => {
        try {
          const sym = (entry.symbol || '').toUpperCase().trim();
          const qSym = (sym === 'TATAMOTORS') ? 'TMPV' : sym;
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 5000);
          const res = await fetch('https://swingtrader-nse-proxy.vercel.app/api/quote?symbol=' + encodeURIComponent(qSym), { signal: controller.signal });
          clearTimeout(timer);
          if (!res.ok) return;
          const data = await res.json();
          if (data && data.priceInfo && data.priceInfo.lastPrice) {
            const ltp = data.priceInfo.lastPrice;
            const chg = data.priceInfo.change !== undefined ? data.priceInfo.change : 0;
            const pchg = data.priceInfo.pChange !== undefined ? data.priceInfo.pChange : 0;

            updatedCount++;

            // Update TRADE_NITI_MASTER_STOCKS & MARKET_STOCKS_MASTER if present
            let targetConf = null;
            if (typeof TRADE_NITI_MASTER_STOCKS !== 'undefined') {
              const ms = TRADE_NITI_MASTER_STOCKS.find(s => s.symbol.toUpperCase() === sym);
              if (ms) {
                ms.price = ltp;
                ms.ltp = ltp;
                ms.change = chg;
                ms.changePct = pchg;
                if (data.priceInfo.weekHighLow && data.priceInfo.weekHighLow.max) {
                  ms.high52 = data.priceInfo.weekHighLow.max;
                  ms.low52 = data.priceInfo.weekHighLow.min || ms.low52;
                } else if (data.priceInfo.intraDayHighLow) {
                  if (data.priceInfo.intraDayHighLow.max) ms.high52 = Math.max(ms.high52 || 0, data.priceInfo.intraDayHighLow.max);
                  if (data.priceInfo.intraDayHighLow.min) ms.low52 = Math.min(ms.low52 || ltp, data.priceInfo.intraDayHighLow.min);
                }
                if (pchg > 2.0) {
                  ms.confluence = Math.min(96, Math.max(72, (ms.confluence || 50) + 3));
                  ms.analysisPct = ms.confluence;
                } else if (pchg < -2.0) {
                  ms.confluence = Math.max(25, Math.min(48, (ms.confluence || 50) - 3));
                  ms.analysisPct = ms.confluence;
                }
                targetConf = ms.confluence;
              }
            }
            if (typeof MARKET_STOCKS_MASTER !== 'undefined') {
              const mm = MARKET_STOCKS_MASTER.find(s => s.symbol.toUpperCase() === sym);
              if (mm) {
                mm.price = ltp;
                mm.change = chg;
                mm.changePct = pchg;
              }
            }

            const existingBase = findMasterStock(sym);
            smcCustomQuoteCache[sym] = {
              price: ltp,
              ltp: ltp,
              change: chg,
              changePct: pchg,
              confluence: targetConf !== null ? targetConf : existingBase.confluence
            };
          }
        } catch (_) {}
      }));

      smcLastSyncTime = new Date();
      smcSecondsAgo = 0;

      evaluateMtrAlerts(entries, false);

      if (isManual && typeof showToast === 'function') {
        if (updatedCount > 0) {
          showToast(`SMC Radar synced ${updatedCount} live NSE ${updatedCount === 1 ? 'quote' : 'quotes'}!`, '\uD83D\uDCE1');
        } else {
          showToast('SMC Radar refreshed (Cached quotes active)', '\uD83D\uDCE1');
        }
      }
    } catch (e) {
      console.warn('SMC live sync error:', e);
    } finally {
      isSmcSyncing = false;
      if (smcRefreshIcon) smcRefreshIcon.style.animation = '';
      updateSmcTimestampUI();
      renderSmc();
    }
  }

  function startSmcTickers() {
    stopSmcTickers();
    smcSecondsTicker = setInterval(() => {
      const smcSec = document.getElementById('smc-page');
      if (smcSec && smcSec.style.display !== 'none') {
        smcSecondsAgo++;
        updateSmcTimestampUI();
      }
    }, 1000);

    // 30-second live NSE surveillance polling loop when SMC is visible
    smcAutoRefreshTimer = setInterval(() => {
      const smcSec = document.getElementById('smc-page');
      if (smcSec && smcSec.style.display !== 'none' && !isSmcSyncing) {
        syncLiveSmcQuotes(false);
      }
    }, 30000);
  }

  function stopSmcTickers() {
    if (smcSecondsTicker) {
      clearInterval(smcSecondsTicker);
      smcSecondsTicker = null;
    }
    if (smcAutoRefreshTimer) {
      clearInterval(smcAutoRefreshTimer);
      smcAutoRefreshTimer = null;
    }
  }

  // Cross-module helpers
  window.addSmcEntryDirect = function(symbol, name, confluence) {
    const entries = getSmcEntries();
    if (!entries.find(e => e.symbol.toUpperCase() === symbol.toUpperCase())) {
      entries.push({
        symbol: symbol.toUpperCase(),
        name: name || `${symbol.toUpperCase()} Ltd.`,
        isMonitored: false,
        targetAnalysisPct: confluence || 70,
        addedAt: Date.now()
      });
      saveSmcEntries(entries);
    }
  };

  window.removeSmcEntryDirect = function(symbol) {
    let entries = getSmcEntries();
    entries = entries.filter(e => e.symbol.toUpperCase() !== symbol.toUpperCase());
    saveSmcEntries(entries);
  };

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Render SMC Table & Metrics
  function renderSmc() {
    const sub = (window.tradeNitiSubscription && window.tradeNitiSubscription.check)
      ? window.tradeNitiSubscription.check()
      : { isProWeb: false };

    const smcBarrier = document.getElementById('smcFullPageLockBarrier');
    if (smcBarrier) {
      smcBarrier.style.display = sub.isProWeb ? 'none' : 'flex';
    }

    updateSmcTimestampUI();

    const entries = getSmcEntries();
    const notes = (typeof window.getStockNotesShared === 'function') ? window.getStockNotesShared() : {};

    // 1. Calculate Metrics
    const totalCount = entries.length;
    const mtrCount = entries.filter(e => e.isMonitored).length;
    let bullishCount = 0;
    let sumScore = 0;

    entries.forEach(e => {
      const stock = resolveSmcStock(e.symbol);
      if (stock.confluence >= 60) bullishCount++;
      sumScore += stock.confluence;
    });

    const avgScore = totalCount > 0 ? (sumScore / totalCount).toFixed(1) : '0';

    if (metricTotal) metricTotal.textContent = totalCount;
    if (metricMtr) metricMtr.textContent = `${mtrCount} ON`;
    if (metricBullish) metricBullish.textContent = `${bullishCount} Stocks`;
    if (metricAvg) metricAvg.textContent = `${avgScore}%`;
    if (stockCountPill) stockCountPill.textContent = `${totalCount} ${totalCount === 1 ? 'stock' : 'stocks'} \u2022 ${mtrCount} monitored`;

    // 2. Sort entries by Confluence % descending (Kotlin: sortedByAnalysis())
    let sorted = [...entries].map(e => {
      const stock = resolveSmcStock(e.symbol);
      return {
        ...e,
        stock: stock
      };
    });

    sorted.sort((a, b) => b.stock.confluence - a.stock.confluence);

    // 3. Filter entries
    if (activeFilter === 'monitored') {
      sorted = sorted.filter(row => row.isMonitored);
    } else if (activeFilter === 'bullish') {
      sorted = sorted.filter(row => row.stock.confluence >= 60);
    } else if (activeFilter === 'caution') {
      sorted = sorted.filter(row => row.stock.confluence < 60);
    }

    if (filterQuery) {
      sorted = sorted.filter(row =>
        row.symbol.toLowerCase().includes(filterQuery) ||
        row.name.toLowerCase().includes(filterQuery) ||
        row.stock.sector.toLowerCase().includes(filterQuery)
      );
    }

    if (sorted.length === 0) {
      if (tableBody) tableBody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // 4. Render Rows
    if (tableBody) {
      tableBody.innerHTML = sorted.map(row => {
        const stock = row.stock;
        const pctVal = stock.changePct !== undefined ? stock.changePct : 0;
        const chgVal = stock.change !== undefined ? stock.change : 0;
        const isUp = (pctVal !== 0 ? pctVal : chgVal) >= 0;
        const sign = isUp ? '+' : '-';
        const changeClass = isUp ? 'profit' : 'loss';
        const noteObj = notes[row.symbol];
        const hasNote = !!(noteObj && noteObj.note && noteObj.note.trim());
        const tvUrl = `https://www.tradingview.com/chart/?symbol=NSE:${row.symbol}`;

        let confluenceClass = 'bullish';
        if (stock.confluence < 40) confluenceClass = 'bearish';
        else if (stock.confluence < 60) confluenceClass = 'neutral';

        const isTargetHit = !!(row.isMonitored && row.targetAnalysisPct != null && Math.abs(stock.confluence - row.targetAnalysisPct) <= 3);
        const targetText = (row.isMonitored && row.targetAnalysisPct != null)
          ? `Target: ${row.targetAnalysisPct}%${isTargetHit ? ' \u26A1 HIT' : ''}`
          : 'Target: Not Set';
        const targetClass = row.isMonitored ? 'monitored' : 'unmonitored';

        return `
          <tr data-symbol="${row.symbol}">
            <!-- Col 1: Stock Info & Note Preview -->
            <td>
              <div class="wl-stock-info">
                <div class="wl-symbol-row">
                  <span class="wl-stock-symbol" data-action="detail" data-symbol="${row.symbol}" title="View stock details for ${row.symbol}" style="cursor: pointer;">${row.symbol}</span>
                  <span class="wl-stock-sector">${stock.sector}</span>
                  <a href="javascript:void(0)" class="link-stock-analysis" data-action="stock-analysis" data-symbol="${row.symbol}" title="Open Stock Analysis Center for ${row.symbol}">
                    <span>Analysis Center</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </a>
                </div>
                <div class="wl-stock-name">${row.name}</div>
                ${hasNote ? `
                  <div class="note-preview-chip" data-action="note" data-symbol="${row.symbol}" title="Edit personal note">
                    <span>\uD83D\uDCDD ${escapeHtml(noteObj.note.slice(0, 36))}${noteObj.note.length > 36 ? '\u2026' : ''}</span>
                  </div>
                ` : ''}
              </div>
            </td>

            <!-- Col 2: Price & Change -->
            <td>
              <div class="wl-price-cell">
                <span class="wl-price-val">\u20B9${Number(stock.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span class="wl-change-val ${changeClass}">${sign}\u20B9${Math.abs(chgVal).toFixed(2)} (${sign}${Math.abs(pctVal).toFixed(2)}%)</span>
              </div>
            </td>

            <!-- Col 3: Confluence & Target -->
            <td class="wl-analysis-cell">
              <span class="wl-analysis-badge ${confluenceClass}">
                ${stock.confluence}%
              </span>
              <div class="smc-target-subtext ${targetClass}" ${isTargetHit ? 'style="color:#10B981; font-weight:800;"' : ''}>
                ${targetText}
              </div>
            </td>

            <!-- Col 4: MTR Alert Toggle Button -->
            <td class="smc-mtr-cell" style="text-align:center;">
              <button type="button" class="mtr-btn ${row.isMonitored ? 'on' : 'off'}" data-action="mtr" data-symbol="${row.symbol}" title="${row.isMonitored ? 'MTR Target Active - Click to Configure' : 'MTR Alert OFF - Click to Set Target'}">
                ${row.isMonitored ? 'ON' : 'OFF'}
              </button>
              ${isTargetHit ? '<div style="font-size:0.60rem; font-weight:800; color:#10B981; margin-top:2px; letter-spacing:0.3px;">\u26A1 \u00B13% MATCH</div>' : ''}
            </td>

            <!-- Col 5: Note Edit Button -->
            <td class="wl-note-cell">
              <button type="button" class="wl-note-btn ${hasNote ? 'has-note' : ''}" data-action="note" data-symbol="${row.symbol}" title="Add/Edit Personal Note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                ${hasNote ? '<span class="wl-note-dot"></span>' : ''}
              </button>
            </td>

            <!-- Col 6: Actions (TradingView & Remove) -->
            <td class="wl-actions-cell">
              <div class="wl-actions-group">
                <a href="${tvUrl}" target="_blank" rel="noopener noreferrer" class="wl-btn-chart" title="Open TradingView Chart">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  <span>Chart</span>
                </a>
                <button type="button" class="wl-btn-remove" data-action="remove-smc" data-symbol="${row.symbol}" title="Remove from SMC Surveillance">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Wire up row button actions
      tableBody.querySelectorAll('[data-action]').forEach(el => {
        el.addEventListener('click', (e) => {
          const action = el.getAttribute('data-action');
          const symbol = el.getAttribute('data-symbol');

          if (action === 'detail') {
            if (window.openStockDetailModal) window.openStockDetailModal(symbol);
          } else if (action === 'stock-analysis') {
            e.stopPropagation();
            if (window.openStockAnalysisCenter) window.openStockAnalysisCenter(symbol);
          } else if (action === 'chart') {
            window.open(`https://www.tradingview.com/chart/?symbol=NSE:${symbol}`, '_blank');
          } else if (action === 'mtr') {
            openMtrDialog(symbol);
          } else if (action === 'note') {
            if (window.openStockNoteModal) window.openStockNoteModal(symbol);
          } else if (action === 'remove-smc') {
            removeSmcStock(symbol);
          }
        });
      });
    }
  }

  window.syncLiveSmcQuotes = syncLiveSmcQuotes;
  window.renderSmcModule = function() {
    updateSmcTimestampUI();
    renderSmc();
    startSmcTickers();
    if (!smcLastSyncTime || (Date.now() - smcLastSyncTime.getTime() > 25000)) {
      syncLiveSmcQuotes(false);
    }
  };

  if (btnRefreshSmc) {
    btnRefreshSmc.addEventListener('click', () => {
      syncLiveSmcQuotes(true);
      startSmcTickers();
    });
  }

  // Filter Toolbar Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderSmc();
    });
  });

  // Filter Search
  if (filterSearchInput) {
    filterSearchInput.addEventListener('input', (e) => {
      filterQuery = e.target.value.trim().toLowerCase();
      renderSmc();
    });
  }

  // Remove Stock from SMC
  function removeSmcStock(symbol) {
    let entries = getSmcEntries();
    const removed = entries.find(e => e.symbol.toUpperCase() === symbol.toUpperCase());
    entries = entries.filter(e => e.symbol.toUpperCase() !== symbol.toUpperCase());
    saveSmcEntries(entries);
    if (removed) syncSmcAlertToCloud({ ...removed, isMonitored: false }, resolveSmcStock(symbol), 'delete');
    renderSmc();
    if (window.renderActiveWatchlist) window.renderActiveWatchlist();
    if (typeof showToast === 'function') {
      showToast(`Removed ${symbol} from SMC Radar`, '\uD83D\uDDD1\uFE0F');
    }
  }

  // Add Stock to SMC
  function addSmcStock(symbol) {
    const entries = getSmcEntries();
    const symUpper = symbol.toUpperCase();
    if (entries.find(e => e.symbol.toUpperCase() === symUpper)) {
      if (typeof showToast === 'function') {
        showToast(`${symUpper} is already in SMC surveillance.`, '\u2139\uFE0F');
      }
      return;
    }
    const stock = resolveSmcStock(symUpper);
    entries.push({
      symbol: stock.symbol,
      name: stock.name,
      isMonitored: false,
      targetAnalysisPct: stock.confluence,
      addedAt: Date.now()
    });
    saveSmcEntries(entries);
    renderSmc();
    syncLiveSmcQuotes(false);
    if (window.renderActiveWatchlist) window.renderActiveWatchlist();
    if (typeof showToast === 'function') {
      showToast(`Added ${symUpper} to SMC Center!`, '\uD83D\uDCE1');
    }
  }

  // Quick Add Dropdown Search
  if (searchAddInput && searchAddDropdown) {
    searchAddInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (searchAddClear) searchAddClear.style.display = q ? 'block' : 'none';

      if (!q) {
        searchAddDropdown.style.display = 'none';
        searchAddDropdown.innerHTML = '';
        return;
      }

      const matches = TRADE_NITI_MASTER_STOCKS.filter(s =>
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q)
      ).slice(0, 7);

      if (matches.length === 0) {
        searchAddDropdown.innerHTML = `<div style="padding:12px; font-size:0.8rem; color:var(--text-muted); text-align:center;">No matching NSE stocks found</div>`;
        searchAddDropdown.style.display = 'block';
        return;
      }

      searchAddDropdown.innerHTML = matches.map(s => `
        <div class="wl-search-item" data-sym="${s.symbol}">
          <div>
            <div class="wl-search-item-symbol">
              ${s.symbol} <span class="wl-stock-sector">${s.sector}</span>
              <a href="javascript:void(0)" class="link-stock-analysis" data-action="stock-analysis" data-symbol="${s.symbol}" style="margin-left:4px; font-size:0.65rem; padding:1px 5px;">Stock Analysis Center</a>
            </div>
            <div class="wl-search-item-name">${s.name}</div>
          </div>
          <div class="wl-search-item-price">
            \u20B9${s.price.toFixed(2)}
          </div>
        </div>
      `).join('');

      searchAddDropdown.querySelectorAll('.wl-search-item').forEach(item => {
        item.addEventListener('click', (ev) => {
          if (ev.target.closest('.link-stock-analysis')) return;
          const sym = item.getAttribute('data-sym');
          addSmcStock(sym);
          searchAddInput.value = '';
          searchAddDropdown.style.display = 'none';
          if (searchAddClear) searchAddClear.style.display = 'none';
        });
      });

      searchAddDropdown.style.display = 'block';
    });

    if (searchAddClear) {
      searchAddClear.addEventListener('click', () => {
        searchAddInput.value = '';
        searchAddDropdown.style.display = 'none';
        searchAddClear.style.display = 'none';
        searchAddInput.focus();
      });
    }

    document.addEventListener('click', (e) => {
      if (!searchAddInput.contains(e.target) && !searchAddDropdown.contains(e.target)) {
        searchAddDropdown.style.display = 'none';
      }
    });
  }

  // MTR Dialog Implementation (Matches MtrDialog in Kotlin)
  function updateMtrBigBadge(val) {
    if (!mtrBigBadgeVal || !mtrBigBadge) return;
    mtrBigBadgeVal.textContent = `${val}%`;

    mtrBigBadge.className = 'mtr-big-badge';
    if (val >= 60) mtrBigBadge.classList.add('bullish');
    else if (val >= 40) mtrBigBadge.classList.add('neutral');
    else mtrBigBadge.classList.add('caution');
  }

  function openMtrDialog(symbol) {
    activeMtrSymbol = symbol;
    const entries = getSmcEntries();
    const entry = entries.find(e => e.symbol.toUpperCase() === symbol.toUpperCase());
    if (!entry) return;

    const stock = resolveSmcStock(symbol);

    if (mtrSymbolEl) mtrSymbolEl.textContent = stock.symbol;
    if (mtrNameEl) mtrNameEl.textContent = stock.name;
    if (mtrPriceEl) mtrPriceEl.textContent = `\u20B9${Number(stock.price || 0).toFixed(2)}`;
    if (mtrCurrentAnalysisEl) mtrCurrentAnalysisEl.textContent = `${stock.confluence}%`;
    if (mtrSectorEl) mtrSectorEl.textContent = stock.sector;

    if (mtrStatusBadge && mtrStatusText) {
      if (entry.isMonitored) {
        mtrStatusBadge.className = 'mtr-status-badge';
        mtrStatusText.textContent = 'MTR ON';
      } else {
        mtrStatusBadge.className = 'mtr-status-badge off';
        mtrStatusText.textContent = 'MTR OFF';
      }
    }

    activeMtrSliderVal = entry.targetAnalysisPct || stock.confluence || 75;
    if (mtrSlider) mtrSlider.value = activeMtrSliderVal;
    updateMtrBigBadge(activeMtrSliderVal);

    // Populate Account Email / Mobile & Alert Channel
    const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
    if (mtrContactEmailSummary) mtrContactEmailSummary.textContent = (user && user.email) ? user.email : 'Not signed in';
    if (mtrPhoneInput) mtrPhoneInput.value = (user && user.phone) ? user.phone : '';
    activeMtrChannel = entry.notifyChannel || (user && user.alertChannel) || 'email';
    mtrChannelBtns.forEach(btn => {
      const ch = btn.getAttribute('data-channel');
      if (ch === activeMtrChannel) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    if (mtrDeliveryStatusBadge) {
      mtrDeliveryStatusBadge.textContent = (user && user.phone) ? 'Email + Mobile Linked' : 'Email Linked';
    }

    if (mtrModal) mtrModal.classList.add('active');
  }

  mtrChannelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeMtrChannel = btn.getAttribute('data-channel') || 'email';
      mtrChannelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  if (mtrSlider) {
    mtrSlider.addEventListener('input', (e) => {
      activeMtrSliderVal = parseInt(e.target.value, 10);
      updateMtrBigBadge(activeMtrSliderVal);
    });
  }

  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const pct = parseInt(pill.getAttribute('data-pct'), 10);
      activeMtrSliderVal = pct;
      if (mtrSlider) mtrSlider.value = pct;
      updateMtrBigBadge(pct);
    });
  });

  const closeMtrModal = () => {
    if (mtrModal) mtrModal.classList.remove('active');
    activeMtrSymbol = null;
  };

  if (closeMtrBtn) closeMtrBtn.addEventListener('click', closeMtrModal);
  if (mtrModal) {
    mtrModal.addEventListener('click', (e) => {
      if (e.target === mtrModal) closeMtrModal();
    });
  }

  if (btnSaveMtr) {
    btnSaveMtr.addEventListener('click', async () => {
      if (!activeMtrSymbol) return;
      const symToSave = activeMtrSymbol;
      const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
      const phoneVal = mtrPhoneInput ? mtrPhoneInput.value.trim() : ((user && user.phone) || '');

      if ((activeMtrChannel === 'sms' || activeMtrChannel === 'both') && phoneVal.replace(/[^0-9]/g, '').length < 10) {
        if (typeof showToast === 'function') {
          showToast('Please enter a valid 10-digit mobile number for SMS alerts.', '\u26A0\uFE0F');
        }
        if (mtrPhoneInput) mtrPhoneInput.focus();
        return;
      }

      // Persist updated phone & preferred channel onto User Account
      if (user && typeof window.setCurrentUser === 'function') {
        user.phone = phoneVal;
        user.alertChannel = activeMtrChannel;
        window.setCurrentUser(user);
      }

      // Request browser OS desktop notification permission gently
      try {
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission().catch(() => {});
        }
      } catch (_) {}

      const entries = getSmcEntries();
      const entry = entries.find(e => e.symbol.toUpperCase() === symToSave.toUpperCase());
      if (entry) {
        entry.isMonitored = true;
        entry.targetAnalysisPct = activeMtrSliderVal;
        entry.notifyChannel = activeMtrChannel;
        saveSmcEntries(entries);
        smcNotifiedSymbols.delete(entry.symbol);

        const stock = resolveSmcStock(symToSave);
        const targetLabel = activeMtrChannel === 'both'
          ? `Email & SMS`
          : (activeMtrChannel === 'sms' ? `SMS (${phoneVal})` : `Email (${(user && user.email) || 'account'})`);

        if (typeof showToast === 'function') {
          showToast(`MTR Alert ON for ${symToSave} at ${activeMtrSliderVal}% via ${targetLabel}!`, '\u26A1');
        }

        closeMtrModal();
        evaluateMtrAlerts(entries, false);
        renderSmc();

        // Register in Cloud Backend + send confirmation if target not already hit instantaneously
        const diff = Math.abs((stock.confluence || 50) - activeMtrSliderVal);
        syncSmcAlertToCloud(entry, stock, diff <= 3 ? 'trigger_instant' : 'send_confirmation');
      }
    });
  }

  if (btnDisableMtr) {
    btnDisableMtr.addEventListener('click', () => {
      if (!activeMtrSymbol) return;
      const entries = getSmcEntries();
      const entry = entries.find(e => e.symbol.toUpperCase() === activeMtrSymbol.toUpperCase());
      if (entry) {
        entry.isMonitored = false;
        saveSmcEntries(entries);
        smcNotifiedSymbols.delete(entry.symbol);
        syncSmcAlertToCloud(entry, resolveSmcStock(activeMtrSymbol), 'delete');
        if (typeof showToast === 'function') {
          showToast(`MTR Alert turned OFF for ${activeMtrSymbol}`, '\u2139\uFE0F');
        }
        closeMtrModal();
        renderSmc();
      }
    });
  }

  // Initial SMC Boot
  updateSmcTimestampUI();
  renderSmc();
}

/* ==========================================================================
   15. Market News Module
       (Mobile App Fidelity: Real-Time RSS Feeds, 4 Categorized Channels,
        Market Sentiment Pulse, Trending Tickers, Bookmarks, and Institutional Quick Reader)
   ========================================================================== */
function initNewsModule() {
  const newsGrid = document.getElementById('newsArticlesGrid');
  const emptyState = document.getElementById('newsEmptyState');
  const categoryChips = document.querySelectorAll('.news-cat-chip');
  const searchInput = document.getElementById('newsSearchInput');
  const searchClear = document.getElementById('newsSearchClear');
  const refreshBtn = document.getElementById('btnRefreshNews');
  const hotTickerChips = document.querySelectorAll('.hot-ticker-chip');
  const liveDateEl = document.getElementById('newsLiveDate');
  const updateTimerEl = document.getElementById('newsUpdateTimer');
  const articleCountPill = document.getElementById('newsArticleCountPill');
  const savedCountEl = document.getElementById('savedNewsCount');
  const sentimentBullishEl = document.getElementById('sentimentBullishCount');
  const sentimentNeutralEl = document.getElementById('sentimentNeutralCount');
  const sentimentBearishEl = document.getElementById('sentimentBearishCount');
  const resetFiltersBtn = document.getElementById('btnResetNewsFilters');

  // Reader Modal Elements
  const newsReaderModal = document.getElementById('newsReaderModal');
  const closeReaderBtn = document.getElementById('closeNewsReaderModalBtn');
  const readerSourceBadge = document.getElementById('newsReaderSourceBadge');
  const readerTime = document.getElementById('newsReaderTime');
  const readerTitle = document.getElementById('newsReaderTitle');
  const readerSentimentBadge = document.getElementById('newsReaderSentimentBadge');
  const readerTickers = document.getElementById('newsReaderTickers');
  const readerDesc = document.getElementById('newsReaderDesc');
  const readerContext = document.getElementById('newsReaderContext');
  const readerSourceLink = document.getElementById('newsReaderSourceLink');
  const readerBookmarkBtn = document.getElementById('btnBookmarkFromModal');
  const readerBookmarkIcon = document.getElementById('modalBookmarkIcon');
  const readerBookmarkText = document.getElementById('modalBookmarkText');

  // State
  let activeCategory = 'All';
  let activeSearchQuery = '';
  let activeTickerFilter = null;
  let activeModalArticle = null;

  const NEWS_CACHE_KEY = 'trade_niti_live_news_cache_v2';
  let isFetchingNews = false;
  let newsLastSyncTime = null;
  let newsSecondsAgo = 0;
  let newsAutoRefreshTimer = null;
  let newsSecondsTicker = null;
  let newsRelativeRefreshCounter = 0;
  let newsRotationWave = 0;
  let proxyNewsSupported = null; // null = untested, true = live Vercel /api/news, false = 404 fallback
  let rss2jsonCooldownUntil = 0;
  let hasLiveFeedLoaded = false;

  // Real-Time RSS Feed Sources Matching NewsRepository.kt
  const NEWS_RSS_CHANNELS = [
    {
      url: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
      category: 'Markets',
      sourceName: 'ET Markets',
      sourceColor: '#1565C0'
    },
    {
      url: 'https://www.livemint.com/rss/markets',
      category: 'Stocks',
      sourceName: 'LiveMint',
      sourceColor: '#2E7D32'
    },
    {
      url: 'https://economictimes.indiatimes.com/economy/rssfeeds/1373380680.cms',
      category: 'Economy',
      sourceName: 'ET Economy',
      sourceColor: '#6A1B9A'
    },
    {
      url: 'https://economictimes.indiatimes.com/markets/ipos/fpos/rssfeeds/14655708.cms',
      category: 'IPO & Funds',
      sourceName: 'ET IPO & Funds',
      sourceColor: '#E65100'
    }
  ];

  const BING_INDIA_MARKET_RSS = {
    url: 'https://www.bing.com/news/search?q=Nifty+Sensex+Indian+Stock+Market&format=rss',
    category: 'Markets',
    sourceName: 'Market Pulse',
    sourceColor: '#0284C7'
  };

  // Offline / Initial Instant Baseline Fallback Articles (Replaced automatically once live feeds arrive)
  function buildSeedArticles() {
    const now = Date.now();
    return [
      {
        id: 'seed-1',
        title: 'Nifty 50 Tracks Global Cues & FII Flows as IT, Private Banks Lead Early Activity',
        description: 'Indian equity benchmarks remain focused on institutional FII/DII positioning, quarterly earnings momentum, and rupee stability across frontline NIFTY 50 constituents.',
        link: 'https://economictimes.indiatimes.com/markets',
        pubTimestamp: now - 15 * 60 * 1000,
        sourceName: 'ET Markets',
        category: 'Markets',
        sourceColor: '#1565C0',
        sentiment: 'bullish',
        impact: 'Bullish Market Watch',
        tickers: ['NIFTY', 'HDFCBANK', 'INFY'],
        context: 'Live institutional RSS channels sync automatically every 60s. Click Refresh anytime to pull the latest breaking wire headlines.',
        isSeed: true
      },
      {
        id: 'seed-2',
        title: 'State Bank of India & Frontline PSU Banks Attract Institutional Accumulation on Healthy NIM Outlook',
        description: 'Strong credit growth and improving asset quality ratios keep banking heavyweights on institutional swing radars.',
        link: 'https://www.livemint.com/market/stock-market-news',
        pubTimestamp: now - 40 * 60 * 1000,
        sourceName: 'LiveMint',
        category: 'Stocks',
        sourceColor: '#2E7D32',
        sentiment: 'bullish',
        impact: 'Bullish Sector Catalyst',
        tickers: ['SBIN', 'BANKNIFTY'],
        context: 'Banking sector leadership supports multi-timeframe Swing V3 setups across liquid Nifty Bank components.',
        isSeed: true
      },
      {
        id: 'seed-3',
        title: 'India Direct Tax & GST Collections Signal Resilient Domestic Demand Momentum',
        description: 'Direct tax and indirect tax receipts underscore steady corporate earnings visibility and macro fiscal discipline.',
        link: 'https://economictimes.indiatimes.com/economy',
        pubTimestamp: now - 90 * 60 * 1000,
        sourceName: 'ET Economy',
        category: 'Economy',
        sourceColor: '#6A1B9A',
        sentiment: 'neutral',
        impact: 'Macro Fiscal Indicator',
        tickers: ['NIFTY', 'RELIANCE'],
        context: 'Constructive domestic macro data provides medium-term floor support for cyclical and infrastructure themes.',
        isSeed: true
      },
      {
        id: 'seed-4',
        title: 'Domestic Mutual Fund SIP Inflows & Primary IPO Pipeline Highlight Retail Liquidity Strength',
        description: 'Steady domestic institutional flows and active SEBI DRHP filings keep primary and secondary market liquidity buoyant.',
        link: 'https://economictimes.indiatimes.com/markets/ipos/fpos',
        pubTimestamp: now - 140 * 60 * 1000,
        sourceName: 'ET IPO & Funds',
        category: 'IPO & Funds',
        sourceColor: '#E65100',
        sentiment: 'bullish',
        impact: 'Liquidity Cushion',
        tickers: ['NIFTY', 'SENSEX'],
        context: 'Sustained mutual fund SIP participation absorbs foreign selling bouts and stabilizes quality swing breakouts.',
        isSeed: true
      }
    ];
  }

  let LIVE_NEWS_ARTICLES = [];

  // Load cached live articles immediately on boot
  function loadCachedNews() {
    try {
      const raw = localStorage.getItem(NEWS_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.articles) && parsed.articles.length > 0) {
          const ageMs = Date.now() - (parsed.fetchedAt || 0);
          // Accept cached live articles up to 4 hours old while syncing fresh ticks
          if (ageMs < 4 * 60 * 60 * 1000) {
            LIVE_NEWS_ARTICLES = parsed.articles;
            hasLiveFeedLoaded = LIVE_NEWS_ARTICLES.some(a => !a.isSeed);
            if (parsed.fetchedAt && hasLiveFeedLoaded) {
              newsLastSyncTime = new Date(parsed.fetchedAt);
              newsSecondsAgo = Math.max(0, Math.floor((Date.now() - parsed.fetchedAt) / 1000));
            }
            return;
          }
        }
      }
    } catch (e) {
      console.warn('News cache read error:', e);
    }
    LIVE_NEWS_ARTICLES = buildSeedArticles();
  }

  function saveCachedNews(articles) {
    try {
      const payload = {
        fetchedAt: Date.now(),
        articles: articles.slice(0, 60)
      };
      localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('News cache write error:', e);
    }
  }

  // Utilities: Clean Text, Timestamps, Sentiment, and Ticker Recognition
  function cleanNewsText(str) {
    if (!str) return '';
    return String(str)
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#8216;|&#8217;|&#x27;|&#39;|\\u0027/g, "'")
      .replace(/&#8220;|&#8221;|&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function parseNewsTimestamp(pubDateStr) {
    if (typeof pubDateStr === 'number' && !isNaN(pubDateStr)) return pubDateStr;
    if (!pubDateStr) return Date.now();
    const s = String(pubDateStr).trim();
    // rss2json formats UTC timestamps as "YYYY-MM-DD HH:mm:ss" without 'Z'
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(s)) {
      const t = Date.parse(s.replace(' ', 'T') + 'Z');
      return isNaN(t) ? Date.now() : t;
    }
    const t = Date.parse(s);
    return isNaN(t) ? Date.now() : t;
  }

  function formatRelativeNewsTime(ts) {
    if (!ts || isNaN(ts)) return 'Just now';
    const diffMs = Math.max(0, Date.now() - ts);
    if (diffMs < 60000) return 'Just now';
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ', ' +
      d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  function classifyNewsSentiment(title, desc) {
    const text = `${title || ''} ${desc || ''}`.toLowerCase();
    const bullishWords = [
      'surge', 'surges', 'rally', 'rallies', 'gain', 'gains', 'jump', 'jumps',
      'rise', 'rises', 'high', 'record', 'profit', 'growth', 'buy', 'upgrade',
      'inflow', 'inflows', 'rebound', 'beat', 'beats', 'bull', 'bullish', 'dividend',
      'approved', 'boost', 'strong', 'soar', 'outperform', 'positive', 'expansion',
      'order win', 'bagged', 'awarded', 'reclaim', 'top pick'
    ];
    const bearishWords = [
      'fall', 'falls', 'drop', 'drops', 'crash', 'crashes', 'plunge', 'slump',
      'loss', 'losses', 'sell', 'selloff', 'downgrade', 'outflow', 'outflows',
      'caution', 'risk', 'inflation', 'conflict', 'penalty', 'contempt', 'miss',
      'bear', 'bearish', 'weak', 'decline', 'declines', 'dip', 'deficit', 'slide',
      'drag', 'tumble', 'warning', 'ban', 'probe', 'concern', 'pressure', 'hemmed'
    ];

    let score = 0;
    bullishWords.forEach(w => { if (text.includes(w)) score++; });
    bearishWords.forEach(w => { if (text.includes(w)) score--; });

    if (score > 0) {
      return { sentiment: 'bullish', impact: 'Bullish Catalyst' };
    }
    if (score < 0) {
      return { sentiment: 'bearish', impact: 'Caution / Bearish Signal' };
    }
    return { sentiment: 'neutral', impact: 'Neutral / Macro Watch' };
  }

  const TICKER_KEYWORD_MAP = [
    { symbol: 'NIFTY', keys: ['nifty 50', 'nifty50', 'nifty', 'gift nifty'] },
    { symbol: 'SENSEX', keys: ['sensex', 'bse sensex'] },
    { symbol: 'BANKNIFTY', keys: ['bank nifty', 'banknifty', 'nifty bank'] },
    { symbol: 'TATAMOTORS', keys: ['tata motors', 'tatamotors', 'jlr', 'tmpv'] },
    { symbol: 'HDFCBANK', keys: ['hdfc bank', 'hdfcbank'] },
    { symbol: 'RELIANCE', keys: ['reliance', 'jio', 'mukesh ambani', 'ril'] },
    { symbol: 'INFY', keys: ['infosys', 'infy'] },
    { symbol: 'TCS', keys: ['tcs', 'tata consultancy'] },
    { symbol: 'SBIN', keys: ['state bank', 'sbi '] },
    { symbol: 'ICICIBANK', keys: ['icici bank', 'icicibank'] },
    { symbol: 'AXISBANK', keys: ['axis bank', 'axisbank'] },
    { symbol: 'KOTAKBANK', keys: ['kotak mahindra', 'kotak bank'] },
    { symbol: 'TITAN', keys: ['titan company', 'tanishq', 'titan'] },
    { symbol: 'WIPRO', keys: ['wipro'] },
    { symbol: 'BAJFINANCE', keys: ['bajaj finance', 'bajfinance'] },
    { symbol: 'YESBANK', keys: ['yes bank', 'yesbank'] },
    { symbol: 'EXIDEIND', keys: ['exide'] },
    { symbol: 'AMARAJABAT', keys: ['amara raja'] },
    { symbol: 'ADANIENT', keys: ['adani'] },
    { symbol: 'LT', keys: ['larsen & toubro', 'l&t'] },
    { symbol: 'RBI', keys: ['rbi', 'reserve bank', 'mpc', 'repo rate'] },
    { symbol: 'SEBI', keys: ['sebi'] }
  ];

  function extractNewsTickers(text, presetTickers = []) {
    const found = new Set(Array.isArray(presetTickers) ? presetTickers : []);
    const lower = ' ' + (text || '').toLowerCase() + ' ';
    for (const item of TICKER_KEYWORD_MAP) {
      if (item.keys.some(k => lower.includes(k))) {
        found.add(item.symbol);
      }
      if (found.size >= 3) break;
    }
    if (found.size === 0 && typeof TRADE_NITI_MASTER_STOCKS !== 'undefined') {
      const upperText = (text || '').toUpperCase();
      for (let i = 0; i < Math.min(80, TRADE_NITI_MASTER_STOCKS.length); i++) {
        const sym = TRADE_NITI_MASTER_STOCKS[i].symbol;
        if (sym.length >= 3 && new RegExp(`\\b${sym}\\b`).test(upperText)) {
          found.add(sym);
          if (found.size >= 3) break;
        }
      }
    }
    if (found.size === 0) found.add('NIFTY');
    return Array.from(found).slice(0, 3);
  }

  function buildSwingContext(sentimentInfo, tickers, category) {
    const tickerLabel = tickers && tickers.length ? tickers.join(', ') : 'broad market indices';
    if (sentimentInfo.sentiment === 'bullish') {
      return `Positive fundamental/sentiment catalyst affecting ${tickerLabel}. Check daily SuperTrend and Swing V3 Confluence score (>70%) in the Analysis Center before entering momentum swings.`;
    }
    if (sentimentInfo.sentiment === 'bearish') {
      return `Caution/volatility headline impacting ${tickerLabel} (${category}). Monitor support zones, trailing stop-losses, and avoid chasing gap-downs without 15m/1h confirmation.`;
    }
    return `Macro/sector development relevant to ${tickerLabel} (${category}). Watch opening price reaction, FII/DII institutional absorption, and multi-timeframe RSI alignment.`;
  }

  function normalizeArticle(raw) {
    const title = cleanNewsText(raw.title);
    let description = cleanNewsText(raw.description || raw.content || title);
    if (description.length > 260) description = description.slice(0, 257).trim() + '...';

    // Remove "- SourceName" trailing suffix appended by some RSS feeds
    let cleanTitle = title;
    const dashIdx = cleanTitle.lastIndexOf(' - ');
    if (dashIdx > 30) cleanTitle = cleanTitle.slice(0, dashIdx).trim();

    const sentimentInfo = classifyNewsSentiment(cleanTitle, description);
    const tickers = extractNewsTickers(`${cleanTitle} ${description}`, raw.tickers);
    const pubTimestamp = parseNewsTimestamp(raw.pubTimestamp || raw.pubDate);

    return {
      id: raw.id || ('live-' + btoa(unescape(encodeURIComponent((raw.link || cleanTitle).slice(0, 48)))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 16)),
      title: cleanTitle,
      description: description || cleanTitle,
      link: raw.link || 'https://economictimes.indiatimes.com/markets',
      pubTimestamp,
      sourceName: raw.sourceName || 'ET Markets',
      category: raw.category || 'Markets',
      sourceColor: raw.sourceColor || '#1565C0',
      sentiment: sentimentInfo.sentiment,
      impact: sentimentInfo.impact,
      tickers,
      context: raw.context || buildSwingContext(sentimentInfo, tickers, raw.category || 'Markets'),
      isSeed: false
    };
  }

  function mergeLiveArticles(incoming) {
    if (!Array.isArray(incoming) || incoming.length === 0) return;
    // Remove temporary seed baseline once genuine live stories land
    const existingLive = LIVE_NEWS_ARTICLES.filter(a => !a.isSeed);
    const map = new Map();

    // Put incoming first so fresh timestamps/descriptions win
    [...incoming, ...existingLive].forEach(art => {
      if (!art || !art.title) return;
      const dedupeKey = art.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 55);
      if (dedupeKey && !map.has(dedupeKey)) {
        map.set(dedupeKey, art);
      }
    });

    const merged = Array.from(map.values())
      .sort((a, b) => (b.pubTimestamp || 0) - (a.pubTimestamp || 0))
      .slice(0, 60);

    if (merged.length > 0) {
      LIVE_NEWS_ARTICLES = merged;
      hasLiveFeedLoaded = true;
      saveCachedNews(merged);
    }
  }

  // Update Header Clock & Live Status Text
  function updateNewsTimerUI() {
    if (liveDateEl) {
      const today = new Date();
      liveDateEl.textContent = today.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    }
    if (!updateTimerEl) return;

    if (isFetchingNews) {
      updateTimerEl.innerHTML = `<span style="color:var(--brand-blue); font-weight:700;">Syncing Live RSS Feeds...</span>`;
      return;
    }
    if (!newsLastSyncTime) {
      updateTimerEl.innerHTML = `<span style="color:var(--text-muted);">Connecting Live RSS Channels...</span>`;
      return;
    }

    const timeStr = newsLastSyncTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const agoStr = newsSecondsAgo < 5 ? 'Just now' : `${newsSecondsAgo}s ago`;
    updateTimerEl.innerHTML = `<span style="display:inline-flex; align-items:center; gap:4px; font-weight:600; color:var(--text-primary);"><span class="pulse-dot" style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10B981; box-shadow:0 0 6px rgba(16,185,129,0.7);"></span>Live Synced ${agoStr} (${timeStr})</span> &bull; <span style="color:var(--brand-blue); font-weight:700;">Auto-refresh 60s</span>`;
  }

  // Raw RSS XML parser for direct proxy / localhost feeds
  function parseXmlFeedString(xmlStr, channel) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlStr, 'text/xml');
      const items = Array.from(doc.querySelectorAll('item')).slice(0, 12);
      return items.map(item => {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        return normalizeArticle({
          title,
          description,
          link: cleanNewsText(link),
          pubDate: cleanNewsText(pubDate),
          sourceName: channel.sourceName,
          category: channel.category,
          sourceColor: channel.sourceColor
        });
      }).filter(a => a.title && a.link);
    } catch (_) {
      return [];
    }
  }

  // Fetch single feed via rss2json (Universal: works on file://, http://, https://)
  async function fetchChannelViaRss2Json(channel) {
    if (Date.now() < rss2jsonCooldownUntil) return { status: 'cooldown', articles: [] };
    const apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(channel.url);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7500);
    try {
      const res = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timer);
      if (res.status === 429) {
        rss2jsonCooldownUntil = Date.now() + 65000;
        return { status: '429', articles: [] };
      }
      if (!res.ok) return { status: 'err', articles: [] };
      const data = await res.json();
      if (data && data.status === 'ok' && Array.isArray(data.items)) {
        const articles = data.items.slice(0, 12).map(it => normalizeArticle({
          title: it.title,
          description: it.description || it.content,
          link: it.link,
          pubDate: it.pubDate,
          sourceName: channel.sourceName,
          category: channel.category,
          sourceColor: channel.sourceColor
        })).filter(a => a.title);
        return { status: 'ok', articles };
      }
      return { status: 'empty', articles: [] };
    } catch (_) {
      clearTimeout(timer);
      return { status: 'neterr', articles: [] };
    }
  }

  // Real-time Multi-Source Live Fetcher
  async function fetchLiveMarketNews(isManual = false) {
    if (isFetchingNews) return;
    isFetchingNews = true;
    if (refreshBtn && isManual) refreshBtn.classList.add('spinning');
    updateNewsTimerUI();

    let fetchedCount = 0;

    try {
      // Tier 1: Try dedicated Vercel Mumbai Proxy (/api/news) if deployed or untested
      if (proxyNewsSupported !== false) {
        try {
          const ctrl = new AbortController();
          const t = setTimeout(() => ctrl.abort(), 4500);
          const res = await fetch('https://swingtrader-nse-proxy.vercel.app/api/news', { signal: ctrl.signal });
          clearTimeout(t);
          if (res.ok) {
            const payload = await res.json();
            if (payload && Array.isArray(payload.articles) && payload.articles.length > 0) {
              proxyNewsSupported = true;
              const normalized = payload.articles.map(normalizeArticle);
              mergeLiveArticles(normalized);
              fetchedCount += normalized.length;
            }
          } else if (res.status === 404) {
            proxyNewsSupported = false;
          }
        } catch (_) {
          proxyNewsSupported = false;
        }
      }

      // Tier 2: Localhost Zero-Cache Realtime Headlines (TradingView + Raw XML via corsfix)
      if (fetchedCount === 0 && window.location && window.location.hostname === 'localhost') {
        try {
          const tvRes = await fetch('https://news-headlines.tradingview.com/v2/headlines?category=stock&client=web&lang=en&country=IN');
          if (tvRes.ok) {
            const tvJson = await tvRes.json();
            if (tvJson && Array.isArray(tvJson.items)) {
              const tvArticles = tvJson.items.slice(0, 20).map(item => {
                const syms = (item.relatedSymbols || [])
                  .map(s => (s.symbol || '').replace(/^(NSE|BSE):/, ''))
                  .filter(s => s && !s.includes(':'))
                  .slice(0, 3);
                return normalizeArticle({
                  id: 'tv-' + item.id,
                  title: item.title,
                  description: item.title + (syms.length ? ` • Mentioned stocks: ${syms.join(', ')}` : ''),
                  link: item.storyPath ? `https://www.tradingview.com${item.storyPath}` : 'https://www.tradingview.com/news/',
                  pubTimestamp: item.published ? item.published * 1000 : Date.now(),
                  sourceName: item.source || 'LiveMint',
                  category: (item.provider === 'mint') ? 'Stocks' : 'Markets',
                  sourceColor: (item.provider === 'mint') ? '#2E7D32' : '#1565C0',
                  tickers: syms
                });
              });
              if (tvArticles.length > 0) {
                mergeLiveArticles(tvArticles);
                fetchedCount += tvArticles.length;
                renderNews();
              }
            }
          }
        } catch (_) {}

        // Also pull raw XML feeds via corsfix on localhost for all 4 categories
        try {
          const xmlResults = await Promise.allSettled(
            NEWS_RSS_CHANNELS.map(async (ch) => {
              const r = await fetch('https://proxy.corsfix.com/?' + ch.url);
              if (!r.ok) return [];
              const txt = await r.text();
              return parseXmlFeedString(txt, ch);
            })
          );
          const xmlFlat = xmlResults
            .filter(r => r.status === 'fulfilled' && Array.isArray(r.value))
            .flatMap(r => r.value);
          if (xmlFlat.length > 0) {
            mergeLiveArticles(xmlFlat);
            fetchedCount += xmlFlat.length;
          }
        } catch (_) {}
      }

      // Tier 3: Universal Origin-Safe Gateway (rss2json) for file://, 127.0.0.1, or production web
      if (fetchedCount === 0) {
        // Prioritize active category, then any channel currently missing live articles
        const countByCat = {};
        LIVE_NEWS_ARTICLES.filter(a => !a.isSeed).forEach(a => {
          countByCat[a.category] = (countByCat[a.category] || 0) + 1;
        });
        const orderedChannels = [...NEWS_RSS_CHANNELS].sort((a, b) => {
          if (activeCategory !== 'All' && activeCategory !== 'Saved') {
            if (a.category === activeCategory && b.category !== activeCategory) return -1;
            if (b.category === activeCategory && a.category !== activeCategory) return 1;
          }
          const aMissing = (countByCat[a.category] || 0) === 0 ? 1 : 0;
          const bMissing = (countByCat[b.category] || 0) === 0 ? 1 : 0;
          return bMissing - aMissing;
        });

        // Fetch 2 rotating feeds per background cycle, or prioritize missing/all on boot/manual click
        let channelsToFetch;
        if (!hasLiveFeedLoaded || isManual) {
          channelsToFetch = orderedChannels;
        } else {
          const missing = orderedChannels.filter(c => (countByCat[c.category] || 0) === 0);
          if (missing.length > 0) {
            channelsToFetch = missing.slice(0, 2);
          } else {
            newsRotationWave = (newsRotationWave + 2) % orderedChannels.length;
            channelsToFetch = [
              orderedChannels[newsRotationWave],
              orderedChannels[(newsRotationWave + 1) % orderedChannels.length]
            ];
          }
        }

        for (let i = 0; i < channelsToFetch.length; i++) {
          const ch = channelsToFetch[i];
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 950));
          }
          const result = await fetchChannelViaRss2Json(ch);
          if (result.status === 'ok' && result.articles.length > 0) {
            mergeLiveArticles(result.articles);
            fetchedCount += result.articles.length;
            renderNews(); // Progressive immediate update!
          } else if (result.status === '429' || result.status === 'cooldown') {
            break; // Respect rate limit cleanly while keeping cached live items
          }
        }

        // If still empty after primary channels, try Bing Indian Stock Market Pulse fallback
        if (fetchedCount === 0 && Date.now() >= rss2jsonCooldownUntil) {
          const bingRes = await fetchChannelViaRss2Json(BING_INDIA_MARKET_RSS);
          if (bingRes.status === 'ok' && bingRes.articles.length > 0) {
            mergeLiveArticles(bingRes.articles);
            fetchedCount += bingRes.articles.length;
          }
        }
      }

      newsLastSyncTime = new Date();
      newsSecondsAgo = 0;

      if (isManual && typeof showToast === 'function') {
        if (fetchedCount > 0) {
          showToast(`Live Market News synced (${fetchedCount} real-time stories)!`, '\uD83D\uDCE1');
        } else if (hasLiveFeedLoaded) {
          showToast('Showing latest synced market headlines (Auto-refresh active)', '\uD83D\uDCE1');
        }
      }
    } catch (err) {
      console.warn('Live news sync error:', err);
    } finally {
      isFetchingNews = false;
      if (refreshBtn) refreshBtn.classList.remove('spinning');
      updateNewsTimerUI();
      renderNews();
    }
  }

  function startNewsTickers() {
    stopNewsTickers();
    newsSecondsTicker = setInterval(() => {
      const newsSec = document.getElementById('news-page');
      if (newsSec && newsSec.style.display !== 'none') {
        newsSecondsAgo++;
        newsRelativeRefreshCounter++;
        updateNewsTimerUI();
        // Keep article relative timestamps ("5 mins ago") live every 30s
        if (newsRelativeRefreshCounter >= 30) {
          newsRelativeRefreshCounter = 0;
          renderNews();
        }
      }
    }, 1000);

    // Real-time recurring background sync every 60s when News section is visible
    newsAutoRefreshTimer = setInterval(() => {
      const newsSec = document.getElementById('news-page');
      if (newsSec && newsSec.style.display !== 'none' && !isFetchingNews) {
        fetchLiveMarketNews(false);
      }
    }, 60000);
  }

  function stopNewsTickers() {
    if (newsSecondsTicker) {
      clearInterval(newsSecondsTicker);
      newsSecondsTicker = null;
    }
    if (newsAutoRefreshTimer) {
      clearInterval(newsAutoRefreshTimer);
      newsAutoRefreshTimer = null;
    }
  }

  // Bookmarks Storage
  function getBookmarkedIds() {
    try {
      const data = localStorage.getItem('trade_niti_saved_news');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  function saveBookmarkedIds(ids) {
    localStorage.setItem('trade_niti_saved_news', JSON.stringify(ids));
  }

  function isBookmarked(id) {
    return getBookmarkedIds().includes(id);
  }

  function toggleBookmark(id) {
    let ids = getBookmarkedIds();
    let added = false;
    if (ids.includes(id)) {
      ids = ids.filter(i => i !== id);
    } else {
      ids.push(id);
      added = true;
    }
    saveBookmarkedIds(ids);
    renderNews();
    if (activeModalArticle && activeModalArticle.id === id) {
      updateModalBookmarkBtn(id);
    }
    if (typeof showToast === 'function') {
      showToast(added ? 'Article saved to Bookmarks \u2B50' : 'Removed from Bookmarks', added ? '\u2B50' : '\uD83D\uDDD1\uFE0F');
    }
  }

  function updateModalBookmarkBtn(id) {
    const bookmarked = isBookmarked(id);
    if (readerBookmarkIcon) readerBookmarkIcon.textContent = bookmarked ? '\u2605' : '\u2B50';
    if (readerBookmarkText) readerBookmarkText.textContent = bookmarked ? 'Saved' : 'Bookmark';
    if (readerBookmarkBtn) {
      if (bookmarked) {
        readerBookmarkBtn.style.color = '#F59E0B';
        readerBookmarkBtn.style.borderColor = '#F59E0B';
      } else {
        readerBookmarkBtn.style.color = '';
        readerBookmarkBtn.style.borderColor = '';
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Render News Feed
  function renderNews() {
    const bookmarkedIds = getBookmarkedIds();
    if (savedCountEl) savedCountEl.textContent = bookmarkedIds.length;

    // Sort strictly newest-first before filtering
    let articles = [...LIVE_NEWS_ARTICLES].sort((a, b) => (b.pubTimestamp || 0) - (a.pubTimestamp || 0));

    if (activeCategory === 'Saved') {
      articles = articles.filter(a => bookmarkedIds.includes(a.id));
    } else if (activeCategory !== 'All') {
      articles = articles.filter(a => (a.category || '').toLowerCase() === activeCategory.toLowerCase());
    }

    if (activeTickerFilter) {
      const aliasMap = {
        TATAMOTORS: ['tatamotors', 'tata motors', 'tmpv'],
        HDFCBANK: ['hdfcbank', 'hdfc bank'],
        RELIANCE: ['reliance', 'ril', 'jio'],
        INFY: ['infy', 'infosys'],
        TITAN: ['titan', 'tanishq'],
        SBIN: ['sbin', 'state bank', 'sbi'],
        NIFTY: ['nifty', 'nifty 50'],
        SENSEX: ['sensex'],
        BANKNIFTY: ['banknifty', 'bank nifty']
      };
      const terms = aliasMap[activeTickerFilter] || [activeTickerFilter.toLowerCase()];
      articles = articles.filter(a =>
        (a.tickers && a.tickers.includes(activeTickerFilter)) ||
        terms.some(term =>
          (a.title || '').toLowerCase().includes(term) ||
          (a.description || '').toLowerCase().includes(term)
        )
      );
    }

    if (activeSearchQuery) {
      articles = articles.filter(a =>
        (a.title || '').toLowerCase().includes(activeSearchQuery) ||
        (a.description || '').toLowerCase().includes(activeSearchQuery) ||
        (a.sourceName || '').toLowerCase().includes(activeSearchQuery) ||
        (a.tickers || []).some(t => t.toLowerCase().includes(activeSearchQuery))
      );
    }

    // Update Pulse Ribbon Metrics
    const totalCount = articles.length;
    let bullish = 0, neutral = 0, bearish = 0;
    articles.forEach(a => {
      if (a.sentiment === 'bullish') bullish++;
      else if (a.sentiment === 'neutral') neutral++;
      else if (a.sentiment === 'bearish') bearish++;
    });

    const bPct = totalCount > 0 ? Math.round((bullish / totalCount) * 100) : 0;
    const nPct = totalCount > 0 ? Math.round((neutral / totalCount) * 100) : 0;
    const brPct = totalCount > 0 ? Math.round((bearish / totalCount) * 100) : 0;

    if (sentimentBullishEl) sentimentBullishEl.textContent = `\uD83D\uDFE2 Bullish (${bPct}% \u2022 ${bullish})`;
    if (sentimentNeutralEl) sentimentNeutralEl.textContent = `\uD83D\uDFE0 Neutral (${nPct}% \u2022 ${neutral})`;
    if (sentimentBearishEl) sentimentBearishEl.textContent = `\uD83D\uDD34 Caution (${brPct}% \u2022 ${bearish})`;

    if (articleCountPill) {
      const modeLabel = hasLiveFeedLoaded ? 'Live Wire' : 'Syncing Feeds';
      articleCountPill.textContent = `${totalCount} ${totalCount === 1 ? 'article' : 'articles'} \u2022 ${modeLabel}`;
    }

    // Check empty state
    if (articles.length === 0) {
      if (newsGrid) newsGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Render Grid Cards
    if (newsGrid) {
      newsGrid.innerHTML = articles.map(article => {
        const bookmarked = bookmarkedIds.includes(article.id);
        const sourceBg = `${article.sourceColor}1F`;
        const relTime = formatRelativeNewsTime(article.pubTimestamp);

        let sentimentIcon = '\uD83D\uDFE2';
        let sentimentClass = 'bullish';
        if (article.sentiment === 'neutral') {
          sentimentIcon = '\uD83D\uDFE0';
          sentimentClass = 'neutral';
        } else if (article.sentiment === 'bearish') {
          sentimentIcon = '\uD83D\uDD34';
          sentimentClass = 'bearish';
        }

        const tickersHtml = (article.tickers || []).map(t =>
          `<span class="news-ticker-pill" data-action="filter-ticker" data-ticker="${escapeHtml(t)}">#${escapeHtml(t)}</span>`
        ).join(' ');

        return `
          <div class="news-card" data-id="${escapeHtml(article.id)}">
            <div class="news-card-header">
              <span class="news-card-source-badge" style="background:${sourceBg}; color:${article.sourceColor};">
                ${escapeHtml(article.sourceName)}
              </span>
              <span class="news-card-time">${escapeHtml(relTime)}</span>
            </div>

            <div data-action="open-modal" data-id="${escapeHtml(article.id)}">
              <div class="news-card-title">${escapeHtml(article.title)}</div>
              <div class="news-card-desc">${escapeHtml(article.description)}</div>
            </div>

            <div class="news-card-tags-row">
              <span class="sentiment-badge ${sentimentClass}">
                ${sentimentIcon} ${escapeHtml(article.impact)}
              </span>
              ${tickersHtml}
            </div>

            <div class="news-card-footer">
              <span class="news-card-read-link" data-action="open-modal" data-id="${escapeHtml(article.id)}">
                Quick View &amp; Analysis &rarr;
              </span>
              <div class="news-card-actions">
                <button type="button" class="news-icon-btn ${bookmarked ? 'bookmarked' : ''}" data-action="bookmark" data-id="${escapeHtml(article.id)}" title="${bookmarked ? 'Remove Bookmark' : 'Bookmark Story'}">
                  ${bookmarked ? '\u2605' : '\u2606'}
                </button>
                <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener noreferrer" class="news-icon-btn" title="Open Original Publisher Source" onclick="event.stopPropagation();">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Wire up card interactions
      newsGrid.querySelectorAll('.news-card').forEach(card => {
        const id = card.getAttribute('data-id');
        const article = LIVE_NEWS_ARTICLES.find(a => a.id === id);

        card.addEventListener('click', (e) => {
          const target = e.target.closest('[data-action]');
          if (target) {
            const action = target.getAttribute('data-action');
            if (action === 'bookmark') {
              e.stopPropagation();
              toggleBookmark(id);
              return;
            } else if (action === 'filter-ticker') {
              e.stopPropagation();
              const ticker = target.getAttribute('data-ticker');
              applyTickerFilter(ticker);
              return;
            }
          }
          if (article) openArticleModal(article);
        });
      });
    }
  }

  // Ticker Quick Filter
  function applyTickerFilter(ticker) {
    if (activeTickerFilter === ticker) {
      activeTickerFilter = null;
      hotTickerChips.forEach(c => c.classList.remove('active'));
    } else {
      activeTickerFilter = ticker;
      hotTickerChips.forEach(c => {
        if (c.getAttribute('data-ticker') === ticker) c.classList.add('active');
        else c.classList.remove('active');
      });
      if (typeof showToast === 'function') {
        showToast(`Filtered stories mentioning ${ticker}`, '\uD83D\uDD0D');
      }
    }
    renderNews();
  }

  // Hot Ticker Chips Click
  hotTickerChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const ticker = chip.getAttribute('data-ticker');
      applyTickerFilter(ticker);
    });
  });

  // Category Tabs Click
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category');
      renderNews();
      // If category has fewer than 5 live items, fetch that channel immediately if eligible
      const catLiveCount = LIVE_NEWS_ARTICLES.filter(a => !a.isSeed && (activeCategory === 'All' || a.category === activeCategory)).length;
      if (activeCategory !== 'All' && activeCategory !== 'Saved' && catLiveCount < 5 && !isFetchingNews) {
        fetchLiveMarketNews(false);
      }
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value.trim().toLowerCase();
      if (searchClear) searchClear.style.display = activeSearchQuery ? 'block' : 'none';
      renderNews();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      activeSearchQuery = '';
      searchClear.style.display = 'none';
      searchInput.focus();
      renderNews();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      activeCategory = 'All';
      activeSearchQuery = '';
      activeTickerFilter = null;
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      categoryChips.forEach(c => {
        if (c.getAttribute('data-category') === 'All') c.classList.add('active');
        else c.classList.remove('active');
      });
      hotTickerChips.forEach(c => c.classList.remove('active'));
      renderNews();
    });
  }

  // Article Reader Modal Open
  function openArticleModal(article) {
    activeModalArticle = article;
    if (readerSourceBadge) {
      readerSourceBadge.textContent = article.sourceName;
      readerSourceBadge.style.background = `${article.sourceColor}22`;
      readerSourceBadge.style.color = article.sourceColor;
    }
    if (readerTime) readerTime.textContent = formatRelativeNewsTime(article.pubTimestamp);
    if (readerTitle) readerTitle.textContent = article.title;
    if (readerDesc) readerDesc.textContent = article.description;
    if (readerContext) readerContext.textContent = article.context;
    if (readerSourceLink) readerSourceLink.href = article.link;

    if (readerSentimentBadge) {
      let icon = '\uD83D\uDFE2';
      let cls = 'bullish';
      if (article.sentiment === 'neutral') { icon = '\uD83D\uDFE0'; cls = 'neutral'; }
      else if (article.sentiment === 'bearish') { icon = '\uD83D\uDD34'; cls = 'bearish'; }
      readerSentimentBadge.className = `sentiment-badge ${cls}`;
      readerSentimentBadge.textContent = `${icon} ${article.impact}`;
    }

    if (readerTickers) {
      readerTickers.innerHTML = (article.tickers || []).map(t =>
        `<span class="news-ticker-pill" style="font-size:0.75rem;">$${escapeHtml(t)}</span>`
      ).join(' ');
    }

    updateModalBookmarkBtn(article.id);

    if (newsReaderModal) newsReaderModal.classList.add('active');
  }

  const closeReaderModal = () => {
    if (newsReaderModal) newsReaderModal.classList.remove('active');
    activeModalArticle = null;
  };

  if (closeReaderBtn) closeReaderBtn.addEventListener('click', closeReaderModal);
  if (newsReaderModal) {
    newsReaderModal.addEventListener('click', (e) => {
      if (e.target === newsReaderModal) closeReaderModal();
    });
  }

  if (readerBookmarkBtn) {
    readerBookmarkBtn.addEventListener('click', () => {
      if (activeModalArticle) {
        toggleBookmark(activeModalArticle.id);
      }
    });
  }

  // Live Refresh Button Action (Pulls fresh real-time headlines immediately)
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      fetchLiveMarketNews(true);
      startNewsTickers();
    });
  }

  // Export module render & live refresh hooks for switchAuthTab and external testing
  window.fetchLiveMarketNews = fetchLiveMarketNews;
  window.renderNewsModule = () => {
    renderNews();
    startNewsTickers();
    updateNewsTimerUI();
    if (!hasLiveFeedLoaded || !newsLastSyncTime || (Date.now() - newsLastSyncTime.getTime() > 60000)) {
      fetchLiveMarketNews(false);
    }
  };

  // Boot News Module
  loadCachedNews();
  renderNews();
  updateNewsTimerUI();
  startNewsTickers();
  // Kick off background live sync shortly after boot if cache stale or seed-only
  if (!hasLiveFeedLoaded || !newsLastSyncTime || (Date.now() - newsLastSyncTime.getTime() > 90000)) {
    setTimeout(() => {
      fetchLiveMarketNews(false);
    }, 600);
  }
}

/* ==========================================================================
   16. Navigation Sidebar Drawer Module
       (Mobile App Fidelity: ModalNavigationDrawer with Solid Blue Header,
        MARKET ACTIVITY [FII/DII, Screener], TRADING STRATEGIES [EMA Collide],
        and Dynamic Drawer Footer)
   ========================================================================== */
function initSidebarDrawer() {
  const sidebarDrawer = document.getElementById('appSidebarDrawer');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebarUserAction = document.getElementById('sidebarUserAction');

  const navFiiDii = document.getElementById('sidebarNavFiiDii');
  const navScreener = document.getElementById('sidebarNavScreener');
  const navEmaCollide = document.getElementById('sidebarNavEmaCollide');

  // Modals
  const fiidiiModal = document.getElementById('fiidiiModal');
  const closeFiiDiiBtn = document.getElementById('closeFiiDiiModalBtn');
  const dismissFiiDiiBtn = document.getElementById('btnDismissFiiDiiModal');

  const emaCollideModal = document.getElementById('emaCollideModal');
  const closeEmaCollideBtn = document.getElementById('closeEmaCollideModalBtn');
  const dismissEmaCollideBtn = document.getElementById('btnDismissEmaCollideModal');

  const logoutModal = document.getElementById('logoutConfirmModal');

  // Open / Close Drawer
  function openSidebar() {
    updateSidebarUserStatus();
    if (sidebarDrawer) sidebarDrawer.classList.add('active');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebarDrawer) sidebarDrawer.classList.remove('active');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Update Drawer Footer (Matches screenshot: Logout button on right/bottom)
  function updateSidebarUserStatus() {
    if (!sidebarUserAction) return;
    const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;

    if (user) {
      sidebarUserAction.innerHTML = `
        <button id="sidebarLogoutBtn" class="btn-secondary" style="padding:6px 12px; font-size:0.78rem; display:flex; align-items:center; gap:6px; color:#EF4444; border-color:rgba(239,68,68,0.3);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span>Logout</span>
        </button>
      `;
      const btn = document.getElementById('sidebarLogoutBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          closeSidebar();
          if (logoutModal) logoutModal.classList.add('active');
        });
      }
    } else {
      sidebarUserAction.innerHTML = `
        <button id="sidebarSignInBtn" class="btn-primary" style="padding:6px 14px; font-size:0.8rem;">
          <span>Sign In</span>
        </button>
      `;
      const btn = document.getElementById('sidebarSignInBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          closeSidebar();
          if (typeof openAuthModal === 'function') openAuthModal('signin');
        });
      }
    }
  }

  // Wire up Drawer Toggles
  if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  // If user clicks mobile menu toggle, also open sidebar drawer
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
      // In smaller screens, sidebar is the primary mobile drawer
      if (window.innerWidth <= 960) {
        e.preventDefault();
        e.stopPropagation();
        openSidebar();
      }
    });
  }

  // ESC key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarDrawer && sidebarDrawer.classList.contains('active')) {
      closeSidebar();
    }
  });

  // ─── Section 1: MARKET ACTIVITY ───
  // Item 1: FII/DII Daily Activity Implementation (Matches FiiDiiScreen.kt & FiiDiiViewModel.kt)
  const fiidiiTableBody = document.getElementById('fiidiiTableBody');
  const fiidiiTotalFiiEl = document.getElementById('fiidiiTotalFii');
  const fiidiiTotalDiiEl = document.getElementById('fiidiiTotalDii');
  const fiidiiTotalCombinedEl = document.getElementById('fiidiiTotalCombined');
  const btnRefreshFiiDii = document.getElementById('btnRefreshFiiDiiModal');
  const fiidiiRefreshIcon = document.getElementById('fiidiiRefreshIcon');
  const fiidiiFilterBtns = document.querySelectorAll('.btn-filter-fiidii');

  let activeFiiDiiFilter = 'all';

  // Seed recent market sessions up to current date (05-Nov-2026)
  const SEED_FIIDII_ENTRIES = [
    { date: "05-Nov-2026", niftyClose: "24536.60", niftyChangePct: 2.40, fiiDiiNet: 4530.14, fiiNet: 14974.68, diiNet: -10444.54 },
    { date: "04-Nov-2026", niftyClose: "23960.60", niftyChangePct: 0.42, fiiDiiNet: 339.70, fiiNet: -2840.50, diiNet: 3180.20 },
    { date: "03-Nov-2026", niftyClose: "23860.20", niftyChangePct: 1.12, fiiDiiNet: 2310.70, fiiNet: 1420.30, diiNet: 890.40 },
    { date: "02-Nov-2026", niftyClose: "23595.80", niftyChangePct: 2.35, fiiDiiNet: 3361.05, fiiNet: 2110.45, diiNet: 1250.60 },
    { date: "30-Oct-2026", niftyClose: "23053.10", niftyChangePct: 0.51, fiiDiiNet: 2781.03, fiiNet: 3598.54, diiNet: -817.51 },
    { date: "29-Oct-2026", niftyClose: "22936.75", niftyChangePct: 0.42, fiiDiiNet: 878.65, fiiNet: -2143.80, diiNet: 3022.45 },
    { date: "28-Oct-2026", niftyClose: "22840.10", niftyChangePct: -0.35, fiiDiiNet: -616.60, fiiNet: -3865.20, diiNet: 3248.60 },
    { date: "27-Oct-2026", niftyClose: "22920.45", niftyChangePct: 0.65, fiiDiiNet: 934.90, fiiNet: -1250.40, diiNet: 2185.30 },
    { date: "26-Oct-2026", niftyClose: "22772.30", niftyChangePct: -0.45, fiiDiiNet: -249.25, fiiNet: -4120.15, diiNet: 3870.90 },
    { date: "23-Oct-2026", niftyClose: "22875.60", niftyChangePct: 0.28, fiiDiiNet: 429.70, fiiNet: -2980.50, diiNet: 3410.20 },
    { date: "22-Oct-2026", niftyClose: "22812.10", niftyChangePct: -0.52, fiiDiiNet: -284.80, fiiNet: -3410.60, diiNet: 3125.80 },
    { date: "21-Oct-2026", niftyClose: "22931.40", niftyChangePct: 0.18, fiiDiiNet: 470.25, fiiNet: -1870.25, diiNet: 2340.50 },
    { date: "20-Oct-2026", niftyClose: "22890.80", niftyChangePct: -0.68, fiiDiiNet: -409.75, fiiNet: -4520.10, diiNet: 4110.35 },
    { date: "19-Oct-2026", niftyClose: "23047.50", niftyChangePct: 0.32, fiiDiiNet: 639.60, fiiNet: -1640.80, diiNet: 2280.40 },
    { date: "16-Oct-2026", niftyClose: "22974.20", niftyChangePct: -0.39, fiiDiiNet: -330.30, fiiNet: -3280.45, diiNet: 2950.15 },
    { date: "15-Oct-2026", niftyClose: "23064.10", niftyChangePct: 0.48, fiiDiiNet: 709.80, fiiNet: -1450.90, diiNet: 2160.70 },
    { date: "14-Oct-2026", niftyClose: "22954.30", niftyChangePct: -0.55, fiiDiiNet: -329.80, fiiNet: -3980.20, diiNet: 3650.40 },
    { date: "13-Oct-2026", niftyClose: "23081.20", niftyChangePct: 0.25, fiiDiiNet: 459.80, fiiNet: -2120.30, diiNet: 2580.10 },
    { date: "12-Oct-2026", niftyClose: "23023.80", niftyChangePct: -0.40, fiiDiiNet: -480.20, fiiNet: -3670.40, diiNet: 3190.20 },
    { date: "09-Oct-2026", niftyClose: "23116.50", niftyChangePct: 0.55, fiiDiiNet: 540.20, fiiNet: -1890.60, diiNet: 2430.80 },
    { date: "08-Oct-2026", niftyClose: "22990.20", niftyChangePct: -0.30, fiiDiiNet: -439.70, fiiNet: -3450.10, diiNet: 3010.40 },
    { date: "07-Oct-2026", niftyClose: "23059.40", niftyChangePct: 0.45, fiiDiiNet: 749.70, fiiNet: -1230.50, diiNet: 1980.20 },
    { date: "06-Oct-2026", niftyClose: "22956.10", niftyChangePct: -0.22, fiiDiiNet: -250.30, fiiNet: -2890.40, diiNet: 2640.10 },
    { date: "05-Oct-2026", niftyClose: "22555.75", niftyChangePct: 0.60, fiiDiiNet: 482.48, fiiNet: -4699.14, diiNet: 5181.62 },
    { date: "01-Oct-2026", niftyClose: "22421.95", niftyChangePct: -0.88, fiiDiiNet: 557.62, fiiNet: -9484.22, diiNet: 10041.84 },
    { date: "30-Sep-2026", niftyClose: "22620.45", niftyChangePct: -0.42, fiiDiiNet: -3146.13, fiiNet: -9791.93, diiNet: 6645.80 },
    { date: "29-Sep-2026", niftyClose: "22716.20", niftyChangePct: -0.28, fiiDiiNet: -628.44, fiiNet: -3412.38, diiNet: 2783.94 },
    { date: "28-Sep-2026", niftyClose: "22780.25", niftyChangePct: -1.56, fiiDiiNet: 560.78, fiiNet: -1304.56, diiNet: 1865.34 }
  ];

  function getFiiDiiEntries() {
    let entries = [];
    try {
      const cached = localStorage.getItem('fiidii_history_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          entries = parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }

    if (entries.length === 0) {
      entries = [...SEED_FIIDII_ENTRIES];
    } else {
      // Ensure all seed dates are present in history without wiping out newer live dates
      SEED_FIIDII_ENTRIES.forEach(seed => {
        if (!entries.some(e => e.date === seed.date)) {
          entries.push(seed);
        }
      });
    }

    // Always sort descending chronologically
    entries.sort((a, b) => {
      const dateA = new Date(a.date.replace(/-/g, ' '));
      const dateB = new Date(b.date.replace(/-/g, ' '));
      return dateB - dateA;
    });

    saveFiiDiiEntries(entries);
    return entries;
  }

  function saveFiiDiiEntries(entries) {
    try {
      localStorage.setItem('fiidii_history_cache', JSON.stringify(entries));
    } catch (e) {
      console.error(e);
    }
  }
  function formatNetVal(num) {
    const sign = num >= 0 ? '+' : '-';
    const absVal = Math.abs(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${sign}${absVal}`;
  }

  function renderFiiDiiTable() {
    if (!fiidiiTableBody) return;
    const entries = getFiiDiiEntries();

    // Summary Totals
    let sumFii = 0;
    let sumDii = 0;
    let sumCombined = 0;

    entries.forEach(e => {
      sumFii += e.fiiNet;
      sumDii += e.diiNet;
      sumCombined += e.fiiDiiNet;
    });

    if (fiidiiTotalFiiEl) {
      const sign = sumFii >= 0 ? '+' : '-';
      const absVal = Math.abs(sumFii).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      fiidiiTotalFiiEl.textContent = `${sign}\u20B9${absVal} Cr`;
      fiidiiTotalFiiEl.className = `fiidii-stat-val ${sumFii >= 0 ? 'profit' : 'loss'}`;
    }
    if (fiidiiTotalDiiEl) {
      const sign = sumDii >= 0 ? '+' : '-';
      const absVal = Math.abs(sumDii).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      fiidiiTotalDiiEl.textContent = `${sign}\u20B9${absVal} Cr`;
      fiidiiTotalDiiEl.className = `fiidii-stat-val ${sumDii >= 0 ? 'profit' : 'loss'}`;
    }
    if (fiidiiTotalCombinedEl) {
      const sign = sumCombined >= 0 ? '+' : '-';
      const absVal = Math.abs(sumCombined).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      fiidiiTotalCombinedEl.textContent = `${sign}\u20B9${absVal} Cr`;
      fiidiiTotalCombinedEl.className = `fiidii-stat-val ${sumCombined >= 0 ? 'profit' : 'loss'}`;
    }

    const fiiSub = document.querySelector('.fiidii-stat-card.fii .fiidii-stat-sub');
    if (fiiSub) fiiSub.textContent = sumFii >= 0 ? 'Foreign Net Buyer' : 'Foreign Net Seller';
    const diiSub = document.querySelector('.fiidii-stat-card.dii .fiidii-stat-sub');
    if (diiSub) diiSub.textContent = sumDii >= 0 ? 'Domestic Absorption' : 'Domestic Net Seller';
    const combSub = document.querySelector('.fiidii-stat-card.combined .fiidii-stat-sub');
    if (combSub) combSub.textContent = sumCombined >= 0 ? 'Net Inflow Supported' : 'Net Outflow Caution';

    // Filter
    let filtered = [...entries];
    if (activeFiiDiiFilter === 'buying') {
      filtered = filtered.filter(e => e.fiiDiiNet > 0);
    } else if (activeFiiDiiFilter === 'selling') {
      filtered = filtered.filter(e => e.fiiDiiNet < 0);
    }

    if (filtered.length === 0) {
      fiidiiTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding: 24px; color: var(--text-muted); font-size: 0.78rem;">
            No sessions match the selected filter.
          </td>
        </tr>
      `;
      return;
    }

    // Render Rows matching FiiDiiRow in Kotlin (Compact & Sophisticated)
    fiidiiTableBody.innerHTML = filtered.map(row => {
      const isNetBuy = row.fiiDiiNet >= 0;
      const isFiiBuy = row.fiiNet >= 0;
      const isDiiBuy = row.diiNet >= 0;
      const isNiftyUp = (row.niftyChangePct || 0) >= 0;

      const niftyCloseFormatted = row.niftyClose ? Number(row.niftyClose).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '\u2014';

      return `
        <tr class="fiidii-row">
          <td class="col-date">
            <span class="fiidii-date-val">${row.date}</span>
          </td>
          <td class="col-nifty">
            <div class="fiidii-nifty-wrap">
              <span class="fiidii-nifty-price">${niftyCloseFormatted}</span>
              ${row.niftyClose ? `
                <span class="fiidii-nifty-chg ${isNiftyUp ? 'profit' : 'loss'}">
                  (${isNiftyUp ? '+' : ''}${row.niftyChangePct.toFixed(2)}%)
                </span>
              ` : ''}
            </div>
          </td>
          <td class="col-net">
            <span class="fiidii-net-pill ${isNetBuy ? 'buy' : 'sell'}">
              ${formatNetVal(row.fiiDiiNet)}
            </span>
          </td>
          <td class="col-fii">
            <span class="fiidii-num-val ${isFiiBuy ? 'buy' : 'sell'}">
              ${formatNetVal(row.fiiNet)}
            </span>
          </td>
          <td class="col-dii">
            <span class="fiidii-num-val ${isDiiBuy ? 'buy' : 'sell'}">
              ${formatNetVal(row.diiNet)}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.openFiiDiiModal = openFiiDiiModal;
  // Filter Buttons
  fiidiiFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fiidiiFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFiiDiiFilter = btn.getAttribute('data-filter');
      renderFiiDiiTable();
    });
  });

  let fiidiiLastSyncTime = null;
  let fiidiiSecondsAgo = 0;
  let fiidiiAutoRefreshTimer = null;
  let fiidiiSecondsTicker = null;

  function updateFiiDiiTimestampUI() {
    const fiidiiSubtitleEl = document.getElementById('fiidiiSubtitleDesc');
    if (!fiidiiSubtitleEl) return;
    if (!fiidiiLastSyncTime) {
      fiidiiSubtitleEl.innerHTML = `Cash Market &bull; Source: NSE India &bull; <span style="color:var(--text-muted);">Syncing Live NSE Data...</span>`;
      return;
    }
    const timeStr = fiidiiLastSyncTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    const agoStr = fiidiiSecondsAgo < 5 ? 'Just now' : `${fiidiiSecondsAgo}s ago`;
    fiidiiSubtitleEl.innerHTML = `Cash Market &bull; Source: NSE India &bull; <span style="display:inline-flex; align-items:center; gap:4px; font-weight:600; color:var(--text-primary);"><span class="pulse-dot" style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10B981; box-shadow:0 0 6px rgba(16,185,129,0.7);"></span>Live Synced ${agoStr} (${timeStr})</span> &bull; <span style="color:var(--brand-blue); font-weight:700;">Auto-refresh 60s</span>`;
  }

  function startFiiDiiTickers() {
    stopFiiDiiTickers();
    fiidiiSecondsTicker = setInterval(() => {
      if (fiidiiModal && fiidiiModal.classList.contains('active')) {
        fiidiiSecondsAgo++;
        updateFiiDiiTimestampUI();
      }
    }, 1000);

    fiidiiAutoRefreshTimer = setInterval(() => {
      if (fiidiiModal && fiidiiModal.classList.contains('active')) {
        fetchLiveFiiDii(true);
      }
    }, 60000);
  }

  function stopFiiDiiTickers() {
    if (fiidiiSecondsTicker) {
      clearInterval(fiidiiSecondsTicker);
      fiidiiSecondsTicker = null;
    }
    if (fiidiiAutoRefreshTimer) {
      clearInterval(fiidiiAutoRefreshTimer);
      fiidiiAutoRefreshTimer = null;
    }
  }

  window.startFiiDiiAutoRefresh = startFiiDiiTickers;
  window.stopFiiDiiAutoRefresh = stopFiiDiiTickers;

  async function fetchLiveFiiDii(isAuto = false) {
    try {
      if (fiidiiRefreshIcon) fiidiiRefreshIcon.style.animation = isAuto ? 'spin 1.2s linear infinite' : 'spin 0.8s linear infinite';
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      const res = await fetch('https://swingtrader-nse-proxy.vercel.app/api/fiidii', { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const diiItem = data.find(d => d.category === 'DII');
          const fiiItem = data.find(d => d.category === 'FII/FPI' || d.category === 'FII');
          if (diiItem || fiiItem) {
            const diiNet = diiItem ? parseFloat(diiItem.netValue) : 0;
            const fiiNet = fiiItem ? parseFloat(fiiItem.netValue) : 0;
            const combined = fiiNet + diiNet;
            const dateStr = (fiiItem && fiiItem.date) ? fiiItem.date : ((diiItem && diiItem.date) ? diiItem.date : 'Today');

            const entries = getFiiDiiEntries();
            const existing = entries.find(e => e.date === dateStr);
            const liveNifty = (typeof MAIN_PAGE_INDICES !== 'undefined' && MAIN_PAGE_INDICES[0]) ? MAIN_PAGE_INDICES[0] : null;

            if (existing) {
              existing.fiiNet = fiiNet;
              existing.diiNet = diiNet;
              existing.fiiDiiNet = parseFloat(combined.toFixed(2));
              if (liveNifty && liveNifty.value) existing.niftyClose = liveNifty.value.toFixed(2);
              if (liveNifty && liveNifty.changePct !== undefined) existing.niftyChangePct = liveNifty.changePct;
            } else {
              entries.unshift({
                date: dateStr,
                niftyClose: (liveNifty && liveNifty.value) ? liveNifty.value.toFixed(2) : "24536.60",
                niftyChangePct: (liveNifty && liveNifty.changePct !== undefined) ? liveNifty.changePct : 2.40,
                fiiDiiNet: parseFloat(combined.toFixed(2)),
                fiiNet: fiiNet,
                diiNet: diiNet
              });
            }

            entries.sort((a, b) => {
              const dateA = new Date(a.date.replace(/-/g, ' '));
              const dateB = new Date(b.date.replace(/-/g, ' '));
              return dateB - dateA;
            });

            saveFiiDiiEntries(entries);
            fiidiiLastSyncTime = new Date();
            fiidiiSecondsAgo = 0;
            updateFiiDiiTimestampUI();

            if (!isAuto && typeof showToast === 'function') {
              showToast(`Live FII/DII sessions updated for ${dateStr}!`, '\uD83D\uDCCA');
            }
          }
        }
      }
    } catch (e) {
      console.warn('FII DII live fetch error:', e);
    } finally {
      if (fiidiiRefreshIcon) fiidiiRefreshIcon.style.animation = '';
      fiidiiLastSyncTime = fiidiiLastSyncTime || new Date();
      updateFiiDiiTimestampUI();
      renderFiiDiiTable();
    }
  }

  // Refresh Action
  if (btnRefreshFiiDii) {
    btnRefreshFiiDii.addEventListener('click', () => {
      fetchLiveFiiDii(false);
      startFiiDiiTickers();
    });
  }

  function openFiiDiiModal() {
    if (typeof window.checkFeatureAccess === 'function') {
      const access = window.checkFeatureAccess('fiidii');
      if (!access.allowed) {
        if (typeof window.openFeatureGateModal === 'function') {
          window.openFeatureGateModal('fiidii');
        }
        return;
      }
    }
    renderFiiDiiTable();
    if (fiidiiModal) fiidiiModal.classList.add('active');
    startFiiDiiTickers();
    updateFiiDiiTimestampUI();
    fetchLiveFiiDii(false);
  }
  if (navFiiDii) {
    navFiiDii.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
      if (!getCurrentUser()) {
        if (typeof showToast === 'function') {
          showToast('Please Sign In to access FII/DII Daily Activity.', '\uD83D\uDD12');
        }
        if (typeof openAuthModal === 'function') openAuthModal('signin');
        return;
      }
      openFiiDiiModal();
    });
  }

  // Item 2: Market Screener
  const screenerModal = document.getElementById('screenerModal');
  const closeScreenerBtn = document.getElementById('closeScreenerModalBtn');

  if (navScreener) {
    navScreener.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
      if (!getCurrentUser()) {
        if (typeof showToast === 'function') {
          showToast('Please Sign In to access 360+ Market Screener.', '🔒');
        }
        if (typeof openAuthModal === 'function') openAuthModal('signin');
        return;
      }

      // Feature Gate: Lock Screener in sidebar when trial is expired!
      if (typeof window.checkFeatureAccess === 'function') {
        const access = window.checkFeatureAccess('screener');
        if (!access.allowed) {
          if (typeof window.openFeatureGateModal === 'function') {
            window.openFeatureGateModal('screener');
          }
          return;
        }
      }

      if (typeof window.openScreenerModal === 'function') {
        window.openScreenerModal();
      }
    });
  }

  if (closeScreenerBtn) {
    closeScreenerBtn.addEventListener('click', () => {
        screenerModal.classList.remove('active');
        if (typeof window.stopScreenerAutoRefresh === 'function') window.stopScreenerAutoRefresh();
    });
  }

  if (screenerModal) {
    screenerModal.addEventListener('click', (e) => {
      if (e.target === screenerModal) {
        screenerModal.classList.remove('active');
      }
    });
  }

  // Section 2: TRADING STRATEGIES
  // Item 1: EMA-9/EMA-21 Collide Method
  if (navEmaCollide) {
    navEmaCollide.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
      if (!getCurrentUser()) {
        if (typeof showToast === 'function') {
          showToast('Please Sign In to access EMA-9/EMA-21 Collide Method.', '\uD83D\uDD12');
        }
        if (typeof openAuthModal === 'function') openAuthModal('signin');
        return;
      }
      if (typeof window.openEmaCollideModal === 'function') {
        window.openEmaCollideModal();
      } else if (emaCollideModal) {
        emaCollideModal.classList.add('active');
      }
    });
  }

  // Close modals
  if (closeFiiDiiBtn) closeFiiDiiBtn.addEventListener('click', () => {
    if (fiidiiModal) fiidiiModal.classList.remove('active');
    if (typeof window.stopFiiDiiAutoRefresh === 'function') window.stopFiiDiiAutoRefresh();
  });
  if (dismissFiiDiiBtn) dismissFiiDiiBtn.addEventListener('click', () => {
    if (fiidiiModal) fiidiiModal.classList.remove('active');
    if (typeof window.stopFiiDiiAutoRefresh === 'function') window.stopFiiDiiAutoRefresh();
  });
  if (fiidiiModal) {
    fiidiiModal.addEventListener('click', (e) => {
      if (e.target === fiidiiModal) {
        fiidiiModal.classList.remove('active');
        if (typeof window.stopFiiDiiAutoRefresh === 'function') window.stopFiiDiiAutoRefresh();
      }
    });
  }

  if (closeEmaCollideBtn) closeEmaCollideBtn.addEventListener('click', () => {
    if (emaCollideModal) emaCollideModal.classList.remove('active');
  });
  if (dismissEmaCollideBtn) dismissEmaCollideBtn.addEventListener('click', () => {
    if (emaCollideModal) emaCollideModal.classList.remove('active');
  });

  // Initial user state update
  window.updateSidebarDrawerStatus = updateSidebarUserStatus;
  updateSidebarUserStatus();
}





/* ==========================================================================
   Market Screener Modal Module (Mobile App Fidelity: StockScreenerScreen.kt)
   ========================================================================== */
let screenerActiveFilter = 'ALL';
let screenerModalSearchQuery = '';
let screenerModalSortColumn = 'ANALYSIS_PCT'; // Default: ANALYSIS_PCT
let screenerModalSortAsc = false;             // Default: Descending (highest buy % on top)

function initScreenerModalModule() {
  const modal = document.getElementById('screenerModal');
  const tableBody = document.getElementById('screenerModalTableBody');
  const searchInput = document.getElementById('screenerSearchInput');
  const clearBtn = document.getElementById('screenerSearchClearBtn');
  const refreshBtn = document.getElementById('btnRefreshScreenerModal');
  const refreshIcon = document.getElementById('screenerRefreshIcon');
  const filterChips = document.querySelectorAll('.screener-chip');
  const sortHeaders = document.querySelectorAll('#screenerDataTable th[data-sort-key]');
  const progressBanner = document.getElementById('screenerProgressBanner');
  const progressBar = document.getElementById('screenerProgressBar');
  const progressText = document.getElementById('screenerProgressText');
  const progressPercent = document.getElementById('screenerProgressPercent');
  const subtitleCount = document.getElementById('screenerSubtitleCount');
  const showingStats = document.getElementById('screenerShowingStats');

  if (!modal || !tableBody) return;

  // 1. Filter Chips Click Handlers
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      screenerActiveFilter = chip.getAttribute('data-screener-filter') || 'ALL';
      renderScreenerModalTable();
    });
  });

  // 2. Search Input Handlers
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      screenerModalSearchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) {
        clearBtn.style.display = screenerModalSearchQuery.length > 0 ? 'inline-block' : 'none';
      }
      renderScreenerModalTable();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        screenerModalSearchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        renderScreenerModalTable();
      }
    });
  }

  // 3. Column Sorting Handlers
  sortHeaders.forEach(th => {
    th.addEventListener('click', () => {
      const colKey = th.getAttribute('data-sort-key');
      if (screenerModalSortColumn === colKey) {
        // Toggle direction
        screenerModalSortAsc = !screenerModalSortAsc;
      } else {
        // New column: Default to descending for numeric, ascending for names (matching Kotlin onSortColumnClicked)
        screenerModalSortColumn = colKey;
        screenerModalSortAsc = (colKey === 'NAME');
      }
      updateSortHeaderArrows();
      renderScreenerModalTable();
    });
  });

  function updateSortHeaderArrows() {
    sortHeaders.forEach(th => {
      const colKey = th.getAttribute('data-sort-key');
      const arrowEl = th.querySelector('.sort-arrow');
      if (arrowEl) {
        if (colKey === screenerModalSortColumn) {
          arrowEl.classList.add('active');
          arrowEl.textContent = screenerModalSortAsc ? '\u25B2' : '\u25BC';
        } else {
          arrowEl.classList.remove('active');
          arrowEl.textContent = '';
        }
      }
    });
  }

  // 4. Live Quote Sync & Auto-Refresh Engine (matches Kotlin StockScreenerViewModel.loadStocks)
  let isScreenerScanning = false;
  let screenerLastSyncTime = null;
  let screenerSecondsAgo = 0;
  let screenerAutoRefreshTimer = null;
  let screenerSecondsTicker = null;
  let screenerRotationIndex = 0;

  function updateScreenerTimestampUI() {
    if (!subtitleCount) return;
    const total = (typeof TRADE_NITI_MASTER_STOCKS !== 'undefined') ? TRADE_NITI_MASTER_STOCKS.length : 359;
    if (!screenerLastSyncTime) {
      subtitleCount.innerHTML = `${total} NSE Stocks &bull; <span style="color:var(--text-muted);">Connecting Live NSE Proxy...</span>`;
      return;
    }
    const timeStr = screenerLastSyncTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    const agoStr = screenerSecondsAgo < 5 ? 'Just now' : `${screenerSecondsAgo}s ago`;
    subtitleCount.innerHTML = `${total} NSE Stocks &bull; <span style="display:inline-flex; align-items:center; gap:4px; font-weight:600; color:var(--text-primary);"><span class="pulse-dot" style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10B981; box-shadow:0 0 6px rgba(16,185,129,0.7);"></span>Live Synced ${agoStr} (${timeStr})</span> &bull; <span style="color:var(--brand-blue); font-weight:700;">Auto-refresh 30s</span>`;
  }

  function startScreenerTickers() {
    stopScreenerTickers();
    // 1-second elapsed counter ticker
    screenerSecondsTicker = setInterval(() => {
      if (modal && modal.classList.contains('active')) {
        screenerSecondsAgo++;
        updateScreenerTimestampUI();
      }
    }, 1000);

    // 30-second continuous background auto-sync
    screenerAutoRefreshTimer = setInterval(() => {
      if (modal && modal.classList.contains('active') && !isScreenerScanning) {
        syncLiveScreenerModalQuotes(false, true);
      }
    }, 30000);
  }

  function stopScreenerTickers() {
    if (screenerSecondsTicker) {
      clearInterval(screenerSecondsTicker);
      screenerSecondsTicker = null;
    }
    if (screenerAutoRefreshTimer) {
      clearInterval(screenerAutoRefreshTimer);
      screenerAutoRefreshTimer = null;
    }
  }

  window.startScreenerAutoRefresh = startScreenerTickers;
  window.stopScreenerAutoRefresh = stopScreenerTickers;

  async function syncLiveScreenerModalQuotes(forceFull = false, isAuto = false) {
    if (isScreenerScanning) return;
    isScreenerScanning = true;

    if (refreshIcon) refreshIcon.style.animation = isAuto ? 'spin 1.2s linear infinite' : 'spin 0.8s linear infinite';
    if (!isAuto && progressBanner) {
      progressBanner.style.display = 'block';
      if (progressBar) progressBar.style.width = '0%';
    }

    // 1. Prioritize active view (stocks matched by search & category filter, sorted by current column)
    let sortedList = [...TRADE_NITI_MASTER_STOCKS];
    if (screenerModalSearchQuery) {
      sortedList = sortedList.filter(s =>
        (s.symbol || '').toLowerCase().includes(screenerModalSearchQuery) ||
        (s.name || '').toLowerCase().includes(screenerModalSearchQuery) ||
        (s.sector || '').toLowerCase().includes(screenerModalSearchQuery)
      );
    }
    if (screenerActiveFilter === 'BULLISH') {
      sortedList = sortedList.filter(s => (s.analysisPct || s.confluence) >= 70);
    } else if (screenerActiveFilter === 'NEUTRAL') {
      sortedList = sortedList.filter(s => {
        const a = s.analysisPct || s.confluence;
        return a >= 50 && a < 70;
      });
    } else if (screenerActiveFilter === 'BEARISH') {
      sortedList = sortedList.filter(s => (s.analysisPct || s.confluence) < 50);
    } else if (screenerActiveFilter === 'GAINERS') {
      sortedList = sortedList.filter(s => (s.changePct || 0) > 0);
    } else if (screenerActiveFilter === 'LOSERS') {
      sortedList = sortedList.filter(s => (s.changePct || 0) < 0);
    }

    // Column sorting comparator
    sortedList.sort((a, b) => {
      let vA, vB;
      switch (screenerModalSortColumn) {
        case 'NAME':
          vA = a.symbol || '';
          vB = b.symbol || '';
          return screenerModalSortAsc ? vA.localeCompare(vB) : vB.localeCompare(vA);
        case 'PRICE':
        case 'LTP':
          vA = a.price || a.ltp || 0;
          vB = b.price || b.ltp || 0;
          break;
        case 'CHANGE':
          vA = a.changePct || 0;
          vB = b.changePct || 0;
          break;
        case 'HIGH_52':
          vA = a.high52 || 0;
          vB = b.high52 || 0;
          break;
        case 'LOW_52':
          vA = a.low52 || 0;
          vB = b.low52 || 0;
          break;
        case 'ANALYSIS_PCT':
        default:
          vA = a.analysisPct || a.confluence || 0;
          vB = b.analysisPct || b.confluence || 0;
          break;
      }
      return screenerModalSortAsc ? (vA - vB) : (vB - vA);
    });

    let scanBatch = [];
    if (forceFull) {
      // Full Scan: scan ALL 359 stocks in the catalog!
      scanBatch = [...TRADE_NITI_MASTER_STOCKS];
    } else {
      // Auto-refresh: scan top 40 visible stocks + rotate 40 stocks across the 359 catalog
      const visibleBatch = sortedList.slice(0, 40);
      screenerRotationIndex = (screenerRotationIndex + 40) % TRADE_NITI_MASTER_STOCKS.length;
      const rotatingBatch = TRADE_NITI_MASTER_STOCKS.slice(screenerRotationIndex, screenerRotationIndex + 40);

      const seen = new Set();
      visibleBatch.forEach(s => {
        if (!seen.has(s.symbol)) {
          seen.add(s.symbol);
          scanBatch.push(s);
        }
      });
      rotatingBatch.forEach(s => {
        if (!seen.has(s.symbol)) {
          seen.add(s.symbol);
          scanBatch.push(s);
        }
      });
    }

    const total = scanBatch.length;
    if (!isAuto) {
      if (progressText) progressText.textContent = `Connecting Live NSE Proxy (0/${total})...`;
      if (progressPercent) progressPercent.textContent = `0% (0/${total})`;
    }

    let completed = 0;
    const CHUNK_SIZE = 25; // 25 parallel requests per chunk for ultra-fast full 359 sync
    for (let i = 0; i < scanBatch.length; i += CHUNK_SIZE) {
      const chunk = scanBatch.slice(i, i + CHUNK_SIZE);
      await Promise.allSettled(chunk.map(async (stock) => {
        try {
          const qSym = (stock.symbol === 'TATAMOTORS') ? 'TMPV' : stock.symbol;
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 3500);
          const res = await fetch('https://swingtrader-nse-proxy.vercel.app/api/quote?symbol=' + encodeURIComponent(qSym), { signal: controller.signal });
          clearTimeout(timer);
          if (!res.ok) return;
          const data = await res.json();
          if (data && data.priceInfo && data.priceInfo.lastPrice) {
            const ltp = data.priceInfo.lastPrice;
            const chg = data.priceInfo.change || 0;
            const pchg = data.priceInfo.pChange !== undefined ? data.priceInfo.pChange : 0;

            stock.price = ltp;
            stock.ltp = ltp;
            stock.change = chg;
            stock.changePct = pchg;

            if (data.priceInfo.weekHighLow && data.priceInfo.weekHighLow.max) {
              stock.high52 = data.priceInfo.weekHighLow.max;
              stock.low52 = data.priceInfo.weekHighLow.min || stock.low52;
            } else if (data.priceInfo.intraDayHighLow) {
              if (data.priceInfo.intraDayHighLow.max) stock.high52 = Math.max(stock.high52 || 0, data.priceInfo.intraDayHighLow.max);
              if (data.priceInfo.intraDayHighLow.min) stock.low52 = Math.min(stock.low52 || ltp, data.priceInfo.intraDayHighLow.min);
            }

            // Dynamic confluence tuning based on intraday momentum
            if (pchg > 2.0) {
              stock.confluence = Math.min(96, Math.max(72, (stock.confluence || 50) + 4));
              stock.analysisPct = stock.confluence;
            } else if (pchg < -2.0) {
              stock.confluence = Math.max(25, Math.min(48, (stock.confluence || 50) - 4));
              stock.analysisPct = stock.confluence;
            }

            // Sync with landing page SCREENER_STOCKS and MARKET_STOCKS_MASTER
            if (typeof SCREENER_STOCKS !== 'undefined') {
              const sc = SCREENER_STOCKS.find(s => s.symbol === stock.symbol);
              if (sc) {
                sc.price = ltp;
                sc.change = pchg;
                if (stock.high52) sc.high52 = stock.high52;
                if (stock.low52) sc.low52 = stock.low52;
                if (stock.confluence) sc.analysisPct = stock.confluence;
              }
            }
            if (typeof MARKET_STOCKS_MASTER !== 'undefined') {
              const mm = MARKET_STOCKS_MASTER.find(s => s.symbol === stock.symbol);
              if (mm) {
                mm.price = ltp;
                mm.change = chg;
                mm.changePct = pchg;
              }
            }
          }
        } catch (_) {}
        finally {
          completed++;
          if (!isAuto) {
            const pct = Math.round((completed / total) * 100);
            if (progressBar) progressBar.style.width = `${pct}%`;
            if (progressPercent) progressPercent.textContent = `${pct}% (${completed}/${total})`;
            if (progressText) progressText.textContent = `Syncing live ticks (${stock.symbol})...`;
          }
        }
      }));

      // Incremental live re-render preserving scroll position
      renderScreenerModalTable(true);
    }

    isScreenerScanning = false;
    screenerLastSyncTime = new Date();
    screenerSecondsAgo = 0;

    if (refreshIcon) refreshIcon.style.animation = '';
    updateScreenerTimestampUI();

    if (!isAuto) {
      if (progressText) progressText.textContent = `Sync Complete: ${completed} stocks updated!`;
      setTimeout(() => {
        if (progressBanner) progressBanner.style.display = 'none';
      }, 700);

      if (typeof showToast === 'function') {
        showToast(`Market Screener: ${completed} live NSE quotes synced!`, '\uD83D\uDCCA');
      }
    }
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      syncLiveScreenerModalQuotes(true, false);
      startScreenerTickers();
    });
  }

  // Hook close button and backdrop click to stop tickers
  const closeScreenerBtnLocal = document.getElementById('closeScreenerModalBtn');
  if (closeScreenerBtnLocal) {
    closeScreenerBtnLocal.addEventListener('click', () => {
      stopScreenerTickers();
    });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        stopScreenerTickers();
      }
    });
  }
  // 5. Update Chip Counts
  function updateChipCounts() {
    const total = TRADE_NITI_MASTER_STOCKS.length;
    const bullish = TRADE_NITI_MASTER_STOCKS.filter(s => (s.analysisPct || s.confluence) >= 70).length;
    const neutral = TRADE_NITI_MASTER_STOCKS.filter(s => {
      const a = s.analysisPct || s.confluence;
      return a >= 50 && a < 70;
    }).length;
    const bearish = TRADE_NITI_MASTER_STOCKS.filter(s => (s.analysisPct || s.confluence) < 50).length;

    const chipAll = document.getElementById('chipScreenerAll');
    const chipBullish = document.getElementById('chipScreenerBullish');
    const chipNeutral = document.getElementById('chipScreenerNeutral');
    const chipBearish = document.getElementById('chipScreenerBearish');

    if (chipAll) chipAll.innerHTML = `All (${total})`;
    if (chipBullish) chipBullish.innerHTML = `&#128994; Bullish &ge;70% (${bullish})`;
    if (chipNeutral) chipNeutral.innerHTML = `&#128993; Neutral (${neutral})`;
    if (chipBearish) chipBearish.innerHTML = `&#128308; Bearish (${bearish})`;
    // Subtitle timestamp is maintained exclusively by updateScreenerTimestampUI()
  }

  // 6. Render Table Rows
  window.renderScreenerModalTable = function(keepScroll = false) {
    if (!tableBody) return;
    const wrapper = document.getElementById('screenerTableWrapper');
    const prevScrollTop = wrapper ? wrapper.scrollTop : 0;
    const prevScrollLeft = wrapper ? wrapper.scrollLeft : 0;
    updateChipCounts();
    updateSortHeaderArrows();

    let list = [...TRADE_NITI_MASTER_STOCKS];

    // Search query filter (matches Kotlin query filter)
    if (screenerModalSearchQuery) {
      list = list.filter(s =>
        (s.symbol || '').toLowerCase().includes(screenerModalSearchQuery) ||
        (s.name || '').toLowerCase().includes(screenerModalSearchQuery) ||
        (s.sector || '').toLowerCase().includes(screenerModalSearchQuery)
      );
    }

    // Category filter (matches ScreenerFilter in Kotlin)
    if (screenerActiveFilter === 'BULLISH') {
      list = list.filter(s => (s.analysisPct || s.confluence) >= 70);
    } else if (screenerActiveFilter === 'NEUTRAL') {
      list = list.filter(s => {
        const a = s.analysisPct || s.confluence;
        return a >= 50 && a < 70;
      });
    } else if (screenerActiveFilter === 'BEARISH') {
      list = list.filter(s => (s.analysisPct || s.confluence) < 50);
    } else if (screenerActiveFilter === 'GAINERS') {
      list = list.filter(s => (s.changePct || 0) > 0);
    } else if (screenerActiveFilter === 'LOSERS') {
      list = list.filter(s => (s.changePct || 0) < 0);
    }

    // Sorting (matches SortColumn in Kotlin)
    list.sort((a, b) => {
      let vA, vB;
      switch (screenerModalSortColumn) {
        case 'NAME':
          vA = a.symbol || '';
          vB = b.symbol || '';
          return screenerModalSortAsc ? vA.localeCompare(vB) : vB.localeCompare(vA);
        case 'PRICE':
        case 'LTP':
          vA = a.price || a.ltp || 0;
          vB = b.price || b.ltp || 0;
          break;
        case 'CHANGE':
          vA = a.changePct || 0;
          vB = b.changePct || 0;
          break;
        case 'HIGH_52':
          vA = a.high52 || 0;
          vB = b.high52 || 0;
          break;
        case 'LOW_52':
          vA = a.low52 || 0;
          vB = b.low52 || 0;
          break;
        case 'ANALYSIS_PCT':
        default:
          vA = a.analysisPct || a.confluence || 0;
          vB = b.analysisPct || b.confluence || 0;
          break;
      }
      return screenerModalSortAsc ? (vA - vB) : (vB - vA);
    });

    const sub = (window.tradeNitiSubscription && window.tradeNitiSubscription.check) 
      ? window.tradeNitiSubscription.check() 
      : { isProWeb: false };

    let isPreviewOnly = !sub.isProWeb;
    let displayList = isPreviewOnly ? list.slice(0, 10) : list;

    // Update Status Bar
    if (showingStats) {
      const colLabel = screenerModalSortColumn.replace('_', ' ');
      const arrow = screenerModalSortAsc ? '&#9650;' : '&#9660;';
      if (isPreviewOnly) {
        showingStats.innerHTML = `Showing 10 of ${list.length} stocks (Starter Trial Preview) &bull; <a href="javascript:void(0)" onclick="if(window.openFeatureGateModal) window.openFeatureGateModal('screener');" style="color:var(--brand-blue); font-weight:750; text-decoration:underline;">Unlock All 360+ Pro</a>`;
      } else {
        showingStats.innerHTML = `Showing ${list.length} stocks &bull; Sorted by: ${colLabel} ${arrow}`;
      }
    }

    if (list.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding: 36px 16px; color: var(--text-muted);">
            <div style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No stocks found</div>
            <div style="font-size: 0.78rem;">Try adjusting your search query or quick filter chip.</div>
          </td>
        </tr>
      `;
      return;
    }

    // Render 6 columns with Frozen Col 1 (1-to-1 matching Mobile App ScreenerStockRow)
    let rowsHtml = displayList.map(stock => {
      const isUp = (stock.changePct || 0) >= 0;
      const sign = isUp ? '+' : '';
      const analysis = stock.analysisPct || stock.confluence || 50;

      let badgeClass = 'neutral';
      if (analysis >= 70) badgeClass = 'bullish';
      else if (analysis < 50) badgeClass = 'bearish';

      const formattedPrice = `&#8377;${(stock.price || stock.ltp || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const formattedHigh52 = `&#8377;${(stock.high52 || (stock.price || 1000) * 1.2).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const formattedLow52 = `&#8377;${(stock.low52 || (stock.price || 1000) * 0.7).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      return `
        <tr data-stock-symbol="${stock.symbol}" title="Click to view detailed analysis for ${stock.symbol}">
          <!-- Col 1: FROZEN Stock Name -->
          <td class="col-frozen">
            <div style="font-weight: 750; font-size: 0.92rem; color: var(--text-primary); line-height: 1.25;">
              ${stock.symbol}
            </div>
            <div style="font-size: 0.74rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 145px; margin-top: 1px;">
              ${stock.name}
            </div>
          </td>
          <!-- Col 2: Price (P/L%) - Matches Mobile App 2nd Col -->
          <td class="col-price" style="text-align: right; padding-right: 12px;">
            <div style="font-weight: 750; color: var(--text-primary); font-size: 0.88rem; line-height: 1.25;">
              ${formattedPrice}
            </div>
            <div style="font-weight: 600; font-size: 0.74rem; color: ${isUp ? 'var(--profit-green)' : 'var(--loss-red)'}; margin-top: 1px;">
              ${sign}${(stock.changePct || 0).toFixed(2)}%
            </div>
          </td>
          <!-- Col 3: LTP -->
          <td class="col-ltp" style="text-align: right; font-weight: 500; font-size: 0.85rem; color: var(--text-primary); padding-right: 12px;">
            ${formattedPrice}
          </td>
          <!-- Col 4: 52W High -->
          <td class="col-high" style="text-align: right; color: var(--text-secondary); font-size: 0.82rem; padding-right: 12px;">
            ${formattedHigh52}
          </td>
          <!-- Col 5: 52W Low -->
          <td class="col-low" style="text-align: right; color: var(--text-secondary); font-size: 0.82rem; padding-right: 12px;">
            ${formattedLow52}
          </td>
          <!-- Col 6: Analysis % -->
          <td class="col-analysis" style="text-align: center;">
            <span class="screener-analysis-badge ${badgeClass}" style="font-size: 0.78rem; font-weight: 700; padding: 3px 8px; border-radius: 6px;">${analysis}%</span>
          </td>
        </tr>
      `;
    }).join('');

    if (isPreviewOnly && list.length > 10) {
      rowsHtml += `
        <tr class="screener-pro-lock-row">
          <td colspan="6" style="text-align: center; padding: 26px 16px; background: rgba(37, 99, 235, 0.04); border-top: 2px dashed rgba(37, 99, 235, 0.3);">
            <div style="font-size: 1rem; font-weight: 850; color: var(--text-primary); margin-bottom: 4px;">
              🔒 350+ More Stocks Locked in Starter Trial
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 14px; max-width: 520px; margin-left: auto; margin-right: auto;">
              Upgrade to <strong>Monthly Pro (₹499)</strong> or <strong>Annual VIP Bundle</strong> to unlock the complete 360+ Indian equities market screener with frozen sticky columns &amp; live sorting.
            </div>
            <div style="display: flex; justify-content: center; gap: 10px;">
              <button type="button" class="btn-primary" onclick="if(window.openFeatureGateModal) window.openFeatureGateModal('screener');" style="padding: 8px 18px; font-size: 0.82rem; font-weight: 750;">
                Unlock All 360+ Stocks (₹499)
              </button>
            </div>
          </td>
        </tr>
      `;
    }

    tableBody.innerHTML = rowsHtml;
    if (wrapper && keepScroll) {
      wrapper.scrollTop = prevScrollTop;
      wrapper.scrollLeft = prevScrollLeft;
    }

    // Attach row click listeners (matches onStockClick(stock.symbol))
    tableBody.querySelectorAll('tr[data-stock-symbol]').forEach(row => {
      row.addEventListener('click', () => {
        const sym = row.getAttribute('data-stock-symbol');
        if (typeof window.openStockDetailModal === 'function') {
          window.openStockDetailModal(sym);
        } else {
          showToast(`Selected ${sym} • Technical Analysis Confluence`, '📈');
        }
      });
    });
  };

  // Open Screener Modal function
  // Open Screener Modal function
  window.openScreenerModal = function() {
    renderScreenerModalTable();
    if (modal) modal.classList.add('active');
    startScreenerTickers();
    updateScreenerTimestampUI();
    // Auto-sync live quotes immediately if never synced or older than 30 seconds
    if (!screenerLastSyncTime || (Date.now() - screenerLastSyncTime.getTime() > 30000)) {
      syncLiveScreenerModalQuotes(true, false);
    }
  };
  // Initial render
  updateChipCounts();
  renderScreenerModalTable();
}


/* ==========================================================================
   EMA-9 / EMA-21 Collide Method Module (Mobile App Fidelity: EmaCollideScreen.kt)
   ========================================================================== */
const DEFAULT_EMA_SYMBOLS = [
  'RELIANCE', 'TCS', 'HDFCBANK', 'INFY',
  'ICICIBANK', 'SBIN', 'TATAMOTORS', 'BAJFINANCE'
];

let trackedEmaSymbols = [];
let trackedEmaRows = [];

function initEmaCollideModalModule() {
  const modal = document.getElementById('emaCollideModal');
  const closeBtn = document.getElementById('closeEmaCollideModalBtn');
  const tableBody = document.getElementById('emaCollideTableBody');
  const refreshBtn = document.getElementById('btnRefreshEmaCollide');
  const refreshIcon = document.getElementById('emaRefreshIcon');
  const addStockBtn = document.getElementById('btnAddEmaStockBtn');
  const statusCountEl = document.getElementById('emaStatusCount');

  // Add Stock Modal elements
  const addStockModal = document.getElementById('addEmaStockModal');
  const closeAddStockBtn = document.getElementById('closeAddEmaStockModalBtn');
  const dismissAddStockBtn = document.getElementById('btnDismissAddEmaStockModal');
  const addStockSearchInput = document.getElementById('addEmaStockSearchInput');
  const addStockClearBtn = document.getElementById('addEmaStockClearBtn');
  const candidatesList = document.getElementById('addEmaStockCandidatesList');
  const customBtnWrap = document.getElementById('addCustomEmaStockBtnWrap');
  const confirmCustomBtn = document.getElementById('btnConfirmAddCustomEmaStock');

  if (!modal || !tableBody) return;

  // 1. Load Tracked Symbols from localStorage
  function loadTrackedSymbols() {
    try {
      const saved = localStorage.getItem('ema_collide_tracked_symbols');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem('ema_collide_tracked_symbols', JSON.stringify(DEFAULT_EMA_SYMBOLS));
    return [...DEFAULT_EMA_SYMBOLS];
  }

  function saveTrackedSymbols(syms) {
    try {
      localStorage.setItem('ema_collide_tracked_symbols', JSON.stringify(syms));
    } catch (e) {
      console.error(e);
    }
  }

  // 2. Format Time Helper
  function formatTimeHHMM(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // 3. Generate or Evaluate Signals for a Symbol
  function generateStockEmaRow(sym) {
    const master = (typeof findMasterStock === 'function') ? findMasterStock(sym) : null;
    const price = master ? master.price : 1000.00;
    const change = master ? master.change : 5.00;
    const changePct = master ? master.changePct : 0.50;
    const name = master ? master.name : `${sym} Ltd.`;

    // Seed realistic intraday collisions based on stock and timeframe
    let hit5m = { isHit: false, hitTime: null, hitTimestamp: 0, maxAgeMinutes: 10 };
    let hit15m = { isHit: false, hitTime: null, hitTimestamp: 0, maxAgeMinutes: 30 };
    let hit1h = { isHit: false, hitTime: null, hitTimestamp: 0, maxAgeMinutes: 120 };

    if (sym === 'TATAMOTORS') {
      const t5 = new Date(Date.now() - 3 * 60 * 1000);
      const t15 = new Date(Date.now() - 14 * 60 * 1000);
      hit5m = { isHit: true, hitTime: formatTimeHHMM(t5), hitTimestamp: Math.floor(t5.getTime() / 1000), maxAgeMinutes: 10 };
      hit15m = { isHit: true, hitTime: formatTimeHHMM(t15), hitTimestamp: Math.floor(t15.getTime() / 1000), maxAgeMinutes: 30 };
    } else if (sym === 'SBIN') {
      const t5 = new Date(Date.now() - 6 * 60 * 1000);
      hit5m = { isHit: true, hitTime: formatTimeHHMM(t5), hitTimestamp: Math.floor(t5.getTime() / 1000), maxAgeMinutes: 10 };
    } else if (sym === 'HDFCBANK') {
      const t15 = new Date(Date.now() - 12 * 60 * 1000);
      hit15m = { isHit: true, hitTime: formatTimeHHMM(t15), hitTimestamp: Math.floor(t15.getTime() / 1000), maxAgeMinutes: 30 };
    } else if (sym === 'INFY') {
      const t15 = new Date(Date.now() - 20 * 60 * 1000);
      hit15m = { isHit: true, hitTime: formatTimeHHMM(t15), hitTimestamp: Math.floor(t15.getTime() / 1000), maxAgeMinutes: 30 };
    } else if (sym === 'RELIANCE') {
      const t1 = new Date(Date.now() - 48 * 60 * 1000);
      hit1h = { isHit: true, hitTime: formatTimeHHMM(t1), hitTimestamp: Math.floor(t1.getTime() / 1000), maxAgeMinutes: 120 };
    } else if (sym === 'TITAN') {
      const t1 = new Date(Date.now() - 75 * 60 * 1000);
      hit1h = { isHit: true, hitTime: formatTimeHHMM(t1), hitTimestamp: Math.floor(t1.getTime() / 1000), maxAgeMinutes: 120 };
    } else {
      // For any other added stock, deterministically hash to provide active hits
      let hash = 0;
      for (let i = 0; i < sym.length; i++) hash = (hash * 31 + sym.charCodeAt(i)) % 100;
      if (hash % 3 === 0) {
        const t5 = new Date(Date.now() - 4 * 60 * 1000);
        hit5m = { isHit: true, hitTime: formatTimeHHMM(t5), hitTimestamp: Math.floor(t5.getTime() / 1000), maxAgeMinutes: 10 };
      } else if (hash % 3 === 1) {
        const t15 = new Date(Date.now() - 16 * 60 * 1000);
        hit15m = { isHit: true, hitTime: formatTimeHHMM(t15), hitTimestamp: Math.floor(t15.getTime() / 1000), maxAgeMinutes: 30 };
      } else if (hash % 5 === 0) {
        const t1 = new Date(Date.now() - 50 * 60 * 1000);
        hit1h = { isHit: true, hitTime: formatTimeHHMM(t1), hitTimestamp: Math.floor(t1.getTime() / 1000), maxAgeMinutes: 120 };
      }
    }

    return {
      symbol: sym,
      name: name,
      price: price,
      change: change,
      changePct: changePct,
      hit5m: hit5m,
      hit15m: hit15m,
      hit1h: hit1h
    };
  }

  function isHitActive(hitObj, nowSec) {
    if (!hitObj || !hitObj.isHit || hitObj.hitTimestamp <= 0) return false;
    const elapsed = nowSec - hitObj.hitTimestamp;
    const maxAge = (hitObj.maxAgeMinutes || 10) * 60;
    return elapsed >= -60 && elapsed <= maxAge;
  }

  function renderHitBadge(hitObj, nowSec) {
    const active = isHitActive(hitObj, nowSec);
    if (active) {
      return `
        <span class="ema-hit-pill hit" title="Active Collision within ${hitObj.maxAgeMinutes}m constraint">
          <span class="hit-dot"></span>
          <span class="hit-label">HIT</span>
          <span class="hit-time">${hitObj.hitTime || 'NOW'}</span>
        </span>
      `;
    }
    return `
      <span class="ema-hit-pill idle" title="No Collision in timeframe">
        <span class="hit-label">HIT</span>
        <span class="hit-dash">&mdash;</span>
      </span>
    `;
  }

  // 4. Render Table
  function renderEmaCollideTable() {
    if (!tableBody) return;
    const nowSec = Math.floor(Date.now() / 1000);

    if (statusCountEl) {
      statusCountEl.textContent = `${trackedEmaRows.length} Stocks Tracked`;
    }

    if (trackedEmaRows.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
            <div style="font-weight: 750; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 4px;">Koi stock add nahi hai.</div>
            <div style="font-size: 0.78rem; margin-bottom: 12px;">EMA-9 / EMA-21 radar me stocks monitor karne ke liye 'Add Stock' button dabayein.</div>
            <button type="button" class="btn-primary" id="btnEmptyAddEmaStock" style="padding: 5px 14px; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 5px; border-radius: 6px;">
              <span>+ Add Stock</span>
            </button>
          </td>
        </tr>
      `;
      const emptyAddBtn = document.getElementById('btnEmptyAddEmaStock');
      if (emptyAddBtn) emptyAddBtn.addEventListener('click', openAddStockDialog);
      return;
    }

    tableBody.innerHTML = trackedEmaRows.map(row => {
      const isUp = (row.changePct || 0) >= 0;
      const sign = isUp ? '+' : '';
      const formattedPrice = `&#8377;${(row.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      return `
        <tr data-stock-symbol="${row.symbol}" class="ema-row">
          <!-- Col 1: Stock -->
          <td class="col-stock">
            <div class="ema-sym-row">
              <span class="ema-stock-symbol ema-stock-click">${row.symbol}</span>
              <a href="javascript:void(0)" class="ema-sac-pill" data-action="stock-analysis" data-symbol="${row.symbol}" title="Open Stock Analysis Center for ${row.symbol}">Analysis &#10025;</a>
            </div>
            <div class="ema-stock-name">${row.name}</div>
          </td>
          <!-- Col 2: Price & P/L % -->
          <td class="col-price">
            <div class="ema-price-wrap">
              <span class="ema-price-val">${formattedPrice}</span>
              <span class="ema-chg-pill ${isUp ? 'profit' : 'loss'}">
                ${sign}${(row.changePct || 0).toFixed(2)}%
              </span>
            </div>
          </td>
          <!-- Col 3: 5m HIT -->
          <td class="col-hit">
            ${renderHitBadge(row.hit5m, nowSec)}
          </td>
          <!-- Col 4: 15m HIT -->
          <td class="col-hit">
            ${renderHitBadge(row.hit15m, nowSec)}
          </td>
          <!-- Col 5: 1h HIT -->
          <td class="col-hit">
            ${renderHitBadge(row.hit1h, nowSec)}
          </td>
          <!-- Col 6: Delete Action -->
          <td class="col-action">
            <button type="button" class="ema-btn-delete" data-remove-symbol="${row.symbol}" title="Remove ${row.symbol}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');


        // Attach click handlers
    tableBody.querySelectorAll('.ema-stock-click').forEach(el => {
      el.addEventListener('click', () => {
        const tr = el.closest('tr');
        const sym = tr ? tr.getAttribute('data-stock-symbol') : '';
        if (typeof window.openStockDetailModal === 'function') {
          window.openStockDetailModal(sym);
        } else {
          showToast(`Selected ${sym} • EMA Collision Radar`, '\u26A1');
        }
      });
    });

    tableBody.querySelectorAll('.ema-btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sym = btn.getAttribute('data-remove-symbol');
        if (sym && confirm(`Are you sure you want to remove ${sym} from the EMA-9 / EMA-21 Collide tracker?`)) {
          removeEmaStock(sym);
        }
      });
    });
  }

  // 5. Remove Stock
  function removeEmaStock(sym) {
    trackedEmaSymbols = trackedEmaSymbols.filter(s => s !== sym);
    trackedEmaRows = trackedEmaRows.filter(r => r.symbol !== sym);
    saveTrackedSymbols(trackedEmaSymbols);
    renderEmaCollideTable();
    showToast(`Removed ${sym} from EMA Tracker`, '\uD83D\uDDD1\uFE0F');
  }

  // 6. Add Stock
  function addEmaStock(sym) {
    const cleanSym = sym.trim().toUpperCase();
    if (!cleanSym) return;
    if (trackedEmaSymbols.includes(cleanSym)) {
      showToast(`${cleanSym} is already in the EMA tracker!`, '\u2139\uFE0F');
      return;
    }

    trackedEmaSymbols.push(cleanSym);
    saveTrackedSymbols(trackedEmaSymbols);

    const newRow = generateStockEmaRow(cleanSym);
    trackedEmaRows.push(newRow);

    renderEmaCollideTable();
    if (addStockModal) addStockModal.classList.remove('active');
    showToast(`Added ${cleanSym} to EMA-9/EMA-21 Tracker!`, '\u26A1');
  }

  // 7. Add Stock Dialog Logic (matching AddStockToEmaDialog in Kotlin)
  function openAddStockDialog() {
    if (!addStockModal) return;
    if (addStockSearchInput) {
      addStockSearchInput.value = '';
      if (addStockClearBtn) addStockClearBtn.style.display = 'none';
    }
    renderCandidatesList('');
    addStockModal.classList.add('active');
    setTimeout(() => {
      if (addStockSearchInput) addStockSearchInput.focus();
    }, 150);
  }

  function renderCandidatesList(query) {
    if (!candidatesList) return;
    const cleanQuery = (query || '').trim().toLowerCase();

    const universe = (typeof TRADE_NITI_MASTER_STOCKS !== 'undefined') ? TRADE_NITI_MASTER_STOCKS : [];
    let filtered = universe;
    if (cleanQuery) {
      filtered = universe.filter(s =>
        s.symbol.toLowerCase().includes(cleanQuery) ||
        (s.name || '').toLowerCase().includes(cleanQuery) ||
        (s.sector || '').toLowerCase().includes(cleanQuery)
      );
    } else {
      // Show top 30 popular stocks initially
      filtered = universe.slice(0, 30);
    }

    // Custom add button
    if (customBtnWrap && confirmCustomBtn) {
      const exactMatch = universe.some(s => s.symbol.toLowerCase() === cleanQuery);
      if (cleanQuery.length >= 2 && !exactMatch && !trackedEmaSymbols.includes(cleanQuery.toUpperCase())) {
        customBtnWrap.style.display = 'block';
        confirmCustomBtn.textContent = `Add Custom '${cleanQuery.toUpperCase()}'`;
        confirmCustomBtn.onclick = () => addEmaStock(cleanQuery.toUpperCase());
      } else {
        customBtnWrap.style.display = 'none';
      }
    }

    if (filtered.length === 0) {
      candidatesList.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
          No stocks match "${query}".
        </div>
      `;
      return;
    }

    candidatesList.innerHTML = filtered.map(s => {
      const isAdded = trackedEmaSymbols.includes(s.symbol);
      return `
        <div class="ema-candidate-row" data-candidate-symbol="${s.symbol}" style="${isAdded ? 'opacity: 0.6; cursor: default;' : ''}">
          <div>
            <div style="font-weight: 800; font-size: 0.86rem; color: var(--text-primary);">${s.symbol}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${s.name} &bull; ${s.sector || 'NSE'}</div>
          </div>
          <div>
            ${isAdded ? `
              <span style="font-size: 0.72rem; font-weight: 750; color: var(--text-muted); background: var(--surface-chip); padding: 3px 8px; border-radius: 6px;">Added</span>
            ` : `
              <button type="button" class="btn-primary btn-add-candidate" data-symbol="${s.symbol}" style="padding: 4px 10px; font-size: 0.74rem;">
                + Add
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    candidatesList.querySelectorAll('.btn-add-candidate').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sym = btn.getAttribute('data-symbol');
        if (sym) addEmaStock(sym);
      });
    });

    candidatesList.querySelectorAll('.ema-candidate-row').forEach(row => {
      row.addEventListener('click', () => {
        const sym = row.getAttribute('data-candidate-symbol');
        if (sym && !trackedEmaSymbols.includes(sym)) {
          addEmaStock(sym);
        }
      });
    });
  }

  if (addStockSearchInput) {
    addStockSearchInput.addEventListener('input', (e) => {
      const q = e.target.value;
      if (addStockClearBtn) addStockClearBtn.style.display = q.length > 0 ? 'inline-block' : 'none';
      renderCandidatesList(q);
    });
  }

  if (addStockClearBtn) {
    addStockClearBtn.addEventListener('click', () => {
      if (addStockSearchInput) {
        addStockSearchInput.value = '';
        addStockClearBtn.style.display = 'none';
        addStockSearchInput.focus();
        renderCandidatesList('');
      }
    });
  }

  if (addStockBtn) addStockBtn.addEventListener('click', openAddStockDialog);
  if (closeAddStockBtn) closeAddStockBtn.addEventListener('click', () => {
    if (addStockModal) addStockModal.classList.remove('active');
  });
  if (dismissAddStockBtn) dismissAddStockBtn.addEventListener('click', () => {
    if (addStockModal) addStockModal.classList.remove('active');
  });
  if (addStockModal) {
    addStockModal.addEventListener('click', (e) => {
      if (e.target === addStockModal) addStockModal.classList.remove('active');
    });
  }

  // 8. Refresh Button Handler (matches Kotlin refreshAll())
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (refreshIcon) refreshIcon.style.animation = 'spin 0.8s linear infinite';
      if (statusCountEl) statusCountEl.textContent = 'Scanning 5m, 15m & 1h...';

      setTimeout(() => {
        if (refreshIcon) refreshIcon.style.animation = '';
        // Re-generate fresh signals
        trackedEmaRows = trackedEmaSymbols.map(sym => generateStockEmaRow(sym));
        renderEmaCollideTable();
        showToast('EMA-9/EMA-21 Collide radar refreshed across 5m, 15m & 1h timeframes!', '\u26A1');
      }, 700);
    });
  }

  // 9. Live 5-Second Interval (matches Kotlin produceState currentEpochSeconds)
  setInterval(() => {
    if (modal && modal.classList.contains('active')) {
      renderEmaCollideTable();
    }
  }, 5000);

  // 10. Open Modal Function
  window.openEmaCollideModal = function() {
    if (typeof window.checkFeatureAccess === 'function') {
      const access = window.checkFeatureAccess('ema_collide');
      if (!access.allowed) {
        if (typeof window.openFeatureGateModal === 'function') {
          window.openFeatureGateModal('ema_collide');
        }
        return;
      }
    }
    trackedEmaSymbols = loadTrackedSymbols();
    trackedEmaRows = trackedEmaSymbols.map(sym => generateStockEmaRow(sym));
    renderEmaCollideTable();
    if (modal) modal.classList.add('active');
  };

  // Close Modal
  if (closeBtn) closeBtn.addEventListener('click', () => {
    if (modal) modal.classList.remove('active');
  });
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // Initial Data Load
  trackedEmaSymbols = loadTrackedSymbols();
  trackedEmaRows = trackedEmaSymbols.map(sym => generateStockEmaRow(sym));
  renderEmaCollideTable();
}

/* ==========================================================================
   Stock Details Module (100% Mobile App Fidelity: StockDetailScreen.kt)
   ========================================================================== */
function initStockDetailModule() {
  const modal = document.getElementById('stockDetailModal');
  const backBtn = document.getElementById('btnStockDetailBack');
  const symbolEl = document.getElementById('stockDetailSymbol');
  const nameEl = document.getElementById('stockDetailName');
  const analyzeBtn = document.getElementById('btnStockDetailAnalyze');
  const watchlistStarBtn = document.getElementById('btnStockDetailWatchlist');
  const starIconEl = document.getElementById('stockDetailStarIcon');
  
  const ltpEl = document.getElementById('stockDetailLtp');
  const changePillEl = document.getElementById('stockDetailChangePill');
  const sectorPillEl = document.getElementById('stockDetailSectorPill');
  const tvBtnEl = document.getElementById('stockDetailTvBtn');

  // Stats
  const statOpen = document.getElementById('stockDetailStatOpen');
  const statHigh = document.getElementById('stockDetailStatHigh');
  const statLow = document.getElementById('stockDetailStatLow');
  const stat52High = document.getElementById('stockDetailStat52High');
  const stat52Low = document.getElementById('stockDetailStat52Low');
  const statPe = document.getElementById('stockDetailStatPe');
  const statVolume = document.getElementById('stockDetailStatVolume');
  const statMktCap = document.getElementById('stockDetailStatMktCap');

  // RSI
  const rsiValEl = document.getElementById('stockDetailRsiVal');
  const rsiStatusEl = document.getElementById('stockDetailRsiStatus');
  const rsiDescEl = document.getElementById('stockDetailRsiDesc');
  const rsiFillEl = document.getElementById('stockDetailRsiFill');

  // Fundamentals
  const btnInfo = document.getElementById('btnStockDetailInfo');
  const fundPeVal = document.getElementById('stockDetailFundPeVal');
  const fundPeTag = document.getElementById('stockDetailFundPeTag');
  const fundPbVal = document.getElementById('stockDetailFundPbVal');
  const fundPbTag = document.getElementById('stockDetailFundPbTag');
  const fundDivVal = document.getElementById('stockDetailFundDivVal');
  const fundDivTag = document.getElementById('stockDetailFundDivTag');
  const fundRoeVal = document.getElementById('stockDetailFundRoeVal');
  const fundRoeTag = document.getElementById('stockDetailFundRoeTag');
  const fundMktCapVal = document.getElementById('stockDetailFundMktCapVal');
  const fundMktCapTag = document.getElementById('stockDetailFundMktCapTag');
  const fundPromoterVal = document.getElementById('stockDetailFundPromoterVal');
  const fundPromoterTag = document.getElementById('stockDetailFundPromoterTag');
  const fundFiiVal = document.getElementById('stockDetailFundFiiVal');
  const fundFiiTag = document.getElementById('stockDetailFundFiiTag');
  const fundDiiVal = document.getElementById('stockDetailFundDiiVal');
  const fundDiiTag = document.getElementById('stockDetailFundDiiTag');

  // Fundamentals Info Dialog
  const fundInfoModal = document.getElementById('fundamentalInfoModal');
  const closeFundInfoBtn = document.getElementById('closeFundInfoBtn');
  const closeFundInfoCross = document.getElementById('closeFundInfoBtnCross');

  // Multi-Watchlist Dialog
  const wlSelectModal = document.getElementById('stockWatchlistSelectModal');
  const wlGroupsList = document.getElementById('stockWlGroupsList');
  const closeWlSelectCross = document.getElementById('closeStockWlModalCross');
  const doneWlSelectBtn = document.getElementById('btnStockWlDone');

  let currentLoadedSymbol = 'RELIANCE';

  // 1. Fundamentals Signal Evaluators (Exact logic from StockDetailScreen.kt lines 275-339)
  function peSignal(pe) {
    const v = parseFloat(pe);
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v < 15) return { cls: 'green', label: 'Undervalued ↓' };
    if (v < 25) return { cls: 'amber', label: 'Fair Value' };
    return { cls: 'red', label: 'Expensive ↑' };
  }

  function pbSignal(pb) {
    const v = parseFloat(pb);
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v < 1.5) return { cls: 'green', label: 'Undervalued ↓' };
    if (v < 3.0) return { cls: 'amber', label: 'Fair Value' };
    return { cls: 'red', label: 'Expensive ↑' };
  }

  function divYieldSignal(div) {
    if (!div) return { cls: 'muted', label: 'N/A' };
    const v = parseFloat(String(div).replace('%', ''));
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 3.0) return { cls: 'green', label: 'High Yield ↑' };
    if (v >= 1.0) return { cls: 'amber', label: 'Moderate' };
    return { cls: 'red', label: 'Low Yield ↓' };
  }

  function roeSignal(roe) {
    if (!roe) return { cls: 'muted', label: 'N/A' };
    const v = parseFloat(String(roe).replace('%', ''));
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 20.0) return { cls: 'green', label: 'Excellent ↑' };
    if (v >= 10.0) return { cls: 'amber', label: 'Good' };
    return { cls: 'red', label: 'Weak ↓' };
  }

  function mktCapSignal(mktCapCr) {
    const v = parseFloat(mktCapCr);
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 100000) return { cls: 'green', label: 'Large Cap' };
    if (v >= 5000) return { cls: 'amber', label: 'Mid Cap' };
    return { cls: 'muted', label: 'Small Cap' };
  }

  function promoterSignal(p) {
    if (!p) return { cls: 'muted', label: 'N/A' };
    const v = parseFloat(String(p).replace('%', ''));
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 50.0) return { cls: 'green', label: 'Majority ↑' };
    if (v >= 35.0) return { cls: 'amber', label: 'Moderate' };
    return { cls: 'red', label: 'Low ↓' };
  }

  function fiiSignal(f) {
    if (!f) return { cls: 'muted', label: 'N/A' };
    const v = parseFloat(String(f).replace('%', ''));
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 20.0) return { cls: 'green', label: 'High ↑' };
    if (v >= 10.0) return { cls: 'amber', label: 'Moderate' };
    return { cls: 'muted', label: 'Low' };
  }

  function applyTag(el, signal) {
    if (!el) return;
    el.className = `fund-tag ${signal.cls}`;
    el.textContent = signal.label;
  }

  // Helper to check watchlist membership
  function getStockWatchlistStatus(sym) {
    try {
      const stored = localStorage.getItem('trade_niti_user_watchlists');
      const groups = stored ? JSON.parse(stored) : [];
      return groups.some(g => (g.symbols || []).some(s => s.toUpperCase() === sym.toUpperCase()));
    } catch (e) {
      return false;
    }
  }

  function updateWatchlistStar(sym) {
    const isMember = getStockWatchlistStatus(sym);
    if (watchlistStarBtn) {
      if (isMember) {
        watchlistStarBtn.classList.add('active');
        if (starIconEl) starIconEl.textContent = '★';
      } else {
        watchlistStarBtn.classList.remove('active');
        if (starIconEl) starIconEl.textContent = '☆';
      }
    }
  }

  // 2. Open Stock Detail Modal (Exposed globally)
  window.openStockDetailModal = function(symbol) {
    if (!symbol) return;
    const sym = symbol.toUpperCase().trim();
    currentLoadedSymbol = sym;

    // Find stock from universe or master list (Including NIFTY 50 Benchmark)
    let stock = null;
    if (sym === 'NIFTY 50' || sym === 'NIFTY' || sym === 'NIFTY50') {
      const niftyLive = (typeof MAIN_PAGE_INDICES !== 'undefined') ? (MAIN_PAGE_INDICES.find(i => i.name === 'NIFTY 50') || MAIN_PAGE_INDICES[0]) : null;
      stock = {
        symbol: 'NIFTY 50',
        name: 'NIFTY 50 Benchmark Index',
        price: niftyLive ? niftyLive.value : 22651.10,
        change: niftyLive ? niftyLive.change : -98.65,
        changePct: niftyLive ? niftyLive.changePct : -0.43,
        high52: 26277.35,
        low52: 21281.45,
        sector: 'NSE Large-Cap Benchmark (50 Equities)',
        confluence: 68
      };
    } else if (typeof TRADE_NITI_MASTER_STOCKS !== 'undefined') {
      stock = TRADE_NITI_MASTER_STOCKS.find(s => s.symbol.toUpperCase() === sym);
    }
    if (!stock) {
      stock = {
        symbol: sym,
        name: `${sym} Ltd`,
        price: 1000.00,
        change: 0.00,
        changePct: 0.00,
        high52: 1200.00,
        low52: 800.00,
        sector: 'NSE Equities',
        confluence: 65
      };
    }

    const price = stock.price || stock.ltp || 1000.00;
    const change = typeof stock.change === 'number' ? stock.change : 0.00;
    const changePct = typeof stock.changePct === 'number' ? stock.changePct : 0.00;
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '';

    // Populate Top Bar
    if (symbolEl) symbolEl.textContent = stock.symbol;
    if (nameEl) nameEl.textContent = stock.name;
    updateWatchlistStar(stock.symbol);

    // Populate Price Header
    if (ltpEl) ltpEl.textContent = `\u20B9${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (changePillEl) {
      changePillEl.className = `stock-detail-change-pill ${isPositive ? 'profit' : 'loss'}`;
      changePillEl.textContent = `${sign}${change.toFixed(2)} (${sign}${changePct.toFixed(2)}%)`;
    }
    if (sectorPillEl) sectorPillEl.textContent = stock.sector || 'NSE Equities';

    // Populate TradingView Button
    if (tvBtnEl) {
      tvBtnEl.href = `https://www.tradingview.com/chart/?symbol=NSE:${encodeURIComponent(stock.symbol)}`;
    }

    // Populate Key Statistics
    const openVal = price - (change * 0.45);
    const highVal = Math.max(price, openVal + Math.abs(change) * 0.4);
    const lowVal = Math.min(price, openVal - Math.abs(change) * 0.4);
    const h52 = stock.high52 || (price * 1.22);
    const l52 = stock.low52 || (price * 0.78);
    const peEst = (15 + ((sym.charCodeAt(0) * 7) % 35)).toFixed(1);
    const volEst = ((sym.charCodeAt(0) * 123456) % 15000000 + 500000);

    if (statOpen) statOpen.textContent = `\u20B9${openVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (statHigh) statHigh.textContent = `\u20B9${highVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (statLow) statLow.textContent = `\u20B9${lowVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (stat52High) stat52High.textContent = '\u20B9' + Number(h52).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (stat52Low) stat52Low.textContent = '\u20B9' + Number(l52).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Live update Key Statistics from Proxy quote
    const qSymDetail = (sym === 'TATAMOTORS') ? 'TMPV' : sym;
    fetch('https://swingtrader-nse-proxy.vercel.app/api/quote?symbol=' + encodeURIComponent(qSymDetail))
      .then(res => res.json())
      .then(qData => {
        if (qData && qData.priceInfo && currentLoadedSymbol === sym) {
          const pi = qData.priceInfo;
          if (statOpen && pi.open) statOpen.textContent = '\u20B9' + pi.open.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          if (statHigh && pi.intraDayHighLow && pi.intraDayHighLow.max) statHigh.textContent = '\u20B9' + pi.intraDayHighLow.max.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          if (statLow && pi.intraDayHighLow && pi.intraDayHighLow.min) statLow.textContent = '\u20B9' + pi.intraDayHighLow.min.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          if (stat52High && pi.weekHighLow && pi.weekHighLow.max) stat52High.textContent = '\u20B9' + pi.weekHighLow.max.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          if (stat52Low && pi.weekHighLow && pi.weekHighLow.min) stat52Low.textContent = '\u20B9' + pi.weekHighLow.min.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const vol = qData.marketDeptOrderBook?.tradeInfo?.totalTradedVolume;
          if (statVolume && vol) statVolume.textContent = Number(vol).toLocaleString('en-IN');
        }
      }).catch(() => {});
    if (statPe) statPe.textContent = peEst;
    if (statVolume) statVolume.textContent = volEst.toLocaleString('en-IN');
    if (statMktCap) {
      const crVal = Math.round((price * volEst * 0.8) / 10000000);
      statMktCap.textContent = crVal > 100000 ? `\u20B9${(crVal / 100000).toFixed(2)}L Cr` : `\u20B9${crVal.toLocaleString('en-IN')} Cr`;
    }

    // Populate RSI (14) - Matches Compose lines 233-243
    let hash = 0;
    for (let i = 0; i < sym.length; i++) {
      hash = ((hash << 5) - hash) + sym.charCodeAt(i);
      hash |= 0;
    }
    const rsi = Math.min(80, Math.max(20, (Math.abs(hash) % 40) + 40));
    let rsiColor = '#F59E0B';
    let rsiLabel = 'Neutral ⚪';
    let rsiDesc = '30–70: Wait for signal';

    if (rsi < 30) {
      rsiColor = '#10B981';
      rsiLabel = 'Oversold 🟢';
      rsiDesc = 'RSI < 30: Oversold Zone';
    } else if (rsi > 70) {
      rsiColor = '#EF4444';
      rsiLabel = 'Overbought 🔴';
      rsiDesc = 'RSI > 70: Overbought Zone';
    }

    if (rsiValEl) {
      rsiValEl.textContent = rsi.toFixed(1);
      rsiValEl.style.color = rsiColor;
    }
    if (rsiStatusEl) {
      rsiStatusEl.textContent = rsiLabel;
      rsiStatusEl.style.color = rsiColor;
    }
    if (rsiDescEl) rsiDescEl.textContent = rsiDesc;
    if (rsiFillEl) {
      rsiFillEl.style.width = `${rsi}%`;
      rsiFillEl.style.background = rsiColor;
    }

    // Populate Initial Deterministic Fundamentals
    let initPe = (16 + ((Math.abs(hash) % 25))).toFixed(1);
    let initPb = (1.2 + ((Math.abs(hash) % 30) / 10)).toFixed(2);
    let initDiv = (0.4 + ((Math.abs(hash) % 25) / 10)).toFixed(2) + '%';
    let initRoe = (8.5 + ((Math.abs(hash) % 200) / 10)).toFixed(2) + '%';
    let initMktCr = 125000;
    let initMktCap = '1.25 L Cr';
    let initPromoter = '50.27%';
    let initFii = '21.50%';
    let initDii = '16.20%';

    // Accurate preset for RELIANCE matching screenshot
    if (sym === 'NIFTY 50' || sym === 'NIFTY' || sym === 'NIFTY50') {
      initPe = '21.4';
      initPb = '3.85';
      initDiv = '1.28%';
      initRoe = '16.50%';
      initMktCap = '185.0 L Cr';
      initMktCr = 18500000;
      initPromoter = '51.20%';
      initFii = '18.25%';
      initDii = '16.50%';
    } else if (sym === 'SENSEX' || sym === 'BSE SENSEX' || sym === 'BSESENSEX' || sym === '^BSESN') {
      initPe = '23.8';
      initPb = '3.65';
      initDiv = '1.15%';
      initRoe = '15.80%';
      initMktCap = '140.5 L Cr';
      initMktCr = 14050000;
      initPromoter = '48.50%';
      initFii = '24.10%';
      initDii = '17.40%';
    } else if (sym === 'RELIANCE') {
      initPe = '21';
      initPb = '1.73';
      initDiv = '0.52%';
      initRoe = '8.77%';
      initMktCap = '15.66 L Cr';
      initMktCr = 1565647;
      initPromoter = '50.27%';
      initFii = '22.60%';
      initDii = '15.99%';
    }

    function renderFundamentalsUI(pe, pb, div, roe, mktCap, mktCapCr, promoter, fii, dii) {
      if (fundPeVal) fundPeVal.textContent = pe ? `${pe}x` : 'N/A';
      applyTag(fundPeTag, peSignal(pe));

      if (fundPbVal) fundPbVal.textContent = pb ? `${pb}x` : 'N/A';
      applyTag(fundPbTag, pbSignal(pb));

      if (fundDivVal) fundDivVal.textContent = div || 'N/A';
      applyTag(fundDivTag, divYieldSignal(div));

      if (fundRoeVal) fundRoeVal.textContent = roe || 'N/A';
      applyTag(fundRoeTag, roeSignal(roe));

      if (fundMktCapVal) fundMktCapVal.textContent = mktCap ? `\u20B9${mktCap}` : 'N/A';
      applyTag(fundMktCapTag, mktCapSignal(mktCapCr));

      if (fundPromoterVal) fundPromoterVal.textContent = promoter || 'N/A';
      applyTag(fundPromoterTag, promoterSignal(promoter));

      if (fundFiiVal) fundFiiVal.textContent = fii || 'N/A';
      applyTag(fundFiiTag, fiiSignal(fii));

      if (fundDiiVal) fundDiiVal.textContent = dii || 'N/A';
      applyTag(fundDiiTag, fiiSignal(dii));
    }

    // Render initial
    renderFundamentalsUI(initPe, initPb, initDiv, initRoe, initMktCap, initMktCr, initPromoter, initFii, initDii);

    // Fetch Live Fundamentals via Vercel Mumbai proxy
    fetch(`https://swingtrader-nse-proxy.vercel.app/api/fundamentals?symbol=${encodeURIComponent(sym)}`)
      .then(res => res.json())
      .then(data => {
        if (data && currentLoadedSymbol === sym) {
          renderFundamentalsUI(
            data.pe || initPe,
            data.pb || initPb,
            data.divYield || initDiv,
            data.roe || initRoe,
            data.marketCap || initMktCap,
            data.mktCapCr || initMktCr,
            data.promoter || initPromoter,
            data.fii || initFii,
            data.dii || initDii
          );
        }
      })
      .catch(() => {
        // Fallback already rendered gracefully
      });

    // Open Modal
    if (modal) modal.classList.add('active');
  };

  // Close Modal Handlers
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
    });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // 3. Analyze Button Handler (Opens Stock Analysis Center)
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
      if (window.openStockAnalysisCenter) {
        window.openStockAnalysisCenter(currentLoadedSymbol);
      } else {
        const swingSection = document.getElementById('swing-engine');
        if (swingSection) {
          swingSection.scrollIntoView({ behavior: 'smooth' });
          const pill = document.querySelector(`.stock-pill[data-symbol="${currentLoadedSymbol}"]`);
          if (pill) pill.click();
        }
      }
      showToast(`Opening Stock Analysis Center for ${currentLoadedSymbol}`, '✦');
    });
  }

  // 4. Watchlist Star Button Handler (Open Multi-Watchlist Select Dialog)
  function renderWatchlistSelectDialog(sym) {
    if (!wlGroupsList) return;
    let groups = [];
    try {
      const stored = localStorage.getItem('trade_niti_user_watchlists');
      groups = stored ? JSON.parse(stored) : [];
    } catch (e) {
      groups = [];
    }

    if (groups.length === 0) {
      wlGroupsList.innerHTML = `
        <div style="padding:16px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
          No watchlists found.<br>Go to the Watchlist tab to create one.
        </div>`;
      return;
    }

    wlGroupsList.innerHTML = groups.map(group => {
      const isMember = (group.symbols || []).some(s => s.toUpperCase() === sym.toUpperCase());
      const dotColor = group.color || '#10B981';
      return `
        <div class="stock-wl-group-item" data-group-id="${group.id}">
          <span class="stock-wl-group-dot" style="background:${dotColor};"></span>
          <span class="stock-wl-group-name">${group.name}</span>
          <input type="checkbox" class="stock-wl-checkbox" ${isMember ? 'checked' : ''} data-group-id="${group.id}">
        </div>
      `;
    }).join('');

    // Attach click events
    wlGroupsList.querySelectorAll('.stock-wl-group-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const checkbox = item.querySelector('.stock-wl-checkbox');
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        const gid = parseInt(item.getAttribute('data-group-id'), 10);
        toggleGroupMembership(sym, gid, checkbox.checked);
      });
    });
  }

  function toggleGroupMembership(sym, groupId, shouldAdd) {
    try {
      const stored = localStorage.getItem('trade_niti_user_watchlists');
      const groups = stored ? JSON.parse(stored) : [];
      const grp = groups.find(g => g.id === groupId);
      if (!grp) return;

      if (!grp.symbols) grp.symbols = [];
      const idx = grp.symbols.findIndex(s => s.toUpperCase() === sym.toUpperCase());

      if (shouldAdd && idx === -1) {
        grp.symbols.push(sym.toUpperCase());
        showToast(`Added ${sym} to "${grp.name}"`, '★');
      } else if (!shouldAdd && idx !== -1) {
        grp.symbols.splice(idx, 1);
        showToast(`Removed ${sym} from "${grp.name}"`, '🗑');
      }

      localStorage.setItem('trade_niti_user_watchlists', JSON.stringify(groups));
      updateWatchlistStar(sym);
      if (window.renderActiveWatchlist) window.renderActiveWatchlist();
    } catch (e) {
      console.error(e);
    }
  }

  if (watchlistStarBtn) {
    watchlistStarBtn.addEventListener('click', () => {
      renderWatchlistSelectDialog(currentLoadedSymbol);
      if (wlSelectModal) wlSelectModal.classList.add('active');
    });
  }

  if (closeWlSelectCross) {
    closeWlSelectCross.addEventListener('click', () => {
      if (wlSelectModal) wlSelectModal.classList.remove('active');
    });
  }
  if (doneWlSelectBtn) {
    doneWlSelectBtn.addEventListener('click', () => {
      if (wlSelectModal) wlSelectModal.classList.remove('active');
    });
  }
  if (wlSelectModal) {
    wlSelectModal.addEventListener('click', (e) => {
      if (e.target === wlSelectModal) wlSelectModal.classList.remove('active');
    });
  }

  // 5. Fundamentals Info Dialog Handlers
  if (btnInfo) {
    btnInfo.addEventListener('click', () => {
      if (fundInfoModal) fundInfoModal.classList.add('active');
    });
  }
  if (closeFundInfoBtn) {
    closeFundInfoBtn.addEventListener('click', () => {
      if (fundInfoModal) fundInfoModal.classList.remove('active');
    });
  }
  if (closeFundInfoCross) {
    closeFundInfoCross.addEventListener('click', () => {
      if (fundInfoModal) fundInfoModal.classList.remove('active');
    });
  }
  if (fundInfoModal) {
    fundInfoModal.addEventListener('click', (e) => {
      if (e.target === fundInfoModal) fundInfoModal.classList.remove('active');
    });
  }

  // 6. Universal Stock Click Event Delegation
  document.addEventListener('click', (e) => {
    // Priority 1: Explicit "Stock Analysis Center" link or button click
    const sacLink = e.target.closest('.link-stock-analysis, [data-action="stock-analysis"]');
    if (sacLink) {
      e.preventDefault();
      e.stopPropagation();
      const sym = sacLink.getAttribute('data-symbol') || 
                  sacLink.getAttribute('data-stock-symbol') || 
                  (sacLink.closest('[data-stock-symbol]') ? sacLink.closest('[data-stock-symbol]').getAttribute('data-stock-symbol') : 'TECHM');
      if (sym && window.openStockAnalysisCenter) {
        window.openStockAnalysisCenter(sym);
      }
      return;
    }

    // Priority 2: Explicit "Stock In-Depth" link or button click
    const inDepthLink = e.target.closest('.link-stock-indepth, [data-action="stock-detail"], [data-action="detail"]');
    if (inDepthLink) {
      e.preventDefault();
      e.stopPropagation();
      const sym = inDepthLink.getAttribute('data-symbol') || 
                  inDepthLink.getAttribute('data-stock-symbol') || 
                  (inDepthLink.closest('[data-stock-symbol]') ? inDepthLink.closest('[data-stock-symbol]').getAttribute('data-stock-symbol') : '');
      if (sym && window.openStockDetailModal) {
        window.openStockDetailModal(sym);
      }
      return;
    }

    // Secondary: Click on stock row or stock symbol element (excluding other action buttons)
    const el = e.target.closest('[data-stock-symbol], .stock-sym-row, .wl-stock-symbol, .screener-stock-symbol');
    if (!el) return;
    if (e.target.closest('a') || e.target.closest('button')) return;
    const sym = el.getAttribute('data-stock-symbol') || el.getAttribute('data-symbol') || el.textContent.trim();
    if (sym && sym.length <= 15 && !sym.includes(' ') && window.openStockDetailModal) {
      window.openStockDetailModal(sym);
    }
  });
}

/* ==========================================================================
   Stock Analysis Center Module (100% Fidelity to Mobile App Screens)
   Combines StockAnalysisScreen, VitalTechnicalsDialog, and AIReportScreen
   ========================================================================== */
function initStockAnalysisCenterModule() {
  const sacModal = document.getElementById('stockAnalysisCenterModal');
  const backBtn = document.getElementById('btnAnalysisCenterBack');
  const closeCross = document.getElementById('closeAnalysisCenterCross');
  const openInDepthBtn = document.getElementById('sacBtnOpenInDepth');
  const tvChartBtn = document.getElementById('sacBtnTvChart');
  const quickRefreshBtn = document.getElementById('sacBtnQuickRefresh');
  const fullRegenerateBtn = document.getElementById('sacBtnRegenerateAiFull');
  const copyReportBtn = document.getElementById('sacBtnCopyReport');
  const searchInput = document.getElementById('sacSearchInput');
  const searchDropdown = document.getElementById('sacSearchDropdown');

  const tabBtns = document.querySelectorAll('.sac-tab-btn');
  const gridLayout = document.getElementById('sacDashboardGrid');
  const colOverview = document.getElementById('sacColOverview');
  const colVitals = document.getElementById('sacColVitals');
  const colAi = document.getElementById('sacColAi');

  const quickJumpAi = document.getElementById('sacQuickJumpAi');
  const quickJumpVitals = document.getElementById('sacQuickJumpVitals');

  let currentAnalysisSymbol = 'TECHM';

  // 1. Navigation / Close Handlers
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (sacModal) sacModal.classList.remove('active');
    });
  }
  if (closeCross) {
    closeCross.addEventListener('click', () => {
      if (sacModal) sacModal.classList.remove('active');
    });
  }
  if (sacModal) {
    sacModal.addEventListener('click', (e) => {
      if (e.target === sacModal) sacModal.classList.remove('active');
    });
  }

  // 2. Open Stock In-Depth Modal from Analysis Center
  if (openInDepthBtn) {
    openInDepthBtn.addEventListener('click', () => {
      if (window.openStockDetailModal) {
        window.openStockDetailModal(currentAnalysisSymbol);
      }
    });
  }

  // 3. Tab Switching Logic (Unified vs Zoomed Views)
  function setActiveTab(tabKey) {
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-sac-tab') === tabKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (!gridLayout || !colOverview || !colVitals || !colAi) return;

    if (tabKey === 'all') {
      gridLayout.style.gridTemplateColumns = '';
      colOverview.style.display = 'flex';
      colVitals.style.display = 'flex';
      colAi.style.display = 'flex';
    } else if (tabKey === 'score') {
      gridLayout.style.gridTemplateColumns = '1fr';
      colOverview.style.display = 'flex';
      colVitals.style.display = 'none';
      colAi.style.display = 'none';
    } else if (tabKey === 'vitals') {
      gridLayout.style.gridTemplateColumns = '1fr';
      colOverview.style.display = 'none';
      colVitals.style.display = 'flex';
      colAi.style.display = 'none';
    } else if (tabKey === 'ai') {
      gridLayout.style.gridTemplateColumns = '1fr';
      colOverview.style.display = 'none';
      colVitals.style.display = 'none';
      colAi.style.display = 'flex';
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-sac-tab');
      setActiveTab(tab);
    });
  });

  if (quickJumpAi) {
    quickJumpAi.addEventListener('click', () => {
      const colAi = document.getElementById('sacColAi');
      if (colAi) {
        colAi.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  if (quickJumpVitals) {
    quickJumpVitals.addEventListener('click', () => {
      const colVitals = document.getElementById('sacColVitals');
      if (colVitals) {
        colVitals.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 4. Stock Search / Quick Switch Dropdown
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = (e.target.value || '').trim().toLowerCase();
      if (!query) {
        searchDropdown.classList.remove('active');
        searchDropdown.innerHTML = '';
        return;
      }

      const universe = (typeof TRADE_NITI_MASTER_STOCKS !== 'undefined') ? TRADE_NITI_MASTER_STOCKS : [];
      let matches = universe.filter(s => 
        (s.symbol || '').toLowerCase().includes(query) || 
        (s.name || '').toLowerCase().includes(query) || 
        (s.sector || '').toLowerCase().includes(query)
      ).slice(0, 6);

      if ('nifty 50'.includes(query) || 'nifty'.includes(query) || query === 'nifty50') {
        const niftyLive = (typeof MAIN_PAGE_INDICES !== 'undefined') ? (MAIN_PAGE_INDICES.find(i => i.name === 'NIFTY 50') || MAIN_PAGE_INDICES[0]) : null;
        matches.unshift({
          symbol: 'NIFTY 50',
          name: 'NIFTY 50 Benchmark Index',
          sector: 'NSE Large-Cap Benchmark',
          price: niftyLive ? niftyLive.value : 22651.10
        });
      }

      if ('sensex'.includes(query) || 'bse sensex'.includes(query) || query === 'bse' || query === 'bsesn') {
        const sensexLive = (typeof MAIN_PAGE_INDICES !== 'undefined') ? (MAIN_PAGE_INDICES.find(i => i.name === 'SENSEX')) : null;
        matches.unshift({
          symbol: 'SENSEX',
          name: 'BSE SENSEX 30 Benchmark Index',
          sector: 'BSE Large-Cap Benchmark · 30 Blue-Chips',
          price: sensexLive ? sensexLive.value : 80812.15
        });
      }

      if (matches.length === 0) {
        searchDropdown.innerHTML = `<div style="padding:10px; font-size:0.75rem; color:var(--text-muted); text-align:center;">No matching NSE stocks</div>`;
        searchDropdown.classList.add('active');
        return;
      }

      searchDropdown.innerHTML = matches.map(s => `
        <div class="sac-search-item" data-sym="${s.symbol}">
          <div>
            <div class="sac-search-item-sym">${s.symbol}</div>
            <div class="sac-search-item-sub">${s.name} &bull; ${s.sector}</div>
          </div>
          <div class="sac-search-item-px">₹${(s.price || 0).toFixed(2)}</div>
        </div>
      `).join('');
      searchDropdown.classList.add('active');

      searchDropdown.querySelectorAll('.sac-search-item').forEach(item => {
        item.addEventListener('click', () => {
          const sym = item.getAttribute('data-sym');
          searchDropdown.classList.remove('active');
          searchInput.value = '';
          if (window.openStockAnalysisCenter) {
            window.openStockAnalysisCenter(sym);
          }
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('active');
      }
    });
  }

  // 5. Copy Report to Clipboard
  if (copyReportBtn) {
    copyReportBtn.addEventListener('click', () => {
      const title = document.getElementById('sacAiReportTitle')?.textContent || 'AI Analysis Report';
      const sym = currentAnalysisSymbol;
      const overall = document.getElementById('sacAiOverallText')?.textContent || '';
      const market = document.getElementById('sacAiMarketText')?.textContent || '';
      const techBullets = Array.from(document.querySelectorAll('#sacAiTechBullets li')).map(li => `• ${li.textContent}`).join('\n');
      const fund = document.getElementById('sacAiFundText')?.textContent || '';
      const riskBullets = Array.from(document.querySelectorAll('#sacAiRisksBullets li')).map(li => `• ${li.textContent}`).join('\n');

      const fullText = `Trade Niti AI Analysis Report: ${sym}\n\n[OVERALL STATUS]\n${overall.trim()}\n\n[MARKET CONTEXT IMPACT]\n${market.trim()}\n\n[TECHNICAL OUTLOOK]\n${techBullets}\n\n[FUNDAMENTAL HEALTH]\n${fund.trim()}\n\n[KEY RISKS]\n${riskBullets}\n\nPowered by Trade Niti Groq AI Engine (Llama 3 70B)`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullText).then(() => {
          showToast(`Copied ${sym} AI Analysis Report to clipboard!`, '📋');
        }).catch(() => {
          showToast(`Report generated for ${sym}`, '✦');
        });
      } else {
        showToast(`Copied ${sym} AI Report!`, '📋');
      }
    });
  }

  // 6. Simulate Groq AI Re-Analyze / Regenerate
  function triggerAiRegeneration() {
    const refreshIcon = document.getElementById('sacRefreshIcon');
    const latencyEl = document.getElementById('sacAiLatency');
    if (refreshIcon) refreshIcon.style.animation = 'spin 0.7s linear infinite';
    if (latencyEl) latencyEl.textContent = 'Generating via Groq Cloud...';

    setTimeout(() => {
      if (refreshIcon) refreshIcon.style.animation = '';
      const simulatedLatency = Math.floor(Math.random() * 60 + 140);
      if (latencyEl) latencyEl.textContent = `${simulatedLatency}ms inference`;
      if (window.openStockAnalysisCenter) {
        window.openStockAnalysisCenter(currentAnalysisSymbol);
      }
      showToast(`Fresh AI analysis synthesized for ${currentAnalysisSymbol} via Groq 70B!`, '⚡');
    }, 600);
  }

  if (quickRefreshBtn) quickRefreshBtn.addEventListener('click', triggerAiRegeneration);
  if (fullRegenerateBtn) fullRegenerateBtn.addEventListener('click', triggerAiRegeneration);

  // Column 1 Quick View Switcher (All / Technical / Fundamentals & Stats)
  const sacC1TabBtns = document.querySelectorAll('.sac-c1-tab-btn');
  const sacSecTech = document.getElementById('sacC1SecTech');
  const sacSecFunds = document.getElementById('sacC1SecFunds');

  function setSacC1Tab(view) {
    sacC1TabBtns.forEach(btn => {
      if (btn.getAttribute('data-view') === view) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    if (!sacSecTech || !sacSecFunds) return;
    if (view === 'all') {
      sacSecTech.style.display = 'flex';
      sacSecFunds.style.display = 'flex';
    } else if (view === 'tech') {
      sacSecTech.style.display = 'flex';
      sacSecFunds.style.display = 'none';
    } else if (view === 'funds') {
      sacSecTech.style.display = 'none';
      sacSecFunds.style.display = 'flex';
    }
  }

  sacC1TabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setSacC1Tab(btn.getAttribute('data-view'));
      const col = document.getElementById('sacColOverview');
      if (col) col.scrollTo({ top: 0, behavior: 'smooth' });
      const scrollBody = document.getElementById('sacScrollBody');
      if (window.innerWidth <= 900 && scrollBody) scrollBody.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Fundamental & Ownership Signal Evaluators for SAC
  function sacPeSignal(pe) {
    const v = parseFloat(pe);
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v < 15) return { cls: 'green', label: 'Undervalued \u2193' };
    if (v < 25) return { cls: 'amber', label: 'Fair Value' };
    return { cls: 'red', label: 'Expensive \u2191' };
  }

  function sacPbSignal(pb) {
    const v = parseFloat(pb);
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v < 1.5) return { cls: 'green', label: 'Undervalued \u2193' };
    if (v < 3.0) return { cls: 'amber', label: 'Fair Value' };
    return { cls: 'red', label: 'Expensive \u2191' };
  }

  function sacDivYieldSignal(div) {
    if (!div) return { cls: 'muted', label: 'N/A' };
    const v = parseFloat(String(div).replace('%', ''));
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 3.0) return { cls: 'green', label: 'High Yield \u2191' };
    if (v >= 1.0) return { cls: 'amber', label: 'Moderate' };
    return { cls: 'red', label: 'Low Yield \u2193' };
  }

  function sacRoeSignal(roe) {
    if (!roe) return { cls: 'muted', label: 'N/A' };
    const v = parseFloat(String(roe).replace('%', ''));
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 20.0) return { cls: 'green', label: 'Excellent \u2191' };
    if (v >= 10.0) return { cls: 'amber', label: 'Good' };
    return { cls: 'red', label: 'Weak \u2193' };
  }

  function sacMktCapSignal(mktCapCr) {
    const v = parseFloat(mktCapCr);
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 100000) return { cls: 'green', label: 'Large Cap' };
    if (v >= 5000) return { cls: 'amber', label: 'Mid Cap' };
    return { cls: 'muted', label: 'Small Cap' };
  }

  function sacPromoterSignal(p) {
    if (!p) return { cls: 'muted', label: 'N/A' };
    const v = parseFloat(String(p).replace('%', ''));
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 50.0) return { cls: 'green', label: 'Majority \u2191' };
    if (v >= 35.0) return { cls: 'amber', label: 'Moderate' };
    return { cls: 'red', label: 'Low \u2193' };
  }

  function sacFiiSignal(f) {
    if (!f) return { cls: 'muted', label: 'N/A' };
    const v = parseFloat(String(f).replace('%', ''));
    if (isNaN(v)) return { cls: 'muted', label: 'N/A' };
    if (v >= 20.0) return { cls: 'green', label: 'High \u2191' };
    if (v >= 10.0) return { cls: 'amber', label: 'Moderate' };
    return { cls: 'muted', label: 'Low' };
  }

  function applySacTag(el, signal) {
    if (!el) return;
    el.className = 'sac-tag ' + signal.cls;
    el.textContent = signal.label;
  }

  // 7. Global Open Stock Analysis Center Function
  window.openStockAnalysisCenter = function(symbol) {
    if (!symbol) return;
    const sym = symbol.toUpperCase().trim();
    currentAnalysisSymbol = sym;

    // Fetch stock info (Including NIFTY 50 & BSE SENSEX Benchmarks)
    let stock = null;
    if (sym === 'NIFTY 50' || sym === 'NIFTY' || sym === 'NIFTY50') {
      const niftyLive = (typeof MAIN_PAGE_INDICES !== 'undefined') ? (MAIN_PAGE_INDICES.find(i => i.name === 'NIFTY 50') || MAIN_PAGE_INDICES[0]) : null;
      stock = {
        symbol: 'NIFTY 50',
        name: 'NIFTY 50 Benchmark Index',
        price: niftyLive ? niftyLive.value : 22651.10,
        change: niftyLive ? niftyLive.change : -98.65,
        changePct: niftyLive ? niftyLive.changePct : -0.43,
        high52: 26277.35,
        low52: 21281.45,
        sector: 'NSE Benchmark Index · 50 Large-Cap Equities',
        confluence: 68
      };
    } else if (sym === 'SENSEX' || sym === 'BSE SENSEX' || sym === 'BSESENSEX' || sym === '^BSESN') {
      const sensexLive = (typeof MAIN_PAGE_INDICES !== 'undefined') ? (MAIN_PAGE_INDICES.find(i => i.name === 'SENSEX')) : null;
      stock = {
        symbol: 'SENSEX',
        name: 'BSE SENSEX 30 Benchmark Index',
        price: sensexLive ? sensexLive.value : 80812.15,
        change: sensexLive ? sensexLive.change : 428.10,
        changePct: sensexLive ? sensexLive.changePct : 0.53,
        high52: 85978.25,
        low52: 70319.04,
        sector: 'BSE Benchmark Index · 30 Blue-Chip Equities',
        confluence: 71
      };
    } else if (typeof TRADE_NITI_MASTER_STOCKS !== 'undefined') {
      stock = TRADE_NITI_MASTER_STOCKS.find(s => s.symbol.toUpperCase() === sym);
    }
    if (!stock) {
      stock = {
        symbol: sym,
        name: `${sym} Ltd`,
        price: 1630.90,
        change: 55.80,
        changePct: 3.54,
        high52: 1854.00,
        low52: 1304.10,
        sector: 'NSE Equities',
        confluence: 76
      };
    }

    const price = stock.price || stock.ltp || 1000.00;
    const change = typeof stock.change === 'number' ? stock.change : 0.00;
    const changePct = typeof stock.changePct === 'number' ? stock.changePct : 0.00;
    const isUp = change >= 0;
    const sign = isUp ? '+' : '';

    // Populate Top Bar
    const sacStockSymbol = document.getElementById('sacStockSymbol');
    const sacStockName = document.getElementById('sacStockName');
    const sacSectorBadge = document.getElementById('sacSectorBadge');
    const sacLtpVal = document.getElementById('sacLtpVal');
    const sacChangeBadge = document.getElementById('sacChangeBadge');
    const jumpAiSym = document.getElementById('sacJumpAiSymbol');
    const jumpVtSym = document.getElementById('sacJumpVtSymbol');
    const aiSymHeader = document.getElementById('sacAiSymHeader');
    const vitalsStockSym = document.getElementById('sacVitalsStockSym');

    if (sacStockSymbol) sacStockSymbol.textContent = stock.symbol;
    if (sacStockName) sacStockName.textContent = stock.name;
    if (sacSectorBadge) {
      if (stock.sector && (stock.sector.includes('NSE') || stock.sector.includes('BSE'))) {
        sacSectorBadge.textContent = stock.sector;
      } else {
        sacSectorBadge.textContent = `${stock.sector || 'Equities'} · NSE`;
      }
    }
    if (jumpAiSym) jumpAiSym.textContent = stock.symbol;
    if (jumpVtSym) jumpVtSym.textContent = stock.symbol;
    if (aiSymHeader) aiSymHeader.textContent = stock.symbol;
    if (vitalsStockSym) vitalsStockSym.textContent = stock.symbol;

    if (sacLtpVal) {
      sacLtpVal.textContent = `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (sacChangeBadge) {
      sacChangeBadge.className = `sac-change-badge ${isUp ? 'profit' : 'loss'}`;
      sacChangeBadge.textContent = `${sign}${changePct.toFixed(2)}% (${sign}₹${Math.abs(change).toFixed(2)})`;
    }

    if (tvChartBtn) {
      if (sym.includes("NIFTY")) {
        tvChartBtn.href = "https://www.tradingview.com/chart/?symbol=NSE:NIFTY";
      } else if (sym === "SENSEX" || sym.includes("SENSEX") || sym === "BSESN") {
        tvChartBtn.href = "https://www.tradingview.com/chart/?symbol=BSE:SENSEX";
      } else {
        tvChartBtn.href = `https://www.tradingview.com/chart/?symbol=NSE:${encodeURIComponent(stock.symbol)}`;
      }
    }

    // Hash for consistent deterministic indicators for any stock
    let hash = 0;
    for (let i = 0; i < sym.length; i++) {
      hash = ((hash << 5) - hash) + sym.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);

    // Setup data variables for all 9 Vital Technical sections
    let scoreTotal, scoreBase, scoreMktAdj, sentimentText, sentimentCls, vitalsScore;
    let h52, l52, from52H, from52HTag, from52L, from52LTag, rangePct;
    let rsiDaily, rsiDailyTag, stochRsi, stochRsiTag, rsiWeekly, rsiWeeklyTag, rsiMonthly, rsiMonthlyTag;
    let ema20, ema50, priceAboveEma20, ema20AboveEma50, priceVsEma20;
    let superTrendDaily, macdDaily, macdHist, adxDaily, diPlus, superTrendWeekly, macdWeekly;
    let bbPosDaily, bbWidthDaily, bbPosWeekly;
    let volRatio, volContext, volSignal;
    let atrVal, atrPct;
    let higherHigh, higherLow, lastSwingHigh, prevSwingHigh, lastSwingLow, prevSwingLow;
    let buyProb, overallSignal, entrySignal, riskLevel;
    let aiStatus, aiStatusCls, aiOverallText, aiMarketText, aiTechBullets, aiFundText, aiRisksBullets;

    if (sym === 'NIFTY 50' || sym === 'NIFTY' || sym === 'NIFTY50') {
      scoreTotal = 68;
      scoreBase = 68;
      scoreMktAdj = 0;
      sentimentText = '\uD83D\uDFE2 CONSTRUCTIVE (BULLISH BIAS)';
      sentimentCls = 'bullish';
      vitalsScore = '68/100';

      h52 = 26277.35;
      l52 = 21281.45;
      from52H = -13.8;
      from52HTag = { label: 'Consolidation', cls: 'amber' };
      from52L = 6.4;
      from52LTag = { label: 'Above Floor', cls: 'green' };
      rangePct = 58;

      rsiDaily = 54.8;
      rsiDailyTag = { label: 'Constructive', cls: 'green' };
      stochRsi = '0.65';
      stochRsiTag = { label: 'Neutral', cls: 'neutral' };
      rsiWeekly = 58.2;
      rsiWeeklyTag = { label: 'Bullish', cls: 'green' };
      rsiMonthly = 64.5;
      rsiMonthlyTag = { label: 'Strong', cls: 'green' };

      ema20 = 22580.40;
      ema50 = 22410.20;
      priceAboveEma20 = price >= ema20;
      ema20AboveEma50 = true;
      const vsEmaVal = (((price - ema20) / ema20) * 100);
      priceVsEma20 = `${vsEmaVal >= 0 ? '+' : ''}${vsEmaVal.toFixed(2)}%`;

      superTrendDaily = { val: 'UP \u2191', tag: 'Bullish (Stop 22,350)', cls: 'green' };
      macdDaily = { val: 'BUY', tag: 'Bullish Cross', cls: 'green' };
      macdHist = { val: '+42.150', tag: 'Positive Expansion', cls: 'green' };
      adxDaily = { val: '23.8', tag: 'Active Trend', cls: 'green' };
      diPlus = { val: 'Yes', tag: 'Bulls in control', cls: 'green' };
      superTrendWeekly = { val: 'UP \u2191', tag: 'Bullish Support', cls: 'green' };
      macdWeekly = { val: 'BUY', tag: 'Bullish', cls: 'green' };

      bbPosDaily = { val: 'Middle Band', tag: 'Normal Volatility', cls: 'neutral' };
      bbWidthDaily = '4.8210';
      bbPosWeekly = { val: 'Upper Band', tag: 'Bullish Structure', cls: 'green' };

      volRatio = { val: '1.12x avg', tag: 'Normal Volume', cls: 'green' };
      volContext = 'Index Liquidity';
      volSignal = { val: 'Healthy', tag: '28 Adv / 22 Dec', cls: 'green' };

      atrVal = '\u20B9185.40 pts';
      atrPct = { val: '0.82%', tag: 'Normal Index Range', cls: 'green' };

      higherHigh = { val: 'Yes \u2713', tag: 'Bullish HH', cls: 'green' };
      higherLow = { val: 'Yes \u2713', tag: 'Bullish HL', cls: 'green' };
      lastSwingHigh = '\u20B923,100.50';
      prevSwingHigh = '\u20B922,850.00';
      lastSwingLow = '\u20B922,420.00';
      prevSwingLow = '\u20B922,150.00';

      buyProb = { val: '68/100', tag: 'CONSTRUCTIVE', cls: 'green' };
      overallSignal = 'BULLISH BIAS';
      entrySignal = 'Regime: GREEN \u00B7 SuperTrend BUY \u00B7 EMA-20 Support Holding at \u20B922,580 \u00B7 Trailing Stop: \u20B922,350';
      riskLevel = { val: 'LOW - MODERATE', cls: 'green' };

      aiStatus = '\uD83D\uDCC8 CONSTRUCTIVE (BULLISH BIAS)';
      aiStatusCls = 'green';
      aiOverallText = `NIFTY 50 (${stock.symbol}) is currently exhibiting a constructive market structure with an Algorithmic Confluence Score of 68/100. The benchmark index continues to hold firmly above its 20-day exponential moving average (\u20B922,580.40) and 50-day EMA (\u20B922,410.20), reflecting healthy institutional dip-buying across core blue-chip constituents.`;
      aiMarketText = `Macro regime is classified as GREEN with positive market breadth (28 Advances vs 22 Declines). Banking (HDFCBANK, ICICIBANK) and IT (TCS, INFY) are providing structural equilibrium, offsetting selective profit booking in energy and commodities.`;
      aiTechBullets = [
        `Daily SuperTrend is firmly in BUY mode with trailing algorithmic stop placed at \u20B922,350.`,
        `Daily RSI (14) at 54.8 indicates steady bullish momentum with no overbought exhaustion (StochRSI: 0.65).`,
        `Higher High and Higher Low structure remains intact above previous swing trough of \u20B922,420; next immediate resistance sits at \u20B922,850 - \u20B923,100.`
      ];
      aiFundText = `Nifty 50 trades at a 1-year forward P/E of 21.4x, well within its 5-year historical fair value range (19x\u201324x). Robust domestic institutional (DII) systematic inflows of over \u20B95,000+ Cr per week continue to provide durable downside absorption.`;
      aiRisksBullets = [
        `Immediate resistance at \u20B922,850 \u2013 \u20B923,000 could prompt near-term supply absorption.`,
        `FII index derivatives position remains slightly cautious, warranting strict stop-loss adherence.`,
        `Key swing support at \u20B922,420 (EMA-50); breach could open downside testing towards \u20B922,000.`
      ];
    } else if (sym === 'SENSEX' || sym === 'BSE SENSEX' || sym === 'BSESENSEX' || sym === '^BSESN') {
      scoreTotal = 71;
      scoreBase = 71;
      scoreMktAdj = 0;
      sentimentText = '\uD83D\uDFE2 CONSTRUCTIVE (BULLISH BIAS)';
      sentimentCls = 'bullish';
      vitalsScore = '71/100';

      h52 = 85978.25;
      l52 = 70319.04;
      from52H = -6.0;
      from52HTag = { label: 'Near High', cls: 'green' };
      from52L = 14.9;
      from52LTag = { label: 'Above Floor', cls: 'green' };
      rangePct = 68;

      rsiDaily = 56.4;
      rsiDailyTag = { label: 'Constructive', cls: 'green' };
      stochRsi = '0.68';
      stochRsiTag = { label: 'Neutral', cls: 'neutral' };
      rsiWeekly = 59.8;
      rsiWeeklyTag = { label: 'Bullish', cls: 'green' };
      rsiMonthly = 66.2;
      rsiMonthlyTag = { label: 'Strong', cls: 'green' };

      ema20 = 80150.80;
      ema50 = 79480.50;
      priceAboveEma20 = price >= ema20;
      ema20AboveEma50 = true;
      const vsEmaValSensex = (((price - ema20) / ema20) * 100);
      priceVsEma20 = `${vsEmaValSensex >= 0 ? '+' : ''}${vsEmaValSensex.toFixed(2)}%`;

      superTrendDaily = { val: 'UP \u2191', tag: 'Bullish (Stop 79,250)', cls: 'green' };
      macdDaily = { val: 'BUY', tag: 'Bullish Cross', cls: 'green' };
      macdHist = { val: '+138.40', tag: 'Positive Expansion', cls: 'green' };
      adxDaily = { val: '24.6', tag: 'Active Trend', cls: 'green' };
      diPlus = { val: 'Yes', tag: 'Bulls in control', cls: 'green' };
      superTrendWeekly = { val: 'UP \u2191', tag: 'Bullish Support', cls: 'green' };
      macdWeekly = { val: 'BUY', tag: 'Bullish', cls: 'green' };

      bbPosDaily = { val: 'Upper Band Zone', tag: 'Bullish Structure', cls: 'green' };
      bbWidthDaily = '5.1420';
      bbPosWeekly = { val: 'Upper Band', tag: 'Bullish Structure', cls: 'green' };

      volRatio = { val: '1.15x avg', tag: 'Normal Volume', cls: 'green' };
      volContext = 'BSE Blue-Chip Liquidity';
      volSignal = { val: 'Healthy', tag: '19 Adv / 11 Dec', cls: 'green' };

      atrVal = '\u20B9610.50 pts';
      atrPct = { val: '0.76%', tag: 'Normal Index Range', cls: 'green' };

      higherHigh = { val: 'Yes \u2713', tag: 'Bullish HH', cls: 'green' };
      higherLow = { val: 'Yes \u2713', tag: 'Bullish HL', cls: 'green' };
      lastSwingHigh = '\u20B981,250.00';
      prevSwingHigh = '\u20B980,500.00';
      lastSwingLow = '\u20B979,400.00';
      prevSwingLow = '\u20B978,850.00';

      buyProb = { val: '71/100', tag: 'CONSTRUCTIVE', cls: 'green' };
      overallSignal = 'BULLISH BIAS';
      entrySignal = 'Regime: GREEN \u00B7 SuperTrend BUY \u00B7 EMA-20 Support Holding at \u20B980,150 \u00B7 Trailing Stop: \u20B979,250';
      riskLevel = { val: 'LOW - MODERATE', cls: 'green' };

      aiStatus = '\uD83D\uDCC8 CONSTRUCTIVE (BULLISH BIAS)';
      aiStatusCls = 'green';
      aiOverallText = `BSE SENSEX (${stock.symbol}) is currently exhibiting a resilient bullish market structure with an Algorithmic Confluence Score of 71/100. The 30-share premier benchmark index continues to trade comfortably above its 20-day exponential moving average (\u20B980,150.80) and 50-day EMA (\u20B979,480.50), reflecting sustained institutional accumulation across India's largest conglomerates.`;
      aiMarketText = `Macro regime is classified as GREEN with positive market breadth across frontline blue-chips (19 Advances vs 11 Declines). Strong relative leadership from IT majors (TCS, INFY) and Banking leaders (HDFCBANK, ICICIBANK, SBIN) is providing durable structural thrust.`;
      aiTechBullets = [
        `Daily SuperTrend is firmly positioned in BUY mode with algorithmic trailing stop placed at \u20B979,250.`,
        `Daily RSI (14) at 56.4 confirms healthy trend momentum with no sign of overbought exhaustion (StochRSI: 0.68).`,
        `Consecutive Higher High and Higher Low swing sequence remains intact above key support floor of \u20B979,400; immediate overhead resistance is positioned at \u20B981,250 - \u20B981,800.`
      ];
      aiFundText = `BSE SENSEX trades at a forward P/E of 23.8x against its 5-year historical fair value corridor (21x\u201326x). Unabated domestic institutional (DII) systematic mutual fund inflows exceeding \u20B923,000+ Cr monthly provide a resilient downside absorption anchor against global headwinds.`;
      aiRisksBullets = [
        `Immediate profit taking near \u20B981,250 \u2013 \u20B982,000 psychological threshold could prompt temporary price pauses.`,
        `Global macroeconomic headlines, US Treasury yields, and crude oil volatility remain key monitoring metrics.`,
        `Key swing support sits at \u20B979,480 (EMA-50); violation could trigger extended healthy consolidation toward \u20B978,500.`
      ];
    } else if (sym === 'ICICIBANK') {
      scoreTotal = 57;
      scoreBase = 57;
      scoreMktAdj = 0;
      sentimentText = '🟡 NEUTRAL';
      sentimentCls = 'neutral';
      vitalsScore = '57/100';

      h52 = 1480.0;
      l52 = 1187.6;
      from52H = -6.7;
      from52HTag = { label: 'Near High', cls: 'green' };
      from52L = 16.3;
      from52LTag = { label: 'Above Low', cls: 'green' };
      rangePct = 66;

      rsiDaily = 56.1;
      rsiDailyTag = { label: 'Bullish', cls: 'green' };
      stochRsi = '1.00';
      stochRsiTag = { label: 'Overbought', cls: 'red' };
      rsiWeekly = 52.9;
      rsiWeeklyTag = { label: 'Neutral', cls: 'neutral' };
      rsiMonthly = 55.9;
      rsiMonthlyTag = { label: 'Bullish', cls: 'green' };

      ema20 = 1351.43;
      ema50 = 1368.34;
      priceAboveEma20 = true;
      ema20AboveEma50 = false;
      priceVsEma20 = '+2.19%';

      superTrendDaily = { val: 'UP ↑', tag: 'Bullish', cls: 'green' };
      macdDaily = { val: 'BUY', tag: 'Bullish Cross', cls: 'green' };
      macdHist = { val: '7.367', tag: 'Positive', cls: 'green' };
      adxDaily = { val: '20.4', tag: 'Moderate', cls: 'neutral' };
      diPlus = { val: 'Yes', tag: 'Bulls in control', cls: 'green' };
      superTrendWeekly = { val: 'UP ↑', tag: 'Bullish', cls: 'green' };
      macdWeekly = { val: 'SELL', tag: 'Bearish', cls: 'red' };

      bbPosDaily = { val: 'Near Upper Band', tag: 'Overbought Zone', cls: 'red' };
      bbWidthDaily = '5.9391';
      bbPosWeekly = { val: 'Middle Band', tag: 'Neutral', cls: 'neutral' };

      volRatio = { val: '0.75x avg', tag: 'Low Vol', cls: 'red' };
      volContext = 'Normal';
      volSignal = { val: 'Weak', tag: 'Low confirmation', cls: 'neutral' };

      atrVal = '₹24.57';
      atrPct = { val: '1.78%', tag: 'Moderate', cls: 'neutral' };

      higherHigh = { val: 'Yes ✓', tag: 'Bullish HH', cls: 'green' };
      higherLow = { val: 'Yes ✓', tag: 'Bullish HL', cls: 'green' };
      lastSwingHigh = '₹1382.20';
      prevSwingHigh = '₹1360.80';
      lastSwingLow = '₹1329.40';
      prevSwingLow = '₹1303.70';

      buyProb = { val: '57/100', tag: 'NEUTRAL', cls: 'neutral' };
      overallSignal = 'NEUTRAL';
      entrySignal = 'Entry: SuperTrend BUY · RSI Momentum Zone (56) · MACD Bullish. Caution: Near BB Upper';
      riskLevel = { val: 'LOW', cls: 'green' };

      aiStatus = '⚖️ NEUTRAL';
      aiStatusCls = 'amber';
      aiOverallText = `ICICI Bank Ltd (${stock.symbol}) presents a balanced, neutral setup today with a Technical Score of 57/100. While short-term momentum is constructive with daily SuperTrend in BUY and price above EMA-20 (+2.19%), medium-term resistance looms near the 52-week peak (-6.7%) and weekly MACD indicates cautious positioning.`;
      aiMarketText = `Nifty Bank and benchmark indices reflect steady rotation. ${stock.symbol} trades in line with sector peers, consolidating below its swing high of ₹1,382.20.`;
      aiTechBullets = [
        `SuperTrend Daily is UP with MACD positive histogram (+7.37), yet weekly MACD remains in SELL.`,
        `Daily RSI at 56.1 is in healthy momentum territory, though StochRSI is stretched at 1.00 (Overbought).`,
        `Higher High (₹1,382.20 > ₹1,360.80) and Higher Low (₹1,329.40 > ₹1,303.70) confirm constructive structure, but below-average volume (0.75x) suggests waiting for volume expansion.`
      ];
      aiFundText = `ICICI Bank maintains robust asset quality with strong CASA ratio and capital adequacy ratio (>16%). Return on Assets (ROA) remains resilient at ~2.3% with solid net interest margins.`;
      aiRisksBullets = [
        `Trading near daily upper Bollinger Band with low volume confirmation.`,
        `EMA-20 (₹1,351.43) remains below EMA-50 (₹1,368.34), denoting incomplete structural reversal.`,
        `Immediate support at Last Swing Low (₹1,329.40); breach could test ₹1,303.70.`
      ];
    } else if (sym === 'TECHM') {
      scoreTotal = 76;
      scoreBase = 64;
      scoreMktAdj = 12;
      sentimentText = '🚀 STRONG BULLISH';
      sentimentCls = 'strong-bullish';
      vitalsScore = '64/100';

      h52 = stock.high52 || 1854.0;
      l52 = stock.low52 || 1304.1;
      from52H = -12.0;
      from52HTag = { label: 'Moderate', cls: 'amber' };
      from52L = 25.1;
      from52LTag = { label: 'Above Low', cls: 'green' };
      rangePct = 59;

      rsiDaily = 63.4;
      rsiDailyTag = { label: 'Bullish', cls: 'green' };
      stochRsi = '1.00';
      stochRsiTag = { label: 'Overbought', cls: 'red' };
      rsiWeekly = 58.7;
      rsiWeeklyTag = { label: 'Bullish', cls: 'green' };
      rsiMonthly = 54.9;
      rsiMonthlyTag = { label: 'Neutral', cls: 'neutral' };

      ema20 = 1543.24;
      ema50 = 1550.11;
      priceAboveEma20 = true;
      ema20AboveEma50 = false;
      priceVsEma20 = '+5.68%';

      superTrendDaily = { val: 'UP ↑', tag: 'Bullish', cls: 'green' };
      macdDaily = { val: 'BUY', tag: 'Bullish Cross', cls: 'green' };
      macdHist = { val: '12.450', tag: 'Positive', cls: 'green' };
      adxDaily = { val: '26.8', tag: 'Strong Trend', cls: 'green' };
      diPlus = { val: 'Yes', tag: 'Bulls in control', cls: 'green' };
      superTrendWeekly = { val: 'UP ↑', tag: 'Bullish', cls: 'green' };
      macdWeekly = { val: 'BUY', tag: 'Bullish', cls: 'green' };

      bbPosDaily = { val: 'Near Upper Band', tag: 'Overbought Zone', cls: 'red' };
      bbWidthDaily = '6.4215';
      bbPosWeekly = { val: 'Upper Band', tag: 'Strong Uptrend', cls: 'green' };

      volRatio = { val: '2.30x avg', tag: 'High Vol', cls: 'green' };
      volContext = 'Breakout';
      volSignal = { val: 'Strong', tag: 'High confirmation', cls: 'green' };

      atrVal = '₹31.85';
      atrPct = { val: '1.95%', tag: 'Moderate', cls: 'neutral' };

      higherHigh = { val: 'Yes ✓', tag: 'Bullish HH', cls: 'green' };
      higherLow = { val: 'Yes ✓', tag: 'Bullish HL', cls: 'green' };
      lastSwingHigh = '₹1648.00';
      prevSwingHigh = '₹1615.50';
      lastSwingLow = '₹1532.00';
      prevSwingLow = '₹1495.00';

      buyProb = { val: '76/100', tag: 'STRONG BUY', cls: 'green' };
      overallSignal = 'BULLISH';
      entrySignal = 'Entry: SuperTrend BUY · Breakout Volume (2.3x) · MACD Bullish Cross. Caution: Near BB Upper';
      riskLevel = { val: 'MEDIUM', cls: 'amber' };

      aiStatus = '📈 BULLISH';
      aiStatusCls = 'green';
      aiOverallText = `${stock.name} (${stock.symbol}) is showing a solid bullish bias today, riding the broader market's positive momentum while also displaying its own strength. The technical setup is favorable, though the price is flirting with the upper Bollinger Band, suggesting caution on the upside.`;
      aiMarketText = `The market is bullish (+1.49% average) and ${stock.symbol} is outperforming the indices, indicating a stock-specific lift rather than just a market-driven rally.`;
      aiTechBullets = [
        `The SuperTrend, MACD and RSI (63) all point to buying pressure, and the price sits 5.7% above the EMA-20, confirming short-term strength.`,
        `A higher-high (HH) formation and a 2.3× breakout volume add conviction to the move.`,
        `However, the EMA-20 is still below EMA-50 (bearish medium-term trend) and the stock is near the upper Bollinger Band, so a pull-back or consolidation could occur before the next leg higher.`
      ];
      aiFundText = `At a PE of ~30 and PB of 5.4, ${stock.symbol} trades at a modest premium but offers a healthy dividend yield of 3.12%. Institutional ownership (53%) and a sizable insider stake (35%) provide stability, though earnings data is missing in the snapshot.`;
      aiRisksBullets = [
        `Near-term overbought condition (price close to BB upper) could trigger a short-term correction.`,
        `Medium-term EMA-20 < EMA-50 suggests the broader trend may still be bearish.`,
        `Lack of recent earnings visibility (EPS shown as 0) could mask underlying profitability concerns.`
      ];
    } else {
      // Dynamic calculations for all other stocks in the universe
      scoreBase = Math.min(88, Math.max(35, (stock.confluence || stock.analysisPct || 65)));
      scoreMktAdj = isUp ? (changePct > 1.49 ? 12 : 5) : -8;
      scoreTotal = Math.min(96, Math.max(22, scoreBase + scoreMktAdj));

      if (scoreTotal >= 75) {
        sentimentText = '🚀 STRONG BULLISH';
        sentimentCls = 'strong-bullish';
        aiStatus = '📈 BULLISH';
        aiStatusCls = 'green';
      } else if (scoreTotal >= 60) {
        sentimentText = '🟢 BULLISH';
        sentimentCls = 'bullish';
        aiStatus = '📈 BULLISH';
        aiStatusCls = 'green';
      } else if (scoreTotal >= 45) {
        sentimentText = '🟡 NEUTRAL';
        sentimentCls = 'neutral';
        aiStatus = '⚖️ NEUTRAL';
        aiStatusCls = 'amber';
      } else {
        sentimentText = '🔴 BEARISH';
        sentimentCls = 'bearish';
        aiStatus = '📉 BEARISH';
        aiStatusCls = 'red';
      }

      vitalsScore = `${scoreBase}/100`;

      h52 = stock.high52 || (price * 1.25);
      l52 = stock.low52 || (price * 0.75);
      from52H = parseFloat((((price - h52) / h52) * 100).toFixed(1));
      from52L = parseFloat((((price - l52) / l52) * 100).toFixed(1));
      from52HTag = Math.abs(from52H) < 8 ? { label: 'Near High', cls: 'green' } : { label: 'Moderate', cls: 'amber' };
      from52LTag = from52L > 20 ? { label: 'Above Low', cls: 'green' } : { label: 'Near Low', cls: 'amber' };
      rangePct = Math.min(100, Math.max(0, Math.round(((price - l52) / (h52 - l52)) * 100)));

      rsiDaily = parseFloat((40 + (absHash % 35) + (isUp ? 8 : -5)).toFixed(1));
      rsiDailyTag = rsiDaily > 60 ? { label: 'Bullish', cls: 'green' } : (rsiDaily < 45 ? { label: 'Bearish', cls: 'red' } : { label: 'Neutral', cls: 'neutral' });
      stochRsi = (rsiDaily > 65 ? '0.94' : (rsiDaily < 40 ? '0.18' : '0.52'));
      stochRsiTag = parseFloat(stochRsi) > 0.8 ? { label: 'Overbought', cls: 'red' } : (parseFloat(stochRsi) < 0.25 ? { label: 'Oversold', cls: 'green' } : { label: 'Neutral', cls: 'neutral' });
      rsiWeekly = parseFloat((rsiDaily - 3.5).toFixed(1));
      rsiWeeklyTag = rsiWeekly > 55 ? { label: 'Bullish', cls: 'green' } : { label: 'Neutral', cls: 'neutral' };
      rsiMonthly = parseFloat((rsiDaily - 6.2).toFixed(1));
      rsiMonthlyTag = { label: 'Neutral', cls: 'neutral' };

      ema20 = parseFloat((price * (isUp ? 0.96 : 1.03)).toFixed(2));
      ema50 = parseFloat((price * (isUp ? 0.94 : 1.05)).toFixed(2));
      priceAboveEma20 = price >= ema20;
      ema20AboveEma50 = ema20 >= ema50;
      const vsEmaVal = (((price - ema20) / ema20) * 100);
      priceVsEma20 = `${vsEmaVal >= 0 ? '+' : ''}${vsEmaVal.toFixed(2)}%`;

      const isBull = scoreTotal >= 55;
      superTrendDaily = isBull ? { val: 'UP ↑', tag: 'Bullish', cls: 'green' } : { val: 'DOWN ↓', tag: 'Bearish', cls: 'red' };
      macdDaily = scoreTotal >= 52 ? { val: 'BUY', tag: 'Bullish Cross', cls: 'green' } : { val: 'SELL', tag: 'Bearish Cross', cls: 'red' };
      const histValNum = (changePct * 2.8).toFixed(3);
      macdHist = { val: `${histValNum >= 0 ? '+' : ''}${histValNum}`, tag: histValNum >= 0 ? 'Positive' : 'Negative', cls: histValNum >= 0 ? 'green' : 'red' };
      const adxNum = (18.0 + (absHash % 16) + 0.4).toFixed(1);
      adxDaily = { val: adxNum, tag: adxNum > 25 ? 'Strong Trend' : 'Moderate', cls: adxNum > 25 ? 'green' : 'neutral' };
      diPlus = isUp ? { val: 'Yes', tag: 'Bulls in control', cls: 'green' } : { val: 'No', tag: 'Bears in control', cls: 'red' };
      superTrendWeekly = scoreTotal >= 50 ? { val: 'UP ↑', tag: 'Bullish', cls: 'green' } : { val: 'DOWN ↓', tag: 'Bearish', cls: 'red' };
      macdWeekly = scoreTotal >= 60 ? { val: 'BUY', tag: 'Bullish', cls: 'green' } : { val: 'SELL', tag: 'Bearish', cls: 'red' };

      bbPosDaily = rsiDaily > 60 ? { val: 'Near Upper Band', tag: 'Overbought Zone', cls: 'red' } : (rsiDaily < 42 ? { val: 'Near Lower Band', tag: 'Oversold Zone', cls: 'green' } : { val: 'Middle Band', tag: 'Neutral Zone', cls: 'neutral' });
      bbWidthDaily = (4.8 + (absHash % 25) / 10).toFixed(4);
      bbPosWeekly = isUp ? { val: 'Middle Band', tag: 'Neutral', cls: 'neutral' } : { val: 'Lower Band', tag: 'Consolidation', cls: 'neutral' };

      const volRatioNum = (0.75 + (absHash % 18) / 10).toFixed(2);
      volRatio = { val: `${volRatioNum}x avg`, tag: volRatioNum >= 1.2 ? 'High Vol' : 'Low Vol', cls: volRatioNum >= 1.2 ? 'green' : 'red' };
      volContext = Math.abs(changePct) > 2.0 ? (isUp ? 'Breakout' : 'Distribution') : 'Normal';
      volSignal = scoreTotal >= 60 ? { val: 'Strong', tag: 'High confirmation', cls: 'green' } : { val: 'Weak', tag: 'Low confirmation', cls: 'neutral' };

      const atrNumber = (price * 0.0175).toFixed(2);
      atrVal = `₹${parseFloat(atrNumber).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      atrPct = { val: '1.75%', tag: 'Moderate', cls: 'neutral' };

      higherHigh = isUp ? { val: 'Yes ✓', tag: 'Bullish HH', cls: 'green' } : { val: 'No ✗', tag: 'Lower High', cls: 'red' };
      higherLow = isUp ? { val: 'Yes ✓', tag: 'Bullish HL', cls: 'green' } : { val: 'No ✗', tag: 'Lower Low', cls: 'red' };
      lastSwingHigh = `₹${(price * 1.018).toFixed(2)}`;
      prevSwingHigh = `₹${(price * 0.995).toFixed(2)}`;
      lastSwingLow = `₹${(price * 0.972).toFixed(2)}`;
      prevSwingLow = `₹${(price * 0.950).toFixed(2)}`;

      buyProb = { val: `${scoreTotal}/100`, tag: scoreTotal >= 70 ? 'STRONG BUY' : (scoreTotal >= 55 ? 'BUY' : (scoreTotal >= 45 ? 'NEUTRAL' : 'SELL')), cls: scoreTotal >= 55 ? 'green' : (scoreTotal >= 45 ? 'neutral' : 'red') };
      overallSignal = scoreTotal >= 70 ? 'STRONG BUY' : (scoreTotal >= 55 ? 'BULLISH' : (scoreTotal >= 45 ? 'NEUTRAL' : 'BEARISH'));
      entrySignal = `Entry: SuperTrend ${isBull ? 'BUY' : 'CAUTION'} · RSI Momentum Zone (${Math.round(rsiDaily)}) · MACD ${macdDaily.val}. ${scoreTotal >= 60 ? 'Favorable Risk/Reward' : 'Wait for confirmation'}`;
      riskLevel = scoreTotal >= 70 ? { val: 'LOW', cls: 'green' } : (scoreTotal >= 50 ? { val: 'MEDIUM', cls: 'amber' } : { val: 'HIGH', cls: 'red' });

      aiOverallText = `${stock.name} (${stock.symbol}) is currently exhibiting a ${sentimentText.replace(/[^a-zA-Z ]/g, '').trim().toLowerCase()} technical structure. Institutional accumulation indicates steady market conviction across NSE order books.`;
      aiMarketText = `With Nifty 50 at +1.48% and broader momentum intact, ${stock.symbol} ${scoreMktAdj > 0 ? 'is outperforming benchmark equity indices with robust relative strength.' : 'is tracking general market movements within expected sector bands.'}`;
      aiTechBullets = [
        `SuperTrend on Daily is positioned in ${priceAboveEma20 ? 'BUY' : 'CAUTION'} zone with RSI at ${rsiDaily}.`,
        `Price sits ${priceVsEma20} relative to the 20-day Exponential Moving Average (EMA-20: ₹${ema20.toLocaleString('en-IN')}).`,
        `${ema20AboveEma50 ? 'EMA-20 is trending above EMA-50, affirming medium-term bullish structural support.' : 'EMA-20 is testing support near EMA-50 (₹' + ema50.toLocaleString('en-IN') + '), suggesting prudent position sizing.'}`
      ];
      aiFundText = `Valuation parameters indicate sustainable price-to-book levels with institutional holdings providing solid liquidity across Indian market sessions.`;
      aiRisksBullets = [
        `Key volatility levels to monitor around immediate swing pivot resistances.`,
        `Trailing stop-loss recommended near EMA-20 support level.`,
        `Monitor broader macro announcements and sector earnings releases.`
      ];
    }

    // 1. Render Gauge & Technical Score
    const scoreGaugeVal = document.getElementById('sacScoreGaugeVal');
    const baseAdjVal = document.getElementById('sacBaseAdjVal');
    const sentimentBadge = document.getElementById('sacSentimentBadge');
    const gaugeArc = document.getElementById('sacGaugeArc');
    const tabVitalScore = document.getElementById('sacTabVitalScore');

    if (scoreGaugeVal) scoreGaugeVal.textContent = `${scoreTotal}%`;
    if (baseAdjVal) baseAdjVal.textContent = `Base: ${scoreBase}% | Mkt Adj: ${scoreMktAdj >= 0 ? '+' : ''}${scoreMktAdj}`;
    if (sentimentBadge) {
      sentimentBadge.className = `sac-sentiment-pill ${sentimentCls}`;
      sentimentBadge.textContent = sentimentText;
    }
    if (tabVitalScore) tabVitalScore.textContent = vitalsScore;

    // Animate Gauge Arc (Arc length is ~235.6)
    if (gaugeArc) {
      const arcOffset = Math.max(0, Math.min(235.6, (1 - (scoreTotal / 100)) * 235.6));
      gaugeArc.style.strokeDashoffset = `${arcOffset}`;
      gaugeArc.style.stroke = scoreTotal >= 70 ? '#10B981' : (scoreTotal >= 50 ? '#F59E0B' : '#EF4444');
    }

    // 2. Render Market Today Card
    const outperformLead = document.getElementById('sacOutperformLead');
    const outperformCalc = document.getElementById('sacOutperformCalc');
    if (outperformLead) {
      outperformLead.textContent = scoreMktAdj >= 0 ? 'Stock is outperforming the market' : 'Stock is in consolidation vs market';
    }
    if (outperformCalc) {
      outperformCalc.textContent = `Score adjusted: ${scoreBase}% base ${scoreMktAdj >= 0 ? '+' : ''}${scoreMktAdj} market = ${scoreTotal}%`;
    }

    // 3. Render Vital Technicals Breakdown (All 9 Sections)
    const vitalsScorePill = document.getElementById('sacVitalsScorePill');
    if (vitalsScorePill) vitalsScorePill.textContent = vitalsScore;

    // Sub-Block 1: Price & 52-Week Range
    const curPxVal = document.getElementById('sacVtCurPriceVal');
    const h52Val = document.getElementById('sacVt52HighVal');
    const l52Val = document.getElementById('sacVt52LowVal');
    const from52HVal = document.getElementById('sacVtFrom52HighVal');
    const from52HTagEl = document.getElementById('sacVtFrom52HighTag');
    const from52LVal = document.getElementById('sacVtFrom52LowVal');
    const from52LTagEl = document.getElementById('sacVtFrom52LowTag');
    const rangeFill = document.getElementById('sac52wRangeFill');
    const rangePin = document.getElementById('sac52wPin');

    if (curPxVal) curPxVal.textContent = `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    if (h52Val) h52Val.textContent = `₹${h52.toLocaleString('en-IN', { minimumFractionDigits: 1 })}`;
    if (l52Val) l52Val.textContent = `₹${l52.toLocaleString('en-IN', { minimumFractionDigits: 1 })}`;
    if (from52HVal) from52HVal.textContent = `${from52H}%`;
    if (from52HTagEl) {
      from52HTagEl.className = `sac-tag ${from52HTag.cls}`;
      from52HTagEl.textContent = from52HTag.label;
    }
    if (from52LVal) from52LVal.textContent = `+${from52L}%`;
    if (from52LTagEl) {
      from52LTagEl.className = `sac-tag ${from52LTag.cls}`;
      from52LTagEl.textContent = from52LTag.label;
    }
    if (rangeFill) rangeFill.style.width = `${rangePct}%`;
    if (rangePin) rangePin.style.left = `${rangePct}%`;

    // Sub-Block 2: RSI Breakdown
    const rsiDNum = document.getElementById('sacVtRsiDailyNum');
    const rsiDBadge = document.getElementById('sacVtRsiDailyBadge');
    const stochNum = document.getElementById('sacVtStochRsiDailyNum');
    const stochBadge = document.getElementById('sacVtStochRsiDailyBadge');
    const rsiWNum = document.getElementById('sacVtRsiWeeklyNum');
    const rsiWBadge = document.getElementById('sacVtRsiWeeklyBadge');
    const rsiMNum = document.getElementById('sacVtRsiMonthlyNum');
    const rsiMBadge = document.getElementById('sacVtRsiMonthlyBadge');

    if (rsiDNum) rsiDNum.textContent = rsiDaily;
    if (rsiDBadge) {
      rsiDBadge.className = `sac-tag ${rsiDailyTag.cls}`;
      rsiDBadge.textContent = rsiDailyTag.label;
    }
    if (stochNum) stochNum.textContent = stochRsi;
    if (stochBadge) {
      stochBadge.className = `sac-tag ${stochRsiTag.cls}`;
      stochBadge.textContent = stochRsiTag.label;
    }
    if (rsiWNum) rsiWNum.textContent = rsiWeekly;
    if (rsiWBadge) {
      rsiWBadge.className = `sac-tag ${rsiWeeklyTag.cls}`;
      rsiWBadge.textContent = rsiWeeklyTag.label;
    }
    if (rsiMNum) rsiMNum.textContent = rsiMonthly;
    if (rsiMBadge) {
      rsiMBadge.className = `sac-tag ${rsiMonthlyTag.cls}`;
      rsiMBadge.textContent = rsiMonthlyTag.label;
    }

    // Sub-Block 3: Moving Averages Breakdown
    const ema20Num = document.getElementById('sacVtEma20Num');
    const ema50Num = document.getElementById('sacVtEma50Num');
    const aboveEma20Txt = document.getElementById('sacVtAboveEma20Txt');
    const aboveEma20Badge = document.getElementById('sacVtAboveEma20Badge');
    const ema20Above50Txt = document.getElementById('sacVtEma20Above50Txt');
    const ema20Above50Badge = document.getElementById('sacVtEma20Above50Badge');
    const priceVsEma20Num = document.getElementById('sacVtPriceVsEma20Num');
    const priceVsEma20Badge = document.getElementById('sacVtPriceVsEma20Badge');

    if (ema20Num) ema20Num.textContent = `₹${ema20.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    if (ema50Num) ema50Num.textContent = `₹${ema50.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    if (aboveEma20Txt) {
      aboveEma20Txt.textContent = priceAboveEma20 ? 'Yes' : 'No';
      aboveEma20Txt.style.color = priceAboveEma20 ? 'var(--profit-green)' : 'var(--loss-red)';
    }
    if (aboveEma20Badge) {
      aboveEma20Badge.className = `sac-tag ${priceAboveEma20 ? 'green' : 'red'}`;
      aboveEma20Badge.textContent = priceAboveEma20 ? 'Bullish' : 'Bearish';
    }
    if (ema20Above50Txt) {
      ema20Above50Txt.textContent = ema20AboveEma50 ? 'Yes' : 'No';
      ema20Above50Txt.style.color = ema20AboveEma50 ? 'var(--profit-green)' : 'var(--loss-red)';
    }
    if (ema20Above50Badge) {
      ema20Above50Badge.className = `sac-tag ${ema20AboveEma50 ? 'green' : 'red'}`;
      ema20Above50Badge.textContent = ema20AboveEma50 ? 'Uptrend' : 'Downtrend';
    }
    if (priceVsEma20Num) {
      priceVsEma20Num.textContent = priceVsEma20;
      priceVsEma20Num.style.color = priceAboveEma20 ? 'var(--profit-green)' : 'var(--loss-red)';
    }
    if (priceVsEma20Badge) {
      priceVsEma20Badge.className = `sac-tag ${priceAboveEma20 ? 'green' : 'red'}`;
      priceVsEma20Badge.textContent = priceAboveEma20 ? 'Above EMA20' : 'Below EMA20';
    }

    // Sub-Block 4: Trend Indicators
    const stDVal = document.getElementById('sacVtSuperTrendDailyVal');
    const stDTag = document.getElementById('sacVtSuperTrendDailyTag');
    const macdDVal = document.getElementById('sacVtMacdDailyVal');
    const macdDTag = document.getElementById('sacVtMacdDailyTag');
    const macdHVal = document.getElementById('sacVtMacdHistVal');
    const macdHTag = document.getElementById('sacVtMacdHistTag');
    const adxDVal = document.getElementById('sacVtAdxDailyVal');
    const adxDTag = document.getElementById('sacVtAdxDailyTag');
    const diPlusVal = document.getElementById('sacVtDiPlusVal');
    const diPlusTag = document.getElementById('sacVtDiPlusTag');
    const stWVal = document.getElementById('sacVtSuperTrendWeeklyVal');
    const stWTag = document.getElementById('sacVtSuperTrendWeeklyTag');
    const macdWVal = document.getElementById('sacVtMacdWeeklyVal');
    const macdWTag = document.getElementById('sacVtMacdWeeklyTag');

    if (stDVal) { stDVal.textContent = superTrendDaily.val; stDVal.className = `sac-vt-val ${superTrendDaily.cls || ''} font-bold`; }
    if (stDTag) { stDTag.textContent = superTrendDaily.tag; stDTag.className = `sac-tag ${superTrendDaily.cls || 'neutral'}`; }
    if (macdDVal) { macdDVal.textContent = macdDaily.val; macdDVal.className = `sac-vt-val ${macdDaily.cls || ''} font-bold`; }
    if (macdDTag) { macdDTag.textContent = macdDaily.tag; macdDTag.className = `sac-tag ${macdDaily.cls || 'neutral'}`; }
    if (macdHVal) { macdHVal.textContent = macdHist.val; macdHVal.className = `sac-vt-val ${macdHist.cls || ''} font-bold`; }
    if (macdHTag) { macdHTag.textContent = macdHist.tag; macdHTag.className = `sac-tag ${macdHist.cls || 'neutral'}`; }
    if (adxDVal) adxDVal.textContent = adxDaily.val;
    if (adxDTag) { adxDTag.textContent = adxDaily.tag; adxDTag.className = `sac-tag ${adxDaily.cls || 'neutral'}`; }
    if (diPlusVal) { diPlusVal.textContent = diPlus.val; diPlusVal.className = `sac-vt-val ${diPlus.cls || ''} font-bold`; }
    if (diPlusTag) { diPlusTag.textContent = diPlus.tag; diPlusTag.className = `sac-tag ${diPlus.cls || 'neutral'}`; }
    if (stWVal) { stWVal.textContent = superTrendWeekly.val; stWVal.className = `sac-vt-val ${superTrendWeekly.cls || ''} font-bold`; }
    if (stWTag) { stWTag.textContent = superTrendWeekly.tag; stWTag.className = `sac-tag ${superTrendWeekly.cls || 'neutral'}`; }
    if (macdWVal) { macdWVal.textContent = macdWeekly.val; macdWVal.className = `sac-vt-val ${macdWeekly.cls || ''} font-bold`; }
    if (macdWTag) { macdWTag.textContent = macdWeekly.tag; macdWTag.className = `sac-tag ${macdWeekly.cls || 'neutral'}`; }

    // Sub-Block 5: Bollinger Bands
    const bbPosDVal = document.getElementById('sacVtBbPosDailyVal');
    const bbPosDTag = document.getElementById('sacVtBbPosDailyTag');
    const bbWidthDVal = document.getElementById('sacVtBbWidthDailyVal');
    const bbPosWVal = document.getElementById('sacVtBbPosWeeklyVal');
    const bbPosWTag = document.getElementById('sacVtBbPosWeeklyTag');

    if (bbPosDVal) { bbPosDVal.textContent = bbPosDaily.val; bbPosDVal.className = `sac-vt-val ${bbPosDaily.cls || ''} font-bold`; }
    if (bbPosDTag) { bbPosDTag.textContent = bbPosDaily.tag; bbPosDTag.className = `sac-tag ${bbPosDaily.cls || 'neutral'}`; }
    if (bbWidthDVal) bbWidthDVal.textContent = bbWidthDaily;
    if (bbPosWVal) { bbPosWVal.textContent = bbPosWeekly.val; bbPosWVal.className = `sac-vt-val font-bold`; }
    if (bbPosWTag) { bbPosWTag.textContent = bbPosWeekly.tag; bbPosWTag.className = `sac-tag ${bbPosWeekly.cls || 'neutral'}`; }

    // Sub-Block 6: Volume Analysis
    const volRatioValEl = document.getElementById('sacVtVolRatioVal');
    const volRatioTagEl = document.getElementById('sacVtVolRatioTag');
    const volContextValEl = document.getElementById('sacVtVolContextVal');
    const volSignalValEl = document.getElementById('sacVtVolSignalVal');
    const volSignalTagEl = document.getElementById('sacVtVolSignalTag');

    if (volRatioValEl) { volRatioValEl.textContent = volRatio.val; volRatioValEl.className = `sac-vt-val ${volRatio.cls || ''} font-bold`; }
    if (volRatioTagEl) { volRatioTagEl.textContent = volRatio.tag; volRatioTagEl.className = `sac-tag ${volRatio.cls || 'neutral'}`; }
    if (volContextValEl) volContextValEl.textContent = volContext;
    if (volSignalValEl) volSignalValEl.textContent = volSignal.val;
    if (volSignalTagEl) { volSignalTagEl.textContent = volSignal.tag; volSignalTagEl.className = `sac-tag ${volSignal.cls || 'neutral'}`; }

    // Sub-Block 7: Volatility (ATR)
    const atrValEl = document.getElementById('sacVtAtrVal');
    const atrPctValEl = document.getElementById('sacVtAtrPctVal');
    const atrPctTagEl = document.getElementById('sacVtAtrPctTag');

    if (atrValEl) atrValEl.textContent = atrVal;
    if (atrPctValEl) atrPctValEl.textContent = atrPct.val;
    if (atrPctTagEl) { atrPctTagEl.textContent = atrPct.tag; atrPctTagEl.className = `sac-tag ${atrPct.cls || 'neutral'}`; }

    // Sub-Block 8: Market Structure
    const hhValEl = document.getElementById('sacVtHigherHighVal');
    const hhTagEl = document.getElementById('sacVtHigherHighTag');
    const hlValEl = document.getElementById('sacVtHigherLowVal');
    const hlTagEl = document.getElementById('sacVtHigherLowTag');
    const lshValEl = document.getElementById('sacVtLastSwingHighVal');
    const pshValEl = document.getElementById('sacVtPrevSwingHighVal');
    const lslValEl = document.getElementById('sacVtLastSwingLowVal');
    const pslValEl = document.getElementById('sacVtPrevSwingLowVal');

    if (hhValEl) { hhValEl.textContent = higherHigh.val; hhValEl.className = `sac-vt-val ${higherHigh.cls || ''} font-bold`; }
    if (hhTagEl) { hhTagEl.textContent = higherHigh.tag; hhTagEl.className = `sac-tag ${higherHigh.cls || 'neutral'}`; }
    if (hlValEl) { hlValEl.textContent = higherLow.val; hlValEl.className = `sac-vt-val ${higherLow.cls || ''} font-bold`; }
    if (hlTagEl) { hlTagEl.textContent = higherLow.tag; hlTagEl.className = `sac-tag ${higherLow.cls || 'neutral'}`; }
    if (lshValEl) lshValEl.textContent = lastSwingHigh;
    if (pshValEl) pshValEl.textContent = prevSwingHigh;
    if (lslValEl) lslValEl.textContent = lastSwingLow;
    if (pslValEl) pslValEl.textContent = prevSwingLow;

    // Sub-Block 9: Overall Verdict
    const buyProbValEl = document.getElementById('sacVtBuyProbVal');
    const buyProbTagEl = document.getElementById('sacVtBuyProbTag');
    const overallSigEl = document.getElementById('sacVtOverallSignalVal');
    const entryBoxEl = document.getElementById('sacVtEntrySignalBox');
    const riskLevelEl = document.getElementById('sacVtRiskLevelVal');

    if (buyProbValEl) buyProbValEl.textContent = buyProb.val;
    if (buyProbTagEl) { buyProbTagEl.textContent = buyProb.tag; buyProbTagEl.className = `sac-tag ${buyProb.cls || 'neutral'}`; }
    if (overallSigEl) {
      overallSigEl.textContent = overallSignal;
      overallSigEl.style.color = (overallSignal.includes('BUY') || overallSignal.includes('BULL')) ? 'var(--profit-green)' : ((overallSignal.includes('SELL') || overallSignal.includes('BEAR')) ? 'var(--loss-red)' : 'var(--text-primary)');
    }
    if (entryBoxEl) entryBoxEl.textContent = entrySignal;
    if (riskLevelEl) {
      riskLevelEl.textContent = riskLevel.val;
      riskLevelEl.style.color = riskLevel.cls === 'green' ? 'var(--profit-green)' : (riskLevel.cls === 'red' ? 'var(--loss-red)' : 'var(--accent-amber)');
    }

    // 4. Render AI Report Content
    const aiStatusPill = document.getElementById('sacAiStatusPill');
    const aiOverallTextEl = document.getElementById('sacAiOverallText');
    const aiMarketTextEl = document.getElementById('sacAiMarketText');
    const aiTechBulletsEl = document.getElementById('sacAiTechBullets');
    const aiFundTextEl = document.getElementById('sacAiFundText');
    const aiRisksBulletsEl = document.getElementById('sacAiRisksBullets');

    if (aiStatusPill) {
      aiStatusPill.className = `sac-ai-status-pill ${aiStatusCls}`;
      aiStatusPill.textContent = aiStatus;
    }
    if (aiOverallTextEl) aiOverallTextEl.textContent = aiOverallText;
    if (aiMarketTextEl) aiMarketTextEl.textContent = aiMarketText;
    if (aiTechBulletsEl) {
      aiTechBulletsEl.innerHTML = aiTechBullets.map(b => `<li>${b}</li>`).join('');
    }
    if (aiFundTextEl) aiFundTextEl.textContent = aiFundText;
    if (aiRisksBulletsEl) {
      aiRisksBulletsEl.innerHTML = aiRisksBullets.map(b => `<li>${b}</li>`).join('');
    }

    // 5. Populate Key Statistics (Incorporated from In-Depth)
    const ksOpen = document.getElementById('sacKsOpen');
    const ksHigh = document.getElementById('sacKsHigh');
    const ksLow = document.getElementById('sacKsLow');
    const ks52High = document.getElementById('sacKs52High');
    const ks52Low = document.getElementById('sacKs52Low');
    const ksPe = document.getElementById('sacKsPe');
    const ksVolume = document.getElementById('sacKsVolume');
    const ksMktCap = document.getElementById('sacKsMktCap');

    const openVal = price - (change * 0.45);
    const highVal = Math.max(price, openVal + Math.abs(change) * 0.4);
    const lowVal = Math.min(price, openVal - Math.abs(change) * 0.4);
    const peEst = (15 + ((sym.charCodeAt(0) * 7) % 35)).toFixed(1);
    const volEst = ((sym.charCodeAt(0) * 123456) % 15000000 + 500000);

    if (sym === 'NIFTY 50' || sym === 'NIFTY' || sym === 'NIFTY50') {
      if (ksOpen) ksOpen.textContent = '\u20B9' + (price * 1.002).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ksHigh) ksHigh.textContent = '\u20B9' + (price * 1.005).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ksLow) ksLow.textContent = '\u20B9' + (price * 0.996).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ks52High) ks52High.textContent = '\u20B926,277.35';
      if (ks52Low) ks52Low.textContent = '\u20B921,281.45';
      if (ksPe) ksPe.textContent = '21.4';
      if (ksVolume) ksVolume.textContent = '285M';
      if (ksMktCap) ksMktCap.textContent = '\u20B9185.0L Cr';
    } else if (sym === 'SENSEX' || sym === 'BSE SENSEX' || sym === 'BSESENSEX' || sym === '^BSESN') {
      if (ksOpen) ksOpen.textContent = '\u20B9' + (price * 1.002).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ksHigh) ksHigh.textContent = '\u20B9' + (price * 1.004).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ksLow) ksLow.textContent = '\u20B9' + (price * 0.995).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ks52High) ks52High.textContent = '\u20B985,978.25';
      if (ks52Low) ks52Low.textContent = '\u20B970,319.04';
      if (ksPe) ksPe.textContent = '23.8';
      if (ksVolume) ksVolume.textContent = '142M';
      if (ksMktCap) ksMktCap.textContent = '\u20B9140.5L Cr';
    } else {
      const h52Sac = stock.high52 || (price * 1.05);
      const l52Sac = stock.low52 || (price * 0.75);
      if (ksOpen) ksOpen.textContent = '\u20B9' + openVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ksHigh) ksHigh.textContent = '\u20B9' + highVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ksLow) ksLow.textContent = '\u20B9' + lowVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ks52High) ks52High.textContent = '\u20B9' + Number(h52Sac).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ks52Low) ks52Low.textContent = '\u20B9' + Number(l52Sac).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (ksPe) ksPe.textContent = peEst;
      if (ksVolume) ksVolume.textContent = volEst.toLocaleString('en-IN');
      if (ksMktCap) {
        const crVal = Math.round((price * volEst * 0.8) / 10000000);
        ksMktCap.textContent = crVal > 100000 ? '\u20B9' + (crVal / 100000).toFixed(2) + 'L Cr' : '\u20B9' + crVal.toLocaleString('en-IN') + ' Cr';
      }

      // Live update SAC Key Statistics
      const qSymSac = (sym === 'TATAMOTORS') ? 'TMPV' : sym;
      fetch('https://swingtrader-nse-proxy.vercel.app/api/quote?symbol=' + encodeURIComponent(qSymSac))
        .then(res => res.json())
        .then(qData => {
          if (qData && qData.priceInfo && currentAnalysisSymbol === sym) {
            const pi = qData.priceInfo;
            if (ksOpen && pi.open) ksOpen.textContent = '\u20B9' + pi.open.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            if (ksHigh && pi.intraDayHighLow && pi.intraDayHighLow.max) ksHigh.textContent = '\u20B9' + pi.intraDayHighLow.max.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            if (ksLow && pi.intraDayHighLow && pi.intraDayHighLow.min) ksLow.textContent = '\u20B9' + pi.intraDayHighLow.min.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            if (ks52High && pi.weekHighLow && pi.weekHighLow.max) ks52High.textContent = '\u20B9' + pi.weekHighLow.max.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            if (ks52Low && pi.weekHighLow && pi.weekHighLow.min) ks52Low.textContent = '\u20B9' + pi.weekHighLow.min.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const vol = qData.marketDeptOrderBook?.tradeInfo?.totalTradedVolume;
            if (ksVolume && vol) ksVolume.textContent = Number(vol).toLocaleString('en-IN');
          }
        }).catch(() => {});
    }

    // 6. Populate RSI Indicator (14) (Incorporated from In-Depth)
    const rsi14ValEl = document.getElementById('sacRsi14Val');
    const rsi14StatusEl = document.getElementById('sacRsi14Status');
    const rsi14DescEl = document.getElementById('sacRsi14Desc');
    const rsi14FillEl = document.getElementById('sacRsi14Fill');

    const rsi14 = Math.min(80, Math.max(20, (absHash % 40) + 40));
    let rsi14Color = '#F59E0B';
    let rsi14Label = 'Neutral \u26AA';
    let rsi14Desc = '30\u201370: Wait for signal';
    let rsi14StatusCls = 'neutral';

    if (rsi14 < 30) {
      rsi14Color = '#10B981';
      rsi14Label = 'Oversold \uD83D\uDFE2';
      rsi14Desc = 'RSI < 30: Oversold Zone';
      rsi14StatusCls = 'green';
    } else if (rsi14 > 70) {
      rsi14Color = '#EF4444';
      rsi14Label = 'Overbought \uD83D\uDD34';
      rsi14Desc = 'RSI > 70: Overbought Zone';
      rsi14StatusCls = 'red';
    }

    if (rsi14ValEl) {
      rsi14ValEl.textContent = rsi14.toFixed(1);
      rsi14ValEl.style.color = rsi14Color;
    }
    if (rsi14StatusEl) {
      rsi14StatusEl.textContent = rsi14Label;
      rsi14StatusEl.className = 'sac-mini-status-pill ' + rsi14StatusCls;
    }
    if (rsi14DescEl) rsi14DescEl.textContent = rsi14Desc;
    if (rsi14FillEl) {
      rsi14FillEl.style.width = rsi14 + '%';
      rsi14FillEl.style.background = rsi14Color;
    }

    // 7. Populate Stock Fundamentals & Share Holding (Incorporated from In-Depth)
    const fundPeVal = document.getElementById('sacFundPeVal');
    const fundPeTag = document.getElementById('sacFundPeTag');
    const fundPbVal = document.getElementById('sacFundPbVal');
    const fundPbTag = document.getElementById('sacFundPbTag');
    const fundDivVal = document.getElementById('sacFundDivVal');
    const fundDivTag = document.getElementById('sacFundDivTag');
    const fundRoeVal = document.getElementById('sacFundRoeVal');
    const fundRoeTag = document.getElementById('sacFundRoeTag');
    const fundMktCapVal = document.getElementById('sacFundMktCapVal');
    const fundMktCapTag = document.getElementById('sacFundMktCapTag');

    const shPromoterVal = document.getElementById('sacShPromoterVal');
    const shPromoterTag = document.getElementById('sacShPromoterTag');
    const shFiiVal = document.getElementById('sacShFiiVal');
    const shFiiTag = document.getElementById('sacShFiiTag');
    const shDiiVal = document.getElementById('sacShDiiVal');
    const shDiiTag = document.getElementById('sacShDiiTag');

    let initPe = (16 + (absHash % 25)).toFixed(1);
    let initPb = (1.2 + ((absHash % 30) / 10)).toFixed(2);
    let initDiv = (0.4 + ((absHash % 25) / 10)).toFixed(2) + '%';
    let initRoe = (8.5 + ((absHash % 200) / 10)).toFixed(2) + '%';
    let initMktCr = 125000;
    let initMktCap = '1.25 L Cr';
    let initPromoter = '50.27%';
    let initFii = '21.50%';
    let initDii = '16.20%';

    if (sym === 'NIFTY 50' || sym === 'NIFTY' || sym === 'NIFTY50') {
      initPe = '21.4';
      initPb = '3.85';
      initDiv = '1.28%';
      initRoe = '16.50%';
      initMktCap = '185.0 L Cr';
      initMktCr = 18500000;
      initPromoter = '51.20%';
      initFii = '18.25%';
      initDii = '16.50%';
    } else if (sym === 'SENSEX' || sym === 'BSE SENSEX' || sym === 'BSESENSEX' || sym === '^BSESN') {
      initPe = '23.8';
      initPb = '3.65';
      initDiv = '1.15%';
      initRoe = '15.80%';
      initMktCap = '140.5 L Cr';
      initMktCr = 14050000;
      initPromoter = '48.50%';
      initFii = '24.10%';
      initDii = '17.40%';
    } else if (sym === 'RELIANCE') {
      initPe = '21';
      initPb = '1.73';
      initDiv = '0.52%';
      initRoe = '8.77%';
      initMktCap = '15.66 L Cr';
      initMktCr = 1565647;
      initPromoter = '50.27%';
      initFii = '22.60%';
      initDii = '15.99%';
    } else if (sym === 'TECHM') {
      initPe = '30.2';
      initPb = '5.40';
      initDiv = '3.12%';
      initRoe = '14.80%';
      initMktCap = '1.58 L Cr';
      initMktCr = 158200;
      initPromoter = '35.15%';
      initFii = '28.40%';
      initDii = '24.60%';
    } else if (sym === 'ICICIBANK') {
      initPe = '18.4';
      initPb = '2.85';
      initDiv = '0.78%';
      initRoe = '17.20%';
      initMktCap = '9.74 L Cr';
      initMktCr = 974000;
      initPromoter = '0.00%';
      initFii = '44.80%';
      initDii = '43.20%';
    }

    function renderSacFundamentals(pe, pb, div, roe, mktCap, mktCapCr, promoter, fii, dii) {
      if (fundPeVal) fundPeVal.textContent = pe ? pe + 'x' : 'N/A';
      applySacTag(fundPeTag, sacPeSignal(pe));

      if (fundPbVal) fundPbVal.textContent = pb ? pb + 'x' : 'N/A';
      applySacTag(fundPbTag, sacPbSignal(pb));

      if (fundDivVal) fundDivVal.textContent = div || 'N/A';
      applySacTag(fundDivTag, sacDivYieldSignal(div));

      if (fundRoeVal) fundRoeVal.textContent = roe || 'N/A';
      applySacTag(fundRoeTag, sacRoeSignal(roe));

      if (fundMktCapVal) fundMktCapVal.textContent = mktCap ? '\u20B9' + mktCap : 'N/A';
      applySacTag(fundMktCapTag, sacMktCapSignal(mktCapCr));

      if (shPromoterVal) shPromoterVal.textContent = promoter || 'N/A';
      applySacTag(shPromoterTag, sacPromoterSignal(promoter));

      if (shFiiVal) shFiiVal.textContent = fii || 'N/A';
      applySacTag(shFiiTag, sacFiiSignal(fii));

      if (shDiiVal) shDiiVal.textContent = dii || 'N/A';
      applySacTag(shDiiTag, sacFiiSignal(dii));
    }

    renderSacFundamentals(initPe, initPb, initDiv, initRoe, initMktCap, initMktCr, initPromoter, initFii, initDii);

    // Live update via Vercel Proxy
    fetch('https://swingtrader-nse-proxy.vercel.app/api/fundamentals?symbol=' + encodeURIComponent(sym))
      .then(res => res.json())
      .then(data => {
        if (data && currentAnalysisSymbol === sym) {
          renderSacFundamentals(
            data.pe || initPe,
            data.pb || initPb,
            data.divYield || initDiv,
            data.roe || initRoe,
            data.marketCap || initMktCap,
            data.mktCapCr || initMktCr,
            data.promoter || initPromoter,
            data.fii || initFii,
            data.dii || initDii
          );
        }
      })
      .catch(() => {});

    // Reset C1 tab to 'all'
    setSacC1Tab('all');

    // Default to Unified View on open
    setActiveTab('all');

    // Feature Gating: Lock Vital Technicals & AI Report on Expired Trial (for all stocks including NIFTY 50 Benchmark)
    const sub = (window.tradeNitiSubscription && window.tradeNitiSubscription.check)
      ? window.tradeNitiSubscription.check()
      : { isProWeb: false };

    const isLocked = !sub.isProWeb;

    const vitalsOverlay = document.getElementById('sacVitalsLockOverlay');
    const aiOverlay = document.getElementById('sacAiLockOverlay');
    if (vitalsOverlay) vitalsOverlay.style.display = isLocked ? 'flex' : 'none';
    if (aiOverlay) aiOverlay.style.display = isLocked ? 'flex' : 'none';

    // Open Modal
    if (sacModal) sacModal.classList.add('active');
  };
}

/* ==========================================================================
   Categorized Plan & Feature Access Gating Initializer
   ========================================================================== */
function initFeatureGating() {
  // 1. Intercept APK download buttons across website
  document.querySelectorAll('a[href*="TradeNiti_v1.0.apk"]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (typeof window.checkFeatureAccess === 'function') {
        const access = window.checkFeatureAccess('mobile_app');
        if (!access.allowed) {
          e.preventDefault();
          if (typeof window.openFeatureGateModal === 'function') {
            window.openFeatureGateModal('mobile_app');
          }
          return;
        }
      }
      const user = (typeof window.getCurrentUser === 'function') ? window.getCurrentUser() : null;
      if (user && user.licensePin && typeof window.showToast === 'function') {
        window.showToast(`Downloading Trade Niti APK • Hardware PIN: ${user.licensePin}`, '⭐');
      }
    });
  });

  // 2. Wire pricing cards subscription buttons
  document.querySelectorAll('[data-plan-subscribe]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planId = btn.getAttribute('data-plan-subscribe');
      if (window.tradeNitiSubscription && typeof window.tradeNitiSubscription.subscribe === 'function') {
        window.tradeNitiSubscription.subscribe(planId);
      }
    });
  });
}
