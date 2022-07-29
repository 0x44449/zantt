import { FC, ReactElement } from "react";

const ProjectVerticalScrollable: FC<{ children: ReactElement[] }> = ({ children }): ReactElement => {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

export default ProjectVerticalScrollable;