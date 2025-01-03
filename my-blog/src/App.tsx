import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserTab from "./components/UserTab";
import useUser from "./hooks/useUser";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const {
    user,
    registerUser,
    loginUser,
    logoutUser,
    errorMessage,
  } = useUser();
  return (
    <>
      <Router>
        <UserTab user={user || { username: "Guest" }} outLog={logoutUser} />
        <Header />
        <Routes>
          <Route
            path="/register"
            element={
              <Register
                onRegister={registerUser}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                onLogin={loginUser}
                errorMessage={errorMessage}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
