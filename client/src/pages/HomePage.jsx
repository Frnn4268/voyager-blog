import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        console.error('Failed to fetch posts:', error);
      });

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
      {posts.length > 0 && posts.map((post) => <Post key={post.id} {...post} />)}
      <h2>Top Users</h2>
      <ul>
        {topUsers.map((user, index) => (
          <li key={index}>{user.username} - {user.postCount} posts</li>
        ))}
      </ul>
    </>
  );
}