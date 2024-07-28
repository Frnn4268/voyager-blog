import { formatISO9075 } from "date-fns/formatISO9075";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo) return "";

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
            {postInfo.title}     
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CalendarTodayIcon sx={{ mr: 1 }} />
            {formatISO9075(new Date(postInfo.createdAt))}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1 }} />
            by @{postInfo.author.username}
          </Typography>
          {userInfo.id === postInfo.author._id && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button 
                variant="contained"
                component={Link}
                to={`/edit/${postInfo._id}`}
                sx={{ 
                  textTransform: 'none', 
                  background: 'orange', 
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'orange'
                  }
                }}
                startIcon={<EditIcon />}
              >
                Edit this post
              </Button>
            </Box>
          )}
          <CardMedia
            component="img"
            image={`${process.env.REACT_APP_API_UPLOAD}${postInfo.cover}`}
            alt=""
            sx={{ mb: 2 }}
          />
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}