import { useModal } from "../../hook/use-modal-store";

function AddJobModal() {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "addNewJob";

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <p onClick={handleClose}>close</p>
        </div>
      )}
    </>
  );
}

export default AddJobModal;
