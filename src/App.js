import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import "../src/App.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
// import Footer from "./components/Footer";
import NewPost from "./components/NewPost";
import LandingPage from "./pages/LandingPage";
import Posts from "./components/Posts";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/newpost" element={<NewPost />} />
        <Route path="/dashboard/allposts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
