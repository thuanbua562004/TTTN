import React, { useEffect, useState } from 'react';
import axios from '../AxiosConfig/config';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ModalLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const navigate = useNavigate();


  // Kiểm tra định dạng email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const loginGG= async(user)=>{
    try {
      const result = await axios.post('user/loginGG',{
        email: user.email,
        name: user.name,
        avatar: user.picture
      })
      console.log(result);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  const register = async (e) => {
    e.preventDefault();

    // Kiểm tra email hợp lệ
    if (!isValidEmail(email)) {
      toast.error('Email không hợp lệ!');
      document.getElementById('registerEmail').focus();
      return;
    }

    // Kiểm tra mật khẩu có trùng khớp không
    if (password !== rePassword) {
      toast.error('Mật khẩu không trùng!');
      document.getElementById('registerConfirmPassword').focus();
      return;
    }

    try {
      const resultRegister = await axios.post('/user/register', { email, password });
      if (resultRegister.status === 200) {
        toast.success('Đăng kí thành công!');
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setRepassword('');

      }
    } catch (error) {
      toast.error('Email đã tồn tại!');
    }
  };
  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const resultLogin = await axios.post('/user/login', { email, password });
      console.log(resultLogin)
      if (resultLogin.status ==200) {
        localStorage.setItem('token', resultLogin.data.token);
        toast.success('Đăng nhập thành công!');
        navigate(0)
      }
    } catch (error) {
      toast.error('Email hoặc mật khẩu không chính xác!');
    }
  };
  
  return (
    <>
      <ToastContainer />
      <div className="modal fade" id="authModal" tabIndex={-1} aria-labelledby="authModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0">
            {/* Header */}
            <div className="modal-header" style={{ backgroundColor: "#ff0000" }}>
              <h5 className="modal-title w-100 text-center text-white fw-bold" id="authModalLabel">
                Chào mừng!
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            {/* Tabs */}
            <div className="d-flex">
              <button
                className={`w-50 py-3 ${isLogin ? 'text-danger border-bottom border-danger' : 'text-dark'}`}
                onClick={() => setIsLogin(true)}
              >
                Đăng nhập
              </button>
              <button
                className={`w-50 py-3 ${!isLogin ? 'text-danger border-bottom border-danger' : 'text-dark'}`}
                onClick={() => setIsLogin(false)}
              >
                Đăng ký
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {isLogin ? (
                // Đăng nhập
                <form onSubmit={handlerLogin}>
                  <div className="mb-4">
                    <label htmlFor="loginEmail" className="form-label fw-bold text-dark">
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control form-control-lg"
                      id="loginEmail"
                      placeholder="Nhập email của bạn"
                      style={{ border: "1px solid #ff0000" }}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="loginPassword" className="form-label fw-bold text-dark">
                      Mật khẩu
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}

                      type="password"
                      className="form-control form-control-lg"
                      id="loginPassword"
                      placeholder="Nhập mật khẩu"
                      style={{ border: "1px solid #ff0000" }}
                    />
                  </div>
                  <button type="submit" className="btn btn-danger btn-lg w-100"
                    style={{ backgroundColor: "#ff0000" }}>
                    Đăng nhập
                  </button>
                  <hr className="my-4" /><GoogleLogin
                    onSuccess={response => {
                      const credential = response.credential;
                      localStorage.setItem('token', credential)
                      const userInfo = jwtDecode(credential); // Giải mã JWT để lấy thông tin
                      console.log("Thông tin tài khoản:", userInfo);
                      loginGG(userInfo)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </form>
              ) : (
                // Đăng ký
                <form onSubmit={register}>
                  <div className="mb-4">
                    <label htmlFor="registerEmail" className="form-label fw-bold text-dark">
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control form-control-lg"
                      id="registerEmail"
                      placeholder="Nhập email của bạn"
                      style={{ border: "1px solid #ff0000" }}
                      value={email}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="registerPassword" className="form-label fw-bold text-dark">
                      Mật khẩu
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control form-control-lg"
                      id="registerPassword"
                      placeholder="Tạo mật khẩu"
                      style={{ border: "1px solid #ff0000" }}
                      value={password}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="registerConfirmPassword" className="form-label fw-bold text-dark">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      onChange={(e) => setRepassword(e.target.value)}
                      type="password"
                      className="form-control form-control-lg"
                      id="registerConfirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      style={{ border: "1px solid #ff0000" }}
                      value={rePassword}
                    />
                  </div>
                  <button
                    disabled={email === "" || password === "" || rePassword === ""}
                    type="submit"
                    className="btn btn-danger btn-lg w-100"
                    style={{ backgroundColor: "#ff0000" }}
                  >
                    Đăng ký
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLogin;
