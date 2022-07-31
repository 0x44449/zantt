import { FC, ReactElement, useEffect } from "react";
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { setNeedProjectFetch, setProjectId, setProjectQueryStatus, setProjects } from "@/apps/moo/features/project-slice";
import { setTaskId, setTaskQueryStatus, setTasks } from "@/apps/moo/features/task-slice";
import { setWorkspaceId } from "@/apps/moo/features/workspace-slice";
import LeftSideBar from "@/apps/moo/layouts/left-side-bar";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/project";
import { getTasks } from "@/api/task";
import ProjectManageDropdown from "@/apps/moo/components/project/project-manage-dropdown";
import LeftPanel from "@/apps/moo/layouts/left-panel";

const MooAppMain: FC = (): ReactElement => {
  const router = useRouter();
  const { slugs } = router.query;

  const dispatch = useAppDispatch();

  /// * Query Project
  const needProjectFetch = useAppSelector((state) => state.project.needProjectFetch);
  const { data: remoteProjects, status: projectQueryStatus } = useQuery(["/project/projects"], async () => {
    const response = await getProjects();
    return response.data;
  });
  useEffect(() => {
    if (typeof remoteProjects !== "undefined") {
      dispatch(setProjects(remoteProjects));
      dispatch(setNeedProjectFetch(false));
    }
  }, [remoteProjects]);
  useEffect(() => {
    console.log(projectQueryStatus)
    dispatch(setProjectQueryStatus(projectQueryStatus));
  }, [projectQueryStatus]);

  /// * Query Task
  const projectId = useAppSelector((state) => state.project.projectId);
  const { data: remoteTasks, status: taskQueryStatus } = useQuery(["/task/tasks", projectId], async () => {
    const response = await getTasks(projectId);
    return response.data;
  }, {
    enabled: projectId !== ""
  });
  useEffect(() => {
    if (typeof remoteTasks !== "undefined") {
      dispatch(setTasks(remoteTasks));
    }
  }, [remoteTasks]);
  useEffect(() => {
    dispatch(setTaskQueryStatus(taskQueryStatus));
  }, [taskQueryStatus]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const selectedProjectId = slugs ? (slugs[0] || "") : "";
    const selectedTaskId = slugs ? (slugs[1] || "") : "";
    const selectedWorkspaceId = slugs ? (slugs[2] || "") : "";

    dispatch(setProjectId(selectedProjectId));
    dispatch(setTaskId(selectedTaskId));
    dispatch(setWorkspaceId(selectedWorkspaceId));
  }, [router]);

  return (
    <div className="w-full h-screen flex flex-row flex-grow overflow-hidden">
      <div className="w-20 h-screen flex-shrink-0 flex-grow-0">
        <LeftSideBar />
      </div>
      <div className="w-96 h-screen flex-shrink-0 flex-grow-0">
        <LeftPanel />
      </div>
      <div className="w-full h-screen flex-grow">

      </div>
    </div>
  )
}

export default MooAppMain;