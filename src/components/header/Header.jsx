import { useContext } from "react";
import { Link } from "react-router-dom";
import { RequireContext } from "../../App";
const Header = () => {
  const { auth} = useContext(RequireContext);
  return (
    <div className="navbar bg-base-100 lg:px-12 shadow-lg">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          House Hunter
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
         
          {auth ? (
            <li className="mr-1">
              <Link to="/login" className="font-bold">
                Logout
              </Link>
            </li>
          ) : (
            <li className="mr-1">
              <Link to="/login" className="font-bold">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
