
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext";
import Header1 from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Footer from "./Components/Footer/Footer";
import Que from "./Pages/AskQuestion/AskQuestion";
import AnswerQuestion from "./Pages/QuestionDetail/QuestionDetail";


function App() {
  const [userData, setUserData] = useState({ token: undefined, user: undefined });

  const checkLoggedIn = async () => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_base_url}/api/users`, {
          headers: { 'x-auth-token': token }
        });

        setUserData({
          token,
          user: {
            id: response.data.user_id,
            display_name: response.data.data.user_name
          }
        });
      } catch (error) {
        console.log('Error:', error);
        // Handle error if the token is invalid or the request fails
        // For example, you can clear the token and display an error message
        localStorage.setItem('auth-token', '');
        setUserData({ token: undefined, user: undefined });
      }
    }
  };

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem('auth-token', '');
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
    <Header1 logout={logout} />
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home logout={logout} />} />
      <Route path="/ask-question" element={<Que />} />
      <Route path="/questions/:id" element={<AnswerQuestion />} />
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
