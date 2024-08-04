import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect, useMemo, useRef } from "react";
import he from "he";
import { useTimer } from "@/hooks/useTimer";
import { useNavigate } from "react-router-dom";

type QuizItem = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

type QuizListProps = {
  quizList: QuizItem[];
  time: string;
};

export default function QuizList({ quizList, time }: QuizListProps) {
  const form = useForm();
  const navigate = useNavigate();
  const correct_answers = useRef<string[]>([]);
  const [disabled, setDisabledBtn] = useState(false);
  const { counter, stopTimer } = useTimer(parseInt(time));

  // Convert milliseconds to minutes and seconds
  const mins = Math.floor(counter / 60000);
  const secs = Math.floor((counter % 60000) / 1000);

  // Function to rearrange options
  function reArrange(arr: string[], correct_answer: string): string[] {
    let new_arr: string[] = [...arr, correct_answer];
    for (let i = new_arr.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = new_arr[i];
      new_arr[i] = new_arr[randomIndex];
      new_arr[randomIndex] = temp;
    }
    return new_arr;
  }

  // Memoize options to avoid recalculating on every render
  const options = useMemo(() => {
    return quizList.map((quizItem) => {
      return reArrange(quizItem.incorrect_answers, quizItem.correct_answer);
    });
  }, [quizList]);

  // Store correct answers on initial render
  useEffect(() => {
    correct_answers.current = quizList.map(
      (quizItem) => quizItem.correct_answer
    );

    console.log(correct_answers.current);
  }, [quizList]);

  function onSubmit(data: any) {
    console.log(data);
    setDisabledBtn(true);
    stopTimer();
    navigate("/display_score", {
      state: {
        data: {
          correct_answers: correct_answers.current,
          user_answers: data,
          time: { mins, secs },
        },
      },
      replace: true,
    });
  }

  return (
    <div className="flex flex-col space-y-2 p-4 py-4">
      <div className="p-2 border w-fit rounded-sm shadow-sm font-bold">
        <span className="font-normal text-muted-foreground">Time left: </span>
        {`${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-fit p-2 space-y-6"
        >
          {quizList.map((quizItem, key) => {
            const quizOptions = options[key] || [];
            return (
              <FormField
                key={key}
                control={form.control}
                name={key + ""}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      {key + 1 + ". " + he.decode(quizItem.question)}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        className="flex flex-col space-y-1"
                      >
                        {quizOptions.map((option, index) => (
                          <FormItem
                            key={index}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={he.decode(option)} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {he.decode(option)}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button disabled={disabled} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
