import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

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

      alert("Registered successfully");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert("Registration failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]">

        <h1 className="text-5xl font-bold text-center text-purple-600 mb-8">
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-4 rounded-2xl mb-4"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-2xl mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-2xl mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold hover:scale-105 transition-all"
        >
          Register
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-bold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}

export default Register;