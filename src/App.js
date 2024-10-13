import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./component/Menu";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pnf from "./pages/Pnf";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute/SecureRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <ToastContainer autoClose={4000} position="top-right"/>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={`/`} element={<Home />} />
          <Route path={`/create`} element={<Create />} />
          <Route path={`/update`} element={<Update />} />
        </Route>
        <Route path={`/login`} element={<Login />} />
        <Route path={`/register`} element={<Register />} />
        <Route path={`/*`} element={<Pnf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
