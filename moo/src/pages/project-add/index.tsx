import { useRouter } from "next/router";

export default function AddProject() {
  const router = useRouter();

  return (
    <div>
      <h1>Add Project</h1>
      <div>
        <input type="text" placeholder="Project name" className="input input-bordered max-w-xs" />
      </div>
      <div>
        <textarea className="textarea textarea-bordered" placeholder="Project description" cols={30} rows={10}></textarea>
      </div>
    </div>
  )
}