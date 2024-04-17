import PropTypes from "prop-types";

function DetailContent({ job }) {
  return (
    <div className="details-content">
      <div className="details-content-job">
        <div className="details-content-job-left">
          <div className="details-content-job-left-time">
            <p>{job.postedAt}</p>
            <p>•</p>
            <p>{job.contract}</p>
          </div>
          <div className="details-content-job-left-title">
            <h2>{job.position}</h2>
          </div>

          <div className="details-content-job-left-location">
            <p>{job.location}</p>
          </div>
        </div>

        <div className="details-content-job-right">
          <button>
            <a href={job.apply} target="_blank" rel="noreferrer">
              Apply Now
            </a>
          </button>
        </div>
      </div>

      <div className="details-content-description">
        <p>{job.description}</p>
      </div>

      <div className="details-content-requirements">
        <h2>Requirements</h2>
        <p>{job.requirements?.content}</p>
        <ul>
          {job.requirements?.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="details-content-requirements">
        <h2>What You Will Do</h2>
        <p>{job.role?.content}</p>
        <ol>
          {job.role?.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

DetailContent.propTypes = {
  job: PropTypes.object.isRequired,
};

export default DetailContent;
