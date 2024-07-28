import { useEffect, useState } from "react";

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
    <>
      <h1>Top Users!</h1>
      <ul>
        {topUsers.map((user, index) => (
          <li key={index}>{user.username} - {user.postCount} posts</li>
        ))}
      </ul>
    </>
  );
}