import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Home.css";
import Question from "../../Components/Question/Question";

const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [allQuestions, setAllQuestions] = useState([]);
  const navigate = useNavigate();
  const Questions = async () => {
    try {
      const questionRes = await axios.get(
        `${process.env.REACT_APP_base_url}/api/questions`
        
      );
      setAllQuestions(questionRes.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  };
  useEffect(() => {
    if (!userData.user) navigate("/login");
    Questions();
  }, [userData.user, navigate]);
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/ask-question");
  };
  return (
    <div className="home-container">
      <div className="justify-content">
        <button className="ask_button" onClick={handleClick}>
          Ask Question
        </button>
        <h4>Welcome: {userData.user?.display_name}</h4>
      </div>
      <h3 className="quest">Questions</h3>
      <div className="justify-content" >
        {allQuestions.map((question) => (
          <div  key={question.post_id}>
            <hr />
            <Link
              to={`questions/${question.post_id}`}
              className="questions"
            >
              <Question
                question={question.question}
                userName={question.user_name}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
