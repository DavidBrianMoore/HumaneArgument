import { db } from "./firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  Timestamp 
} from "firebase/firestore";

export interface Annotation {
  id: string; // chapterId
  content: string;
  updatedAt: any;
}

const STORAGE_KEY_PREFIX = "humane_argument_note_";

export const saveAnnotation = async (chapterId: string, content: string) => {
  try {
    // Attempt Firestore save
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "your_api_key") {
      const docRef = doc(db, "annotations", chapterId);
      await setDoc(docRef, {
        content,
        updatedAt: Timestamp.now(),
      }, { merge: true });
    }
  } catch (error) {
    console.warn("Firestore save failed, falling back to local storage", error);
  } finally {
    // Always save locally as fallback/cache
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${chapterId}`, content);
  }
};

export const getAnnotation = async (chapterId: string): Promise<string | null> => {
  // Check local storage first (instant)
  const localContent = localStorage.getItem(`${STORAGE_KEY_PREFIX}${chapterId}`);
  
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "your_api_key") {
      const docRef = doc(db, "annotations", chapterId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.content;
      }
    }
  } catch (error) {
    console.warn("Firestore load failed", error);
  }

  return localContent;
};

export const subscribeToAnnotation = (chapterId: string, callback: (content: string) => void) => {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "your_api_key") return () => {};

    const docRef = doc(db, "annotations", chapterId);
    return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data().content);
        }
    });
};
