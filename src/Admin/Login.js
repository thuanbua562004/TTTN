import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href="/admin/home"
    }
  }, []);

  const handlerLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.older_token);
        toast.success("User logged in successfully");
        window.location.href="/admin/home"
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-12 mx-auto tm-login-col">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12 text-center">
                  <h2 className="tm-block-title mb-4">
                    Welcome to Dashboard, Login
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <form className="tm-login-form" onSubmit={handlerLogin}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        className="form-control validate"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password">Password</label>
                      <input
                        name="password"
                        type="password"
                        className="form-control validate"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-4">
                      <button
                        disabled={email === "" || password === ""}
                        type="submit"
                        className="btn btn-primary btn-block text-uppercase"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
