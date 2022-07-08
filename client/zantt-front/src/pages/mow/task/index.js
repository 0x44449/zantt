import React from "react";
import TaskItem from "./components/task-item";

function TaskIndex() {
  return (
    <>
      <div className="flex flex-col">
        <div>Task</div>
        <TaskItem title="title" description="description" />
      </div>
    </>
  );
}

export default TaskIndex;