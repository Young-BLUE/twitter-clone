import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  dbAddDoc,
  dbCollection,
  dbService,
  storageService,
} from "../firebaseInstance";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";

const DtweetFactory = ({ userObj }) => {
  const [dtweet, setDtweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentURL = await getDownloadURL(response.ref);
    }
    await dbAddDoc(dbCollection(dbService, "dtweets"), {
      text: dtweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      attachmentURL,
    });
    setDtweet("");
    setAttachment("");
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

  return (
    <form onSubmit={onSubmit}>
      <input
        type={"text"}
        placeholder={"What is on your mind?"}
        maxLength={120}
        value={dtweet}
        onChange={onChange}
      />
      <input type={"file"} accept={"image/*"} onChange={onFileChange} />
      <input type={"submit"} value={"dtweet"} />
      {attachment && (
        <div>
          <img src={attachment} width={"60px"} height={"80px"} />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
      {dtweet}
    </form>
  );
};

export default DtweetFactory;
