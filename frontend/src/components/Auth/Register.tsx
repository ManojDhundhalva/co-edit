import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, TextField, InputAdornment, CircularProgress } from '@mui/material';

import { useRegister } from '../../graphql/hooks/auth';
import { isValidEmail } from '../../utils/validation';

interface Props {
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<Props> = (props) => {
  const { hasAccount, setHasAccount } = props;

  const [justVerify, setJustVerify] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { registerUser, loading } = useRegister();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValid(isValidEmail(e.target.value));
  };

  const isSubmitValidForAllFields = (): boolean => {
    return (
      firstName.trim() !== "" &&
      firstName.length < 255 &&
      lastName.trim() !== "" &&
      lastName.length < 255 &&
      userName.trim() !== "" &&
      userName.length < 255 &&
      email.trim() !== "" &&
      email.length < 255 &&
      emailValid &&
      password !== "" &&
      password.length >= 8 &&
      password.length < 255
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJustVerify(true);

    if (!isSubmitValidForAllFields()) return;

    try {
      await registerUser({ variables: { firstName, lastName, userName, email, password } });
    } catch (error) {
      console.error(error);
    } finally {
      setJustVerify(false);
    }
  };


  return (
    <Box sx={{
      display: hasAccount ? "none" : "flex", backdropFilter: "blur(12px)",
      backgroundColor: "lavender", maxWidth: "480px", p: 2, borderRadius: 2
    }}>
      <form onSubmit={handleSubmit}>
        <TextField
          color="primary"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name='firstName'
          id="firstName"
          label="First Name"
          placeholder="First Name"
          variant="outlined"
          fullWidth
          required
          size="small"
          autoComplete="on"
          error={justVerify && (firstName === "" || firstName.length >= 255)}
          helperText={
            justVerify &&
            (firstName === ""
              ? "This field cannot be empty."
              : firstName.length >= 255
                ? "First Name is too long"
                : "")
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontWeight: "bold",
            },
          }}
        />
        <TextField
          color="primary"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name='lastName'
          id="lastName"
          label="Last Name"
          placeholder="Last Name"
          variant="outlined"
          fullWidth
          required
          size="small"
          autoComplete="on"
          error={justVerify && (lastName === "" || lastName.length >= 255)}
          helperText={
            justVerify &&
            (lastName === ""
              ? "This field cannot be empty."
              : lastName.length >= 255
                ? "Last Name is too long"
                : "")
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontWeight: "bold",
            },
          }}
        />
        <TextField
          color="primary"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          name='userName'
          id="username"
          label="Username"
          placeholder="Username"
          variant="outlined"
          fullWidth
          required
          size="small"
          autoComplete="on"
          error={
            justVerify && (userName === "" || userName.length >= 255)
          }
          helperText={
            justVerify &&
            (userName === ""
              ? "This field cannot be empty."
              : userName.length >= 255
                ? "Username is too long"
                : "")
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontWeight: "bold",
            },
          }}
        />
        <TextField
          color="primary"
          value={email}
          onChange={handleEmailChange}
          name='email'
          id="email"
          label="Email"
          placeholder="Email"
          variant="outlined"
          fullWidth
          required
          size="small"
          autoComplete="on"
          error={
            justVerify &&
            (email === "" || email.length >= 255 || !emailValid)
          }
          helperText={
            justVerify &&
            (email === ""
              ? "This field cannot be empty."
              : email.length >= 255
                ? "Email is too long"
                : !emailValid
                  ? "Invalid email address"
                  : "")
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontWeight: "bold",
            },
          }}
        />
        <TextField
          color="primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name='password'
          id="password"
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          size="small"
          autoComplete="off"
          error={
            justVerify &&
            (password === "" ||
              password.length < 8 ||
              password.length >= 255)
          }
          helperText={
            justVerify &&
            (password === ""
              ? "This field cannot be empty."
              : password.length < 8
                ? "Password must be at least 8 characters long."
                : password.length >= 255
                  ? "Password is too long"
                  : "")
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyRoundedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontWeight: "bold",
            },
          }}
        />
        <Button type='submit' variant='contained' fullWidth>
          {loading ? "Signing Up..." : "Sign Up"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{loading ? (
            <CircularProgress size={16} thickness={8} color="inherit"
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
          Already have an account? Sign In
        </Button>
      </form>
    </Box >
  );
};

export default Register;