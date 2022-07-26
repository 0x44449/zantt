import TaskItem from "@/components/moo/task/task-item";
import Link from "next/link";
import PropTypes from "prop-types";

/**
 * @typedef {object} TaskListPropType
 * @property {string} selectedProjectId
 * @property {string} selectedTaskId
 * @property {import("./fetcher").TaskFetcher} fetcher
 * @property {Zantt.TaskModelType[]} [tasks]
 * @property {(projectId: string, taskId: string) => void} [onSelectTask]
 */
const TaskListProp = {
  selectedProjectId: PropTypes.string.isRequired,
  selectedTaskId: PropTypes.string.isRequired,
  fetcher: PropTypes.object.isRequired,
  tasks: PropTypes.array,
  onSelectTask: PropTypes.func,
}

/**
 * @param {TaskListPropType} props 
 * @returns {React.ReactElement}
 */
function TaskList(props) {
  const tasks = props.tasks ? props.tasks : props.fetcher.fetch();

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