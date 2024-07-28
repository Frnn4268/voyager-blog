import formatISO9075 from "date-fns/formatISO9075";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <Card style={{ marginTop: 25 }} sx={{ maxWidth: '100%', margin: '1rem', boxShadow: 4 }}>
      <Link to={`/post/${_id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="140"
          image={`${process.env.REACT_APP_API_UPLOAD}` + cover}
          alt={title}
        />
      </Link>
      <CardContent>
        <Link to={`/post/${_id}`} style={{ textDecoration: 'none' }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {author.username}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              <time>{formatISO9075(createdAt)}</time>
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}