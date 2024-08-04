import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function ScorePage() {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const time = location.state.data.time;

  useEffect(() => {
    const correct_answers = location.state?.data?.correct_answers;
    const user_answers = location.state?.data?.user_answers;
    let score = 0;

    for (let i = 0; i < correct_answers.length; i++) {
      if (correct_answers[i] == user_answers[i]) {
        score += 1;
      }
    }

    setScore(score);
  }, []);

  return (
    <div className="flex items-center flex-col p-4">
      <h1 className="text-[24px]">Your Score: {score}</h1>
      <p className="text-[#71768d]">
        Completion time:{" "}
        {<span className="">{time.mins + ":" + time.secs}</span>}
      </p>
      <Button variant="link" onClick={() => navigate("/home")}>
        Go to Menu
      </Button>
    </div>
  );
}

export default ScorePage;
