import PropTypes from "prop-types";
function DetailsFooter({ applicationUrl, company, position }) {
  return (
    <div className="details-footer">
      <div className="details-footer-company">
        <h3>{position}</h3>
        <p>{company}</p>
      </div>
      <button>
        <a href={applicationUrl} target="_blank" rel="noopener noreferrer">
          Apply Now
        </a>
      </button>
    </div>
  );
}

DetailsFooter.propTypes = {
  applicationUrl: PropTypes.string,
  company: PropTypes.string,
  position: PropTypes.string,
};
export default DetailsFooter;
