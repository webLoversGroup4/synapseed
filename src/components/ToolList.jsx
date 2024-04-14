import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ToolList = ({ tools }) => {
  return (
    <List>
      {tools.map((tool, index) => (
        <ListItem key={index}>
          <ListItemText primary={tool} />
        </ListItem>
      ))}
    </List>
  );
};

export default ToolList;
