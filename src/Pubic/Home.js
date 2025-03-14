import React, { useEffect, useState } from'react';
import Product from './Product';
import axios  from '../AxiosConfig/config';
import NewRow from "./NewRow"
const Home = () => {
  const [category, setCategory] = useState(null)
  const fetchCate = async () => {
    try {
      const result = await axios.get("/category/category");
      setCategory(result.data)
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }
  useEffect(()=>{
    fetchCate()
  },[])
  return(
    <>
    <div className="container">
   <div className="row mt-2 d-fle " style={{justifyContent:"center"}}>
     {/* Sidebar */}
     {/* <div className="col-md-2 sidebar p-4 bg-light rounded">
       <nav className="nav flex-column">
        {category?.map((items)=>(
           <a
           className="nav-link d-flex align-items-center py-2 mb-2 rounded hover-sidebar"
           href="#"
         >
           <img style={{width:"20px"}} src={items.img}  className=" mx-3"/> {items.name}
         </a>
        ))}
       </nav>
     </div> */}
     {/* Main Content */}
     <main className="col-md-7">
       <div id="carouselExampleCaptions" className="carousel slide">
         <div className="carousel-indicators">
           <button
             type="button"
             data-bs-target="#carouselExampleCaptions"
             data-bs-slide-to={0}
             className="active"
             aria-current="true"
             aria-label="Slide 1"
           />
           <button
             type="button"
             data-bs-target="#carouselExampleCaptions"
             data-bs-slide-to={1}
             aria-label="Slide 2"
           />
           <button
             type="button"
             data-bs-target="#carouselExampleCaptions"
             data-bs-slide-to={2}
             aria-label="Slide 3"
           />
         </div>
         <div className="carousel-inner">
           <div className="carousel-item active">
             <img
               src="https://dienthoaihay.vn/images/slideshow/2025/02/28/compress/iqoo-neo-10_1740706059.jpg"
               className="d-block w-100"
               alt="..."
             />
             <div className="carousel-caption d-none d-md-block">
             
             </div>
           </div>
           <div className="carousel-item">
             <img
               src="https://dienthoaihay.vn/images/slideshow/2025/01/15/compress/realme-q5-pro_1736922718.jpg"
               className="d-block w-100"
               alt="..."
             />
             <div className="carousel-caption d-none d-md-block">
            
             </div>
           </div>
           <div className="carousel-item">
             <img
               src="https://dienthoaihay.vn/images/slideshow/2024/09/26/compress/redmi-k40_1727311459.jpg"
               className="d-block w-100"
               alt="..."
             />
             <div className="carousel-caption d-none d-md-block">
        
             </div>
           </div>
         </div>
         <button
           className="carousel-control-prev"
           type="button"
           data-bs-target="#carouselExampleCaptions"
           data-bs-slide="prev"
         >
           <span className="carousel-control-prev-icon" aria-hidden="true" />
           <span className="visually-hidden">Previous</span>
         </button>
         <button
           className="carousel-control-next"
           type="button"
           data-bs-target="#carouselExampleCaptions"
           data-bs-slide="next"
         >
           <span className="carousel-control-next-icon" aria-hidden="true" />
           <span className="visually-hidden">Next</span>
         </button>
       </div>
       <img
         className="rounded-3 w-100"
         src="https://dienthoaihay.vn/images/banners/original/dienthoaihaypng_1681264414.png"
         alt=""
       />
     </main>
     {/* Right Sidebar */}
     <div className="col-md-3 d-block d-sm-block">
       <img
         className="w-100 mb-2 rounded-3"
         src="https://dienthoaihay.vn/images/banners/original/note-12-5g_1740884182.jpg"
         alt=""
       />
       <img
         className="w-100 mb-2 rounded-3"
         src="https://dienthoaihay.vn/images/banners/original/redmi-12-5g_1730695691.jpg"
         alt=""
       />
       <img
         className="w-100 mb-2 rounded-3"
         src="https://dienthoaihay.vn/images/banners/original/q5-pro_1736649129.jpg"
         alt=""
       />
     </div>
   </div>
   {/* Brand Section */}
   <div className="brand-section mt-4">
     <div className="row text-center">
       {/* Xiaomi */}
       <div className="col-6 col-md-3 mt-1">
         <div className="card p-3 shadow-sm">
          <Link to={'/all/Xiaomi'}>
          <img
             src="https://dienthoaihay.vn/images/products/cat/resized/hang4_1629782113.png"
             alt="Xiaomi"
             className="img-fluid w-100"
           />
          </Link>
         </div>
       </div>
       <div className="col-6 col-md-3 mt-1">
         <div className="card p-3 shadow-sm">
         <Link to={'/all/Realme'}>
           <img
             src="https://dienthoaihay.vn/images/products/cat/resized/hang3_1629782127.png"
             alt="Xiaomi"
             className="img-fluid w-100"
           />
                </Link>
         </div>
       </div>
       <div className="col-6 col-md-3 mt-1">
         <div className="card p-3 shadow-sm">
         <Link to={'/all/SamSung'}>
           <img
             src="https://dienthoaihay.vn/images/products/cat/resized/hang2_1629782097.png"
             alt="Xiaomi"
             className="img-fluid w-100"
           />
                </Link>
         </div>
       </div>
       <div className="col-6 col-md-3 mt-1">
         <div className="card p-3 shadow-sm">
         <Link to={'/all/Apple'}>
           <img
             src="https://dienthoaihay.vn/images/products/cat/resized/hang1_1629782045.png"
             alt="Xiaomi"
             className="img-fluid w-100"
           />
                </Link>
         </div>
       </div>
     </div>
   </div>
    </div>
 
 <Product/>
 <Product category={"Xiaomi"}/>
 <Product category={"Apple"}/>
 <Product category={"Realme"}/>


 <NewRow/>
    </>
  )
  };
  
export default Home;