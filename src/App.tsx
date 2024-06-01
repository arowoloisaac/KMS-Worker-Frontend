import "bootstrap/js/src/collapse.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./components/home/Dashboard";
import Navbar from "./components/shared/Navbar";
import CollectKeys from "./components/functions/CollectKeys";
import AssignKey from "./components/functions/AssignKey";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import ViewProfile from "./components/authentication/ViewProfile";
import UpdateProfile from "./components/authentication/UpdateProfile";
import ErrorPage from "./components/error/ErrorPage";

export const Token = "token";  

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="returns" element={<CollectKeys />} />
          <Route path="request" element={<AssignKey />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<ViewProfile />} />
          <Route path="edit-profile" element={<UpdateProfile />} />
          <Route />
          <Route />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
