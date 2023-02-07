import React, { useEffect, useState } from "react";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbGetCollection,
} from "../firebaseInstance";
import {
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Dtweet from "../components/Dtweet";

const Home = ({ userObj }) => {
  const [dtweet, setDtweet] = useState("");
  const [dtweets, setDtweets] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbAddDoc(dbCollection(dbService, "dtweets"), {
      text: dtweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    });
    setDtweet("");
  };
  const onChange = (event) => {
    setDtweet(event.target.value);
  };

  useEffect(() => {
    const q = query(
      dbCollection(dbService, "dtweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const dtweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDtweets(dtweetArr);
    });
  }, []);

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
            <Dtweet
              key={data.id}
              dtweetObj={data}
              isOwner={data.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
