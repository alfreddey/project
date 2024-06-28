import { useLocation } from "react-router-dom";

function ScorePage() {
  const location = useLocation();
  return <div>{location.state.data.time.secs}</div>;
}

export default ScorePage;
