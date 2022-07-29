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
    <div className="flex justify-center items-center w-11 h-11 bg-orange-400 rounded-full">
      <span className="truncate uppercase text-base font-medium text-slate-50">{displayName}</span>
    </div>
  )
}

export default ProjectAvatar;