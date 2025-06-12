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
import AllUsers from "./Pages/AllUsers";
import LoginPage from "./Pages/LoginPage";
import CustomTemplate from "./Pages/CustomTemplate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-blue/theme.css";  // or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import Test from "./ResumeTemplates/Test";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Test from "./ResumeTemplates/Test";

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/create" element={<Template />}>
                <Route path=":childroute" element={<Template />} />
              </Route>
              <Route path="/myresumes" element={<Template />}>
                <Route path=":childroute" element={<Template />} />
              </Route>
              <Route path="/home" element={<Home />} />
              <Route path="/testing" element={<ResumeTemplate />} />
              <Route path="/allusers" element={<AllUsers />} />
              <Route path="/usertemplates/:childroute/:userId?" element={<Template />} />
              <Route path="/custom" element={<CustomTemplate />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* <Route path="/test" element={<Test />} /> */}
              {/* 404 route for unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <ToastContainer position="top-right" autoClose={3000} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
