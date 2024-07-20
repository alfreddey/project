import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickQuickForm from "@/components/customised/dialogs/QuickQuizForm";
import CreateQuizForm from "@/components/customised/dialogs/CreateQuizForm";
import MultiplayerBtn from "./MultiplayerBtn";

function QuizMenu() {
  const [selectedOption, setSelectedOption] = useState("quickQuiz");

  const handleButtonClick = (buttonId: string) => {
    setSelectedOption(buttonId);
  };

  const displayTrigger = (selectedOption: string) => {
    switch (selectedOption) {
      case "createQuiz":
        return <CreateQuizForm />;
      case "multiplayerQuiz":
        return <MultiplayerBtn />;
      default:
        return <QuickQuickForm />;
    }
  };

  return (
    <Card className="w-[350px] h-fit md:w-96 mt-8 shadow-2xl min-w-fit">
      <CardHeader>
        <CardTitle>Quiz Menu</CardTitle>
        <CardDescription>Select option to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className={`w-full justify-start p-3 ${
            selectedOption === "quickQuiz" ? "bg-purple-100" : ""
          }`}
          variant="ghost"
          onClick={() => handleButtonClick("quickQuiz")}
        >
          Quick Quiz
        </Button>
        <Button
          className={`w-full justify-start p-3 mt-1 ${
            selectedOption === "createQuiz" ? "bg-purple-100" : ""
          }`}
          variant="ghost"
          onClick={() => handleButtonClick("createQuiz")}
        >
          Create a Quiz
        </Button>
        <Button
          className={`w-full justify-start p-3 mt-1 ${
            selectedOption === "multiplayerQuiz" ? "bg-purple-100" : ""
          }`}
          variant="ghost"
          onClick={() => handleButtonClick("multiplayerQuiz")}
        >
          Play Quiz with friends
        </Button>
      </CardContent>
      <CardFooter>{displayTrigger(selectedOption)}</CardFooter>
    </Card>
  );
}

export default QuizMenu;
