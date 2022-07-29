import ProjectAvatar from "@/apps/moo/components/project/project-avatar";
import ProjectAvatarSkeleton from "@/apps/moo/components/project/project-avatar-skeleton";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";

const ProjectNavButtonSkeleton: FC = (): ReactElement => {
  return (
    <div className="flex flex-col py-4 px-3 items-center justify-center">
      <ProjectAvatarSkeleton />
      <div className="mt-2 h-3 bg-gray-700 w-4/5 rounded-full" />
    </div>
  )
}

export default ProjectNavButtonSkeleton;