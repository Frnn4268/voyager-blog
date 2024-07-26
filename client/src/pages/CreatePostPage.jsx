import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Editor from "../components/Editor";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    ev.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (res.ok) {
      setRedirect(true);
    }
    await res.json();
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    setFiles(ev.target.files);
    setFileName(file?.name || "");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview("");
    }
  };

  return (
    <Box component="form" onSubmit={createNewPost} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
        Create a New Post
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
        {filePreview && (
          <Box mt={2} style={{ alignItems: 'flex-end' }}>
            <img src={filePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 100, alignItems: 'flex-end' }} />
          </Box>
        )}
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
          Create post
        </Button>
      </Box>
    </Box>
  );
}