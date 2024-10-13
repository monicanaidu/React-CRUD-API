import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

const URL = "https://crud-user-api-uqsr.onrender.com";

function Home() {
  const [user, setUser] = useState([]);

  const readUser = async () => {
    await axios
      .get(`${URL}/api/user/all`)
      .then((res) => {
        setUser(res.data.users);
      })
      .catch((err) => toast.error(err.response.data.msg));
  };

  useEffect(() => {
    readUser();
  }, []);

  //delete user
  const deleteUser = async (id) => {
    try {
      if (window.confirm(`do you wish to delete user id?`)) {
        console.log(`user id`, id);
        await axios
          .delete(`${URL}/api/user/delete/${id}`)
          .then((res) => {
            toast.success(res.data.msg);
            readUser();
          })
          .catch((err) => toast.error(err.response.data.msg));
      } else {
        toast.warning("delete terminated");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-dark">Users</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table table-responsive">
            <table className="table table-bordered table-striped table-hover text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Age</th>
                  <th>Role</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {user?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.age}</td>
                      <td>{item.role}</td>
                      <td>{item.address ? item.address : "no address"}</td>
                      <td className="d-flex justify-content-between">
                        {
                          <NavLink
                            to={`/update/${item._id}`}
                            className="btn btn-info"
                          >
                            <i className="bi bi-pencil"></i>
                          </NavLink>
                        }
                        <button
                          onClick={() => deleteUser(item._id)}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
