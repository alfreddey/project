import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function MultiplayerBtn() {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate("/room_creation");
  };
  return (
    <Button className="w-full" onClick={handleOnclick}>
      Start a Multiplayer Quiz
    </Button>
  );
}

export default MultiplayerBtn;
