import { useEffect, useState } from "react";
import Axios from "axios";
import { ApiURL } from "../../App";

export interface IKeys {
  id: string;
  room: string;
  status: string;
}

const Dashboard = () => {
  const [getKeys, setKeys] = useState<IKeys[]>([]);
  useEffect(() => {
    Axios.get(`${ApiURL}/get-keys`).then((response) => {
      setKeys(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Room</th>
              <th scope="col">Inboard</th>
              <th scope="col">In use</th>
              <th scope="col">Pending</th>
            </tr>
          </thead>
          <tbody>
            {getKeys.map((key, index) => (
              <tr>
                <th scope="row" key={key.id}>
                  {index + 1}
                </th>
                <td>{key.room}</td>
                {key.status === "Available" ? (
                  <>
                    <td>✔️</td>
                    <td colSpan={2}></td>
                    {/* <td></td> */}
                  </>
                ) : key.status === "Unavailable" ? (
                  <>
                    <td></td>
                    <td>🔛</td>
                    <td></td>
                  </>
                ) : (
                  <>
                    <td colSpan={2}></td>
                    {/* <td></td> */}
                    <td>🔜</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
