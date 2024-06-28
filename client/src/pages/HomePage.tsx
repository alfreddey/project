import QuizMenu from "@/components/customised/QuizMenu";

function HomePage() {
  return (
    <div className="flex justify-center h-screen">
      <img
        src="question_mark.jpg"
        className="lg:block hidden object-center w-3/5 h-fit -z-10"
      />
      <QuizMenu />
    </div>
  );
}

export default HomePage;
