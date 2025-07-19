import React, { useEffect, useState } from "react";
import {createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut,signInWithPopup,GoogleAuthProvider, updateProfile 
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.Config";
import { Authcontext } from "./AuthContext";



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Registration user
  const registration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout user
  const logout = () => {
    return signOut(auth)
      .then(() => {
        console.log("sing out done");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // google login
  const provider = new GoogleAuthProvider();
  const singInWithGoogle = ()=> {
    return signInWithPopup(auth,provider)
  }

  const updateUserProfile = profileInfo => {
    return updateProfile(auth.currentUser,profileInfo)
  }  


  //Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,currentUser => {
      setUser(currentUser);
      console.log(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const userInfo = {updateUserProfile, registration, singIn, logout,user,loading ,singInWithGoogle};

  return <Authcontext value={userInfo}>{children}</Authcontext>;
};

export default AuthProvider;
