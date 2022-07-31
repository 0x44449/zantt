import { cloneElement, FC, ReactElement, useEffect, useRef, useState } from "react"

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setEnabled(true);
  }, [checked]);

  const mixingProps = {
    closeModal: () => {
      setEnabled(true);
      setChecked(false);
    },
    setAutoClosable: (autoClosable: boolean) => {
      setEnabled(autoClosable);
    }
  }

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
        disabled={!enabled}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor={modalId} className="modal cursor-pointer">
        <label className="modal-box relative">
          {cloneElement(children, mixingProps)}
        </label>
      </label>
    </>
  )
}

export default ModalWithButton;