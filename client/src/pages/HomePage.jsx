import { useEffect, useState } from "react";
import Post from "../components/Post";
import { useSnackbar } from 'notistack';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar('Failed to fetch posts.', { variant: 'error' });
      });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map((post) => <Post key={post.id} {...post} />)}
    </>
  );
}