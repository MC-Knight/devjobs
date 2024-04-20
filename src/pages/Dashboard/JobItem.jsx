import PropTypes from "prop-types";
import { fromWhen } from "../../utils/timeAgo";
import { MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import { useModal } from "../../hook/use-modal-store";
import { useState } from "react";

export const JobItem = ({ job }) => {
  const { onOpen } = useModal();
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const handleMoreClick = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  return (
    <tr>
      <td>{job.position}</td>
      <td>
        <div
          className="company-logo-dashboard"
          style={{ backgroundColor: `${job.logoBackground}` }}
        >
          <img src={job.logo} alt={`${job.company}-logo`} />
        </div>
        <p className="company-name-dashboard">{job.company}</p>
      </td>
      <td>{job.location}</td>
      <td>{job.contract}</td>
      <td>{fromWhen(job.postedAt)}</td>
      <td>
        <span>
          {isPopoverVisible ? (
            <X className="x-icon" onClick={handleMoreClick} />
          ) : (
            <MoreHorizontal
              strokeWidth={0.5}
              className="more-icon"
              data-ripple-light="true"
              data-popover-target="popover-top"
              onClick={handleMoreClick}
            />
          )}
          {isPopoverVisible && (
            <div className="table-popover">
              <div
                className="table-popover-item"
                onClick={() => onOpen("editJob", job)}
              >
                <Pencil className="table-popover-item-icon" />
                <p>edit</p>
              </div>
              <div
                className="table-popover-item"
                onClick={() => onOpen("deleteJob", job)}
              >
                <Trash2 className="table-popover-item-icon" />
                <p>delete</p>
              </div>
            </div>
          )}
        </span>
      </td>
    </tr>
  );
};

JobItem.propTypes = {
  job: PropTypes.object,
};

export const NoItem = ({ title }) => {
  return (
    <tr className="no-content">
      <td>
        <span>{title}</span>
      </td>
    </tr>
  );
};

NoItem.propTypes = {
  title: PropTypes.string,
};

export const LoadingItem = () => {
  return (
    <tr className="no-content">
      <td>
        <span>Loading...</span>
      </td>
    </tr>
  );
};
