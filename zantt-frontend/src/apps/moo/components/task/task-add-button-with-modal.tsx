import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, ReactElement, useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";

const TaskAddModal: FC<{ closeModal: () => void }> = ({ closeModal }): ReactElement => {
  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Payment successful
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Your payment has been successfully submitted. We’ve sent
          you an email with all of the details of your order.
        </p>
      </div>

      <div className="mt-4 flex flex-row-reverse">
        <button
          type="button"
          className="btn btn-primary normal-case text-sm min-h-0 font-medium py-1 px-4"
          onClick={closeModal}
        >
          Got it, thanks!
        </button>
      </div>
    </>
  )
}

const TaskAddButton: FC<{ openModal: () => void }> = ({ openModal }): ReactElement => {
  return (
    <div className="relative w-full mt-1">
      <button
        type="button"
        onClick={openModal}
        className="btn normal-case rounded-none bg-gray-900 w-full px-4 py-3 text-base justify-start font-medium"
      >
        <PlusIcon className="mr-2 -ml-1 w-5 h-5" />
        Add task
      </button>
    </div>
  )
}

const TaskAddButtonWithModal: FC = (): ReactElement => {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <>
      <TaskAddButton openModal={openModal} />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-content p-6 text-left align-middle shadow-xl transition-all">
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