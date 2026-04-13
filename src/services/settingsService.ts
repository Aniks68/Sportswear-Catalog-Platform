import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Settings } from '../app/data/products';

const SETTINGS_DOC = 'settings/general';

// Get settings
export const getSettings = async (): Promise<Settings> => {
  try {
    const docRef = doc(db, SETTINGS_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Settings;
    } else {
      // Return default settings if not found
      const defaultSettings: Settings = {
        whatsappNumber: '+2348012345678',
      };
      await setDoc(docRef, defaultSettings);
      return defaultSettings;
    }
  } catch (error) {
    console.error('Error getting settings:', error);
    throw error;
  }
};

// Update settings
export const updateSettings = async (settings: Settings): Promise<void> => {
  try {
    const docRef = doc(db, SETTINGS_DOC);
    await setDoc(docRef, settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};
