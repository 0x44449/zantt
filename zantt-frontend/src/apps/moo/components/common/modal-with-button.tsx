import { cloneElement, FC, ReactElement, useRef } from "react"

type ModalWithButtonProps = {
  modalId: string;
  buttonLabel: string;
  buttonComponent?: ReactElement;
  buttonClassName?: string;
  children: ReactElement;
}

const ModalWithButton: FC<ModalWithButtonProps> = ({
  modalId,
  buttonLabel,
  buttonComponent,
  buttonClassName,
  children
}): ReactElement => {
  let inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <label htmlFor={modalId} className={`${buttonClassName ? buttonClassName : ""}`}>
        {buttonComponent ? buttonComponent : buttonLabel}
      </label>
      <input
        type="checkbox"
        id={modalId}
        className="modal-toggle"
        ref={inputRef}
      />
      <label htmlFor={modalId} className="modal cursor-pointer">
        <label className="modal-box relative">
          {cloneElement(children, {closeModal: () => {inputRef.current?.click()}})}
        </label>
      </label>
    </>
  )
}

export default ModalWithButton;