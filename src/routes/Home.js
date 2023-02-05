import React, { useEffect, useState } from "react";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbGetCollection,
} from "../firebaseInstance";
import { serverTimestamp } from "firebase/firestore";

const Home = () => {
  const [dtweet, setDtweet] = useState("");
  const [dtweets, setDtweets] = useState([]);

  const getTweets = async () => {
    const querySnapshot = await dbGetCollection(
      dbCollection(dbService, "dtweets")
    );
    querySnapshot.forEach((doc) => {
      const dtweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setDtweets((prev) => [dtweetObj, ...prev]);
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbAddDoc(dbCollection(dbService, "dtweets"), {
      dtweet,
      createdAt: serverTimestamp(),
    });
    setDtweet("");
  };
  const onChange = (event) => {
    setDtweet(event.target.value);
  };

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    console.log(dtweets);
  }, [dtweets]);

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
      <div>
        {dtweets.map((data, index) => {
          return (
            <div key={data.id + index}>
              <h4>{data.dtweet}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
