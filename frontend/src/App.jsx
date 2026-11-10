import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import PostcodePage from "./PostcodePage.jsx";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostcodePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      {/* <PostcodePage /> */}
      {/* <HomePage /> */}
    </BrowserRouter>
  );
}

export default App;
