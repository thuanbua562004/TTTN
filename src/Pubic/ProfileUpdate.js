import React, { useEffect, useState } from "react";
import axiosConfig from "../AxiosConfig/config";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GetAdress from "./GetAdress";
function UpdateProfile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const stageProfile = useSelector((state) => state.data?.stageProfile);
  
  // Cập nhật state khi stageProfile thay đổi
  useEffect(() => {
    if (stageProfile) {
      setName(stageProfile.name || "");
      setPhone(stageProfile.phone || "");
      setDateBirth(stageProfile.date || "");
      setDetailAddress(stageProfile.address || "");
    }
  }, [stageProfile]);

  const getAddress = (data) =>{
    console.log(data)
    setDetailAddress(data)
  }

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    
    if (name === "" || phone === "" || dateBirth === "" || detailAddress === "") {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    
    try {
      const update = await axiosConfig.put("/user/update", {
        id,
        name,
        phone,
        address: detailAddress,
        date: dateBirth,
      });

      if (update.status === 200) {
        toast.success("Cập nhật thông tin thành công");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại, vui lòng thử lại!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-center mt-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card shadow-lg p-4">
                <div className="card-body text-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUE7jXHro7BdwC8kOvXnqQ7m1SwUP6MH6iK_ZLmKKjiG8tkhq7q_tytzMTXBtGsSRp0Y&usqp=CAU"
                    className="img-fluid rounded-circle mb-4"
                    alt="User avatar"
                    style={{ width: "120px", height: "120px" }}
                  />
                  <h4 className="mb-4">Cập Nhật Thông Tin</h4>
                  <form onSubmit={handleUpdateUser} className="text-center">
                    <div className="form-group row mb-3 align-items-center">
                      <label className="col-sm-4 col-form-label text-sm-right">Họ Tên</label>
                      <div className="col-sm-8">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Nhập họ tên của bạn"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-3 align-items-center">
                      <label className="col-sm-4 col-form-label text-sm-right">Số Điện Thoại</label>
                      <div className="col-sm-8">
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>
                    <div className="form-group row mb-3 align-items-center">
                      <label className="col-sm-4 col-form-label text-sm-right">Ngày Sinh</label>
                      <div className="col-sm-8">
                        <input
                          value={dateBirth}
                          onChange={(e) => setDateBirth(e.target.value)}
                          type="date"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <GetAdress sendDataToParent={getAddress} address={detailAddress} />
                    <button type="submit" className="btn btn-primary btn-block mt-3">Cập Nhật Thông Tin</button>
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

export default UpdateProfile;
