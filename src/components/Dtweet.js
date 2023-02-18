import React, { useState } from "react";
import { dbService, storageService } from "../firebaseInstance";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dtweet = ({ dtweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDtweet, setNewDtweet] = useState(dtweetObj.text);
  const dTweetTextRef = doc(dbService, "dtweets", `${dtweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this?");
    if (ok) {
      await deleteDoc(dTweetTextRef);
      if (dtweetObj.attachmentURL !== "") {
        await deleteObject(ref(storageService, dtweetObj.attachmentURL));
      }
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
    <div className={"dtweet"}>
      {editing ? (
        <>
          <form
            onSubmit={onSubmit}
            className={"container dtweetEdit"}
            style={{ marginTop: "10px" }}
          >
            {editing && dtweetObj.attachmentURL && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={dtweetObj.attachmentURL}
                  className={"dtweetEditImg"}
                />
              </div>
            )}
            <input
              type={"text"}
              placeholder={"Edit your dtweet"}
              value={newDtweet}
              required={true}
              autoFocus={true}
              className={"formInput"}
              onChange={onChange}
            />
            <input
              type={"submit"}
              value={"Update Dtweet"}
              className={"formBtn"}
            />
          </form>
          <span onClick={toggleEditing} className={"formBtn cancelBtn"}>
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{dtweetObj.text}</h4>
          {dtweetObj.attachmentURL && (
            <img src={dtweetObj.attachmentURL} className={"dtweetImg"} />
          )}
          {isOwner && (
            <div className={"dtweet__actions"}>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dtweet;
