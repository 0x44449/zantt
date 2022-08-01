import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "@/api/task";
import WellKnownApiException from "@/api/well-known-api-exception";
import { useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { useCurrentProjectSelector } from "@/apps/moo/selectors/state-selector";
import { useStaticModalGroupComponent } from "@/apps/moo/components/common/static-modal-group";

const TaskAddModal: FC<{ closeModal: () => void }> = ({ closeModal }): ReactElement => {
  // * States
  const [title, setTitle] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(false);

  // * Mutations
  const queryClient = useQueryClient();
  type AddTaskMutationParam = {
    projectId: string;
    title: string;
  }
  const {
    mutate: addTaskMutate,
    isLoading: isAddTaskLoading
  } = useMutation(async (val: AddTaskMutationParam) => {
    const response = await addTask(val.projectId, val.title);
    if (!response.success) {
      const errorCode = response.errorCode;
      const errorMessage = response.errorMessage;
      throw new WellKnownApiException(errorMessage, errorCode);
    }
  }, {
    onSuccess: (_, val) => {
      queryClient.invalidateQueries(["/task/tasks", val.projectId]);
    }
  });

  // * Selects
  const projectId = useAppSelector((state) => state.project.projectId);

  // * Effects
  useEffect(() => {
    if (title.length < 2) {
      setIsTitleValid(false);
    }
    else {
      setIsTitleValid(true);
    }
  }, [title]);

  // * Handlers
  const handleAddTaskClick = () => {
    if (isAddTaskLoading) {
      return;
    }

    addTaskMutate({
      projectId: projectId,
      title: title
    }, {
      onSettled: () => {

      },
      onSuccess: () => {
        setTitle("");
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
        Task add
      </Dialog.Title>
      <div className="mt-2 form-control">
        <input
          type="text"
          placeholder="Task name"
          className="input w-full"
          disabled={isAddTaskLoading}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-row-reverse gap-4">
        <button
          type="button"
          className={`btn ${isAddTaskLoading ? "loading" : ""}`}
          onClick={handleAddTaskClick}
          disabled={!isTitleValid}
        >
          Add
        </button>
        <button
          type="button"
          className="btn btn-error"
          onClick={closeModal}
          disabled={isAddTaskLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

const TaskAddOpenModalButton: FC<{ openModal: () => void }> = ({ openModal }): ReactElement => {
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={openModal}
        className="w-full rounded-none bg-gray-900 justify-start btn gap-2"
      >
        <PlusIcon className="mr-2 -ml-1 w-5 h-5" />
        Add task
      </button>
    </div>
  )
}

const TaskAddButtonWithModal: FC = (): ReactElement => {
  const { closeModal, openModal, ModalContainerComponent } = useStaticModalGroupComponent();

  return (
    <>
      <TaskAddOpenModalButton openModal={openModal} />
      <ModalContainerComponent>
        <TaskAddModal closeModal={closeModal} />
      </ModalContainerComponent>
    </>
  )
}

export default TaskAddButtonWithModal;