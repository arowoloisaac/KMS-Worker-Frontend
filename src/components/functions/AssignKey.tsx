import { useEffect, useState } from "react";
import Axios from "axios";
import "../../assets/css/functionsCss/functions.css";
import { ApiURL, Token } from "../../App";

export interface IRequest {
  keyId: string;
  room: string;
}

const AssignKey = () => {
  const [request, setRequests] = useState<IRequest[]>([]);

  const [length, getLength] = useState(0);

  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const getRequests = () => {
    Axios.get(`${ApiURL}/requests`).then((response) => {
      setRequests(response.data);
      getLength(response.data.length);
    });
  };

  
  //to assign key to key collector
  const handleAccept = (key: IRequest) => {
    const keyId = key.keyId;

    Axios.put(
      `${ApiURL}/assign-key?keyId=${keyId}&check=Accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((res) =>
        res.status === 200 ? setIsAccepted(true) : setIsAccepted(false)
      )
      .catch((ex) => ex.message);
  };

  const handleReject = (key: IRequest) => {
    const keyId = key.keyId;

    Axios.put(
      `${ApiURL}/assign-key?keyId=${keyId}&check=Decline`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((res) =>
        res.status === 200 ? setIsAccepted(true) : setIsAccepted(false)
      )
      .catch((ex) => ex.message);
  };

  useEffect(() => {
    getRequests();
    isAccepted
  }, []);

  return (
    <>
      {length < 1 ? (
        <div className="container text-center" style={{ paddingTop: "200px" }}>
          <div>
            <h2 style={{ color: "blueviolet", fontFamily: "revert" }}>
              No Request from collectors
            </h2>
          </div>
          <div>
            <p style={{ color: "blue" }}>
              We will notify when there is a request👻👻!!!
            </p>
          </div>
        </div>
      ) : (
        <div>
          <span>This page aids key requests from the worker</span>
          <div id="externalContainer">
            <div className="container">
              {" "}
              {request.map((request) => (
                <div key={request.keyId} className="row">
                  <div className="col-6 col-sm-6" id="text-header">
                    <h5>{request.room}</h5>
                  </div>

                  <div className="col-3 col-sm-3 text-end" id="accept-btn">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAccept(request)}
                    >
                      Accept
                    </button>
                  </div>
                  <div className="col-3 col-sm-3">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(request)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default AssignKey;
