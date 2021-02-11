import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCXUekHw4AqhHH_cUw2bkv_uy_fjDQNKR4",
    authDomain: "skillhome-5c78a.firebaseapp.com",
    databaseURL: "https://skillhome-5c78a-default-rtdb.firebaseio.com",
    projectId: "skillhome-5c78a",
    storageBucket: "skillhome-5c78a.appspot.com",
    messagingSenderId: "288456994514",
    appId: "1:288456994514:web:3f2c1da544fdcef992070b"
};

export const createUserProfileDocument=async(userAuth,additionalData)=>{
    if(!userAuth){
        console.log("Currently Not Any User...");
        return;
    }
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapshot=await userRef.get();
    if(!snapshot.exists){
        const {displayName,email}=userAuth;
        const createAt=new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("error creating user",error.message);
        }
    }
    return userRef;
};

export const getCurrentUser=()=>{
    return new Promise((resolve,reject)=>{
        const unsubscribe=auth.onAuthStateChanged(userAuth=>{
            unsubscribe();
            resolve(userAuth);
        },reject)
    });
}

firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

export default firebase;

export const emailProvider=new firebase.auth.EmailAuthProvider();

