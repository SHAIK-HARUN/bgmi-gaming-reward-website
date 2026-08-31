import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';

// Read Firebase Config from Environment Variables (Netlify / Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyApiKeyForLocalFallback123",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "bgmi-gaming-reward"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bgmi-gaming-reward",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "bgmi-gaming-reward"}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore Database
export const db = getFirestore(app);

/**
 * Save new submission to Firestore collection "submissions" with 3-second non-blocking timeout
 */
export async function saveSubmissionToFirestore(submissionData) {
  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firestore timeout")), 3000)
    );

    const firestorePromise = addDoc(collection(db, "submissions"), {
      ...submissionData,
      createdAt: new Date().toISOString()
    });

    const docRef = await Promise.race([firestorePromise, timeoutPromise]);
    console.log("Firestore submission saved with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore save fallback (local mode active):", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Update submission status in Firestore by Player ID / Phone Number
 */
export async function updateSubmissionStatusInFirestore(playerId, phoneNumber, newStatus) {
  try {
    const q = query(
      collection(db, "submissions"), 
      where("playerId", "==", String(playerId).trim())
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, "submissions", document.id);
      await updateDoc(docRef, { status: newStatus, updatedAt: new Date().toISOString() });
    });
    return { success: true };
  } catch (error) {
    console.warn("Firestore status update fallback:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Delete submission from Firestore by Player ID / Phone Number
 */
export async function deleteSubmissionFromFirestore(playerId, phoneNumber) {
  try {
    const q = query(
      collection(db, "submissions"), 
      where("playerId", "==", String(playerId).trim())
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, "submissions", document.id);
      await deleteDoc(docRef);
    });
    return { success: true };
  } catch (error) {
    console.warn("Firestore delete fallback:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Simulated OAuth Login for Providers (Twitter, Facebook, Google Play)
 */
export async function loginWithProvider(providerName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          uid: `user_${Date.now()}`,
          displayName: `Verified Player`,
          email: `player_${Date.now().toString().slice(-4)}@gmail.com`,
          provider: providerName,
        }
      });
    }, 600);
  });
}
