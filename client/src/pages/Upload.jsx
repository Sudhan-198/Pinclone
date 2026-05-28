import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

function Upload() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);
    formData.append("userId", user.id);
    formData.append("username", user.username);
    formData.append("bio", user.bio);

    try {

      await axios.post(
        "http://localhost:5000/api/posts",
        formData
      );

      alert("Post uploaded successfully");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Upload failed");

    }

  };

  return (

    <>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center p-6">

        <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/40 w-[400px]">

          <h1 className="text-4xl font-extrabold text-purple-600 text-center mb-8">
            Upload Post
          </h1>

          <input
            type="text"
            placeholder="Enter title"
            className="w-full border border-pink-200 p-3 rounded-2xl mb-5 outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            className="w-full mb-6"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Upload
          </button>

        </div>

      </div>

    </>

  );

}

export default Upload;