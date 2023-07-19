import { useContext } from "react";
import { Link } from "react-router-dom";
import { RequireContext } from "../../App";

const Header = () => {
  const { auth } = useContext(RequireContext);
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
            {auth ? (
              <li className="mr-1">
                <Link onClick={()=>logOut()} to="/login" className="font-bold">
                  Logout
                </Link>
              </li>
            ) : (
              <li className="mr-1">
                <Link to="/login" className="font-bold text-2xl text-blue-700">
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
