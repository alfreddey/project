import QuizList from "@/components/customised/QuizList";
import { useLocation } from "react-router-dom";

function QuickQuizPage() {
  const location = useLocation();
  return (
    <div className="flex justify-center py-8">
      <QuizList
        quizList={location.state?.data?.results}
        time={location.state?.data?.time}
      />
    </div>
  );
}

export default QuickQuizPage;
