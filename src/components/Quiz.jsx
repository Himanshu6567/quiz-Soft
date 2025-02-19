import React, { useState, useEffect } from "react";
import Question from "./Question";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import questions from "./questions.json";
import { saveHistory } from "../utils/db";

const Quiz = () => {
  // track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // store user answers
  const [userAnswers, setUserAnswers] = useState([]);
  // State to check if the quiz is completed
  const [quizCompleted, setQuizCompleted] = useState(false);
  //  store the list of questions
  const [questionsList, setQuestionsList] = useState([]);
  // for countdown timer
  const [time, setTime] = useState(30);
  // add a border effect for correct/incorrect answers
  const [borderCls, setBorderCls] = useState("");
  // update button text ("Next" or "Submit")
  const [btnTitle, setBtnTitle] = useState("Next");

  useEffect(() => {
    // useEffect to initialize the questions list when the component mounts
    const combinedQuestions = [
      ...questions.multipleChoiceQuestions,
      ...questions.integerQuestions,
    ];
    setQuestionsList(combinedQuestions);
  }, []);

  // handle user selecting an answer
  const handleAnswer = (answer) => {
    // Check if the selected answer is correct
    const ans = questionsList[currentQuestionIndex].correctAnswer === answer;

    // Show border color for 1.5 seconds based on the answer correctness
    setBorderCls(ans ? "border-2 border-green-500" : "border-2 border-red-500");
    // Update user answers array with the new answer
    setUserAnswers([
      ...userAnswers,
      {
        question: questionsList[currentQuestionIndex].question,
        correctAnswer: questionsList[currentQuestionIndex].correctAnswer,
        myAnswer: answer,
      },
    ]);

    // Delay for showing border , then move to next question
    setTimeout(() => {
      setBorderCls(""); // Remove border
      if (currentQuestionIndex + 1 < questionsList.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);

        // Change button title to "Submit" on the last question
        if (currentQuestionIndex + 1 === questionsList.length - 1) {
          setBtnTitle("Submit");
        }
      } else {
        console.log(userAnswers);
        setQuizCompleted(true);
        // Mark quiz as completed
      }
      setTime(30);
    }, 500); // Delay for border effect (1.5 seconds)
  };

  useEffect(() => {
    // useEffect to save user answers when the quiz is completed
    if (quizCompleted) {
      saveHistory(userAnswers)
        .then((message) => {
          console.log(message); // Successfully saved the history
        })
        .catch((error) => {
          console.error(error); // Error saving the history
        });
    }
  }, [quizCompleted, userAnswers]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-200">
      <h1 className="mb-4 text-3xl font-bold text-blue-600">
        Interactive Quiz
      </h1>
      <div className={` bg-white p-6 rounded-xl shadow-lg ${borderCls}`}>
        {!quizCompleted ? (
          questionsList.length > 0 ? (
            <div className="w-full max-w-lg">
              {/* Render question component */}
              <Question
                key={currentQuestionIndex}
                question={questionsList[currentQuestionIndex]}
                onAnswer={handleAnswer}
                btnTitle={btnTitle}
              />
              <Timer
                handleAnswer={handleAnswer}
                time={time}
                setTime={setTime}
              />
            </div>
          ) : (
            // Show loading message if questions are not loaded yet
            <p className="text-center text-gray-500">Loading questions...</p>
          )
        ) : (
          // Show scoreboard when quiz is completed
          <Scoreboard userAnswers={userAnswers} />
        )}
      </div>
    </div>
  );
};

export default Quiz;
