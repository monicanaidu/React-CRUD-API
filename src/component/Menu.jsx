import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

function Menu(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handler = async () => {
    if (window.confirm(`Do you want to logout`)) {
      context
        .logoutUser()
        .then((res) => {
          toast.success(res.data.msg);
          context.setIsLogin(false);
          context.setToken(false);
          localStorage.removeItem("token");
          navigate(`/login`);
        })
        .catch((err) => toast.error(err.response.data.msg));
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <NavLink to={`/`} className="navbar-brand">
          React CRUD-API
        </NavLink>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icons"></span>
        </button>

        <div
          className="navbar-collapse collapse justify-content-between"
          id="menu"
        >
          {context.isLogin ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to={`/`} className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/create`} className="nav-link">
                    Create
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    onClick={handler}
                    to={`/`}
                    className="btn btn-danger nav-link"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={`/login`} className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/register`} className="nav-link">
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
