"use client";
import React, { useState } from 'react';
import { CreateTaskButton } from './CreateTaskButton';
import { CreateTaskModal } from './CreateTaskModal';

const TaskManager: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCloseModal();
  };

  return (
    <div>
      <CreateTaskButton onClick={handleOpenModal} />
      <CreateTaskModal open={modalIsOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </div>
  );
};

export default TaskManager;
