import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserTab from "./components/UserTab";
import useUser from "./hooks/useUser";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import usePost from "./hooks/usePost";
import PostPage from "./pages/PostPage";
import MyPosts from "./pages/MyPosts";
import Home from "./pages/Home";
import { User } from "./interfaces/UserType";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user?: User | null | undefined; // `user` can be undefined if not logged in
  children: React.ReactNode; // Children must be valid React node
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  // If user is not logged in, redirect to login page
  if (!user?.username) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Render protected content
};


function App() {
  const {loading, user, registerUser, loginUser, logoutUser, errorMessage } =
    useUser();
  const { posts, createPost, updatePost, deletePost } = usePost();
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Router>
        <UserTab user={user || { username: "Guest" }} outLog={logoutUser} />
        <Header />
        <Routes>
          <Route
            path="/register"
            element={
              <Register onRegister={registerUser} errorMessage={errorMessage} />
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={loginUser} errorMessage={errorMessage} />}
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute user={user}>
                <CreatePost
                  createPost={createPost}
                  errorMessage={errorMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute user={user}>
                <PostPage posts={posts} user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute user={user}>
                <EditPost posts={posts} editPost={updatePost} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home
                  posts={posts}
                  user={user}
                  editPost={updatePost}
                  deletePost={deletePost}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myposts"
            element={
              <ProtectedRoute user={user}>
                <MyPosts
                  posts={posts}
                  user={user}
                  editPost={updatePost}
                  deletePost={deletePost}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
