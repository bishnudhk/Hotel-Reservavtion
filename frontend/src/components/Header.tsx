import { Link } from "react-router-dom";
import "./styles/header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerBody">
        <span className="headerLogo">
          <Link to="/">Hotel reservation</Link>
        </span>
        <span className="signin">
          <Link to="/signIn" className="signIn">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Header;
