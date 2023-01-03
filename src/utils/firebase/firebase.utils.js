import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
 } from 'firebase/auth';

 import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
 } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEfOtVyGFjzj3IWg3k4O7lX1MZgflg_y4",
    authDomain: "box-clothing-db.firebaseapp.com",
    projectId: "box-clothing-db",
    storageBucket: "box-clothing-db.appspot.com",
    messagingSenderId: "540021865608",
    appId: "1:540021865608:web:a7b22c6654614644e8f33d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);

      const userSnapshot = await getDoc(userDocRef);

      if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();   

        try{
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
          })
        } catch (error){
          console.log('there was an error creating the user', error.message);
        }
      }
      return userDocRef;
  }