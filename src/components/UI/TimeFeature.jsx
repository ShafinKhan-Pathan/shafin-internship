import React, { useEffect, useState } from "react";

const TimerFeature = ({ expiryTime }) => {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const updateTimer = () => {
      const startTime = Date.now();
      const differenceTime = expiryTime - startTime;
      const totalSeconds = Math.floor(differenceTime / 1000);
      const secondsElapsed = totalSeconds % 60;
      const minuteElapsed = Math.floor((totalSeconds / 60) % 60);
      const hoursElapsed = Math.floor(totalSeconds / 3600);
      setTimeLeft(`${hoursElapsed}h ${minuteElapsed}m ${secondsElapsed}s`);
    };

    updateTimer();
    
    const interval = setInterval(() => {
      updateTimer();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [expiryTime]);
  return <>{timeLeft}</>;
};

export default TimerFeature;
