import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

function Home() {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    axios
      .get("https://pinclone-backend-6jfa.onrender.com/api/posts")
      .then((res) => {

        setPosts(res.data);
        setLoading(false);

      })
      .catch((err) => {

        console.log(err);
        setLoading(false);

      });

  }, []);

  const handleLike = async (id) => {

    try {

      const res = await axios.put(
        `https://pinclone-backend-6jfa.onrender.com/api/posts/like/${id}`,
        {
          userId: user.id
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                likedBy: res.data.likedBy
              }
            : post
        )
      );

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>

    );

  }

  return (

    <>

      <Navbar />

      {localStorage.getItem("token") && (

        <button
          onClick={() => window.location.href = "/upload"}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white w-16 h-16 rounded-full text-4xl shadow-2xl hover:scale-110 transition-all duration-300 z-50 animate-bounce"
        >
          +
        </button>

      )}

      <div className="min-h-screen p-4">

        {posts.length === 0 ? (

          <div className="text-center text-gray-500 mt-10 text-2xl">
            No posts yet
          </div>

        ) : (

          <div className="columns-2 md:columns-4 gap-4">

            {posts.map((post) => {

              const likedUsers = post.likedBy
                ? post.likedBy.split(",").filter(Boolean)
                : [];

              const isLiked = likedUsers.includes(
                String(user?.id)
              );

              return (

                <div
                  key={post.id}
                  onClick={() => navigate(`/post/${post.id}`)}
                  className="mb-4 break-inside-avoid cursor-pointer rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-pink-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >

                  <img
                    src={`https://pinclone-backend-6jfa.onrender.com/uploads/${post.image}`}
                    alt=""
                    className="w-full hover:scale-105 transition-all duration-500"
                  />

                  <div className="p-4">

                    <div
                      onClick={(e) => {

                        e.stopPropagation();

                        navigate(`/user/${post.userId}`);

                      }}
                      className="flex items-center gap-3 mb-3 cursor-pointer"
                    >

                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-md">
                        {post.username?.charAt(0).toUpperCase()}
                      </div>

                      <div>

                        <p className="font-semibold text-gray-800">
                          {post.username}
                        </p>

                        <p className="text-xs text-gray-500">
                          Creator
                        </p>

                      </div>

                    </div>

                    <h2 className="font-bold text-lg mb-4">
                      {post.title}
                    </h2>

                    <div className="flex items-center justify-between">

                      <button
                        onClick={() => handleLike(post.id)}
                        className={`text-2xl hover:scale-125 transition-all duration-300 ${
                          isLiked
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        ❤️
                      </button>

                      <span className="text-gray-600 font-medium">
                        {likedUsers.length} likes
                      </span>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </>

  );

}

export default Home;