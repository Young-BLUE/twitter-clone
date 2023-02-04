import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/profile"} element={<Profile />} />
          </>
        ) : (
          <Route exact path={"/"} element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
