import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="" element={<ListPage />} />
    </Routes>
  );
}

export default App;
