import WorkspaceItem from "@/apps/moo/components/workspace/workspace-item";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";

type WorkspaceViewProps = {
  projectId: string;
  taskId: string;
  workspace: Zantt.WorkspaceModelType
}

const WorkspaceView: FC<WorkspaceViewProps> = (props): ReactElement => {
  return (
    <div>
      <WorkspaceItem
        title={props.workspace.title}
        contents={props.workspace.contents}
      />
    </div>
  )
}

export default WorkspaceView;