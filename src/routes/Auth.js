import React, { useState } from "react";
import { authService, firebaseInstances } from "../firebaseInstance";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button>Continue with Email</button>
        <button name={"google"} onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
