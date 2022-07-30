import { FC, ReactElement, useState } from "react";

type ProjectAddModalProps = {
  closeModal?: () => void;
}

const ProjectAddModal: FC<ProjectAddModalProps> = ({ closeModal }): ReactElement => {
  const [name, setName] = useState("");

  const handleAddClick = () => {
    // TODO: react-query mutate
    if (closeModal) {
      closeModal();
    }
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
        />
      </div>
      <div className="flex flex-row-reverse w-full mt-4">
        <button
          className={`btn btn-primary${name.length >= 2 ? "" : " btn-disabled"}`}
          onClick={handleAddClick}
        >Add</button>
      </div>
    </div>
  )
}

export default ProjectAddModal;