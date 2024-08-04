import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import QuickQuizPage from "./pages/QuickQuizPage";
import ScorePage from "./pages/ScorePage";
import RegisterPage from "./pages/RegisterPage";
import RoomCreationPage from "./pages/RoomCreationPage";
import AdminWaitingRoomPage from "./pages/AdminWaitingRoomPage";
import WaitingRoomPage from "./pages/WaitingRoomPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz_room" element={<QuickQuizPage />} />
          <Route path="/display_score" element={<ScorePage />} />
          <Route path="/room_creation" element={<RoomCreationPage />} />
          <Route
            path="/admin_waiting_room"
            element={<AdminWaitingRoomPage />}
          />
          <Route path="/waiting_room" element={<WaitingRoomPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
