import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Container, Paper, ListItemIcon } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function TopUsersPage() {
  const [topUsers, setTopUsers] = useState([]);

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
      })
      .catch((error) => {
        console.error('Failed to fetch top users:', error);
      });
  }, []);

  return (
    <Container>
      <Typography style={{ fontWeight: 'bold' }} variant="h4" component="h1" gutterBottom>
        Top Users - Voyager Blog
      </Typography>
      <Paper elevation={3}>
        <List>
          {topUsers.map((user, index) => (
            <ListItem key={index}>
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