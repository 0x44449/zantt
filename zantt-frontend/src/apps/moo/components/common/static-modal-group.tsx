import { Dialog, Transition } from "@headlessui/react";
import { cloneElement, Component, FC, Fragment, ReactElement, useState } from "react";

interface StaticModalOpenerProps {
  openModal: () => void;
}

type StaticModalProps = {
  closeModal: () => void;
}

type StaticModalGroupProps = {
  OpenerComponent: ReactElement<StaticModalOpenerProps>;
  ModalComponent: ReactElement<StaticModalProps>;
}

const StaticModalGroup: FC<StaticModalGroupProps> = ({ OpenerComponent, ModalComponent }): ReactElement => {
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
      {cloneElement(OpenerComponent, { openModal: openModal })}
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
                  {cloneElement(ModalComponent, { closeModal: closeModal })}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const useStaticModalGroupComponent = () => {
  // * States
  const [isOpen, setIsOpen] = useState(false);

  // * Handlers
  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const ModalContainerComponent: FC<{ children: ReactElement, autoClose?: boolean }> = ({ children, autoClose }) => (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={autoClose ? closeModal : () => {}}>
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
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )

  return { closeModal, openModal, ModalContainerComponent };
}

export default StaticModalGroup;