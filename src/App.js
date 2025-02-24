import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pubic/Layout";
import Home from "./Pubic/Home";
import NoPage from "./Pubic/NoPage";
import Productdetail from "./Pubic/Productdetail";
import Rate from "./Pubic/Rate";
import Cart from "./Pubic/Cart";
import Profile from "./Pubic/Profile";
import UpdateProfile from "./Pubic/ProfileUpdate";
import History from "./Pubic/History";
import Pay from "./Pubic/Pay";
import ResultPay from "./Pubic/ResultPay";

import HomeAdmin from "./Admin/Home";
import PrivateRoute from "./Admin/PrivateRoutes";
import LoginAdmin from "./Admin/Login";
import ErrorComp from "./Admin/ErrorComp";
import ProductAdmin from "./Admin/Product";
import Addproduct from "./Admin/Addproduct";
import Updateproduct from "./Admin/UpdateProduct";
import OrderHistory from "./Admin/OrderHistory";

function App() {
  const adminIsLogin = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id_product" element={<Productdetail />} />
          <Route path="/rate" element={<Rate />} />
          <Route path="/admin" element={<NoPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-update" element={<UpdateProfile />} />
          <Route path="/history" element={<History />} />
          <Route path="/pay" element={<Pay/>} />
          <Route path="/ResultPay" element={<ResultPay/>} />
          <Route path="*" element={<NoPage />} />

        </Route>
        
        <Route element={<LoginAdmin />} path='/admin/login' />

        <Route element={<PrivateRoute isAdmin={adminIsLogin} />}>
        <Route element={<HomeAdmin />} path='/admin/home' />
        <Route element={<ProductAdmin />} path='/admin/product' />
        <Route element={<Addproduct/>} path='/admin/addproduct' />
        <Route element={<Updateproduct/>} path='/admin/update/:id' />
        <Route element={<OrderHistory/>} path='/admin/order' />

        <Route element={<ErrorComp />} path='/admin/*' />
      </Route>
      
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
