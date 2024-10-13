import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const URL = "https://crud-user-api-uqsr.onrender.com";

function Update(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    age: 0,
    role: "",
    address: "",
  });

  let navigate = useNavigate();

  const handler = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(`user=`, user);
      await axios
        .patch(`${URL}/api/user/create`, user)
        .then((res) => {
          toast.success(res.data.msg);
          navigate(`/`);
        })
        .catch((err) => toast.error(err.response.data.msg));
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-dark">Update user</h3>
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
                    value={user.name}
                    onChange={handler}
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
                    value={user.email}
                    onChange={handler}
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
                    value={user.mobile}
                    onChange={handler}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={user.age}
                    onChange={handler}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="address">Address</label>
                </div>
                <div className="form-group mt-2">
                  <input
                    type="submit"
                    value="Create User"
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

export default Update;
