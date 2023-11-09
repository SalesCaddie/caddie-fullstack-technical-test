"use client";

import React, { useState, useEffect } from 'react';
import TasksTable from './TasksTable';
import { Task, fetchTasks } from '../services/taskService';

const TasksComponent: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadTasks = async () => {
        try {
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
  

  // Fetch tasks from your API and set them to state

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
  };


  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error}</div>;
  }

  return <TasksTable tasks={tasks} onDragEnd={onDragEnd} />;
};

export default TasksComponent;
