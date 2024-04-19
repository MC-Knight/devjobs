import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  const jobDetail = () => {
    navigate(`/job/${job.id}`);
  };

  function timeAgo(date) {
    const duration = moment.duration(moment().diff(date));
    const years = duration.years();
    const months = duration.months();
    const weeks = duration.weeks();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (weeks > 0) return `${weeks}w ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  }

  return (
    <div className="job-card">
      <div
        className="company-logo"
        style={{ backgroundColor: `${job.logoBackground}` }}
      >
        <img src={job.logo} alt={job.company} />
      </div>

      <div className="job-condition">
        <p>{timeAgo(moment(job.postedAt))}</p>
        <p>•</p>
        <p>{job.contract}</p>
      </div>

      <div className="job-title">
        <h2 onClick={jobDetail}>{job.position}</h2>
      </div>

      <div className="job-company">
        <p>{job.company}</p>
      </div>

      <div className="job-location">
        <p>{job.location}</p>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobCard;
