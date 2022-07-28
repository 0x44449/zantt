import { getWorkspaces } from "@/api/workspace";
import WorkspaceView from "@/apps/moo/controls/workspace-view";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, FC, ReactElement, SetStateAction, useEffect } from "react";

type ContentsViewProps = {
  projectId: string;
  taskId: string;
  workspaces: Zantt.WorkspaceModelType[],
  setWorkspaces: Dispatch<SetStateAction<Zantt.WorkspaceModelType[]>>;
}

const ContentsView: FC<ContentsViewProps> = (props): ReactElement => {
  const { data } = useQuery(["/workspace/workspaces", props.taskId], async () => {
    const response = await getWorkspaces(props.taskId);
    return response.data;
  }, {
    suspense: true
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      props.setWorkspaces(data);
    }
  }, data);

  return (
    props.workspaces &&
    <>
      <WorkspaceView
        projectId={props.projectId}
        taskId={props.taskId}
        workspace={props.workspaces[0]}
      />
    </>
  )
};

export default ContentsView;