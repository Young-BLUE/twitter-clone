import AppRouter from "components/Router";
import { useState } from "react";
import { auth } from "firebaseInstance";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
