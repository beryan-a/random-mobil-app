import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getFirestore, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  onSnapshot,
  WhereFilterOp
} from '@react-native-firebase/firestore';
import crashlytics from '../error-handling/crashlytics';

// Get Firestore instance
const db = getFirestore();

/**
 * Get all documents from a collection
 */
export const getCollection = async (collectionName: string): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: any[] = [];
    
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return data;
  } catch (error) {
    crashlytics.recordError(error as Error);
    return [];
  }
};

/**
 * Query documents in a collection
 */
export const queryDocuments = async (
  collectionName: string, 
  fieldName: string, 
  operator: WhereFilterOp, 
  value: any
): Promise<any[]> => {
  try {
    const q = query(
      collection(db, collectionName), 
      where(fieldName, operator, value)
    );
    
    const querySnapshot = await getDocs(q);
    const data: any[] = [];
    
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return data;
  } catch (error) {
    crashlytics.recordError(error as Error);
    return [];
  }
};

/**
 * Add a document to a collection
 */
export const addDocument = async (collectionName: string, data: any): Promise<any | null> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    crashlytics.recordError(error as Error);
    return null;
  }
};

/**
 * Set a document with a specific ID
 */
export const setDocument = async (
  collectionName: string, 
  documentId: string, 
  data: any
): Promise<any | null> => {
  try {
    await setDoc(doc(db, collectionName, documentId), data);
    return { id: documentId, ...data };
  } catch (error) {
    crashlytics.recordError(error as Error);
    return null;
  }
};

/**
 * Update a document
 */
export const updateDocument = async (
  collectionName: string, 
  documentId: string, 
  data: any
): Promise<boolean> => {
  try {
    await updateDoc(doc(db, collectionName, documentId), data);
    return true;
  } catch (error) {
    crashlytics.recordError(error as Error);
    return false;
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (
  collectionName: string, 
  documentId: string
): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    return true;
  } catch (error) {
    crashlytics.recordError(error as Error);
    return false;
  }
};

/**
 * Subscribe to changes in a collection
 */
export const subscribeToCollection = (
  collectionName: string, 
  callback: (data: any[]) => void
): (() => void) => {
  const unsubscribe = onSnapshot(collection(db, collectionName), (querySnapshot) => {
    const data: any[] = [];
    
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    callback(data);
  }, (error) => {
    crashlytics.recordError(error);
  });
  
  return unsubscribe;
};

export default {
  getCollection,
  queryDocuments,
  addDocument,
  setDocument,
  updateDocument,
  deleteDocument,
  subscribeToCollection
};