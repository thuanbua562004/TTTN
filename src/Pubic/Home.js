import React from'react';
import Product from './Product';
const Home = () => {
  return(
    <>
    <div className="container">
   <div className="row mt-2">
     {/* Sidebar */}
     <div className="col-md-2 sidebar p-4 bg-light rounded">
       <nav className="nav flex-column">
         <a
           className="nav-link d-flex align-items-center py-2 mb-2 rounded hover-sidebar"
           href="#"
         >
           <i className="fab fa-apple mx-3" style={{ fontSize: 20 }} /> iPhone
         </a>
         <a
           className="nav-link d-flex align-items-center py-2 mb-2 rounded hover-sidebar"
           href="#"
         >
           <i className="fab fa-apple mx-3" style={{ fontSize: 20 }} /> iPad
         </a>
         <a
           className="nav-link d-flex align-items-center py-2 mb-2 rounded hover-sidebar"
           href="#"
         >
           <i className="fab fa-apple mx-3" style={{ fontSize: 20 }} /> MacBook
         </a>
         <a
           className="nav-link d-flex align-items-center py-2 mb-2 rounded hover-sidebar"
           href="#"
         >
           <i className="fab fa-apple mx-3" style={{ fontSize: 20 }} /> Apple
           Watch
         </a>
       </nav>
     </div>
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
               src="https://dienthoaihay.vn/images/banners/original/note-11-pro-5g_1736217775.jpg"
               className="d-block w-100"
               alt="..."
             />
             <div className="carousel-caption d-none d-md-block">
               <h5>First slide label</h5>
               <p>
                 Some representative placeholder content for the first slide.
               </p>
             </div>
           </div>
           <div className="carousel-item">
             <img
               src="https://dienthoaihay.vn/images/slideshow/2024/09/26/compress/redmi-k40_1727311459.jpg"
               className="d-block w-100"
               alt="..."
             />
             <div className="carousel-caption d-none d-md-block">
               <h5>Second slide label</h5>
               <p>
                 Some representative placeholder content for the second slide.
               </p>
             </div>
           </div>
           <div className="carousel-item">
             <img
               src="https://dienthoaihay.vn/images/slideshow/2024/09/26/compress/redmi-k40_1727311459.jpg"
               className="d-block w-100"
               alt="..."
             />
             <div className="carousel-caption d-none d-md-block">
               <h5>Third slide label</h5>
               <p>
                 Some representative placeholder content for the third slide.
               </p>
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
         src="https://dienthoaihay.vn/images/banners/original/q5-pro_1736649129.jpg"
         alt=""
       />
       <img
         className="w-100 mb-2 rounded-3"
         src="https://dienthoaihay.vn/images/banners/original/q5-pro_1736649129.jpg"
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
           <img
             src="https://dienthoaihay.vn/images/products/cat/resized/hang4_1629782113.png"
             alt="Xiaomi"
             className="img-fluid w-100"
           />
         </div>
       </div>
       <div className="col-6 col-md-3 mt-1">
         <div className="card p-3 shadow-sm">
           <img
             src="https://dienthoaihay.vn/images/products/cat/resized/hang3_1629782127.png"
             alt="Xiaomi"
             className="img-fluid w-100"
           />
         </div>
       </div>
       <div className="col-6 col-md-3 mt-1">
         <div className="card p-3 shadow-sm">
           <img
             src="https://dienthoaihay.vn/images/products/cat/resized/hang2_1629782097.png"
             alt="Xiaomi"
             className="img-fluid w-100"
           />
         </div>
       </div>
       <div className="col-6 col-md-3 mt-1">
         <div className="card p-3 shadow-sm">
           <img
             src="https://dienthoaihay.vn/images/products/cat/resized/hang1_1629782045.png"
             alt="Xiaomi"
             className="img-fluid w-100"
           />
         </div>
       </div>
     </div>
   </div>
    </div>
 
 <Product/>
    </>
  )
  };
  
export default Home;