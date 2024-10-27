import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, useLocation } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";

import "./CSS/App.css";

const App: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Quicksand",
    },
    palette: {
      mode: "light",
    },
  });

  const location = useLocation();
  const paths: string[] = ["/"];
  const isPath = paths.includes(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      {isPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      {isPath && <Footer />}
    </ThemeProvider>
  );
};

export default App;
