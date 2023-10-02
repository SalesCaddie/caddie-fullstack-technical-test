import React from 'react';
import { TaskListProps } from '../utils/task';
import TaskItem from './Task';

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <div className="mt-10">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
