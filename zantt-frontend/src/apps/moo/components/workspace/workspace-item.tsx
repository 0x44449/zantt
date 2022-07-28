import PropTypes from "prop-types";
import { FC, ReactElement } from "react";

type WorkspaceItemProps = {
  title: string;
  contents: string;
}

const WorkspaceItem: FC<WorkspaceItemProps> = ({ title, contents }): ReactElement => {
  return (
    <div>
      <div>{title}</div>
      <div>{contents}</div>
    </div>
  )
}

WorkspaceItem.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
};

export default WorkspaceItem;