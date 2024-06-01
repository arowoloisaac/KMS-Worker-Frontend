import { useEffect, useState } from "react";
import "../../assets/css/navbar/Navbar.css";
import Axios from "axios";
import { Token } from "../../App";

const Navbar = () => {
  const [email, setEmail] = useState<string>("");
  const [notification, setNotification] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const savedData = localStorage.getItem(Token);

  //check for user token
  useEffect(() => {
    if (savedData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [savedData]);

  // to get email to be place on the profile
  useEffect(() => {
    Axios.get("https://localhost:7267/api/profile", {
      headers: { Authorization: `Bearer ${savedData}` },
    })
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((ex) => ex.response.status);
  }, [savedData]);

  const handleLogout = (event: any) => {
    event.preventDefault();
    if (isAuthenticated == true) {
       Axios.post(
        "https://localhost:7267/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${savedData}` },
        }
      )
        .then((res) => {
          res.status;
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          window.location.reload();
        })
        .catch(() => {
          localStorage.clear();
          window.location.reload();
        });
    } else {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Key System
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>

                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/request">
                      Requests{" "}
                      {notification > 0 ? (
                        <span id="notifier">0</span>
                      ) : (
                        <span></span>
                      )}
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Return
                    </a>
                  </li>
                </>

                <div></div>

                <span></span>
              </ul>
              <div></div>
              {isAuthenticated === true ? (
                <div>
                  <a href="/profile">
                    <span style={{ marginRight: "20px" }}>{email}</span>
                  </a>
                  <a href="">
                    <button type="button" className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </a>
                </div>
              ) : (
                <div>
                  <a href="/login" style={{ marginRight: "10px" }}>
                    <button type="button" className="btn btn-secondary">
                      Login
                    </button>
                  </a>
                  <a href="/register">
                    <button type="button" className="btn btn-secondary">
                      Register
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
