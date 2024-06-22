import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../home/Dashboard";
import { ApiURL, setToken } from "../../App";

export interface ApiResponse {
  token: string;
}
const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");

  const [firstNameFocused, setFirstNameFocused] = useState<boolean>(false);
  const [lastNameFocused, setLastNameFocused] = useState<boolean>(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [facultyFocused, setFacultyFocused] = useState<boolean>(false);

  const [status, setStatus] = useState<number>(0);

  useEffect(() => {register}, []);

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    faculty: faculty,
    password: password,
  };

  console.log(data)
  const register = () => {
     Axios.post<ApiResponse>(
      `${ApiURL}/register-worker`,
      data
    )
      .then((res) => {
        localStorage.setItem(setToken, res.data.token);
        setStatus(res.status);
        navigate("/");
        window.location.reload();
      })
      .catch((ex) => alert(ex));
  };
  return (
    <>
      {status === 200 ? (
        <Dashboard />
      ) : (
        <div>
          <div className="container-fluid" id="signup-container">
            <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col col-lg-3"></div>
              <div className="col col-lg-6">
                <div className="user-form card border-white">
                  <div className="form-signin w-100 m-auto">
                    <form>
                      <div
                        className="form-floating"
                        style={{ paddingBottom: "15px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John"
                          onChange={(input) => setFirstName(input.target.value)}
                          onFocus={() => setFirstNameFocused(true)}
                          onBlur={() => setFirstNameFocused(false)}
                          required
                        />
                        <label>First Name</label>
                        {firstName.trim() === "" && firstNameFocused && (
                          <span className="text-danger">
                            First name is required
                          </span>
                        )}
                      </div>

                      <div
                        className="form-floating"
                        style={{ paddingBottom: "15px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Doe"
                          onChange={(input) => setLastName(input.target.value)}
                          required
                          onFocus={() => setLastNameFocused(true)}
                          onBlur={() => setLastNameFocused(false)}
                        />
                        <label>Last Name</label>
                        {lastName.trim() === "" && lastNameFocused && (
                          <span className="text-danger">
                            Last name is required
                          </span>
                        )}
                      </div>

                      <div
                        className="form-floating"
                        style={{ paddingBottom: "15px" }}
                      >
                        <input
                          type="tel"
                          minLength={11}
                          maxLength={14}
                          className="form-control"
                          placeholder="+7(9xx)-xxx-xx-xx"
                          onChange={(input) =>
                            setPhoneNumber(input.target.value)
                          }
                          required
                          onFocus={() => setPhoneNumberFocused(true)}
                          onBlur={() => setPhoneNumberFocused(false)}
                        />
                        <label>Phone Number</label>
                        {phoneNumber.trim() === "" && phoneNumberFocused && (
                          <span className="text-danger">
                            Phone number is required
                          </span>
                        )}
                      </div>

                      <div
                        className="form-floating"
                        style={{ paddingBottom: "15px" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="HITs"
                          onChange={(input) => setFaculty(input.target.value)}
                          required
                          onFocus={() => setFacultyFocused(true)}
                          onBlur={() => setFacultyFocused(false)}
                        />
                        <label>Faculty</label>
                        {faculty.trim() === "" && facultyFocused && (
                          <span className="text-danger">Faculty required</span>
                        )}
                      </div>

                      <div
                        className="form-floating"
                        style={{ paddingBottom: "15px" }}
                      >
                        <input
                          type="email"
                          className="form-control"
                          placeholder="name@example.com"
                          onChange={(input) => setEmail(input.target.value)}
                          required
                          onFocus={() => setEmailFocused(true)}
                          onBlur={() => setEmailFocused(false)}
                        />
                        <label>Email address</label>
                        {email.trim() === "" && emailFocused && (
                          <span className="text-danger">
                            Email address is required
                          </span>
                        )}
                      </div>

                      <div
                        className="form-floating"
                        style={{ paddingBottom: "15px" }}
                      >
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          onChange={(input) => setPassword(input.target.value)}
                          required
                          minLength={6}
                          onFocus={() => setPasswordFocused(true)}
                          onBlur={() => setPasswordFocused(false)}
                        />
                        <label>Password</label>
                        {password.trim() === "" && passwordFocused && (
                          <span className="text-danger">
                            Password is required
                          </span>
                        )}
                      </div>
                    </form>
                    <button
                      className="btn btn-primary py-2"
                      type="submit"
                      onClick={register}
                    >
                      Sign up
                    </button>
                    <p className="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
                  </div>
                </div>
              </div>
              <div className="col col-lg-3"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
