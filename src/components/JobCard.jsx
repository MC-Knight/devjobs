import PropTypes from "prop-types";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div
        className="company-logo"
        style={{ backgroundColor: `${job.logoBackground}` }}
      >
        <img src={job.logo} alt={job.company} />
      </div>

      <div className="job-condition">
        <p>{job.postedAt}</p>
        <p>•</p>
        <p>{job.contract}</p>
      </div>

      <div className="job-title">
        <h2>{job.position}</h2>
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
