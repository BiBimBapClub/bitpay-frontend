import { useEffect, useState } from "react";

const useTimer = ({ updatedTime }) => {
  const [timer, setTimer] = useState({
    hours: "--",
    minutes: "--",
  });

  const startTime = new Date(updatedTime);
  startTime.setHours(startTime.getHours() + 2);

  useEffect(() => {
    const countdown = setInterval(() => {
      var now = new Date();

      var differenceInMilliseconds = startTime.getTime() - now.getTime();

      var differenceInMinutes = Math.floor(
        differenceInMilliseconds / (1000 * 60)
      );
      var differenceInHours = Math.floor(differenceInMinutes / 60);
      var remainingMinutes = differenceInMinutes % 60;

      setTimer({
        hours: differenceInHours,
        minutes: remainingMinutes,
      });
    }, 1000);

    if (timer.hours === 0 && timer.minutes === 0) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [startTime, timer.hours, timer.minutes]);

  return timer;
};

export default useTimer;
