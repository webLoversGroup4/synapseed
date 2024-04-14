import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import axios from 'axios';
import { useUserState } from '../contexts/ContextProvider';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const { currentUser } = useUserState();

  useEffect(() => {
    fetchMessages();
  }, [currentUser]); 

  const fetchMessages = async () => {
    try {
      const response = await axios.post('http://16.16.90.16/synapseed/api/chat/fetch_messages.php', {
        sender: currentUser.full_name,
        receiver: 'OtherUser',
      });

      if (response.status === 200) {
        setMessages(response.data.messages || []);
      } else {
        console.log('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '' || file) {
      const formData = new FormData();
      formData.append('sender', currentUser.full_name);
      formData.append('receiver', 'OtherUser');
      formData.append('message', newMessage);
      if (file) {
        formData.append('file', file);
      }

      try {
        const response = await axios.post('http://16.16.90.16/synapseed/api/chat/send_message.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          fetchMessages(); 
          setNewMessage('');
          setFile(null);
        } else {
          console.log('Failed to send message:', response.data);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const isSenderCurrentUser = (sender) => sender === currentUser.full_name;

  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Chat Room
      </Typography>
      <List style={{ maxHeight: '300px', overflowY: 'auto', padding: 0 }}>
        {messages.map((msg, index) => (
          <ListItem
            key={index}
            style={{
              display: 'flex',
              flexDirection: isSenderCurrentUser(msg.sender) ? 'row-reverse' : 'row',
              justifyContent: 'flex-end',
              margin: '5px 0',
            }}
          >
            <ListItemText
              primary={msg.sender}
              secondary={msg.message}
              style={{
                textAlign: 'left',
                backgroundColor: isSenderCurrentUser(msg.sender) ? '#DCF8C6' : '#ECEFF1',
                borderRadius: '10px',
                padding: '10px',
                maxWidth: '70%',
              }}
            />
            {msg.file && (
              <a href={URL.createObjectURL(msg.file)} target="_blank" rel="noopener noreferrer">
                {msg.file.name}
              </a>
            )}
          </ListItem>
        ))}
      </List>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <input
          type="file"
          accept=".pdf, .jpg, .jpeg, .png, .gif, .mp4"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <InputBase
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleInputChange}
          fullWidth
          multiline
          minRows={4}
          maxRows={8}
          style={{
            marginLeft: '10px',
            marginRight: '10px',
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
            padding: '8px 12px',
            flexGrow: 1,
          }}
          inputProps={{
            style: {
              fontSize: '14px',
            },
          }}
        />

        <IconButton color="primary" onClick={handleSendMessage} disabled={!newMessage.trim() && !file}>
          <SendIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default Chat;
