import React, { useState } from "react";
import { dbService, dbAddDoc, dbCollection } from "../firebaseInstance";
import { serverTimestamp } from "firebase/firestore";

const Home = () => {
  const [dtweet, setDtweet] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dbAddDoc(dbCollection(dbService, "dtweets"), {
      dtweet,
      createdAt: serverTimestamp(),
    });
    setDtweet("");
    console.log(result);
  };
  const onChange = (event) => {
    setDtweet(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          placeholder={"What is on your mind?"}
          maxLength={120}
          onChange={onChange}
        />
        <input type={"submit"} value={"dtweet"} />
        {dtweet}
      </form>
    </div>
  );
};

export default Home;
