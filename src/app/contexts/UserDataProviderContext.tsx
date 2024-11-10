"use client"

import { FirebaseError } from "firebase/app"
import { auth } from "../firebase/firebase"
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser, signOut, onAuthStateChanged, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail} from "firebase/auth"
import React, { createContext, use, useContext, useEffect, useState } from "react"
import { checkUserNameExist, createUser, fetchUser, updateUserProfile } from "../dbfunctions/users"
import createOrUpdateDayObject from "../dbfunctions/days"

export type Day={
  uid: string
  dateId : string 
  date : string
  todos ?: string[]
  dayCompleted : boolean
}

// Main userObject TYPE
export type MainUserObject = {
  uid: string
  email: string
  displayName?: string | null
  username?: string
  photoURL?: string
  provider: "google" | "email"
  isEmailVerified: boolean
  createdAt: Date
  lastLoginAt: Date
  customData?: {
    preferences?: any
    streak?: number
    goals?: string[]
    days ?: string[]
  }
}

// userContext TYPE
type UserContextType = {
  user: MainUserObject | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  handleGoogleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
  handleProfileUpdate: (
    uid :string,
    email: string,
    username: string, 
    name : string
  ) => Promise<void>
  handleEmailLogin: (email: string, password: string) => Promise<void>
  handleEmailSignup: (
    email: string,
    password: string,
    username: string, 
    name : string
  ) => Promise<void>
    error: string | null
}


// Mapping the user object

const mapFirebaseUserToMainUserObjectForGoogle = async (
  firebaseUser: FirebaseUser,
): Promise<MainUserObject> => {

  const placeHoldForUserName = `_${crypto.randomUUID().slice(1,10)}`

  const MainUserObject: MainUserObject = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    displayName: firebaseUser.displayName?.toLowerCase(),
    username: firebaseUser.displayName?.replace(/\s+/g, "").toLowerCase().concat(placeHoldForUserName),
    photoURL: firebaseUser.photoURL || "https://picsum.photos/200",
    provider : "google",  // Explicitly typed to match MainUserObject
    isEmailVerified: firebaseUser.emailVerified,
    createdAt: new Date(firebaseUser.metadata.creationTime || ""),
    lastLoginAt: new Date(firebaseUser.metadata.lastSignInTime || ""),
    customData: {
      streak: 0,
    },
  };

  console.log("Main user object",MainUserObject)

  return MainUserObject;
};


const mapFirebaseUserToMainUserObjectForEmail = async (
  firebaseUser: FirebaseUser,
  userName: string,
  name: string
): Promise<MainUserObject> => {

  const MainUserObject: MainUserObject = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    displayName: name,
    username: userName,
    photoURL: firebaseUser.photoURL || "https://picsum.photos/200",
    provider : "email",  // Explicitly typed to match MainUserObject
    isEmailVerified: firebaseUser.emailVerified,
    createdAt: new Date(firebaseUser.metadata.creationTime || ""),
    lastLoginAt: new Date(firebaseUser.metadata.lastSignInTime || ""),
    customData: {
      streak: 0,
    },
  };

  console.log("Main user object",MainUserObject)

  return MainUserObject;
};
// creating the userContext
const userContext = createContext<UserContextType | null>(null)


// Main Component that returns the context provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    // Declarations
  const [user, setUser] = useState<MainUserObject | null>(null)
  const [error, setError ] = useState<string | null>(null)

//   Google Logic
  const handleGoogleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth,provider)
    } catch (err) {
        setError("Something wrong, Try again later!")
    }
  }

//   Email valid or nor Checking
const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  function isValidUsername(username : string) {
    return /^[a-zA-Z0-9_]+$/.test(username);
  }

  const handleProfileUpdate=async (uid :string,email: string, username: string , name: string)=>{
    let error = "";
    if (name.length < 3) {
      error = "Name must be at least 3 characters long!";
    } else if (username.length < 8) {
      error = "Username must be at least 8 characters long!";
    } else if (await checkUserNameExist(username)){
      error = "Username already exists!"
    }
    
    if(error){
      setError(error)
      return
    }

    setError('')
    
    try{
      const response = await updateUserProfile(uid,username,name)
      if(response){
        setUser(response.userObject);
      }
    }catch(err){
      console.log(err)
    }
  }

//   Email signup 
  const handleEmailSignup=async(email : string, password : string, username : string, name : string)=>{
      let error = "";
    
      if (!isValidEmail(email)) {
        error = "Invalid email format. Please check and try again!";
      } else if (password.length < 8) {
        error = "Password must be at least 8 characters long!";
      } else if (name.length < 3) {
        error = "Name must be at least 3 characters long!";
      } else if (username.length < 8) {
        error = "Username must be at least 8 characters long!";
      } else if (!isValidUsername(username)) {
        error = "Username must contain only letters and numbers!";
      } else if (await checkUserNameExist(username)){
        error = "Username already exists!"
      }

      if (error) {
        setError(error);
        return;
      }

      console.log("Name property at handle", name)
      
      setError("");  // Clear errors if all validations pass

      try{
        const firebaseUser =  (await createUserWithEmailAndPassword(auth,email,password)).user;
    if (firebaseUser) {
      const MainUserObject = await mapFirebaseUserToMainUserObjectForEmail(firebaseUser, username, name);
      await createUser(MainUserObject); // Call your DB function
      setUser(MainUserObject); // Set the mapped user
    }
      }catch(error : any){
         console.log("Signup error:", error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email already exists!");
            break;
          default:
            setError("Signup failed. Please try again.");
            break;
        }
      } else {
        setError("Signup failed. Please try again.");
      }
      }
    };

//   Emain Login
const handleEmailLogin=async(email : string, password : string)=>{
    if(password.length<8){
      setError("Password too small!")
      return
    }
    try {
      const firebaseUser = (await signInWithEmailAndPassword(auth, email, password)).user;
      if(firebaseUser.email){
        const MainUserObject = await fetchUser(firebaseUser?.uid)
        setUser(MainUserObject)
      }
      setError(null);
    } catch (error : any) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setError("Invalid email/password");
            break;
          default:
            setError("Login failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.log("Login error:", error);
    }
 }


// Logout of user 
  const handleLogout =async ()=>{
    try{
        await signOut(auth)
        setUser(null)
        setError(null)
    }catch(err){
        alert(err)
    }
  }

  useEffect(()=>{
    async function dayObject(){
      if(user){
        await createOrUpdateDayObject(user)
      }
    }
    dayObject()
  },[user])


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser)=>{
        if(firebaseUser && user===null){
          if(firebaseUser.providerData[0].providerId === "google.com"){
            const MainUserObject = await mapFirebaseUserToMainUserObjectForGoogle(firebaseUser)
            setUser(MainUserObject)
            await createUser(MainUserObject)
          }
          if(!user){
            // const MainUser = await updateLastLoginAt(firebaseUser.uid)
            const MainUserObject = await fetchUser(firebaseUser.uid);
            setUser(MainUserObject);
          }
        }else{
            setUser(null)
        }
    })
    return ()=> unsubscribe()
  },[])


  return (
    <userContext.Provider value ={{ user , handleGoogleLogin , handleLogout, handleEmailSignup , handleEmailLogin , error , setError , handleProfileUpdate }}>{children}</userContext.Provider>
  )
}


//  Using of created userContext
export const useUserContext = ()=>{
    const context = useContext(userContext)
    if(context===null) {
        throw new Error('user context must be used within the provider')
    }
    return context
}