import { useState, useEffect, useRef } from "react";

export function useTimer(initialTime: number) {
  const [counter, setCounter] = useState(initialTime);
  const id = useRef<any>();

  const stopTimer = () => {
    clearInterval(id.current);
  };

  useEffect(() => {
    const interval_id = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) {
          return prevCounter - 1000;
        } else {
          clearInterval(interval_id);
          return 0;
        }
      });
    }, 1000);

    id.current = interval_id;

    // Cleanup interval_id on unmount
    return () => clearInterval(interval_id);
  }, []);

  return { counter, stopTimer };
}
