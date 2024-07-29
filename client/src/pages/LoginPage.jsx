import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { useSnackbar } from 'notistack';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  async function login(ev) {
    ev.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        res.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });

        enqueueSnackbar("Login successful.", { variant: 'success' });
      } else {
        enqueueSnackbar("Wrong credentials.", { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar("Login failed.", { variant: 'error' });
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <Box component="form" onSubmit={login} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        type="submit"
        style={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: 'gray' }}
        startIcon={<LoginIcon />}
      >
        Login
      </Button>
    </Box>
  );
}