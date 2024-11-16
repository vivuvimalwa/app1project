// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSS48nufHMoer_qTMuQYj6UJ8cDnkbGQ4",
  authDomain: "fir-auth-7c9a4.firebaseapp.com",
  projectId: "fir-auth-7c9a4",
  storageBucket: "fir-auth-7c9a4.appspot.com",
  messagingSenderId: "922923588175",
  appId: "1:922923588175:web:70519c19475b15ccd2683a"
};

// Initialize Firebase and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export the auth object for use in other files
export { auth };
