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
import RoleManager from "./components/authorization/RoleManager";
import UpdateKey from "./components/authorization/Manager/UpdateKey";
import AddKey from "./components/authorization/Manager/AddKey";
import RemoveKey from "./components/authorization/Manager/RemoveKey";

export const setToken = "token";
export const Token = localStorage.getItem(setToken);
export const ApiURL = "https://localhost:7267/api";

export const errorMessage = (ex: any) => {
  return(ex.response.data);
}

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="returns" element={<CollectKeys />} />
          <Route path="request" element={<AssignKey />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<ViewProfile />} />
          <Route path="edit-profile" element={<UpdateProfile />} />
          <Route path="roles" element={<RoleManager />} />
          <Route path="update-key" element={<UpdateKey />} />
          <Route path="add-key" element={<AddKey />} />
          <Route path="remove-key" element={<RemoveKey />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
