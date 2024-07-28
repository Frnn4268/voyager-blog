import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

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
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map((post) => <Post key={post.id} {...post} />)}
    </>
  );
}