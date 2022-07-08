import React from "react";

function TaskItem(props) {
  return (
    <>
      <div>
        <div>{props.title}</div>
        <div>{props.description}</div>
      </div>
    </>
  );
}

export default TaskItem;