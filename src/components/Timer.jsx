import React, { useEffect } from "react";

const Timer = ({ handleAnswer, time, setTime }) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (time === 0) {
      clearInterval(timerId);
      handleAnswer("");
    }

    return () => clearInterval(timerId);
  }, [time]);

  return (
    <div className="mt-4 text-lg font-bold text-center text-red-600">
      Time Remaining: {time}s
    </div>
  );
};
export default Timer;
