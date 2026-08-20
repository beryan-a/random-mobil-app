// Example of properly using Firebase modular API according to the migration guide
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
  onSnapshot 
} from '@react-native-firebase/firestore';
import { recordError } from '@/services/error-handling/crashlytics';

// Get Firestore instance
const db = getFirestore();

export const FirestoreHelper = {
  // Get a collection of documents
  getCollection: async (collectionName: string) => {
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
      recordError(error as Error);
      return [];
    }
  },
  
  // Query documents in a collection
  queryDocuments: async (collectionName: string, fieldName: string, operator: any, value: any) => {
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
      recordError(error as Error);
      return [];
    }
  },
  
  // Add a document to a collection
  addDocument: async (collectionName: string, data: any) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      recordError(error as Error);
      return null;
    }
  },
  
  // Set a document with a specific ID
  setDocument: async (collectionName: string, documentId: string, data: any) => {
    try {
      await setDoc(doc(db, collectionName, documentId), data);
      return { id: documentId, ...data };
    } catch (error) {
      recordError(error as Error);
      return null;
    }
  },
  
  // Update a document
  updateDocument: async (collectionName: string, documentId: string, data: any) => {
    try {
      await updateDoc(doc(db, collectionName, documentId), data);
      return true;
    } catch (error) {
      recordError(error as Error);
      return false;
    }
  },
  
  // Delete a document
  deleteDocument: async (collectionName: string, documentId: string) => {
    try {
      await deleteDoc(doc(db, collectionName, documentId));
      return true;
    } catch (error) {
      recordError(error as Error);
      return false;
    }
  },
  
  // Real-time listener for a collection
  subscribeToCollection: (collectionName: string, callback: (data: any[]) => void) => {
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
      recordError(error as Error);
    });
    
    return unsubscribe;
  }
};