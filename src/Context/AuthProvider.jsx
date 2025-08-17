import React, { useEffect, useState } from "react";
import {createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut,signInWithPopup,GoogleAuthProvider, updateProfile 
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.Config";
import { Authcontext } from "./AuthContext";



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  
       // Load theme from localStorage
       useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
      }, []);
  
  //  theme 
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };


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
        // console.log("sing out done");
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

  const userInfo = {updateUserProfile,toggleTheme,theme, registration, singIn, logout,user,loading ,singInWithGoogle};

  return <Authcontext value={userInfo}>
    <div data-theme={theme} className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
    {children}
    </div>
    </Authcontext>;
};

export default AuthProvider;
