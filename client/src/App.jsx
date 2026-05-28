import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import UserProfile from "./pages/UserProfile";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/upload" element={<Upload />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/post/:id" element={<PostDetail />} />

        <Route path="/user/:id" element={<UserProfile />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;