import PropTypes from "prop-types";
import DetailsFooter from "./DetailsFooter";
import DetailBanner from "./DetailBanner";

function Details({ job }) {
  return (
    <div className="details">
      <DetailBanner
        banner={job.logo}
        logoBackground={job.logoBackground}
        company={job.company}
        companySite={job.website}
      />
      <DetailsFooter
        applicationUrl={job.apply}
        company={job.company}
        position={job.position}
      />
    </div>
  );
}

Details.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Details;
