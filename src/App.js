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
import New from "./Pubic/News";
import NewsDetail from "./Pubic/Newdetail";
import ResetPass from "./Pubic/Resetpass"
import SendCode from "./Pubic/SendCode"
import AllProduct from "./Pubic/AllProduct"
import ResultPayMomo from './Pubic/ResultPayMomo'
import PayQ from './Pubic/PayQuick'
import HomeAdmin from "./Admin/Home";
import PrivateRoute from "./Admin/PrivateRoutes";
import LoginAdmin from "./Admin/Login";
import ErrorComp from "./Admin/ErrorComp";
import ProductAdmin from "./Admin/Product";
import Addproduct from "./Admin/Addproduct";
import Updateproduct from "./Admin/UpdateProduct";
import OrderHistory from "./Admin/OrderHistory";
import NewAdmin from "./Admin/Adminnew";
import Rep from "./Admin/RepComment";

function App() {
  const adminIsLogin = localStorage.getItem('tokenadmin');
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
          <Route path="/profileupdate" element={<UpdateProfile />} />
          <Route path="/history" element={<History />} />
          <Route path="/pay" element={<Pay/>} />
          <Route path="/resultPay" element={<ResultPay/>} />
          <Route path="/resultpayMomo" element={<ResultPayMomo/>} />
          <Route path="/news" element={<New/>} />
          <Route path="/news/:id" element={<NewsDetail/>} />
          <Route path="/reset-password" element={<ResetPass/>} />
          <Route path="/sendCode" element={<SendCode/>} />
          <Route path="/all/:categorypr" element={<AllProduct/>} />
          <Route path="/payq" element={<PayQ/>} />

          <Route path="*" element={<NoPage />} />

        </Route>
        
        <Route element={<LoginAdmin />} path='/admin/login' />

        <Route element={<PrivateRoute isAdmin={adminIsLogin} />}>
        <Route element={<HomeAdmin />} path='/admin/home' />
        <Route element={<ProductAdmin />} path='/admin/product' />
        <Route element={<Addproduct/>} path='/admin/addproduct' />
        <Route element={<Updateproduct/>} path='/admin/update/:id' />
        <Route element={<OrderHistory/>} path='/admin/order' />
        <Route element={<NewAdmin/>} path='/admin/new' />
        <Route element={<Rep/>} path='/admin/rep' />

        <Route element={<ErrorComp />} path='/admin/*' />
      </Route>
      
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
