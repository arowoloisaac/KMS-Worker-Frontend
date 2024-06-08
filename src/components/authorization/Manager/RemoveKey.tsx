import { useEffect, useState } from "react";
import { IKeys } from "../../home/Dashboard";
import Axios from "axios";
import { ApiURL, Token } from "../../../App";

const RemoveKey = () => {
  const [keys, getKeys] = useState<IKeys[]>([]);

  const mapKeys = () => {
    let endpoint = `${ApiURL}/get-keys`;
    Axios.get(endpoint)
      .then((res) => getKeys(res.data))
      .catch((ex) => ex.message);
  };

  const handleRemove = (key: any) => {
    let endpoint = `${ApiURL}/remove-key?keyId=${key.id}`;

    Axios.delete(endpoint, { headers: { Authorization: `Bearer ${Token}` } })
      .then((res) => {alert(res.data) 
        location.reload()})
      .catch((ex) => alert(ex.message));
  };

  useEffect(() => {
    mapKeys();
  }, []);

  useEffect(() => {});
  return (
    <>
      <div className="container" style={{ padding: "30px" }}>
        <div className="row g-4" id="rows-style">
          {keys.map((key) => (
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <div key={key.id} className="row">
                    <div className="col-6">
                      <h5 className="card-title">{key.room}</h5>
                    </div>
                    <div className="col-6" style={{ textAlign: "end" }}>
                      <button
                        className="btn btn-danger btn-md"
                        onClick={() => handleRemove(key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RemoveKey;
