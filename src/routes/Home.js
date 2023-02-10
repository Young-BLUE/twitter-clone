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
import { ref, uploadString } from "firebase/storage";
import Dtweet from "../components/Dtweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [dtweet, setDtweet] = useState("");
  const [dtweets, setDtweets] = useState([]);
  const [attachment, setAttachment] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    // 사진을 먼저 업로드하고 url을 받아 dtweet에 함께 저장
    // await dbAddDoc(dbCollection(dbService, "dtweets"), {
    //   text: dtweet,
    //   createdAt: serverTimestamp(),
    //   creatorId: userObj.uid,
    // });
    // setDtweet("");
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(fileRef, attachment, "data_url");
    console.log(response);
  };
  const onChange = (event) => {
    setDtweet(event.target.value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
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
        <input type={"file"} accept={"image/*"} onChange={onFileChange} />
        <input type={"submit"} value={"dtweet"} />
        {attachment && (
          <div>
            <img src={attachment} width={"80px"} height={"50px"} />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
