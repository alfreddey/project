import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { socket } from "@/socket";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RoomCreationPage() {
  const [room_name, setRoomName] = useState("");
  const navigate = useNavigate();
  const handleCreateBtn = (userInfo: any) => {
    // establishes a websocket connection with the
    // server, emits a create_room event and
    // navigates to the waiting room page
    // ELSE returns an error message
    try {
      socket.connect();
      socket.emit("create_room", userInfo);
      socket.on("goto_waiting_room", () =>
        navigate("/waiting_room", { replace: false })
      );
    } catch (err: any) {
      console.log(err.message);
      return;
    }
  };

  const handleJoinDialog = async (roomInfo: any) => {
    // establishes a connection with the server
    // emits a join_room event
    // navigates to the waiting room page
    // ELSE returns an error message
    try {
      socket.connect();
      socket.emit("join_room", roomInfo);
      socket.on("error", (msg) => {
        console.log(msg);
      });
      socket.on("goto_waiting_room", () =>
        navigate("/waiting_room", { replace: false })
      );
    } catch (err: any) {
      console.log(err.message);
      return;
    }
  };
  return (
    <div className="mx-auto w-[400px] md:w-[480px] mt-8 flex flex-col gap-8">
      <div className="">
        <h1 className="text-[24px]">Welcome to the waiting room,</h1>
        <p className="text-[#80848d]">
          click on the <span>Create a Room</span> button to create a waiting
          room or the <span>Join a Room </span>
          button to join a particular room.
        </p>
        <p className="-text-[#34df00] text-[#ff4a4a]">
          <span className="underline underline-offset-4 font-[600]">Note:</span>{" "}
          Room names are the same as the username of its creator.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => handleCreateBtn({ username: "A" })}
          className="shadow-xl"
        >
          Create a Room
        </Button>
        <JoinDialog
          setRoomName={setRoomName}
          handleClick={() => handleJoinDialog({ room_name })}
        />
      </div>
    </div>
  );
}

function JoinDialog({
  handleClick,
  setRoomName,
}: {
  handleClick: any;
  setRoomName: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"}>Join a Room</Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="font-normal">Join a Room</DialogTitle>
          <DialogDescription>
            Enter the name of the room you want to join
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="room_name" className="px-2">
            Room Name
          </Label>
          <Input
            id="room_name"
            placeholder="john_smith"
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={handleClick}>
          Join
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default RoomCreationPage;
