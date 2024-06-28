import axios from "axios";

export default function useFetch() {
  return {
    async getQuizzes(url: string) {
      try {
        const { data } = await axios.get(url);
        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Handle axios error
          return new Error(err.message);
        } else {
          // Handle other types of errors
          return new Error("An unexpected error occurred");
        }
      }
    },
  };
}
