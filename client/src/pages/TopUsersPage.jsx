import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Container, Paper, ListItemIcon } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useSnackbar } from 'notistack';

export default function TopUsersPage() {
  const [topUsers, setTopUsers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/top-users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((users) => {
        setTopUsers(users);
        enqueueSnackbar('Top users loaded successfully!', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Failed to fetch top users:', error);
        enqueueSnackbar('Failed to load top users.', { variant: 'error' });
      });
  }, [enqueueSnackbar]);

  const getPodiumIcon = (index) => {
    switch (index) {
      case 0:
        return <EmojiEventsIcon style={{ color: 'gold' }} />;
      case 1:
        return <EmojiEventsIcon style={{ color: 'silver' }} />;
      case 2:
        return <EmojiEventsIcon style={{ color: '#cd7f32' }} />; // Bronze color
      default:
        return <PersonIcon />;
    }
  };

  return (
    <Container>
      <Typography style={{ fontWeight: 'bold' }} variant="h4" component="h1" gutterBottom>
        Top Users - Voyager Blog
      </Typography>
      <Paper elevation={3}>
        <List>
          {topUsers.slice(0, 3).map((user, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {getPodiumIcon(index)}
              </ListItemIcon>
              <ListItemText
                primary={user.username}
                secondary={
                  <>
                    <PostAddIcon sx={{ mr: 1 }} />
                    {`${user.postCount} posts`}
                  </>
                }
              />
            </ListItem>
          ))}
          {topUsers.slice(3).map((user, index) => (
            <ListItem key={index + 3}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={user.username}
                secondary={
                  <>
                    <PostAddIcon sx={{ mr: 1 }} />
                    {`${user.postCount} posts`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}