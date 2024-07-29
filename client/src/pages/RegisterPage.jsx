import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useSnackbar } from 'notistack';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  async function register(ev) {
    ev.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        enqueueSnackbar("Registration successful.", { variant: 'success' });
      } else {
        enqueueSnackbar("Registration failed.", { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar("Registration failed.", { variant: 'error' });
    }
  }

  return (
    <Box component="form" onSubmit={register} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
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
        startIcon={<HowToRegIcon />}
      >
        Register
      </Button>
    </Box>
  );
}