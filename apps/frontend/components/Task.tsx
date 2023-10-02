import { getColorFromString } from '../utils/colors';

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  dueDate,
  onDelete,
}) => {
  return (
    <div className="relative p-5 rounded-md shadow-xl mb-5 border-t-1 border-t-slate-200 mt-1">
      <div className="flex items-center justify-between">
        <span
          className="flex items-center text-2xl p-8 justify-center w-10 rounded-full h-10 text-white"
          style={{
            backgroundColor: `${getColorFromString(title)}`,
          }}
        >
          {title.charAt(0)}
        </span>
        <div className="w-2/3 mx-5 h-30">
          <h3 className="text-xl line-clamp-1 text-slate-500">{title}</h3>
          <p className="mt-2 text-sm line-clamp-2 text-slate-600">
            {description}
          </p>
          <p className="mt-2 font-light text-sm text-slate-400">{dueDate}</p>
        </div>
        <button className="btn btn-neutral" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
