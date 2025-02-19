import React from "react";
import { Link } from "react-router-dom";

const QuizLandingPage = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-blue-600 text-white p-4">
      <div className="max-w-3xl  text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Test Your Knowledge!
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Challenge yourself with our exciting quiz. Sharpen your mind and see
          how much you know!
        </p>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full md:w-3/4 mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Quiz Details:
            </h2>
            <ul className="text-lg list-disc list-inside">
              <li>Total Questions: 10</li>
              <li>5 Multiple Choice Questions</li>
              <li>5 Integer-Type Questions</li>
              <li>Each question has a 30-second time limit</li>
              <li>Questions will auto-submit after 30 seconds</li>
            </ul>
          </div>

          <Link
            to={"/quiz"}
            className="mt-6  w-44  bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizLandingPage;
