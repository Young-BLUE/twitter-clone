import React, { useState } from "react";
import { authService, firebaseInstances } from "../firebaseInstance";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount(!newAccount);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else {
      //...
    }
    const result = await signInWithPopup(authService, provider);
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name={"email"}
          type={"email"}
          placeholder={"Email"}
          required={true}
          value={email}
          onChange={onChange}
        />
        <input
          name={"password"}
          type={"password"}
          placeholder={"Password"}
          required={true}
          value={password}
          onChange={onChange}
        />
        <input
          type={"submit"}
          value={newAccount ? "Create an Account" : "Log in"}
        />
      </form>
      {error}
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create An Account"}
      </span>
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
