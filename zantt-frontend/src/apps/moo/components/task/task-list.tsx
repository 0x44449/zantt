import TaskListItem from "@/apps/moo/components/task/task-list-item";
import { useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import Link from "next/link";
import { FC, ReactElement } from "react";

type TaskListProps = {
  onSelectTask?: (projectId: string, taskId: string) => void;
}

const TaskList: FC<TaskListProps> = (props): ReactElement => {
  const tasks = useAppSelector((state) => state.task.tasks);

  return (
    <div className="flex flex-col gap-1">
      {tasks.map(task => (
        <Link key={task.taskId} href={`/moo/${task.projectId}/${task.taskId}`}>
          <a className="w-full">
            <TaskListItem
              taskId={task.taskId}
              projectId={task.projectId}
              title={task.title}
            />
          </a>
        </Link>
      ))}
    </div>
  )
}

export const TaskListLoading: FC = (): ReactElement => {
  return (
    <div className="flex flex-col grow bg-slate-600">
      <p className="text-slate-50">Loading...</p>
    </div>
  )
}

export default TaskList;