import { getProjects } from "@/api/project";
import ProjectAddButton from "@/apps/moo/components/project/project-add-button";
import ProjectItem from "@/apps/moo/components/project/project-item";
import { setProjects } from "@/apps/moo/features/project-slice";
import { useAppDispatch, useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC, ReactElement, useEffect } from "react";

type ProjectNavBarProps = {
  onSelectProject?: (projectId: string) => void;
}

const ProjectNavBar: FC<ProjectNavBarProps> = (props): ReactElement => {
  const projects = useAppSelector((state) => state.project.projects);
  const projectId = useAppSelector((state) => state.project.projectId);
  const dispatch = useAppDispatch();

  const { data } = useQuery(["/project/projects"], async () => {
    const response = await getProjects();
    return response.data;
  }, {
    suspense: true,
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      dispatch(setProjects(data));
    }
  }, [data]);

  return (
    <div className="h-full overflow-auto bg-slate-800">
      <div className="sticky top-0 bg-slate-800 hover:bg-pink-600">
        <ProjectAddButton />
      </div>
      <div className="">
        <div className="flex flex-col">
          {projects.map(project => (
            <Link key={project.projectId} href={`/moo/${project.projectId}`}>
              <a className={`w-full hover:bg-pink-300 ${project.projectId === projectId ? " bg-pink-500" : ""}`}>
                <ProjectItem
                  projectId={project.projectId}
                  name={project.name}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectNavBar;