import { addProject } from "@/api/project";
import WellKnownApiException from "@/api/well-known-api-exception";
import { useStaticModalGroupComponent } from "@/apps/moo/components/common/static-modal-group";
import { Dialog } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, ReactElement, useEffect, useState } from "react";

const ProjectAddModal: FC<{ closeModal: () => void }> = ({ closeModal }): ReactElement => {
  // * States
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);

  // * Effects
  useEffect(() => {
    if (name.length < 2) {
      setIsNameValid(false);
    }
    else {
      setIsNameValid(true);
    }
  }, [name]);

  // * Mutations
  const queryClient = useQueryClient();
  type AddProjectMutationParam = {
    name: string;
  }
  const {
    mutate: addProjectMutate,
    isLoading: isAddProjectLoading
  } = useMutation(async (val: AddProjectMutationParam) => {
    const response = await addProject(val.name);
    if (!response.success) {
      const errorCode = response.errorCode;
      const errorMessage = response.errorMessage;
      throw new WellKnownApiException(errorMessage, errorCode);
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["/project/projects"]);
    }
  });

  // * Handlers
  const handleAddProjectClick = () => {
    if (isAddProjectLoading) {
      return;
    }

    addProjectMutate({
      name: name
    }, {
      onSettled: () => {

      },
      onSuccess: () => {
        setName("");
        closeModal();
      },
      onError: (e, val) => {
        if (e instanceof WellKnownApiException) {
          const errorCode = e.errorCode;
          const errorMessag = e.errorMessage;
        }
        else {

        }
      }
    });
  }

  return (
    <div className="w-96 rounded-2xl bg-neutral-content p-6 text-left align-middle">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-neutral"
      >
        Project add
      </Dialog.Title>
      <div className="mt-2 form-control">
        <input
          type="text"
          placeholder="Project name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isAddProjectLoading}
        />
      </div>

      <div className="mt-4 flex flex-row-reverse gap-4">
        <button
          type="button"
          className={`btn ${isAddProjectLoading ? "loading" : ""}`}
          onClick={handleAddProjectClick}
          disabled={!isNameValid}
        >
          Add
        </button>
        <button
          type="button"
          className="btn btn-error"
          onClick={closeModal}
          disabled={isAddProjectLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

const ProjectAddOpenModalButton: FC<{ openModal: () => void }> = ({ openModal }): ReactElement => {
  return (
    <div onClick={openModal} className={`flex flex-col justify-center items-center`}>
      <div className="avatar placeholder cursor-pointer">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-11">
          <PlusIcon className="text-baase w-4" />
        </div>
      </div>
    </div>
  )
}

const ProjectAddButtonWithModal: FC = (): ReactElement => {
  const { closeModal, openModal, ModalContainerComponent } = useStaticModalGroupComponent();

  return (
    <>
      <ProjectAddOpenModalButton openModal={openModal} />
      <ModalContainerComponent>
        <ProjectAddModal closeModal={closeModal} />
      </ModalContainerComponent>
    </>
  )
}

export default ProjectAddButtonWithModal;