import { useEffect, useState } from "react";
import { ApiURL, Token, errorMessage } from "../../../App";
import { IKeys } from "../../home/Dashboard";
import Axios from "axios";
import "../../../assets/css/authorizationCss/UpdateKey.css"

const UpdateKey = () => {
  const [keys, setKeys] = useState<IKeys[]>([]);

  const [getInputs, setInputs] = useState<{ [key: string]: string }>({});
   const [selectedInput, setSelectedInput] = useState<{ [key: string]: boolean }>({});
  
  const mapKeys = () => {
    let endpoint = `${ApiURL}/get-keys`;
    Axios.get(endpoint)
      .then((res) => setKeys(res.data))
      .catch((ex) => alert(errorMessage(ex)));
  };
  
  // handle update
  const handleUpdate = (key: any) => {
    let newName = getInputs[key.room]
    Axios.put(
      `${ApiURL}/update-key?oldName=${key.room}&newName=${newName}`,
      {},
      { headers: { Authorization: `Bearer ${Token}` } }
    )
      .then((res) => {
        alert(res.data)
        location.reload()
      })
      .catch((ex) =>alert(errorMessage(ex)));
  };

  //hndle the buttons and changes
  const handleInputChange = (room: string, role: string) => {
    setInputs((prevRoles) => ({
      ...prevRoles,
      [room]: role,
    }));

    setSelectedInput((prevRoleSelected) => ({
      ...prevRoleSelected,
      [room]: true,
    }));
  };

  useEffect(() => {
    mapKeys();
    handleInputChange;
  }, []);

  return (
    <>
      <div>
        <div className="contaier" id="update" style={{paddingTop:"40px"}} >
          <div className="row g-3">
            {keys.map((key) => (
              <>
                <div className="col-4 col-md-4 col-sm-3" style={{color:"blue", paddingTop:"7px"}}>{key.room}</div>
                <div className="col-5 col-md-4 col-sm-4" aria-required>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New room name"
                    onChange={(event) =>
                      handleInputChange(key.room, event.target.value)
                    }
                    value={getInputs[key.room]}
                  />
                  
                </div>
                <div className="col-3 col-md-4 col-sm-5 text-start">
                  <button
                    className="btn btn-warning me-1 btn-md"
                    type="button"
                      onClick={() => handleUpdate(key)}
                      disabled={!selectedInput[key.room]}
                  >
                    Update
                  </button>
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateKey;
