import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  number: z.string().min(1, "Number of questions is required"),
  time: z.string().min(1, "Please select time."),
  category: z.string().min(1, "Please select a category to start."),
  type: z.string(),
  difficultyLevel: z.string().min(1, "Please select a difficulty level."),
  source: z.string().min(1, "Please select a source."),
});

const OpenTriviaAPI_BASE_URL = "https://opentdb.com/api.php";

export default function QuickQuickForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Play Quick Quiz</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Quiz</DialogTitle>
          <DialogDescription>
            Select quiz category, type, difficulty levels, among others
          </DialogDescription>
        </DialogHeader>
        <QuickQuizFormControls />
      </DialogContent>
    </Dialog>
  );
}

function QuickQuizFormControls() {
  const { getQuizzes } = useFetch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "4",
      time: "300000",
      category: "9",
      type: "multiple",
      difficultyLevel: "easy",
      source: "open_trivia_db",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    if (formData.source === "open_trivia_db") {
      const query_string = `?amount=${formData.number}&category=${formData.category}&difficulty=${formData.difficultyLevel}&type=${formData.type}`;

      const temp = await getQuizzes(OpenTriviaAPI_BASE_URL + query_string);
      const data = { ...temp, time: formData.time };

      // Navigate and send data to quiz room route,
      // where QuickQuizPage is rendered
      navigate("/quiz_room", {
        state: { data },
      });
    } else {
      alert(
        "Cannot fetch from Quiz App Database. Service not currently available."
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of quiz questions</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="4">Four</SelectItem>
                  <SelectItem value="6">Six</SelectItem>
                  <SelectItem value="10">Ten</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Time for the quiz" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="300000">5 minutes</SelectItem>
                  <SelectItem value="600000">10 minutes</SelectItem>
                  <SelectItem value="1200000">20 minutes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="General Knowledge" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="9">General Knowledge</SelectItem>
                  <SelectItem value="18">Science</SelectItem>
                  <SelectItem value="21">Sports</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Multiple Choice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="multiple">Multiple Choice</SelectItem>
                  <SelectItem value="boolean">True or False</SelectItem>
                  <SelectItem value=" ">Any</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficultyLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Easy" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quiz source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="open_trivia_db">
                    Open Trivia Database
                  </SelectItem>
                  <SelectItem value="quiz_app_db">Quiz App Database</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Start
        </Button>
      </form>
    </Form>
  );
}
