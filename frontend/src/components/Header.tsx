import { Link } from "react-router-dom";
import "./styles/header.css";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButtton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="header">
      <div className="headerBody">
        <span className="headerLogo">
          <Link to="/">Hotel reservation</Link>
        </span>
        <span className="signin">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="myBooking">
                My Bookings
              </Link>
              <Link to="/my-hotels" className="myHotels">
                My Hotels
              </Link>
              <SignOutButton />
              {/* <button className="btn signOut">Sign Out</button> */}
            </>
          ) : (
            <Link to="/signIn" className="signIn">
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
