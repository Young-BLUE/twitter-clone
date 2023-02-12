import React, { useEffect, useState } from "react";
import { authService, dbCollection, dbService } from "../firebaseInstance";
import { useNavigate } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  // const getMyDtweets = async () => {
  //   const q = query(
  //     dbCollection(dbService, "dtweets"),
  //     where("creatorId", "==", userObj.uid)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data());
  //   });
  // };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
  };

  useEffect(() => {
    getMyDtweets();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          placeholder={"Display Name"}
          onChange={onChange}
          value={newDisplayName}
        />
        <input type={"submit"} value={"Update Profile"} />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
