import React, { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const context = useContext(AuthContext);
  const fname = useRef();
  const femail = useRef();
  const fmobile = useRef();
  const fpassword = useRef();

  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data = {
        name: fname.current.value,
        email: femail.current.value,
        mobile: fmobile.current.value,
        password: fpassword.current.value,
      };
      console.log(`data=`, data);

      //register method
      context
        .registerUser(data)
        .then((res) => {
          toast.success(res.data.msg);
          navigate(`/login`);
        })
        .catch((err) => toast.error(err.msg));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-dark">Register</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>
                <div className="form-group mt-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    ref={fname}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={femail}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="number"
                    name="mobile"
                    id="mobile"
                    ref={fmobile}
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
                    ref={fpassword}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="submit"
                    value="Register User"
                    className="btn btn-primary"
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

export default Register;
