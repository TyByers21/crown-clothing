import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
getFirestore,
doc,
getDoc,
setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_31XRjyeWGToUeHJ6zkukZLXCyDRmNjE",
    authDomain: "gotham-clothing-db.firebaseapp.com",
    projectId: "gotham-clothing-db",
    storageBucket: "gotham-clothing-db.appspot.com",
    messagingSenderId: "979933778266",
    appId: "1:979933778266:web:ac8272421962c913612363"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);// Your web app's Firebase configuration

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

//if user data does NOT exist
//create/set the document with the data from userAuth in my collection
if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;

    //create a timestamp to know when users are signing in
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName, 
            email, 
            createdAt
        })
    } catch (error) {
        console.log('error creating the user', error.message)
    }
}

return userDocRef;

  }
