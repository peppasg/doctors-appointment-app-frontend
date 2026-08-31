import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const Header = () => {
  const { isAuthenticated, username, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    logoutUser();
    navigate("/auth/login");
  };

  return (
    <>
      <header className="bg-gray-700 h-16 fixed w-full z-50">
        <div className="container mx-auto px-5 flex items-center justify-between">
          <Link className="flex" to="/">
            <img
              className="h-16 w-auto object-contain invert mix-blend-screen"
              src="/heart-pulse.svg" 
              alt="Doctors Logo"
            />
            <p className="py-5 text-white font-medium">
              Medical Appointment Application
            </p>
          </Link>
          <nav className="flex gap-4 text-white">
            <Link to="/">Home</Link>
            {isAuthenticated ? (
              <>
                <span className="font-small text-amber-400">{username}</span>
                <button type="button" onClick={handleSignout}>
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/auth/login">Login</Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
