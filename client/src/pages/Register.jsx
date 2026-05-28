import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await axios.post(
        "https://pinclone-backend-6jfa.onrender.com/api/auth/register",
        {
          username,
          email,
          password
        }
      );

      alert("Registration successful");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert("Registration failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/40 w-[400px]">

        <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-600">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border border-pink-200 p-3 rounded-2xl mb-5 outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-pink-200 p-3 rounded-2xl mb-5 outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-pink-200 p-3 rounded-2xl mb-6 outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Register
        </button>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 font-semibold cursor-pointer ml-1"
          >
            Login
          </span>

        </p>

      </div>

    </div>

  );

}

export default Register;