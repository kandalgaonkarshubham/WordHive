import React from "react";
import Home from "./pages/Home";
import Dictionary from "./pages/Dictionary";
import About from "./pages/About";
import Activate from "./pages/Activate";
import Error from "./pages/Error"; 
import Loader from "../components/Loader"

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="*" element={<Error />} />
        <Route path="loader" element={<Loader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
