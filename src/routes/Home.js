import React, { useEffect, useState } from "react";
import { dbCollection, dbService } from "../firebaseInstance";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import Dtweet from "../components/Dtweet";
import DtweetFactory from "../components/DtweetFactory";

const Home = ({ userObj }) => {
  const [dtweets, setDtweets] = useState([]);

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
    <div className="container">
      <DtweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
