import { useJobsStore } from "../../hook/use-added-job";
import { useModal } from "../../hook/use-modal-store";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { useDeleteJobMutation } from "../../actions/jobs";

function DeleteJobModal() {
  const { isOpen, onClose, type, data } = useModal();
  const jobData = data;

  const { setAddedJob } = useJobsStore();

  const isModalOpen = isOpen && type === "deleteJob";

  const [deleteJobMutation, { isLoading }] = useDeleteJobMutation();

  const deleteJobHandler = async () => {
    const { data, error } = await deleteJobMutation(jobData.id);

    if (error) {
      toast.error("Failed to delete job");
    }

    if (data) {
      toast.success("Job deleted successfully");
      onClose();
      setTimeout(() => {
        setAddedJob("delete");
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="delete-job-modal">
            <X className="model-icon" onClick={() => handleClose()} />
            <div className="delete-job-modal-content">
              <h2>Are you sure?</h2>
              <p>You want to delete {jobData.position} job</p>
            </div>

            <div className="delete-job-modal-actions">
              <button onClick={() => handleClose()}>Cancel</button>
              <button onClick={deleteJobHandler}>
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteJobModal;
