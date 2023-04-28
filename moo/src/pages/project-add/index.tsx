import { addProject } from "@/api/projects";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

export default function AddProject() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate } = useMutation(addProject);

  const handleAddClick = () => {
    mutate({
      name,
      description
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
        router.back();
      }
    });
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }

  return (
    <div>
      <NavBar />
      <div className="px-8">
        <div className="py-4">
          <button className="btn btn-primary" onClick={handleAddClick}>Add</button>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <input type="text" placeholder="Project name" className="input input-bordered max-w-xs" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <textarea className="textarea textarea-bordered" placeholder="Project description" cols={30} rows={10} onChange={handleDescriptionChange}>{description}</textarea>
          </div>
        </div>
      </div>
    </div>
  )
}