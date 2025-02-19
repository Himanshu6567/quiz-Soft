import React, { useState } from "react";

const Accordion = ({ history }) => {
  const [accordionOpen, setAccordionOpen] = useState(false); // State to track whether the accordion is open or closed

  const score = history.userAnswers.reduce(
    // Calculate the quiz score by checking how many answers are correct
    (acc, curr) => acc + (curr.myAnswer === curr.correctAnswer ? 1 : 0),
    0
  );

  const formatDate = (dateString) => {
    //formet the date
    return new Date(dateString)
      .toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  // determine row color based on whether the user's answer was correct or incorrect
  const getRowColor = (answer, correctAnswer) =>
    answer === correctAnswer ? "bg-green-200" : "bg-red-200";

  return (
    <div className="mb-4 bg-white rounded-lg shadow-md">
      {/* Button to toggle the accordion */}
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex items-center justify-between w-full p-4 font-medium text-white bg-indigo-500 rounded-t-lg"
      >
        {/* Display formatted quiz attempt date */}
        <span>{formatDate(history.date)}</span>
        {/* Display quiz score */}
        <span>
          {score}/{history.userAnswers.length}
        </span>
        <span
          className={`transform transition-transform ${
            accordionOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ${
          accordionOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {/* Table displaying the user's answers */}
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Question No.</th>
              <th className="p-3">Question</th>
              <th className="p-3">Your Answer</th>
              <th className="p-3">Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {history.userAnswers.map((ans, index) => (
              <tr
                key={index}
                className={`${getRowColor(
                  ans.myAnswer,
                  ans.correctAnswer
                )} border-b`}
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3">{ans.question}</td>
                <td className="p-3 font-semibold">
                  {ans.myAnswer || (
                    <span className="italic text-gray-500">No Answer</span>
                  )}
                </td>
                <td className="p-3 font-semibold">{ans.correctAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accordion;
