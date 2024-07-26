import ReactQuill from "react-quill";
import Paper from '@mui/material/Paper';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

export default function Editor({ value, onChange }) {
  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        theme={"snow"}
      />
    </Paper>
  );
}