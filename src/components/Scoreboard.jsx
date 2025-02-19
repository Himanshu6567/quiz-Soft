import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";

const Scoreboard = ({ userAnswers }) => {
  // Calculate the user's score by checking how many answers are correct
  const score = userAnswers.reduce((acc, curr) => {
    return acc + (curr.myAnswer === curr.correctAnswer ? 1 : 0);
  }, 0);

  // row color based on correctness of the answer
  const getRowColor = (answer, correctAnswer) => {
    if (!answer) return "bg-gray-200"; // If no answer was given, gray background
    return answer === correctAnswer ? "bg-green-200" : "bg-red-200"; // Green for correct, red for incorrect
  };

  return (
    <div className="max-w-6xl p-6 mx-auto overflow-x-auto bg-white rounded-lg shadow-lg">
      <Link
        to={"/"}
        className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-600"
      >
        <FiRefreshCw /> <span> Attempt Again</span>
      </Link>
      <h2 className="mb-6 text-3xl font-bold text-center text-indigo-600">
        Your Score: {score}/{userAnswers.length}
      </h2>
      <h3 className="mb-4 text-xl font-semibold text-center text-gray-700">
        Your Answers
      </h3>
      {/* Table to display questions and user responses */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-sm font-medium text-left text-gray-600">
                Question No.
              </th>
              <th className="p-3 text-sm font-medium text-left text-gray-600">
                Question
              </th>
              <th className="p-3 text-sm font-medium text-left text-gray-600">
                Your Answer
              </th>
              <th className="p-3 text-sm font-medium text-left text-gray-600">
                Correct Answer
              </th>
            </tr>
          </thead>
          <tbody>
            {/*  userAnswers and display each question */}
            {userAnswers.map((ans, index) => (
              <tr
                key={index}
                className={`${getRowColor(
                  ans.myAnswer,
                  ans.correctAnswer
                )} hover:bg-gray-50 transition-colors duration-200`}
              >
                <td className="p-3 text-sm text-center text-gray-800">
                  {index + 1}
                </td>
                <td className="p-3 text-sm text-gray-800">{ans.question}</td>
                <td className="p-3 text-sm font-semibold text-gray-800">
                  {ans.myAnswer || (
                    <span className="italic text-gray-500">No Answer</span>
                  )}
                </td>
                <td className="p-3 text-sm font-semibold text-gray-800">
                  {ans.correctAnswer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scoreboard;
