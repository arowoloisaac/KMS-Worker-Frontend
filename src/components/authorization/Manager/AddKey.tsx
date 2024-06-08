import { useState } from "react";
import Axios from "axios";
import { ApiURL, Token } from "../../../App";
import lock from "../../../assets/images/lock.jpg";

const AddKey = () => {
  const [room, setRoom] = useState<string>("");

  const data = {
    room: room,
  };

  console.log(data);
  const handleAdd = () => {
    Axios.post(`${ApiURL}/add-key`, data, {
      headers: { Authorization: `Bearer ${Token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Key added to database");
          location.reload();
        }
      })
      .catch((ex) => alert(ex.message));
  };
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        style={{ height: "200px" }}
                        src={lock}
                        alt=""
                        id="img-size"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 g-2">
                <div className="card mb-3">
                  <div className="card-body">
                    <span className="" style={{ font: "inherit" }}>
                      Add Key To The Database
                    </span>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0" style={{ marginTop: "7px" }}>
                          Room
                        </h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room"
                          aria-label="Room name"
                          onChange={(event) => {
                            setRoom(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row text-end">
                      <div className="col-sm-12">
                        <button
                          className="btn btn-md btn-primary"
                          onClick={handleAdd}
                        >
                          Add key
                        </button>
                      </div>
                    </div>
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

export default AddKey;
