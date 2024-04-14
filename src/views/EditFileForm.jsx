import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const EditFileForm = ({ file, isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState(file.description);

  const handleSave = () => {
    onSave(file.id, description);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit File Description</DialogTitle>
      <DialogContent>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFileForm;
