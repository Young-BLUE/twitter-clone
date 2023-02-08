import React, { useState } from "react";
import { dbService } from "../firebaseInstance";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Dtweet = ({ dtweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDtweet, setNewDtweet] = useState(dtweetObj.text);
  const dTweetTextRef = doc(dbService, "dtweets", `${dtweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this?");
    if (ok) {
      await deleteDoc(dTweetTextRef);
    }
  };
  const toggleEditing = () => setEditing(!editing);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(dTweetTextRef, { text: newDtweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDtweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              placeholder={"Edit your dtweet"}
              value={newDtweet}
              required={true}
              onChange={onChange}
            />
            <input type={"submit"} value={"Update Dtweet"} />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{dtweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dtweet;
