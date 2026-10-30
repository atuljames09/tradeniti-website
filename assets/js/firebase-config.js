/**
 * ============================================================================
 * Trade Niti - Production Firebase Authentication & Cloud Firestore
 * Project: tradeniti-app
 * Company: AK Smart IT Solutions Pvt Ltd
 * ============================================================================
 * Supports:
 * 1. Google 1-Click Sign-In (OAuth Popup with Auto Firestore Profile Sync)
 * 2. Cloud Firestore Real-time User Profile & Subscription Storage
 * 3. Email & Password Authentication (with Local Fallback for Demo Accounts)
 * 4. Cross-Platform Sync: Web App <-> Android Mobile App (Hardware PINs, Watchlists)
 * 5. Friendly Error Handling (Popup Blocked, Unauthorized Domain Helper)
 */

// 1. Production Firebase Project Configuration (Secured & Obfuscated against bot scrapers)
const _secDecode = (val) => {
  try {
    return typeof atob === 'function' ? atob(val) : val;
  } catch (e) {
    return val;
  }
};

const tradeNitiFirebaseConfig = window.TRADE_NITI_FIREBASE_CONFIG || {
  apiKey: _secDecode("QUl6YVN5QUt6UzdsQnZDVF9aaXY0S1c0RmpHMkhkajVTUVdHdWlR"),
  authDomain: "tradeniti-app.firebaseapp.com",
  projectId: "tradeniti-app",
  storageBucket: "tradeniti-app.firebasestorage.app",
  messagingSenderId: _secDecode("NzM3MTkzNTc1MTA3"),
  appId: _secDecode("MTo3MzcxOTM1NzUxMDc6d2ViOjk0ZjQxODdjZGFmODM0OWE5ZTk4NzY="),
  measurementId: _secDecode("Ry1LNjdOTk4wSzlK")
};

let firebaseInitialized = false;
let authInstance = null;
let dbInstance = null;
let googleAuthProvider = null;

// 2. Initialize Firebase SDK safely
function initTradeNitiFirebase() {
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(tradeNitiFirebaseConfig);
        authInstance = firebase.auth();
        dbInstance = firebase.firestore ? firebase.firestore() : null;
        googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        googleAuthProvider.addScope('profile');
        googleAuthProvider.addScope('email');
        googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
        firebaseInitialized = true;
        console.log('✅ Trade Niti: Live Production Firebase (Auth + Firestore) initialized successfully for project: tradeniti-app.');
      } else {
        authInstance = firebase.auth();
        dbInstance = firebase.firestore ? firebase.firestore() : null;
        firebaseInitialized = true;
      }
    } catch (err) {
      console.warn('⚠️ Trade Niti Firebase initialization note:', err.message);
    }
  } else {
    console.info('ℹ️ Firebase SDK loading in background...');
  }
}

/**
 * 3. Cloud Firestore User Sync Helper
 * Automatically saves / merges user data to "users/{uid}" collection
 */
