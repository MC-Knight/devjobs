import { useEffect, useState } from "react";
import { useModal } from "../../hook/use-modal-store";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useJobsStore } from "../../hook/use-added-job";

// mutations
import {
  useUpdateJobMutation,
  useUpdateJobRequirementMutation,
  useUpdateJobRoleMutation,
} from "../../actions/jobs";

function EditJobModal() {
  const { isOpen, onClose, type, data } = useModal();
  const currentJobData = data;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const isModalOpen = isOpen && type === "editJob";

  const { setAddedJob } = useJobsStore();

  const handleClose = () => {
    onClose();
    setRequirementsInputs(currentJobData.requirements.items);
    setRoleInputs(currentJobData.role.items);
    reset();
  };

  const [requirementsInputs, setRequirementsInputs] = useState([""]);

  const [roleInputs, setRoleInputs] = useState([""]);

  const addMoreRequirement = () => {
    setRequirementsInputs([...requirementsInputs, ""]);
  };

  const removeRequirement = (index) => {
    const newRequirements = [...requirementsInputs];
    newRequirements.splice(index, 1);
    setRequirementsInputs(newRequirements);
  };

  const addMoreRole = () => {
    setRoleInputs([...roleInputs, ""]);
  };

  const removeRole = (index) => {
    const newRoles = [...roleInputs];
    newRoles.splice(index, 1);
    setRoleInputs(newRoles);
  };

  const [editJobMutation, { isLoading: isJobLoading }] = useUpdateJobMutation();
  const [editJobRequirementMutation, { isLoading: isRequirementLoading }] =
    useUpdateJobRequirementMutation();
  const [editJobRoleMutation, { isLoading: isRoleLoading }] =
    useUpdateJobRoleMutation();

  const onSubmit = async (newJobData) => {
    const formData = new FormData();
    formData.append("company", newJobData.companyName);
    formData.append("logoBackground", newJobData.logoBackground);
    formData.append("position", newJobData.position);
    formData.append("contract", newJobData.contract);
    formData.append("location", newJobData.location);
    formData.append("website", newJobData.companyWebsite);
    formData.append("apply", newJobData.applicationLink);
    formData.append("description", newJobData.jobDescription);

    if (newJobData.companyLogo[0] !== undefined) {
      formData.append("logo", newJobData.companyLogo[0]);
    }

    const requirements = newJobData.requirements.filter(
      (requirement) => requirement.trim() !== ""
    );
    const newJobRequirements = {
      jobId: parseInt(currentJobData.id),
      content: newJobData.requirementsDescription,
      items: requirements,
    };

    const roles = newJobData.roles.filter((role) => role.trim() !== "");
    const newJobRoles = {
      jobId: parseInt(currentJobData.id),
      content: newJobData.roleDescription,
      items: roles,
    };

    const { data: savedJobData, error: jobError } = await editJobMutation({
      id: currentJobData.id,
      data: formData,
    });

    const { data: savedRequirementData, error: requirementError } =
      await editJobRequirementMutation(newJobRequirements);

    const { data: savedRoleData, error: roleError } = await editJobRoleMutation(
      newJobRoles
    );

    if (jobError || requirementError || roleError) {
      toast.error("Failed to edit job");
      return;
    }

    if (savedJobData && savedRequirementData && savedRoleData) {
      toast.success("Job edited successfully");
      handleClose();
      setTimeout(() => {
        setAddedJob("edited");
      }, 2000);
    }
  };

  useEffect(() => {
    if (currentJobData && currentJobData.requirements && currentJobData.role) {
      setRequirementsInputs(currentJobData.requirements.items);
      setRoleInputs(currentJobData.role.items);
    }
  }, [currentJobData]);

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit(onSubmit)}>
            <X className="model-icon" onClick={() => handleClose()} />
            <h2>Edit Job</h2>

            <div className="input-group">
              <p>Company name</p>
              <div className="input-group-container">
                <input
                  type="text"
                  placeholder="Enter company name"
                  defaultValue={currentJobData.company}
                  {...register("companyName", { required: true })}
                />
              </div>
              {errors.companyName && (
                <span className="error">company name is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Logo background</p>
              <div className="input-group-container">
                <input
                  type="text"
                  placeholder="Enter logo background"
                  defaultValue={currentJobData.logoBackground}
                  {...register("logoBackground", { required: true })}
                />
              </div>
              {errors.logoBackground && (
                <span className="error">logoBackground is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Position</p>
              <div className="input-group-container">
                <input
                  type="text"
                  placeholder="Enter position"
                  defaultValue={currentJobData.position}
                  {...register("position", { required: true })}
                />
              </div>
              {errors.position && (
                <span className="error">job position is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Contract</p>
              <div className="input-group-container">
                <input
                  type="text"
                  placeholder="Enter contract type"
                  defaultValue={currentJobData.contract}
                  {...register("contract", { required: true })}
                />
              </div>
              {errors.contract && (
                <span className="error">contract type is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Location</p>
              <div className="input-group-container">
                <input
                  type="text"
                  placeholder="Enter location"
                  defaultValue={currentJobData.location}
                  {...register("location", { required: true })}
                />
              </div>
              {errors.location && (
                <span className="error">job location is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Company Website</p>
              <div className="input-group-container">
                <input
                  type="text"
                  placeholder="Enter company website link"
                  defaultValue={currentJobData.website}
                  {...register("companyWebsite", { required: true })}
                />
              </div>
              {errors.companyWebsite && (
                <span className="error">company website is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Application link</p>
              <div className="input-group-container">
                <input
                  type="text"
                  placeholder="Enter application link"
                  defaultValue={currentJobData.apply}
                  {...register("applicationLink", { required: true })}
                />
              </div>
              {errors.applicationLink && (
                <span className="error">application link is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Job descriptionk</p>
              <div className="input-group-container">
                <textarea
                  placeholder="Enter job description"
                  defaultValue={currentJobData.description}
                  {...register("jobDescription", { required: true })}
                ></textarea>
              </div>
              {errors.jobDescription && (
                <span className="error">job description is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Company Logo</p>
              <div className="input-group-container">
                <input
                  type="file"
                  placeholder="company logo"
                  accept=".svg, .png, .jpeg, .jpg"
                  {...register("companyLogo")}
                />
              </div>
            </div>

            <div className="input-group">
              <p>Requirements description</p>
              <div className="input-group-container">
                <textarea
                  placeholder="Enter job requirements description"
                  defaultValue={currentJobData.requirements.content}
                  {...register("requirementsDescription", { required: true })}
                ></textarea>
              </div>
              {errors.requirementsDescription && (
                <span className="error">
                  job requirements description is required
                </span>
              )}
            </div>

            <div className="input-group">
              <p>Specify Requirements</p>
              {requirementsInputs.map((requirement, index) => (
                <div
                  key={`requirement-${index}`}
                  className="input-group-container"
                >
                  <input
                    type="text"
                    placeholder="requirement example"
                    defaultValue={requirement}
                    {...register(`requirements[${index}]`)}
                  />
                  <X
                    className="remove-icon"
                    onClick={() => removeRequirement(index)}
                  />
                </div>
              ))}
              {errors.requirements && (
                <span className="error">
                  At least one requirement is required
                </span>
              )}
              <button type="button" onClick={addMoreRequirement}>
                Add more requirement
              </button>
            </div>

            <div className="input-group">
              <p>Role description</p>
              <div className="input-group-container">
                <textarea
                  placeholder="Enter job role description"
                  defaultValue={currentJobData.role.content}
                  {...register("roleDescription", { required: true })}
                ></textarea>
              </div>
              {errors.roleDescription && (
                <span className="error">job role description is required</span>
              )}
            </div>

            <div className="input-group">
              <p>Specify Roles</p>
              {roleInputs.map((role, index) => (
                <div key={`role-${index}`} className="input-group-container">
                  <input
                    type="text"
                    placeholder="role example"
                    defaultValue={role}
                    {...register(`roles[${index}]`)}
                  />
                  <X
                    className="remove-icon"
                    onClick={() => removeRole(index)}
                  />
                </div>
              ))}
              {errors.roles && (
                <span className="error">At least one role is required</span>
              )}
              <button type="button" onClick={addMoreRole}>
                Add more role
              </button>
            </div>

            <div className="form-actions">
              <button onClick={handleClose}>Cancel</button>
              <button type="submit">
                {isJobLoading || isRequirementLoading || isRoleLoading
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditJobModal;
