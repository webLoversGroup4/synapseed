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
  Grid,
} from '@mui/material';
import { useUserState } from '../contexts/ContextProvider';

export default function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const { currentUser } = useUserState();
  const { user_id, full_name } = currentUser;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://16.16.90.16/synapseed/api/actions/fetchFiles.php', {
          headers: {
	        'X-User-Id': user_id,
	        'X-Full-Name': full_name,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }

        const data = await response.json();
        setUploadedFiles(data);
      } catch (error) {
        console.error('Error fetching uploaded files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileToUpload(file);
    setFileName(file.name);
  };
const handleUpload = async () => {
  if (!fileToUpload) {
    console.error('No file selected for upload');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileToUpload);
  formData.append('title', fileName);
  formData.append('description', fileDescription);

  try {
    const response = await fetch('http://16.16.90.16/synapseed/api/actions/upload.php', {
      method: 'POST',
      body: formData,
      headers: {
        'X-User-Id': user_id,
        'X-Full-Name': full_name,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to upload file');
    }

    if (data.success) {
      const newFile = {
        id: data.fileId,
        name: fileName,
        description: fileDescription,
        uploader: full_name,
        type: fileToUpload.type.split('/')[0],
      };

      setUploadedFiles([...uploadedFiles, newFile]);
      setFileToUpload(null);
      setFileName('');
      setFileDescription('');
    } else {
      console.error('File upload unsuccessful:', data.error);
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
};


  const handleDeleteFile = async (fileId) => {
    try {
      const response = await fetch(`http://16.16.90.16/synapseed/api/actions/delete_uploads.php?fileId=${fileId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId);
        setUploadedFiles(updatedFiles);
      } else {
        console.error('Failed to delete file:', data.error);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handlePlay = (file) => {
    setSelectedFile(file);
    setShowPlayer(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Upload Files
        </Typography>

        <Box sx={{ mb: 4 }}>
          <input
            type="file"
            accept="image/*, video/*, audio/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Box>
          {fileToUpload && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
              />
              <Button variant="contained" onClick={handleUpload}>
                Upload
              </Button>
            </Box>
          )}
        </Box>

        <Typography variant="h4" gutterBottom>
          All Files
        </Typography>

		<Grid container spacing={2}>
		  {uploadedFiles.map((file, index) => (
		    <Grid item key={file.id || index} xs={12} sm={6}>
		      <Card variant="outlined">
		        <CardContent>
		          <Typography variant="subtitle1">{file.title}</Typography>
		          <Typography variant="body2" color="textSecondary">
		            Description: {file.description}
		          </Typography>
		        </CardContent>
		        <CardActions>
		          <Button variant="outlined" color="primary" onClick={() => handlePlay(file)}>
		            Play
		          </Button>
					{file.uploader === user_id && (
				  <>
				    <Button
				      variant="outlined"
				      color="primary"
				      onClick={() => handleDeleteFile(file.id)}
				    >
				      Delete File
				    </Button>
				  </>
				)}

		        </CardActions>
		      </Card>
		    </Grid>
		  ))}
		</Grid>


        {/* Media Player Section */}
        {showPlayer && selectedFile && (
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              {selectedFile.name}
            </Typography>
            {selectedFile.type === 'video' ? (
              <video controls width="100%">
                <source src={`http://16.16.90.16/synapseed/api/${selectedFile.filePath}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : selectedFile.type === 'audio' ? (
              <audio controls>
                <source src={`http://16.16.90.16/synapseed/api/${selectedFile.filePath}`} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            ) : null}
          </Box>
        )}
      </Box>
    </Container>
  );
}
