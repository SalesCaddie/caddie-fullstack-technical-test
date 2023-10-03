import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { Task } from '../utils/task';

const Index: React.FC = () => {
  const [taskText, setTaskText] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDueDate, setTaskDueDate] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskText,
          description: taskDescription,
          dueDate: taskDueDate != "" ? taskDueDate : new Date().toISOString().split('T')[0],
        }),
      })
        .then((response) => response.json())
        .then((newTask) => {
          setTasks([...tasks, newTask.task]);
          setTaskText('');
          setTaskDescription('');
          setTaskDueDate('');
        })
        .catch((error) => console.error('Error creating task:', error));
    }
  };

  const handleDeleteTask = (taskId: string) => {
    fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="container w-1/2 mx-auto py-10">
      <h1 className="font-thin sm:text-4xl tracking-wide text-center sm:pb-10">
        Welcome to Task Manager
      </h1>

      <div className="items-center w-2/3 mx-auto justify-center">
        <div className="relative p-4 rounded-xl shadow-2xl mt-1">
          <div className="grid gap-4 py-4 px-4">
            <h2 className="text-xl">Create a new task</h2>
            <input
              type="text"
              placeholder="Enter task title"
              className="input input-bordered w-full"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />

            <input
              type="textarea"
              placeholder="Enter task description..."
              className="input input-bordered w-full"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <input
              type="date"
              placeholder="Due Date"
              className="input input-bordered w-full"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />
            <button className="btn btn-neutral" onClick={handleAddTask}>
              Add
            </button>
          </div>
        </div>
        <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
};

export default Index;
