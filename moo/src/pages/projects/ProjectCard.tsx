import { Nabi } from "@/models/nabi"

type ProjectCardProps = {
  project: Nabi.Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body">
        <h2 className="card-title">{project.name}</h2>
        <p>{project.description}</p>
        <div className="card-actions justify-end">
          {/* <button className="btn btn-primary">Buy Now</button> */}
        </div>
      </div>
    </div>
  )
}