import { getTasks } from "@/api/task";
import TaskItem from "@/apps/moo/components/task/task-item";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PropTypes from "prop-types";
import { Dispatch, FC, ReactElement, SetStateAction, useEffect } from "react";

type TaskListProps = {
  projectId: string;
  taskId: string;
  setTasks: Dispatch<SetStateAction<Zantt.TaskModelType[]>>;
  tasks: Zantt.TaskModelType[];
  onSelectTask?: (projectId: string, taskId: string) => void;
}

const TaskList: FC<TaskListProps> = (props): ReactElement => {
  const { data } = useQuery(["task/taks", props.projectId], async () => {
    const response = await getTasks(props.projectId);
    return response.data;
  }, {
    suspense: true,
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      props.setTasks(data);
    }
  }, [data]);

  return (
    <>
      {props.tasks.map(task => (
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

TaskList.propTypes = {
  projectId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  onSelectTask: PropTypes.func,
};

export default TaskList;