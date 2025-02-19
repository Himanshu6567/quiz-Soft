import React from "react";
import Quiz from "./components/Quiz";
import History from "./components/History";
import NavBar from "./components/NavBar";
import QuizLandingPage from "./components/InitialPage";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<QuizLandingPage />} />   
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
