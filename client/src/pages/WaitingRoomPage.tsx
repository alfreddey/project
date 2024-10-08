import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function WaitingRoomPage() {
  const navigate = useNavigate();
  const [room_name, setRoomName] = useState<any>(() => {
    const room: any = sessionStorage.getItem("room");
    return JSON.parse(room).toUpperCase();
  });

  const [message, setMessage] = useState(
    "No instructions available for this quiz."
  );

  const [waiting_users, setWaitingUsers] = useState<any>([]);

  const handleExitBtn = (room_name: any) => {
    socket.emit("exit_room", room_name);
  };

  useEffect(() => {
    socket.on("users", (list) => {
      setWaitingUsers(list);
    });
    socket.on("goto_room_creation", () => {
      navigate("/room_creation", { replace: true });
    });
    socket.on("delete", () => socket.emit("exit_room", room_name));

    socket.on("start_quiz", (quiz) => {
      console.log("STart Quix", quiz);
      navigate("/quiz_room", {
        state: { data: quiz },
        replace: true,
      });
    });
    return () => {
      socket.off("users");
      socket.off("goto_room_creation");
      socket.off("delete");
    };
  }, []);

  return (
    <div className="mx-auto flex items-center h-[90%]">
      <div className="border-r p-[20px] gap-[10px] flex flex-col">
        <h1 className="md:text-[16px] w-[180px] md:w-[232px] px-1 text-[#797e8b]">
          {room_name}'s Waiting Room
        </h1>
        <div className="flex flex-col gap-2">
          {!waiting_users
            ? "No one has joined yet."
            : waiting_users.map((username: string, i: number) => {
                return (
                  <div className="border rounded py-1 px-2" key={i}>
                    {username}
                  </div>
                );
              })}
        </div>
        <button
          onClick={() => handleExitBtn(room_name.toLowerCase())}
          className="rounded bg-[#565966] text-white p-2 md:font-semibold"
        >
          Exit Room
        </button>
      </div>
      <div className="max-w-[928px] p-[40px] flex flex-col gap-8">
        <div>
          <h1 className="text-[32px] lg:text-[48px] leading-none">
            Information about the quiz, and instructions to follow are below
          </h1>
          <p className="mt-[10px] md:mt-0 text-[16px] text-[#797e8b] md:text-[24px]">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WaitingRoomPage;
