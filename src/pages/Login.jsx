import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let context = useContext(AuthContext);
  let navigate = useNavigate();

  const readHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(`user=`, user);
      context
        .loginUser(user)
        .then((res) => {
          toast.success(res.data.msg);
          context.setIsLogin(true);
          context.setToken(res.data.authToken);
          localStorage.setItem("token", res.data.authToken);
          navigate(`/`);
        })
        .catch((err) => toast.error(err.response.data.msg));
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-dark">Login</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>
                <div className="form-group mt-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={readHandler}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={readHandler}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="submit"
                    value="Login User"
                    className="btn btn-success"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
