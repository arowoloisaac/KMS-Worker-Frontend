import { useEffect } from "react";

const Navbar = () => {
  useEffect(()=> {
    
  })
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
                      {/* {isWith == false ? (
                        <a className="nav-link" href="/request">
                          InBoard
                        </a>
                      ) : (
                        <a className="nav-link" href="/with">
                          In Possession
                        </a>
                      )} */}
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="/thirdparty">
                        ThirdParty
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Notification
                        {/* {notification ? (
                          <span id="notifier">0</span>
                        ) : (
                          <span></span>
                        )} */}
                      </a>
                    </li>
                  </>
                
                  <div></div>
                
                <span></span>
              </ul>
              <div></div>
              {/* {isAuthenticated === true ? (
                <div>
                  <a href="/profile">
                    <span style={{ marginRight: "20px" }}></span>
                  </a>
                  <a href="">
                    <button
                      type="button"
                      className="btn btn-danger"
                    >
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
              )} */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar