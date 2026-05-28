import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">

      <Link
        to="/"
        className="text-3xl font-extrabold tracking-wide hover:scale-105 transition-all duration-300"
      >
        PinClone
      </Link>

      <div className="flex gap-4 items-center">

        {user ? (

          <>

            <Link
              to="/profile"
              className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-300 to-pink-400 text-white flex items-center justify-center font-bold text-xl shadow-md hover:scale-110 transition-all duration-300 ring-4 ring-white/40"
            >
              {user.username.charAt(0).toUpperCase()}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300"
            >
              Logout
            </button>

          </>

        ) : (

          <>

            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Register
            </Link>

          </>

        )}

      </div>

    </div>

  );

}

export default Navbar;