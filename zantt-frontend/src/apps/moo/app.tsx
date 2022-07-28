import { FC, ReactElement, Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import ProjectNavBar from '@/apps/moo/controls/project-nav-bar';
import TaskList from '@/apps/moo/controls/task-list';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const MooApp: FC<{}> = (props): ReactElement => {
  const router = useRouter();
  const { slugs } = router.query;

  const [projectId, setProjectId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");

  const [projects, setProjects] = useState([] as Zantt.ProjectModelType[]);
  const [tasks, setTasks] = useState([] as Zantt.TaskModelType[]);

  useEffect(() => {
    if (!router.isReady) {
      console.log("router is not ready");
      return;
    }
    console.log("router is ready!!");

    const selectedProjectId = slugs ? slugs[0] : "";
    const selectedTaskId = slugs ? (slugs[1] || "") : "";
    const selectedWorkspaceId = slugs ? (slugs[2] || "") : "";

    setProjectId(selectedProjectId);
    setTaskId(selectedTaskId);
    setWorkspaceId(selectedWorkspaceId);
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading Global...</div>}>
        <ProjectNavBar
          projectId={projectId}
          projects={projects}
          setProjects={setProjects}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList
            projectId={projectId}
            taskId={taskId}
            tasks={tasks}
            setTasks={setTasks}
          />
        </Suspense>
      </Suspense>
    </QueryClientProvider>
  )
}

export default MooApp;