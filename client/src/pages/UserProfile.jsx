import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

function UserProfile() {

  const { id } = useParams();

  const [posts, setPosts] = useState([]);

  const [userData, setUserData] = useState({
    username: "",
    bio: ""
  });

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {

        const filteredPosts = res.data.filter(
          (post) => String(post.userId) === id
        );

        setPosts(filteredPosts);

        if (filteredPosts.length > 0) {

          const firstPost = filteredPosts[0];

          setUserData({

            username: firstPost.username,

            bio: firstPost.bio || ""

          });

        }

      });

  }, [id]);

  return (

    <>

      <Navbar />

      <div className="min-h-screen p-6">

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-8 mb-10">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center text-5xl font-bold shadow-xl">
              {userData.username.charAt(0).toUpperCase()}
            </div>

            <div>

              <h1 className="text-5xl font-extrabold text-purple-600">
                {userData.username}
              </h1>

              <p className="text-gray-600 mt-4 text-lg">

                {userData.bio
                  ? userData.bio
                  : "No bio added yet"}

              </p>

              <p className="text-gray-500 mt-4">
                {posts.length} Posts
              </p>

            </div>

          </div>

        </div>

        {posts.length === 0 ? (

          <div className="text-center text-gray-500 text-2xl mt-20">
            No posts uploaded yet
          </div>

        ) : (

          <div className="columns-2 md:columns-4 gap-4">

            {posts.map((post) => (

              <div
                key={post.id}
                className="mb-4 break-inside-avoid rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-pink-100"
              >

                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt=""
                  className="w-full hover:scale-105 transition-all duration-500"
                />

                <div className="p-4">

                  <h2 className="font-bold text-lg">
                    {post.title}
                  </h2>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </>

  );

}

export default UserProfile;