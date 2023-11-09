import React from 'react';
import Button from '@mui/material/Button';

interface CreateTaskButtonProps {
  onClick: () => void;
}

export const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Create Task
    </Button>
  );
};