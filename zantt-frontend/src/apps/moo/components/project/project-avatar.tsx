import { FC, ReactElement } from "react"

const getDisplayName = (name: string) => {
  if (!name) {
    return "-";
  }
  if (name.length === 1) {
    return name;
  }
  return `${name[0]}${name[1]}`;
}

const ProjectAvatar: FC<{ name: string }> = ({ name }): ReactElement => {
  const displayName = getDisplayName(name);

  return (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-11">
        <span className="text-base">{displayName}</span>
      </div>
    </div>
  )
}

export default ProjectAvatar;