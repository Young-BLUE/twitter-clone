import React from "react";

const Dtweet = ({ dtweetObj, isOwner }) => {
  return (
    <div>
      <h4>{dtweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete</button>
          <button>Add</button>
        </>
      )}
    </div>
  );
};

export default Dtweet;
