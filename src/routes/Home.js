import React, { useEffect, useState } from "react";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbGetCollection,
  storageService,
} from "../firebaseInstance";
import {
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Dtweet from "../components/Dtweet";
import { v4 as uuidv4 } from "uuid";
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
