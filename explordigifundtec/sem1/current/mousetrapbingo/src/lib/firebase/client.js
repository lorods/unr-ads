import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const isFirebaseConfigured = Boolean(
	env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID
);

const firebaseConfig = {
	apiKey: env.VITE_FIREBASE_API_KEY || 'demo-api-key',
	authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-mousetrapbingo.firebaseapp.com',
	projectId: env.VITE_FIREBASE_PROJECT_ID || 'demo-mousetrapbingo',
	storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-mousetrapbingo.appspot.com',
	messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
	appId: env.VITE_FIREBASE_APP_ID || '1:000000000000:web:000000000000'
};

if (env.VITE_FIREBASE_MEASUREMENT_ID) {
	firebaseConfig.measurementId = env.VITE_FIREBASE_MEASUREMENT_ID;
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

/**
 * Inicializa o Firebase Analytics apenas em ambiente de navegador compatível.
 */
export async function initAnalytics() {
	if (isFirebaseConfigured && typeof window !== 'undefined' && (await isSupported())) {
		return getAnalytics(app);
	}
	return null;
}

