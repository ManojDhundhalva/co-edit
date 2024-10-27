import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Material-UI Components
import { Box } from "@mui/material";

//components
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const Auth: React.FC = () => {
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = (): void => {
      const authToken = Cookies.get("authToken");
      const userName = Cookies.get("userName");

      if (authToken && userName) navigate("/");
    };

    validateUser();
  }, [navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "radial-gradient(circle, rgb(164, 231, 192), white 90%)",
        }}
      >
        {hasAccount ? (
          <Login hasAccount={hasAccount} setHasAccount={setHasAccount} />
        ) : (
          <Register hasAccount={hasAccount} setHasAccount={setHasAccount} />
        )}
      </Box>
    </>
  );
};

export default Auth;
