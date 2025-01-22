import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./ResumeTemplates/Template";
import ResumeTemplate from "./ResumeTemplates/ResumeTemplateSample";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/create" element={<Template />} />
          <Route path="/home" element={<Home />} />
          <Route path="/testing" element={<ResumeTemplate />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
