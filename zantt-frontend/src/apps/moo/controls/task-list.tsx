import { getTasks } from "@/api/task";
import TaskItem from "@/apps/moo/components/task/task-item";
import { setTasks } from "@/apps/moo/features/task-slice";
import { useAppDispatch, useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PropTypes from "prop-types";
import { FC, ReactElement, useEffect } from "react";

type TaskListProps = {
  onSelectTask?: (projectId: string, taskId: string) => void;
}

const TaskList: FC<TaskListProps> = (props): ReactElement => {
  const projectId = useAppSelector((state) => state.project.projectId);
  const tasks = useAppSelector((state) => state.task.tasks);
  const dispatch = useAppDispatch();

  const { data, status } = useQuery(["task/tasks", projectId], async () => {
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
    <>
      {tasks.map(task => (
        <div key={task.taskId}>
          <Link href={`/moo/${task.projectId}/${task.taskId}`}>
            <a>
              <TaskItem
                taskId={task.taskId}
                projectId={task.projectId}
                title={task.title}
              />
            </a>
          </Link>
        </div>
      ))}
    </>
  )
}

export default TaskList;