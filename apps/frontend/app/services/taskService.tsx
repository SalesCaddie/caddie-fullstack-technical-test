export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const updateTaskOrder = async (tasks: Task[]): Promise<void> => {
  // Implement API call to update the order
};
