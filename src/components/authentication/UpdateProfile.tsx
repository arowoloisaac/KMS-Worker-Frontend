import Axios from "axios";
import { useEffect, useState } from "react";
import { Token } from "../../App";
import { useNavigate } from "react-router-dom";
import { User } from "./ViewProfile";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const [profile, setProfile] = useState<User>();

  //for getting profile
  useEffect(() => {
    Axios.get("https://localhost:7267/api/profile", {
      headers: {
        Authorization: `bearer ${Token}`,
      },
    })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((ex) => ex.message);
  }, [Token]);

  const data = {
    firstName: firstName || profile?.firstName,
    lastName: lastName || profile?.lastName,
    phoneNumber: phoneNumber || profile?.phoneNumber,
  };

  const updateProfileButton = () => {
    Axios.put("https://localhost:7267/api/profile", data, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/profile");
          location.reload();
        }
      })
      .catch((ex) => {
        if (ex.response.status) {
          alert(ex.message);
        }
      });
  };

  return (
    <>
      <div>
        <div className="container" id="edit-container">
          <div className="row">
            <div className="col-12">
              <div style={{ paddingTop: "50px" }} className="">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="tab-content ml-1" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="basicInfo"
                          role="tabpanel"
                          aria-labelledby="basicInfo-tab"
                        >
                          <div className="row">
                            <div className="col-sm-3 col-md-2 col-5">
                              <label>First Name</label>
                            </div>
                            <div className="col-md-8 col-6">
                              <input
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                                required
                                placeholder={profile?.firstName}
                              />
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-sm-3 col-md-2 col-5">
                              <label>Last Name</label>
                            </div>
                            <div className="col-md-8 col-6">
                              <input
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                                placeholder={profile?.lastName}
                              />
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-sm-3 col-md-2 col-5">
                              <label>Email</label>
                            </div>
                            <div className="col-md-8 col-6">
                              {profile?.email}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3 col-md-2 col-5">
                              <label>Mobile</label>
                            </div>
                            <div className="col-md-8 col-6">
                              <input
                                type="tel"
                                className="form-control"
                                placeholder={profile?.phoneNumber}
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                }}
                                maxLength={14}
                              />
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <button
                      className="btn btn-primary"
                        onClick={updateProfileButton}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
