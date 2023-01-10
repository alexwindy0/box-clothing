import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
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

  
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  //exports firebase firestrore database
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) =>{
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

      const userSnapshot = await getDoc(userDocRef);

      if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();   

        try{
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
          })
        } catch (error){
          console.log('there was an error creating the user', error.message);
        }
      }
      return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }


  //creating anotrher initerface layer through a helper function
  export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword (auth, email, password);
  }


  export const signOutUser = async () => await signOut(auth);


  //Observer listener
  //callback changes whenever a user authenticates.. either sign in or signout
  export const onAuthStateChangedListener =  (callback) => 
  //onAuthStateChanged is an open listener that listenes to the auth state.
    onAuthStateChanged(auth, callback); 