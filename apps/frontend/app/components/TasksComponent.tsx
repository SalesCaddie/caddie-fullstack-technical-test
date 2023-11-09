"use client";

import React, { useState, useEffect } from 'react';
import TasksTable from './TasksTable';
import { Task, fetchTasks } from '../services/taskService';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TasksComponent: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadTasks = async () => {
        try {
          console.log('Fetching tasks...');
          setLoading(true);
          const fetchedTasks = await fetchTasks();
          setTasks(fetchedTasks);
          setLoading(false);
        } catch (err: any) {
          setError(err.message || 'An unexpected error occurred');
          setLoading(false);
        }
      };
  
      loadTasks();
    }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
  };

  console.log('Rendering TasksComponent...');
  return (
    <Box sx={{ p: 2 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error">{error}</Alert>
      )}
      {!loading && !error && (
        <>
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
          <TasksTable tasks={tasks} onDragEnd={onDragEnd} />
        </>
      )}
    </Box>
  );
};

export default TasksComponent;
