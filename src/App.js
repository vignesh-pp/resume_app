import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./ResumeTemplates/Template";
import ResumeTemplate from "./ResumeTemplates/Test";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Pages/store"; // Import the store and persistor
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/create" element={<Template />} />
              <Route path="/home" element={<Home />} />
              <Route path="/testing" element={<ResumeTemplate />} />
              {/* 404 route for unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
