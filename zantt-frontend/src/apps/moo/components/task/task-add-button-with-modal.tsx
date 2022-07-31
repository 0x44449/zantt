import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "@/api/task";
import WellKnownApiException from "@/api/well-known-api-exception";
import { useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { useCurrentProjectSelector } from "@/apps/moo/selectors/state-selector";

const TaskAddModal: FC<{ closeModal: () => void }> = ({ closeModal }): ReactElement => {
  // * States
  const [title, setTitle] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);

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
      setIsNameValid(false);
    }
    else {
      setIsNameValid(true);
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
          disabled={!isNameValid}
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
  // * States
  const [isOpen, setIsOpen] = useState(false);

  // * Selects
  const currentProject = useCurrentProjectSelector();
  if (currentProject === null) {
    return (<></>)
  }

  // * Handlers
  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <>
      <TaskAddOpenModalButton openModal={openModal} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => { }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-auto transform overflow-hidden shadow-xl transition-all">
                  <TaskAddModal closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default TaskAddButtonWithModal;