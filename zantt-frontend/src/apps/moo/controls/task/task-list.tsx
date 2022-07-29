import { getTasks } from "@/api/task";
import TaskItem from "@/apps/moo/components/task/task-item";
import { setTasks } from "@/apps/moo/features/task-slice";
import { useAppDispatch, useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC, ReactElement, useEffect } from "react";

type TaskListProps = {
  onSelectTask?: (projectId: string, taskId: string) => void;
}

const TaskList: FC<TaskListProps> = (props): ReactElement => {
  const projectId = useAppSelector((state) => state.project.projectId);
  const tasks = useAppSelector((state) => state.task.tasks);
  const dispatch = useAppDispatch();

  const { data } = useQuery(["task/tasks", projectId], async () => {
    const response = await getTasks(projectId);
    return response.data;
  }, {
    suspense: true,
    enabled: projectId !== ""
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      dispatch(setTasks(data));
    }
  }, [data]);

  return (
    <div className="h-full bg-slate-600 overflow-y-auto">
      <div className="flex flex-col divide-y divide-slate-50">
        {tasks.map(task => (
          <Link key={task.taskId} href={`/moo/${task.projectId}/${task.taskId}`}>
            <a className="w-full hover:bg-pink-300">
              <TaskItem
                taskId={task.taskId}
                projectId={task.projectId}
                title={task.title}
              />
            </a>
          </Link>
        ))}
      </div>
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