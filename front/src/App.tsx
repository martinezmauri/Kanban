import "./App.css";
import { Home } from "./views/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyTasks } from "./views/MyTasks/MyTasks";
import { About } from "./views/About-us/About";
import { Contact } from "./views/Contact/Contact";
import { Login } from "./views/Login/Login";
import { Register } from "./views/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import { ErrorPage } from "./views/Error/ErrorPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myTasks" element={<MyTasks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
