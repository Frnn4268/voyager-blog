import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Container, Paper } from "@mui/material";

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
              <ListItemText
                primary={user.username}
                secondary={`${user.postCount} posts`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}