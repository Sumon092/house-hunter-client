import { useContext } from "react";
import { Link } from "react-router-dom";
import { RequireContext } from "../../App";


const Header = () => {
  const { auth ,data} = useContext(RequireContext);
  
  
  const logOut=()=>{
    localStorage.removeItem('accessToken')
  }
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="navbar bg-gradient-to-r from-blue-500 to-teal-500 lg:px-12 shadow-lg">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            House Hunter
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
          {data?.role==="House Renter" && (
              <li className="mr-1">
                <Link to="/booking" className="font-bold text-xl text-blue-700">
                  Booking
                </Link>
              </li>
            )}
          {data?.role==="House Owner"&&(
              <li className="mr-1">
                <Link to="/dashboard" className="font-bold text-xl text-blue-700">
                  Dashboard
                </Link>
              </li>
            )}
            {auth ? (
              <li className="mr-1">
                <Link onClick={()=>logOut()} to="/login" className="font-bold text-xl text-blue-700">
                  Logout
                </Link>
              </li>
            ) : (
              <li className="mr-1">
                <Link to="/login" className="font-bold text-xl text-blue-700">
                  Login
                </Link>
              </li>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
