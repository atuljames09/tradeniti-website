/**
 * ============================================================================
 * Trade Niti - Firebase Authentication & Cloud Architecture
 * Company: AK Smart IT Solutions Pvt Ltd
 * ============================================================================
 * Supports:
 * 1. Google 1-Click Sign-In (OAuth Popup)
 * 2. Email / Password Registration & Login
 * 3. User Session State Sync across Browser & Mobile App
 * 4. Graceful Fallback Mode (Runs instantly even before adding production keys)
 */

// 1. Firebase Project Configuration
// NOTE: Replace these placeholder credentials with your Firebase Console Project keys:
// https://console.firebase.google.com -> Project Settings -> General -> Your apps -> Web app
const tradeNitiFirebaseConfig = {
  apiKey: "AIzaSy_YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "tradeniti-app.firebaseapp.com",
  projectId: "tradeniti-app",
  storageBucket: "tradeniti-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

let firebaseInitialized = false;
let authInstance = null;
let googleAuthProvider = null;

// 2. Initialize Firebase SDK safely
function initTradeNitiFirebase() {
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    try {
      // Check if config has been customized by the owner
      const isConfigured = tradeNitiFirebaseConfig.apiKey && 
        !tradeNitiFirebaseConfig.apiKey.includes('YOUR_FIREBASE_API_KEY');

      if (!firebase.apps.length) {
        if (isConfigured) {
          firebase.initializeApp(tradeNitiFirebaseConfig);
          authInstance = firebase.auth();
          googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          googleAuthProvider.addScope('profile');
          googleAuthProvider.addScope('email');
          firebaseInitialized = true;
          console.log('✅ Trade Niti: Live Firebase Auth initialized successfully.');
        } else {
          console.info('ℹ️ Trade Niti: Firebase Config contains template keys. Running in Interactive Ready Mode.');
        }
      } else {
        authInstance = firebase.auth();
        firebaseInitialized = true;
      }
    } catch (err) {
      console.warn('⚠️ Firebase initialization note:', err.message);
    }
  }
}

/**
 * 3. Google Sign-In Handler
 * If live Firebase is configured, launches official Google OAuth popup.
 * If running in template/dev mode, presents the interactive Google account chooser.
 */
async function tradeNitiGoogleSignIn() {
  if (firebaseInitialized && authInstance) {
    try {
      const result = await authInstance.signInWithPopup(googleAuthProvider);
      const user = result.user;
      const formattedUser = {
        uid: user.uid,
        fullName: user.displayName || 'Google Trader',
        username: (user.email || 'trader').split('@')[0],
        email: user.email,
        photoURL: user.photoURL || null,
        provider: 'google',
        initial: (user.displayName || user.email || 'G').charAt(0).toUpperCase(),
        color: '#4285F4',
        plan: 'free_trial',
        planExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      return { success: true, user: formattedUser };
    } catch (error) {
      console.error('Firebase Google Sign-In Error:', error);
      return { success: false, error: error.message };
    }
  }

  // Dev / Template Mode Fallback: Open interactive Google chooser
  return new Promise((resolve) => {
    const googleModal = document.getElementById('googleSelectModal');
    if (googleModal) {
      googleModal.classList.add('active');
    }
    // Listen for custom trigger or resolution
    resolve({ success: true, isDevChooser: true });
  });
}

/**
 * 4. Email/Password Registration
 */
async function tradeNitiRegisterWithEmail(fullName, email, password) {
  if (firebaseInitialized && authInstance) {
    try {
      const userCred = await authInstance.createUserWithEmailAndPassword(email, password);
      const user = userCred.user;
      await user.updateProfile({ displayName: fullName });
      
      const formattedUser = {
        uid: user.uid,
        fullName: fullName,
        username: email.split('@')[0],
        email: email,
        provider: 'firebase_email',
        initial: fullName.charAt(0).toUpperCase(),
        color: '#2563EB',
        plan: 'free_trial',
        planExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
      return { success: true, user: formattedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Local Storage Fallback
  return { success: true, isLocal: true };
}

/**
 * 5. Email/Password Sign-In
 */
async function tradeNitiLoginWithEmail(email, password) {
  if (firebaseInitialized && authInstance) {
    try {
      const userCred = await authInstance.signInWithEmailAndPassword(email, password);
      const user = userCred.user;
      const formattedUser = {
        uid: user.uid,
        fullName: user.displayName || email.split('@')[0],
        username: email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || null,
        provider: 'firebase_email',
        initial: (user.displayName || email).charAt(0).toUpperCase(),
        color: '#2563EB',
        plan: 'free_trial'
      };
      return { success: true, user: formattedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Local Storage Fallback
  return { success: true, isLocal: true };
}

/**
 * 6. Sign Out
 */
async function tradeNitiSignOut() {
  if (firebaseInitialized && authInstance) {
    try {
      await authInstance.signOut();
    } catch (e) {
      console.warn(e);
    }
  }
}

// Export to window
window.tradeNitiFirebase = {
  config: tradeNitiFirebaseConfig,
  init: initTradeNitiFirebase,
  googleSignIn: tradeNitiGoogleSignIn,
  registerEmail: tradeNitiRegisterWithEmail,
  loginEmail: tradeNitiLoginWithEmail,
  signOut: tradeNitiSignOut,
  isLive: () => firebaseInitialized
};

// Auto-run init when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTradeNitiFirebase);
} else {
  initTradeNitiFirebase();
}
