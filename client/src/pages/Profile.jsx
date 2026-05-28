import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Profile() {

  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [username, setUsername] = useState(
    currentUser.username
  );

  const [bio, setBio] = useState(
    currentUser.bio || ""
  );

  useEffect(() => {

    axios
      .get("https://pinclone-backend-6jfa.onrender.com/api/posts")
      .then((res) => {

        const filteredPosts = res.data.filter(
          (post) => post.userId === currentUser.id
        );

        setPosts(filteredPosts);

      });

  }, [currentUser.id]);

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `https://pinclone-backend-6jfa.onrender.com/api/posts/${id}`
      );

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== id)
      );

    } catch (err) {

      console.log(err);

    }

  };

  const handleSaveProfile = async () => {

    try {

      const res = await axios.put(
        `https://pinclone-backend-6jfa.onrender.com/api/auth/profile/${currentUser.id}`,
        {
          username,
          bio
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setIsEditing(false);

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Failed to update profile");

    }

  };

  return (

    <>

      <Navbar />

      <div className="min-h-screen p-6">

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-8 mb-10">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center text-5xl font-bold shadow-xl">
              {username.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 w-full">

              {isEditing ? (

                <>

                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-4xl font-extrabold text-purple-600 bg-transparent outline-none mb-4 border-b-2 border-pink-300"
                  />

                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="3"
                    placeholder="Write something about yourself..."
                    className="w-full border border-pink-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                  />

                </>

              ) : (

                <>

                  <h1 className="text-5xl font-extrabold text-purple-600">
                    {username}
                  </h1>

                  <p className="text-gray-600 mt-4 text-lg">

                    {bio
                      ? bio
                      : "No bio added yet"}

                  </p>

                </>

              )}

              <div className="flex items-center justify-between mt-5">

                <p className="text-gray-500">
                  {posts.length} Posts
                </p>

                {isEditing ? (

                  <div className="flex gap-3">

                    <button
                      onClick={() => {

                        setUsername(currentUser.username);

                        setBio(currentUser.bio || "");

                        setIsEditing(false);

                      }}
                      className="bg-gray-300 text-black px-5 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Save
                    </button>

                  </div>

                ) : (

                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Edit Profile
                  </button>

                )}

              </div>

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
                className="mb-4 break-inside-avoid rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300"
              >

                <img
                  src={`https://pinclone-backend-6jfa.onrender.com/uploads/${post.image}`}
                  alt=""
                  className="w-full hover:scale-105 transition-all duration-500"
                />

                <div className="p-4">

                  <h2 className="font-bold text-lg mb-4">
                    {post.title}
                  </h2>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    Delete Post
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </>

  );

}

export default Profile;