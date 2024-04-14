import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DynamicContentBox = () => {
  const [contentIndex, setContentIndex] = useState(0);

  const contentList = [
    {
      backgroundImage: `../public/images/micro.jpeg`,
      title: 'Welcome to the Research Education Collaborative',
      description:
        'A platform for scientists, researchers, and academics to collaborate, share knowledge, and advance research.',
    },
    {
      backgroundImage: `../public/images/image1.png`,
      title: 'A Research Paper Repository',
      description:
        'Access a vast repository of research papers covering diverse topics. Upload your own research papers to share with the community. Explore papers uploaded by other researchers and academics.',
    },
    {
      backgroundImage: `../public/images/pic.jpeg`,
      title: 'Peer Review Papers',
      description:
        'Engage in the peer review process to provide valuable feedback on research papers. Receive constructive critiques from fellow researchers to improve your work. Contribute to the advancement of scientific knowledge through rigorous peer review.',
    },
    {
      backgroundImage: `../public/images/image1.png`,
      title: 'Join Collaborative Groups',
      description:
        'Join specialized groups to collaborate with like-minded researchers. Share insights, resources, and collaborate on research projects within your group. Foster connections and build professional relationships with peers in your field.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setContentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentContent = contentList[contentIndex];

  return (
    <Box
      sx={{
        pt: 12,
        textAlign: 'center',
        color: '#800000',
        backgroundImage: `url(${currentContent.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '50px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      <Typography variant="h2" gutterBottom>
        {currentContent.title}
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: '32px' }}>
        {currentContent.description}
      </Typography>
    </Box>
  );
};

export default DynamicContentBox;
