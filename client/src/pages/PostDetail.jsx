import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

function PostDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {

    axios
      .get("https://pinclone-backend-6jfa.onrender.com/api/posts")
      .then((res) => {

        const foundPost = res.data.find(
          (p) => p.id === Number(id)
        );

        setPost(foundPost);

      });

  }, [id]);

  if (!post) {

    return (

      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>

    );

  }

  const likedUsers = post.likedBy
    ? post.likedBy.split(",").filter(Boolean)
    : [];

  return (

    <>

      <Navbar />

      <div className="min-h-screen p-6">

        <button
          onClick={() => navigate("/")}
          className="mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
        >
          ← Back to Home
        </button>

        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-pink-100 grid md:grid-cols-2">

          <div>

            <img
              src={`https://pinclone-backend-6jfa.onrender.com/uploads/${post.image}`}
              alt=""
              className="w-full h-full object-cover"
            />

          </div>

          <div className="p-8 flex flex-col justify-between">

            <div>

              <div
                onClick={() => navigate(`/user/${post.userId}`)}
                className="flex items-center gap-4 mb-6 cursor-pointer"
              >

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {post.username?.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h2 className="font-bold text-2xl text-gray-800">
                    {post.username}
                  </h2>

                  <p className="text-gray-500">
                    Creator
                  </p>

                </div>

              </div>

              <h1 className="text-4xl font-extrabold text-purple-600 mb-6">
                {post.title}
              </h1>

            </div>

            <div className="flex items-center justify-between border-t pt-6">

              <div className="flex items-center gap-3 text-red-500 text-2xl">

                ❤️

                <span className="text-gray-700 text-lg font-semibold">
                  {likedUsers.length} Likes
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default PostDetail;