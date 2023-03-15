import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Authenticated from "./util/Authenticated";
import UnAuthenticated from "./util/UnAuthenticated";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <Routes>
      <Route
        path="signup"
        element={
          <UnAuthenticated>
            <Signup />
          </UnAuthenticated>
        }
      />
      <Route
        path="signin"
        element={
          <UnAuthenticated>
            <Signin />
          </UnAuthenticated>
        }
      />
      <Route
        path=""
        element={
          <Authenticated>
            <ListPage />
          </Authenticated>
        }
      />
    </Routes>
  );
}

export default App;