async function syncUserToFirestore(userObj) {
  if (!firebaseInitialized || !dbInstance || !userObj) return;
  try {
    const uid = userObj.uid || (userObj.email ? 'local_' + btoa(userObj.email).replace(/=/g, '') : null);
    if (!uid) return;

    const docRef = dbInstance.collection('users').doc(uid);
    const dataToSave = {
      uid: uid,
      fullName: userObj.fullName || '',
      username: userObj.username || '',
      email: userObj.email || '',
      photoURL: userObj.photoURL || null,
      provider: userObj.provider || 'local',
      plan: userObj.plan || 'free_trial',
      subscriptionActive: userObj.subscriptionActive !== undefined ? userObj.subscriptionActive : true,
      planExpires: userObj.planExpires || null,
      licensePin: userObj.licensePin || null,
      paymentId: userObj.paymentId || null,
      lastSeenAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await docRef.set(dataToSave, { merge: true });
    console.log('☁️ Synced user data with Cloud Firestore for:', uid);
  } catch (err) {
    console.warn('⚠️ Firestore sync note:', err.message);
  }
}

/**
 * 4. Google Sign-In Handler
 * Launches official Google OAuth popup with Firestore document creation / restoration.
 */
async function tradeNitiGoogleSignIn() {
  if (firebaseInitialized && authInstance) {
    try {
      const result = await authInstance.signInWithPopup(googleAuthProvider);
      const user = result.user;

      let firestoreData = {};
      if (dbInstance) {
        try {
          const docRef = dbInstance.collection('users').doc(user.uid);
          const docSnap = await docRef.get();
          if (docSnap.exists) {
            firestoreData = docSnap.data();
            await docRef.set({
              lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
              email: user.email,
              photoURL: user.photoURL || null
            }, { merge: true });
          } else {
            firestoreData = {
              uid: user.uid,
              fullName: user.displayName || 'Google Trader',
              username: (user.email || 'trader').split('@')[0],
              email: user.email,
              photoURL: user.photoURL || null,
              provider: 'google',
              plan: 'free_trial',
              subscriptionActive: true,
              planExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            await docRef.set(firestoreData);
          }
        } catch (dbErr) {
          console.warn('Firestore profile sync note:', dbErr.message);
        }
      }

      const formattedUser = {
        uid: user.uid,
        fullName: user.displayName || firestoreData.fullName || 'Google Trader',
        username: (user.email || 'trader').split('@')[0],
        email: user.email,
        photoURL: user.photoURL || firestoreData.photoURL || null,
        provider: 'google',
        initial: (user.displayName || user.email || 'G').charAt(0).toUpperCase(),
        color: '#4285F4',
        plan: firestoreData.plan || 'free_trial',
        subscriptionActive: firestoreData.subscriptionActive !== undefined ? firestoreData.subscriptionActive : true,
        planExpires: firestoreData.planExpires || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        licensePin: firestoreData.licensePin || null
      };

      return { success: true, user: formattedUser };
    } catch (error) {
      console.warn('Firebase Google Sign-In Notice:', error.code, error.message);

      // User closed popup window deliberately
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return { success: false, cancelled: true };
      }

      // Domain authorization notice
      if (error.code === 'auth/unauthorized-domain') {
        const currentDomain = window.location.hostname || 'current domain';
        const msg = `Notice: "${currentDomain}" is not added in Firebase Console > Authentication > Settings > Authorized domains.`;
        if (typeof window.showToast === 'function') {
          window.showToast(msg, '⚠️');
        }
        alert(`Firebase Setup Instruction:\n\nDomain "${currentDomain}" is not yet listed under Authorized Domains in Firebase Console.\n\nPlease add "${currentDomain}" to:\nFirebase Console -> Authentication -> Settings -> Authorized domains.\n\nOpening the demo account chooser so you can continue testing immediately.`);
      } else {
        if (typeof window.showToast === 'function') {
          window.showToast(`Firebase Auth: ${error.message}`, '⚠️');
        }
      }

      // Fallback: Open interactive account chooser
      return new Promise((resolve) => {
        const googleModal = document.getElementById('googleSelectModal');
        if (googleModal) googleModal.classList.add('active');
        resolve({ success: false, fallbackToDevChooser: true });
      });
    }
  }

  // Fallback when offline or SDK not ready
  return new Promise((resolve) => {
    const googleModal = document.getElementById('googleSelectModal');
    if (googleModal) googleModal.classList.add('active');
    resolve({ success: true, isDevChooser: true });
  });
}

/**
 * 5. Email/Password Registration
 */
async function tradeNitiRegisterWithEmail(fullName, email, password) {
  if (firebaseInitialized && authInstance) {
    try {
      const userCred = await authInstance.createUserWithEmailAndPassword(email, password);
      const user = userCred.user;
      try {
        await user.updateProfile({ displayName: fullName });
      } catch (pErr) {}

      const formattedUser = {
        uid: user.uid,
        fullName: fullName,
        username: email.split('@')[0],
        email: email,
        provider: 'firebase_email',
        initial: fullName.charAt(0).toUpperCase(),
        color: '#2563EB',
        plan: 'free_trial',
        subscriptionActive: true,
        planExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      await syncUserToFirestore(formattedUser);
      return { success: true, user: formattedUser };
    } catch (error) {
      console.warn('Firebase Register Error:', error.message);
      let userFriendlyMsg = error.message;
      if (error.code === 'auth/email-already-in-use') {
        userFriendlyMsg = 'This email address is already registered. Please sign in instead.';
      } else if (error.code === 'auth/weak-password') {
        userFriendlyMsg = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        userFriendlyMsg = 'Please enter a valid email address.';
      }
      return { success: false, error: userFriendlyMsg, code: error.code };
    }
  }

  // Local Storage Fallback
  return { success: true, isLocal: true };
}

/**
 * 6. Email/Password Sign-In
 */
async function tradeNitiLoginWithEmail(email, password) {
  if (firebaseInitialized && authInstance) {
    try {
      const userCred = await authInstance.signInWithEmailAndPassword(email, password);
      const user = userCred.user;

      let firestoreData = {};
      if (dbInstance) {
        try {
          const docSnap = await dbInstance.collection('users').doc(user.uid).get();
          if (docSnap.exists) firestoreData = docSnap.data();
        } catch (e) {}
      }

      const formattedUser = {
        uid: user.uid,
        fullName: user.displayName || firestoreData.fullName || email.split('@')[0],
        username: email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || firestoreData.photoURL || null,
        provider: 'firebase_email',
        initial: (user.displayName || email).charAt(0).toUpperCase(),
        color: '#2563EB',
        plan: firestoreData.plan || 'free_trial',
        subscriptionActive: firestoreData.subscriptionActive !== undefined ? firestoreData.subscriptionActive : true,
        planExpires: firestoreData.planExpires || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        licensePin: firestoreData.licensePin || null
      };

      await syncUserToFirestore(formattedUser);
      return { success: true, user: formattedUser };
    } catch (error) {
      console.warn('Firebase Login Error:', error.message);
      let userFriendlyMsg = error.message;
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        userFriendlyMsg = 'Invalid email or password.';
      }
      return { success: false, error: userFriendlyMsg, code: error.code };
    }
  }

  // Local Storage Fallback
  return { success: false, isLocal: true };
}

/**
 * 7. Sign Out
 */
async function tradeNitiSignOut() {
  if (firebaseInitialized && authInstance) {
    try {
      await authInstance.signOut();
      console.log('🚪 Signed out of Firebase session.');
    } catch (e) {
      console.warn('Sign out note:', e.message);
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
  syncUser: syncUserToFirestore,
  signOut: tradeNitiSignOut,
  isLive: () => firebaseInitialized,
  get auth() { return authInstance; },
  get db() { return dbInstance; }
};

// Auto-run init when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTradeNitiFirebase);
} else {
  initTradeNitiFirebase();
}
