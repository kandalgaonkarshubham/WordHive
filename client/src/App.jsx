import React from "react";
import Layout from "./pages/Layout";
import Main from "./pages/Home";
import Dictionary from "./pages/Dictionary";
import About from "./pages/About";
import Error from "./pages/Error";
import Loader from "../components/Loader"

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>     
        <Routes>
          <Route exact path="/" element={<Layout />} />
          <Route path="/home" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="*" element={<Error />} />
          <Route path="loader" element={<Loader />} />
        </Routes>
     

    </BrowserRouter>
  );
}

export default App;
