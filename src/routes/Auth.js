import React, { useState } from "react";
import { authService } from "../firebaseInstance";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);

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

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        // create Account
        createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            console.log(user);
          }
        );
      } else {
        // log in
        signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;
            console.log(user);
          }
        );
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
      <div>
        <button>Continue with Email</button>
        <button>Continue with Google</button>
      </div>
    </div>
  );
};

export default Auth;
