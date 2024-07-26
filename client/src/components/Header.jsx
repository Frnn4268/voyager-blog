import { useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error('Failed to fetch profile:', error);
      });
  }, [setUserInfo]);

  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        setUserInfo(null);
      })
      .catch((error) => {
        console.error('Failed to logout:', error);
      });
  }

  const username = userInfo?.username;

  return (
    <AppBar position="static" style={{ width: '100%', marginTop: 0, borderRadius: 5 }} sx={{ backgroundColor: '#333', padding: '0.5rem 1rem' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/" style={{ textDecoration: 'none', fontWeight: 'bold', marginRight: 500 }}>
          Voyager Blog
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {username ? (
            <>
              <Button color="inherit" component={RouterLink} to="/create" sx={{ textTransform: 'none', width: 100, fontWeight: 'bold' }}>Create Post</Button>
              <Button color="inherit" onClick={logout} sx={{ textTransform: 'none', width: 100, fontWeight: 'bold' }}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login" sx={{ textTransform: 'none', width: 100, fontWeight: 'bold' }}>Login</Button>
              <Button color="inherit" component={RouterLink} to="/register" sx={{ textTransform: 'none', width: 100, fontWeight: 'bold' }}>Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}