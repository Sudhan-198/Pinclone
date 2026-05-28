import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "https://pinclone-backend-6jfa.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Login failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]">

        <h1 className="text-5xl font-bold text-center text-purple-600 mb-8">
          Login
        </h1>

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
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold hover:scale-105 transition-all"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-bold"
          >
            Register
          </Link>
        </p>

      </div>

    </div>

  );

}

export default Login;