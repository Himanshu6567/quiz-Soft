import React, { useEffect, useState } from "react";

const Question = ({ question, onAnswer, btnTitle }) => {
  // store the user's selected answer
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    // Reset answer state whenever a new question is loaded
    setAnswer("");
  }, [question]);

  // Handle changes when a user selects an option or types an answer
  const handleChange = (event) => {
    const Value = event.target.value;
    //  For radio buttons, we keep the value as string, but for the number input, convert it to a number
    setAnswer(event.target.type === "number" ? +Value : Value);
  };

  // Handle form submission when the user selects an answer
  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswer(answer); // Pass the selected answer to the parent component
  };

  return (
    <div className="p-4">
      <p className="mb-2 text-lg font-semibold">
        <span className="mr-2">{question.questionNo}.</span>
        {question.question}
      </p>
      {/* If the question has multiple-choice options, render radio buttons */}
      {question.options ? (
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name="answer"
                value={option}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>
                {String.fromCharCode(65 + index)}. {option}
              </span>
            </label>
          ))}
        </div>
      ) : (
        // If the question is numeric, render an input field
        <input
          type="number"
          value={answer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      )}
      {/* Submit button to confirm the selected answer */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {btnTitle} {/* Submit button to confirm the selected answer */}
      </button>
    </div>
  );
};

export default Question;
