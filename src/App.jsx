import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import CreatePost from "./pages/createPost";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/nav";

import "react-toastify/dist/ReactToastify.css";
import MyPosts from "./pages/myPosts";
import AllPosts from "./pages/allPosts";
import SinglePost from "./pages/singlePost";
import EditPost from "./pages/editPost";
import ProtectedRoute from "./utils/protectedRoute";
import EditProfile from "./pages/editProfile";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myposts"
          element={
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          }
        />
        <Route path="/allposts" element={<AllPosts />} />
        <Route
          path="/editpost/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route path="/singlepost/:id" element={<SinglePost />} />
        <Route
          path="/editprofile/:id"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
