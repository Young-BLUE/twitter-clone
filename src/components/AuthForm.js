import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const toggleAccount = () => setNewAccount(!newAccount);

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

  return (
    <>
      <form onSubmit={onSubmit} className={"container"}>
        <input
          className={"authInput"}
          name={"email"}
          type={"email"}
          placeholder={"Email"}
          required={true}
          value={email}
          onChange={onChange}
        />
        <input
          className={"authInput"}
          name={"password"}
          type={"password"}
          placeholder={"Password"}
          required={true}
          value={password}
          onChange={onChange}
        />
        <input
          type={"submit"}
          className={"authInput authSubmit"}
          value={newAccount ? "Create an Account" : "Log in"}
        />
      </form>
      {error && <span className={"authError"}>{error}</span>}
      <span onClick={toggleAccount} className={"authSwitch"}>
        {newAccount ? "Sign In" : "Create An Account"}
      </span>
    </>
  );
};

export default AuthForm;
