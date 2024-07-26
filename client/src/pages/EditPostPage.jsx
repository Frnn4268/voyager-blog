import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Editor from "../components/Editor";

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [fileName, setFileName] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);

    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (res.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  const handleFileChange = (ev) => {
    setFiles(ev.target.files);
    setFileName(ev.target.files[0]?.name || "");
  };

  return (
    <Box component="form" onSubmit={updatePost} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
        Edit Post
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <TextField
        label="Summary"
        variant="outlined"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Button
          variant="contained"
          component="label"
          style={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: '#6f6f6f', width: 400 }}
        >
          {fileName || "Upload File"}
          <input
            style={{ display: "none"}}
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </Box>
      <Editor onChange={setContent} value={content} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          type="submit"
          style={{ textTransform: 'none', fontWeight: 'bold', maxWidth: 150, borderRadius: 5, backgroundColor: '#00d410', fontSize: 16 }}
          sx={{
            '&:hover': {
              backgroundColor: '#32cd32',
            },
          }}
        >
          Update post
        </Button>
      </Box>
    </Box>
  );
}