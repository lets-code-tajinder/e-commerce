import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Login: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const navigate = useNavigate();

  const addFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("full_name", fullName);
    fd.append("email", email);
    fd.append("password", password);
    try {
      await axios.post("http://localhost/enest/signup.php", fd);
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (errors) {
      console.log(errors);
    }
  };

  const checkLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("username", userName);
    fd.append("userpass", userPass);
    try {
      const res = await axios.post(
        "http://localhost/enest1/checklogin.php",
        fd
      );
      console.log(res.data.msg);
      setUserName("");
      setUserPass("");
      if (res.data.msg) {
        localStorage.setItem("uid", res.data.myData[0].id);
        navigate("/");
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 login_here pb-5">
            <form onSubmit={checkLogin}>
              <div className="col-md-6 offset-md-4">
                <h4>Login Here</h4>
                <br />
              </div>
              <div className="form-group row">
                <label className="col-md-4 col-form-label text-md-end">
                  <b>Username</b>
                </label>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <br />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-md-4 col-form-label text-md-end"
                >
                  <b>Password</b>
                </label>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={userPass}
                    onChange={(e) => setUserPass(e.target.value)}
                  />
                  <br />
                </div>
              </div>
              <div className="col-md-6 offset-md-4">
                <button type="submit" className="login_btn">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 login_here pb-5">
            <form onSubmit={addFormData}>
              <div className="col-md-6 offset-md-4">
                <h5>
                  New to Enest?{" "}
                  <Link
                    className="text-decoration-none text-secondary"
                    to="/create-account"
                  >
                    Sign Up
                  </Link>
                </h5>
                <br />
              </div>
              <div className="form-group row">
                <label className="col-md-4 col-form-label text-md-end">
                  <b>Full Name</b>
                </label>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <br />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-4 col-form-label text-md-end">
                  <b>Email</b>
                </label>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-md-4 col-form-label text-md-end"
                >
                  <b>Password</b>
                </label>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                </div>
              </div>
              <div className="col-md-6 offset-md-4">
                <button type="submit" className="login_btn">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <Footer />
      </div>
    </>
  );
};

export default Login;