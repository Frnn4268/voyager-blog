import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        alert("Registration successful.");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      alert("Registration failed.");
    }
  }

  return (
    <Box component="form" onSubmit={register} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        type="submit"
        style={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: 'gray' }}
      >
        Register
      </Button>
    </Box>
  );
}