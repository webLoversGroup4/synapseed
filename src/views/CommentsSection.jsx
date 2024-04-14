import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Card, CardContent } from '@mui/material';
import { Rating } from '@mui/material';

const CommentsSection = () => {
  const { paper_id } = useParams();

  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://16.16.90.16/synapseed/api/actions/comments.php?paper_id=${paper_id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        setError('Failed to fetch comments');
      }
    } catch (error) {
      setError('Error fetching comments');
    }
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://16.16.90.16/synapseed/api/actions/submit_comment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paper_id,
          name,
          content,
          rating,
        }),
      });

      if (response.ok) {
        setName('');
        setContent('');
        setRating(0);
        fetchComments(); 
      } else {
        setError('Failed to submit comment');
      }
    } catch (error) {
      setError('Error submitting comment');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h2" gutterBottom>
        Paper Reviews
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {comments.map((comment) => (
        <Card key={comment.review_id} variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
          <Typography variant="h5">{comment.paper_title}</Typography>
            <Typography variant="h6">{comment.reviewer_name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {comment.reviewed_at}
            </Typography>
            <Typography>{comment.comments}</Typography>
            <Box mt={1}>
              <Rating name={`rating-${comment.rating}`} value={comment.rating} readOnly />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default CommentsSection;
