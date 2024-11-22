import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/login';
import SignUp from './pages/signup';
import NavBar from './components/Navbar';
import Home from './pages/home';
import Upload from './pages/upload';
import Reports from './pages/reports';
import ImageReportViewer from "./pages/ImageReportViewer";
import Verify from "./pages/verify";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/reports/:id" element={<ImageReportViewer />} />
        </Routes>
       </BrowserRouter>
    </>
  );
}
export default App;
