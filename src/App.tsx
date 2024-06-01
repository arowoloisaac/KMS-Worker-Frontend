import "bootstrap/js/src/collapse.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./components/home/Dashboard";
import Navbar from "./components/shared/Navbar";
import ReturnCollection from "./components/functions/ReturnCollection";
import Collection from "./components/functions/Collection";
// import { useSearchParams } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="returns" element={<ReturnCollection />} />
          <Route path="/collectors" element={<Collection />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
