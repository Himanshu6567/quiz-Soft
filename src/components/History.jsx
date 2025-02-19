import React, { useEffect, useState } from "react";
import { getHistory } from "../utils/db"; // Import function to fetch history from database
import Accordion from "./Accordion";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function History() {
  const [historys, setHistorys] = useState([]); //store history data
  const [loading, setLoading] = useState(true); //loading during the fatching data

  useEffect(() => {
    async function fetchData() {
      // Function to fetch history data
      try {
        const data = await getHistory();
        setHistorys(data.reverse()); // Reverse the order to show latest attempt first
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    }
    fetchData(); // Call the fetchData function when component mounts
  }, []);

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <Link
          className="flex items-center space-x-2 text-indigo-500 hover:text-indigo-700"
          to={"/"}
        >
          <FaAngleDoubleLeft /> <span>Home</span>
        </Link>
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">
          History
        </h2>
        {/* Display loading message while data is being fetched */}
        {loading ? (
          <p className="text-center text-gray-600">Loading history...</p>
        ) : historys.length > 0 ? (
          /* Map through history records and display them using Accordion */
          historys.map((history, index) => (
            <Accordion key={index} history={history} />
          ))
        ) : (
          /* Show message if no history is available */
          <p className="text-lg font-semibold text-center text-gray-600">
            😴 No history available
            <br />
            <span className="text-indigo-500">Attempt the quiz first! 🚀</span>
          </p>
        )}
      </div>
    </div>
  );
}
