export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}
