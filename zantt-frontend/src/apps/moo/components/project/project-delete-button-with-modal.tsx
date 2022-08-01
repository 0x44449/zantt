import { Dialog, Transition } from "@headlessui/react"
import { FC, Fragment, ReactElement, useState } from "react"

const ProjectDeleteModal: FC<{ closeModal: () => void }> = ({ closeModal }): ReactElement => {
  return (
    <></>
  )
}

const ProjectDeleteOpenModalButton: FC<{ openModal: () => void }> = ({ openModal }): ReactElement => {
  return (
    <></>
  )
}

const ProjectDeleteButtonWithModal: FC = (): ReactElement => {
  // * States
  const [isOpen, setIsOpen] = useState(false);

  // * Handlers
  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <>
      <ProjectDeleteOpenModalButton openModal={openModal} />
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
                  <ProjectDeleteModal closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ProjectDeleteButtonWithModal;