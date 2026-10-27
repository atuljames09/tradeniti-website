# Trade Niti Official Website & Product Showcase

An institutional-grade product showcase and high-converting landing website for the **Trade Niti** Android Mobile Application, developed by **AK Smart IT Solutions Pvt Ltd**.

---

## 🌟 Key Features Showcased on the Website

1. **Algorithmic Swing V3 Confluence Engine (Interactive Calculator)**:
   - Live interactive simulator testing Daily (50%), Weekly (30%), and Monthly (20%) indicator inputs.
   - Live animated SVG Speedometer / Confluence Arc Gauge (0% to 100%).
   - Real-time **4-Gate Execution System** verification (Gate 0: Market Regime, Gate 1: Min Score Threshold, Gate 2: Setup Validity & 1:2 RRR, Gate 3: Liquidity & ATR Volatility).
   - Automated Trade Plan generator (Entry, Stop Loss, Target 1, Target 2, Fibonacci levels).

2. **EMA-9 / EMA-21 Collide Radar (Live Collision Simulator)**:
   - Automated detection of intraday and swing momentum crossover events.
   - Multi-timeframe monitoring (5m with 10m expiry, 15m with 30m expiry, 1h with 120m expiry).
   - "Simulate Live EMA HIT Alert" interactive test button.

3. **Stock Monitoring Center (SMC) & MTR Alert System**:
   - Interactive **Monitor Target Rate (MTR)** slider.
   - Demonstrates the automated ±3% notification trigger window with background 30s polling simulation.
   - Local stock trade notes and level annotations.

4. **Real-Time Market Screener (360+ Indian NSE Stocks)**:
   - Searchable, sortable, and category-filtered table (All, Bullish ≥70%, Neutral, Bearish <50%, Top Gainers, Top Losers).
   - Multi-column sort by Analysis %, Current Price, Change %, 52-Week High, 52-Week Low.

5. **Daily Institutional FII / DII Flow Tracker**:
   - Cash market daily institutional net purchases and sales in ₹ Crores.
   - Correlated alongside NIFTY 50 closing index points and percentage moves.

6. **Interactive Mobile App Screen Tour**:
   - High-fidelity smartphone mockup cycling through 6 core Jetpack Compose screens (Dashboard, AI Analysis & Vital Technicals, EMA Collide, SMC Radar, Screener, Trade Journal).

7. **Vercel Mumbai (bom1) Serverless Proxy & Security Architecture**:
   - Zero-delay domestic Indian IP proxy avoiding NSE rate-limiting.
   - Local SHA-256 PIN authentication and offline SQLite Room DB.
   - 30-Day hardware-bound trial activation system.

8. **Direct APK Download**:
   - Direct download link pointing to `TradeNiti_v1.0.apk` with package specs (23.1 MB, Android 8.0+).
   - Step-by-step 3-step installation walkthrough.

9. **Regulatory & Compliance Ready**:
   - Full SEBI compliance disclaimers and risk disclosure framework.

---

## 🚀 How to Run & Preview

### Option 1: Direct Browser Launch
Simply open `index.html` in any web browser (Chrome, Edge, Opera, Firefox). No build step, node_modules, or server setup required!

```powershell
Start-Process "C:\Users\Dell\.gemini\antigravity\scratch\TradeNiti-Website\index.html"
```

### Option 2: Zero-Dependency Local Web Server
A built-in lightweight PowerShell HTTP server (`start_server.ps1`) is included. It uses .NET `HttpListener` with zero dependencies:

```powershell
powershell -ExecutionPolicy Bypass -File .\start_server.ps1
```
Then visit **`http://localhost:5000`** in your browser.

---

## 📁 Project File Structure

```
TradeNiti-Website/
├── index.html                     # Main landing page & showcase
├── start_server.ps1               # Zero-dependency local web server (PowerShell)
├── README.md                      # Project documentation
├── downloads/
│   └── TradeNiti_v1.0.apk         # Trade Niti Android APK (v1.0 • 23.1 MB)
└── assets/
    ├── css/
    │   └── style.css              # Custom styling, dark/light theme, responsive grid
    ├── js/
    │   └── main.js                # Interactive simulators, charts, screener, filters
    └── images/
        └── app_icon.png           # High-resolution Trade Niti app icon
```

---

## 🏢 Credits & Legal

- **Application**: Trade Niti (Stock Analyzer for Swing Trading)
- **Company**: AK Smart IT Solutions Pvt Ltd
- **Market Compatibility**: National Stock Exchange of India (NSE) & Bombay Stock Exchange (BSE)
- **Year**: 2026
