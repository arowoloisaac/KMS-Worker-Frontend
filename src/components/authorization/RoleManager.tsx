import { useEffect, useState } from "react";
import "../../assets/css/authorizationCss/RoleManger.css";
import Axios from "axios";
import { Token, errorMessage } from "../../App";

export interface IUsers {
  email: string;
  id: string;
}

export interface RoleChange {
  [key: string]: string;
}

const RoleManager = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [roles, setRoles] = useState<RoleChange>({});
  const [roleSelected, setRoleSelected] = useState<{ [key: string]: boolean }>(
    {}
  );
  //   const [disabledButtons, setDisabledButtons] = useState<{[key: string]: boolean}>({});

  const getUsers = () => {
    Axios.get("https://localhost:7267/users", {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => setUsers(res.data))
      .catch((ex) => alert(errorMessage(ex)));
  };

  const handleCreate = (prop: any) => {
    const endpoint = `https://localhost:7267/roles?userId=${prop.id}&role=${
      roles[prop.id]
    }`;

    Axios.post(endpoint, {}, { headers: { Authorization: `Bearer ${Token}` } })
      .then((res) => {
        alert(res.data.text);
      })
      .catch((ex) => alert(errorMessage(ex)));
  };

  const handleRemove = (prop: any) => {
    const endpoint = `https://localhost:7267/roles?userId=${prop.id}&role=${
      roles[prop.id]
    }`;

    Axios.delete(endpoint, {
      headers: { Authorization: `Bearer ${Token}` },
    })
      .then((res) => {
        alert(res.data);
      })
      .catch((ex) => alert(errorMessage(ex)));
  };

  // for handling the select of a specific person
  const handleRoleChange = (userId: string, role: string) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: role,
    }));

    setRoleSelected((prevRoleSelected) => ({
      ...prevRoleSelected,
      [userId]: true,
    }));
  };

  useEffect(() => {
    getUsers();
    handleRoleChange;
  }, [Token]);

  return (
    <>
      {users.length < 1 ? (
        <div style={{ textAlign: "center" }}>
          <div>
            <h5 style={{ color: "red" }}>Permission not given</h5>
          </div>
        </div>
      ) : (
        <div id="role-manager">
          <div className="contaier">
            <div className="row g-3">
              {users.map((user) => (
                <>
                  <div className="col-4 col-md-4 col-sm-3">{user.email}</div>
                  <div className="col-3 col-md-4 col-sm-4" aria-required>
                    <select
                      className="form-select form-select-sm"
                      onChange={(event) =>
                        handleRoleChange(user.id, event.target.value)
                      }
                      value={roles[user.id] || "options"}
                    >
                      <option value="options" selected disabled>
                        Select Role
                      </option>
                      <option value="Admin">Admin</option>
                      <option value="Worker">Manager</option>
                      <option value="KeyCollector">Collector</option>
                    </select>
                  </div>
                  <div className="col-5 col-md-4 col-sm-5 text-start">
                    <button
                      className="btn btn-primary me-1 btn-sm"
                      type="button"
                      onClick={() => handleCreate(user)}
                      disabled={!roleSelected[user.id]}
                    >
                      Create
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => handleRemove(user)}
                      disabled={!roleSelected[user.id]}
                    >
                      Delete
                    </button>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleManager;
