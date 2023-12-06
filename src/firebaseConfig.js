// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTO2JD7A5JroLH7AFSdOzi8yNC9Fc1mis",
  authDomain: "shoe-f7e70.firebaseapp.com",
  projectId: "shoe-f7e70",
  storageBucket: "shoe-f7e70.appspot.com",
  messagingSenderId: "610571528621",
  appId: "1:610571528621:web:d9dd3d42d152bf4fc59924"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;