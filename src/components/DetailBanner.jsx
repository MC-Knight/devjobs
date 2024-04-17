import PropTypes from "prop-types";

function DetailBanner({ banner, logoBackground, company, companySite }) {
  return (
    <div className="details-banner">
      <div
        className="details-banner-image"
        style={{ backgroundColor: `${logoBackground}` }}
      >
        <img src={banner} alt="Company banner" />
      </div>

      <div className="details-banner-company">
        <h3>{company}</h3>
        <p>{company}.com</p>
      </div>

      <div className="details-banner-company-site">
        <button>
          <a href={companySite} target="_blank" rel="noopener noreferrer">
            Company Site
          </a>
        </button>
      </div>
    </div>
  );
}

DetailBanner.propTypes = {
  banner: PropTypes.string,
  logoBackground: PropTypes.string,
  company: PropTypes.string,
  companySite: PropTypes.string,
};

export default DetailBanner;
