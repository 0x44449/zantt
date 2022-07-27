import { getTasks } from "@/api/task";
import TaskItem from "@/apps/moo/components/task/task-item";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PropTypes from "prop-types";
import { useEffect } from "react";

/**
 * @typedef {object} TaskListPropType
 * @property {string} projectId
 * @property {string} taskId
 * @property {React.Dispatch<React.SetStateAction<Zantt.TaskModelType[]>>} setTasks
 * @property {Zantt.TaskModelType[]} tasks
 * @property {(projectId: string, taskId: string) => void} [onSelectTask]
 */
const TaskListProp = {
  projectId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  tasks: PropTypes.array,
  onSelectTask: PropTypes.func,
}

/**
 * @param {TaskListPropType} props 
 * @returns {React.ReactElement}
 */
function TaskList(props) {
  const { data } = useQuery(["task/taks", props.projectId], async () => {
    const response = await getTasks(props.projectId);
    return response.data;
  }, {
    suspense: true,
  });

  useEffect(() => {
    props.setTasks(data);
  }, [data]);

  const tasks = typeof props.tasks === "undefined" ? data : props.tasks;

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

TaskList.propTypes = TaskListProp;

export default TaskList;