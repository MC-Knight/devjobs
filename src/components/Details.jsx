import PropTypes from "prop-types";
import DetailsFooter from "./DetailsFooter";
import DetailBanner from "./DetailBanner";
import DetailContent from "./DetailContent";

function Details({ job }) {
  return (
    <div className="details">
      <DetailBanner
        banner={job.logo}
        logoBackground={job.logoBackground}
        company={job.company}
        companySite={job.website}
      />

      <DetailContent job={job} />

      <div className="just-here"></div>

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
