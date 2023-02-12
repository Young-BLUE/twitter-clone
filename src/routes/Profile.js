import React, { useEffect } from "react";
import { authService, dbCollection, dbService } from "../firebaseInstance";
import { useNavigate } from "react-router-dom";
import { orderBy, query, where, getDocs } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyDtweets = async () => {
    const q = query(
      dbCollection(dbService, "dtweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  useEffect(() => {
    getMyDtweets();
  }, []);
  return <button onClick={onLogOutClick}>Log Out</button>;
};

export default Profile;
