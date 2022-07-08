import React from "react";

function TaskItem(props) {
  return (
    <>
      <div>{props.title}</div>
      <div>{props.description}</div>
    </>
  );
}

export default TaskItem;