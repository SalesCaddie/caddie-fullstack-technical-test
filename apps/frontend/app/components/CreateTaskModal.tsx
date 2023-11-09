import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ open, onClose, onSubmit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
     }}>
        <Typography variant="h6">Create a New Task</Typography>
        <form onSubmit={onSubmit}>
          <TextField label="Name" name="name" required fullWidth margin="normal" />
          <TextField
            label="Description"
            name="description"
            required
            fullWidth
            margin="normal"
            multiline
          />
          <TextField
            label="Due Date"
            type="date"
            name="dueDate"
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </form>
      </Box>
    </Modal>
  );
};