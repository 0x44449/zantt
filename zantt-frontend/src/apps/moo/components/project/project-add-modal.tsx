import { addProject } from "@/api/project";
import WellKnownApiException from "@/api/well-known-api-exception";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, ReactElement, useEffect, useState } from "react";

type ProjectAddModalProps = {
  closeModal?: () => void;
  setAutoClosable?: (autoClosable: boolean) => void;
}

const ProjectAddModal: FC<ProjectAddModalProps> = ({ closeModal, setAutoClosable }): ReactElement => {
  const [name, setName] = useState("");
  const [enabledAddButton, setEnabledAddButton] = useState(true);
  useEffect(() => {
    if (name.length > 2) {
      setEnabledAddButton(true)
    }
    else {
      setEnabledAddButton(false);
    }
  }, [name]);

  // * Project mutation
  const queryClient = useQueryClient();
  const { mutate: addProjectMutation, isLoading: addProjectLoading } = useMutation(async (projectName: string) => {
    const response = await addProject(projectName);
    if (!response.success) {
      const errorCode = response.errorCode;
      const errorMessage = response.errorMessage;
      throw new WellKnownApiException(errorMessage, errorCode);
    }
  }, {
    onSuccess: () => {
      setName("");
      queryClient.invalidateQueries(["/project/projects"]);
      if (closeModal) {
        console.log("call closeModal");
        closeModal();
      }
    },
    onError: (e) => {
      // TODO: show error state
      if (e instanceof WellKnownApiException) {
        const errorCode = e.errorCode;
        const errorMessag = e.errorMessage;
      }
    },
    onMutate: () => {
      if (setAutoClosable) {
        setAutoClosable(false);
      }
    },
    onSettled: () => {
      if (setAutoClosable) {
        setAutoClosable(true);
      }
    }
  });

  const handleAddClick = () => {
    addProjectMutation(name);
  }

  return (
    <div>
      <h3>Add project</h3>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">name</span>
        </label>
        <input
          type="text"
          placeholder="Insert project name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={addProjectLoading}
        />
      </div>
      <div className="flex flex-row-reverse w-full mt-4">
        <button
          className={`btn btn-primary${enabledAddButton ? "" : " btn-disabled"}${addProjectLoading ? " loading" : ""}`}
          onClick={handleAddClick}
        >Add</button>
      </div>
    </div>
  )
}

export default ProjectAddModal;