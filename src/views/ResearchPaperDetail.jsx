import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from '@mui/material';
import { useUserState } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';


const ResearchPaperDetail = () => {
  const { setUserToken, currentUser } = useUserState();
  const { user_id, full_name } = currentUser;

  const [papers, setPapers] = useState([]);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [reviewData, setReviewData] = useState({
    paperId: null,
    rating: 0,
    comments: '',
  });

  const handleOpenReviewDialog = (paperId) => {
    setReviewData({ ...reviewData, paperId });
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
    setReviewData({
      ...reviewData,
      rating: 0,
      comments: '',
    });
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetch('http://16.16.90.16/synapseed/api/actions/papers.php');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setPapers(data);
          setFilteredPapers(data); 
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } else {
        console.error('Failed to fetch papers');
      }
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) {
      console.error('No file selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('title', fileName);
    formData.append('description', fileDescription);

    try {
      const response = await fetch('http://16.16.90.16/synapseed/api/actions/upload_paper.php', {
        method: 'POST',
        body: formData,
        headers: {
          'X-User-Id': user_id,
          'X-Full-Name': full_name,
        },
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        fetchPapers();
        setFileToUpload(null);
        setFileName('');
        setFileDescription('');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://16.16.90.16/synapseed/api/actions/papers.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Paper submitted successfully');
        fetchPapers();
        setIsUploadFormOpen(false);
      } else {
        console.error('Failed to submit paper');
      }
    } catch (error) {
      console.error('Error submitting paper:', error);
    }
  };

  const handleFilter = () => {
    let filteredResults = papers;

    if (filterTitle) {
      filteredResults = filteredResults.filter((paper) =>
        paper.title.toLowerCase().includes(filterTitle.toLowerCase())
      );
    }

    if (filterDate) {
      filteredResults = filteredResults.filter((paper) =>
        new Date(paper.created_at).toLocaleDateString().includes(filterDate)
      );
    }

    setFilteredPapers(filteredResults);
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch('http://16.16.90.16/synapseed/api/actions/peer_review.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paper_id: reviewData.paperId,
          rating: reviewData.rating,
          comments: reviewData.comments,
        }),
      });

      if (response.ok) {
        console.log('Review submitted successfully');
        handleCloseReviewDialog();
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h2" gutterBottom>
        Research Papers
      </Typography>

      {/* Filter Section */}
      <Card variant="outlined" sx={{ mb: 2 }}>
          <form>
          <CardContent>
            <TextField
              label="Filter by Title"
              variant="outlined"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Filter by Date (YYYY-MM-DD)"
              variant="outlined"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              margin="normal"
            />
            </CardContent>
            <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilter}
              sx={{
                backgroundColor: '#800000',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#5b0000' },
              }}
            >
              Apply Filters
            </Button>
            </CardActions>
          </form>
      </Card>

      {/* Section for Uploading Papers */}
      <Box mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsUploadFormOpen(true)}
          sx={{
            backgroundColor: '#800000',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#5b0000' },
          }}
        >
          Upload Paper
        </Button>
        {isUploadFormOpen && (
          <Box mt={2}>
            <input
              type="file"
              accept=".pdf"
              onChange={(event) => setFileToUpload(event.target.files[0])}
            />
            <TextField
              fullWidth
              label="Paper Title"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Abstract"
              value={fileDescription}
              onChange={(e) => setFileDescription(e.target.value)}
              margin="normal"
            />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleFileUpload}
                sx={{
                  backgroundColor: '#800000',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#5b0000' },
                }}
              >
                Submit Paper
              </Button>
          </Box>
        )}
      </Box>

      {/* Section for Displaying Papers */}
      {filteredPapers.map((paper) => (
        <Card key={paper.paper_id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {paper.title}
            </Typography>
            <Typography color="text.secondary">
              <strong>Authors:</strong> {paper.author_name}
            </Typography>
            <Typography color="text.secondary">
              <strong>Publication Date:</strong>{' '}
              {new Date(paper.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Abstract
            </Typography>
            <Typography paragraph>{paper.abstract}</Typography>
          </CardContent>
          <CardActions>
            <Button
              color="inherit"
              variant="outlined"
              fullWidth
              href={`http://16.16.90.16/synapseed/api/app/${paper.file_url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              fullWidth
              onClick={() => handleOpenReviewDialog(paper.paper_id)}
              sx={{
                backgroundColor: '#800000',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#5b0000' },
              }}
            >
              Review
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              fullWidth
              component={Link}
              to={`/comments?paper_id=${paper.paper_id}`}
              sx={{
                backgroundColor: '#800000',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#5b0000' },
              }}
            >
              View Reviews
            </Button>
          </CardActions>
        </Card>
      ))}

 {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog}>
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={reviewData.rating}
            precision={1}
            onChange={(event, newValue) => setReviewData({ ...reviewData, rating: newValue })}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Comments:</Typography>
            <textarea
              rows={4}
              cols={40}
              value={reviewData.comments}
              onChange={(event) => setReviewData({ ...reviewData, comments: event.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewDialog}>Cancel</Button>
          <Button onClick={handleReviewSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResearchPaperDetail;







