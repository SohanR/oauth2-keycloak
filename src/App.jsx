import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import User from "./pages/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default App;
