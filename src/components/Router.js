import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path={"/"} element={<Home userObj={userObj} />} />
            <Route
              exact
              path={"/profile"}
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </div>
        ) : (
          <Route exact path={"/"} element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
