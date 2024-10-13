import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const URL = "https://node-express-auth.onrender.com";

export const AuthContext = createContext();

function AuthProvider(props) {
  //login auth
  const [isLogin, setIsLogin] = useState(false);
  const [curUser, setCurUser] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token, isLogin]);
  //register user
  const registerUser = async (user) => {
    try {
      return await axios.post(`${URL}/api/auth/register`, user);
    } catch (err) {
      toast.error(err.message);
    }
  };

  //login user
  const loginUser = async (user) => {
    return await axios.post(`${URL}/api/auth/login`, user);
  };

  //logout user
  const logoutUser = async () => {
    return await axios.get(`${URL}/api/auth/logout`);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        registerUser,
        loginUser,
        curUser,
        setCurUser,
        token,
        setToken,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
