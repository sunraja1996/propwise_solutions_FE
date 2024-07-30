import "./App.css";
import Nav from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Properties from "./Components/Properties";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/dashboard" && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </>
  );
}

export default App;
