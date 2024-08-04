import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5000";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

export default function LoginForm() {
  const navigate = useNavigate();
  return (
    <Card className="w-[350px] h-fit shadow-2xl">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginFormControls />
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="w-full"
          onClick={() => navigate("/register")}
        >
          New to Quiz App? Register an account.
        </Button>
      </CardFooter>
    </Card>
  );
}

function LoginFormControls() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    try {
      const result = await axios.post("/login", {
        username: formData.username,
        password: formData.password,
      });
      if (result.data.token) {
        sessionStorage.setItem("auth_token", result.data.token);
        sessionStorage.setItem("username", formData.username);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + result.data.token;

        navigate("/home", { replace: true });
      } else {
        console.log("Error occured: ", result.data.err);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Axios (Login failed):", err.response.data);
      } else {
        console.error("Login failed:", err);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="john_smith123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
