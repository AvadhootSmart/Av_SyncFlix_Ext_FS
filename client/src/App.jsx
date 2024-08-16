import Lander from "./components/Lander";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./components/Room";
import { SocketProvider } from "./SocketContext";

export default function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Lander />} />
          <Route path="/Room/:RoomId" element={<Room />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}
