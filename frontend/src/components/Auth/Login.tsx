import React, { useState } from 'react'
import { TextField, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Button, CircularProgress, Box } from '@mui/material';

import { useLogin } from '../../graphql/hooks/auth';

interface Props {
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}


const Login: React.FC<Props> = (props) => {
  const { hasAccount, setHasAccount } = props;
  const { loginUser, loading } = useLogin();

  const [emailOrUserName, setEmailOrUserName] = useState('');
  const [password, setPassword] = useState('');

  const [justVerify, setJustVerify] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Prevent default behavior for password visibility toggle
  const handlePasswordMouseDown = (event: React.MouseEvent) => event.preventDefault();

  // Validate form inputs
  const isFormValid = (): boolean => {
    return (
      emailOrUserName.trim() !== "" &&
      emailOrUserName.length < 255 &&
      password !== "" &&
      password.length >= 8 &&
      password.length < 255
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJustVerify(true);

    if (!isFormValid()) return;

    try {
      await loginUser({ variables: { emailOrUserName, password } });
    } catch (error) {
      console.log((error as any).message);
    } finally {
      setJustVerify(false);
    }
  };

  return (
    <Box sx={{
      display: hasAccount ? "flex" : "none", backdropFilter: "blur(12px)",
      backgroundColor: "lavender", maxWidth: "480px", p: 2, borderRadius: 2
    }}>
      <form onSubmit={handleSubmit}>
        <TextField
          color="success"
          value={emailOrUserName}
          onChange={(e) => setEmailOrUserName(e.target.value)}
          label="Username or Email"
          placeholder="Username or Email"
          type="text"
          variant="outlined"
          fullWidth
          required
          size="small"
          error={justVerify && emailOrUserName.trim() === ""}
          helperText={justVerify && emailOrUserName.trim() === "" ? "Username is required" : ""}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#134611" }} />
                </InputAdornment>
              ),
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontWeight: "bold",
            },
          }}
        />
        <TextField
          color="success"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          label="Password"
          placeholder="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          size="small"
          error={
            justVerify &&
            (password === "" ||
              password.length >= 255 ||
              password.length < 8)
          }
          helperText={
            justVerify &&
            (password === ""
              ? "This field cannot be empty."
              : password.length < 8
                ? "Password must contain at least 8 characters." : "")
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyRoundedIcon sx={{ color: "#134611" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={handlePasswordMouseDown}
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility sx={{ color: "#134611" }} />
                    ) : (
                      <VisibilityOff sx={{ color: "#134611" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontWeight: "bold",
            },
          }}
        />
        <Button type='submit' variant='contained' fullWidth>
          {loading ? "Signing In..." : "Sign In"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{loading ? (
            <CircularProgress size={16} thickness={8  } color="inherit"
              sx={{
                '& circle': {
                  strokeLinecap: 'round', // Round the corners
                },
              }} />
          ) : ""}
        </Button>
        <Button
          disableRipple
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            textTransform: "none",
            '&:hover': {
              textDecoration: "underline",
            },
          }}
          variant="text"
          onClick={() => setHasAccount((prev) => !prev)}
        >
          Don't have an account? Sign Up
        </Button>
      </form>
    </Box>
  )
}

export default Login