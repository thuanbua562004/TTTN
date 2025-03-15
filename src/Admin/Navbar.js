import { Link  ,useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPager, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
function Navbar() {
  const navigate = useNavigate()
  const keyAdmin = localStorage.getItem('tokenadmin');
  const logOut=()=>{
    localStorage.removeItem('tokenadmin');
    navigate('https://tttn-pn1v.onrender.com/admin/home')
  }
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />


      <nav className="navbar navbar-expand-xl"  >
        <div className="container h-100">
          <Link className="navbar-brand" to={'/admin/home'}>
            <h1 className="tm-site-title mb-0 ">Admin</h1>
          </Link>
          <button
            className="navbar-toggler ml-auto mr-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars tm-nav-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto h-100">
              <li className="nav-item">
                <Link to={"/admin/home"} className="nav-link text-white">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin/product"} className="nav-link text-white">
                  <FontAwesomeIcon icon={faShoppingCart} /> Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin/order"} className="nav-link text-white">
                  <FontAwesomeIcon icon={faUser} /> Order
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin/new"} className="nav-link text-white">
                  <FontAwesomeIcon icon={faPager} /> News
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin/rep"} className="nav-link text-white">
                  <FontAwesomeIcon icon={faPager} /> Repli
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav">
      <li className="nav-item dropdown">
        {keyAdmin ? (
          <Link
            to={"#"}
            className="nav-link dropdown-toggle text-white"
            id="userDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faUser} /> {}
          </Link>
        ) : (
          <Link
            to={"/admin/login"}
            className="nav-link d-block text-white"
          >
            LOGIN
          </Link>
        )}
        {keyAdmin && (
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="userDropdown"
          >
            <li>
              <Link

                className="dropdown-item text-danger"
                to={"#"}
                onClick={logOut}
              >
                Đăng Xuất
              </Link>
            </li>
          </ul>
        )}
      </li>
    </ul>
          </div>
        </div>
      </nav>
    </>
  );

}

export default Navbar