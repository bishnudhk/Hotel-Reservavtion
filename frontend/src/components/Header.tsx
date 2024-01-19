import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
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
