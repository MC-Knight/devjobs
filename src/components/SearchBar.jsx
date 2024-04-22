import search from "../assets/desktop/icon-search.svg";
import location from "../assets/desktop/icon-location.svg";
import PropTypes from "prop-types";
import { useState } from "react";

function SearchBar({
  onLocationSearch,
  onCompanyOrPositionSearch,
  onFullTimeSearch,
}) {
  const handleLocationSearch = (event) => {
    onLocationSearch(event.target.value);
  };

  const handleCompanyOrTitleSearch = (event) => {
    onCompanyOrPositionSearch(event.target.value);
  };

  const [isFullTime, setIsFullTime] = useState(false);

  const handleFullTimeSearch = (event) => {
    setIsFullTime(event.target.checked);
  };

  const handleSearch = () => {
    onFullTimeSearch(isFullTime);
  };

  return (
    <div className="search-bar">
      <div className="search-container-1">
        <img src={search} alt="search-magnifier" />
        <input
          type="text"
          placeholder="Filter by title, companies, expertise..."
          onChange={handleCompanyOrTitleSearch}
        />
      </div>

      <div className="search-container-2">
        <img src={location} alt="search-magnifier" />
        <input
          type="text"
          placeholder="Filter by location..."
          onChange={handleLocationSearch}
        />
      </div>

      <div className="search-btn">
        <input type="checkbox" onChange={handleFullTimeSearch} />
        <p>Full Time Only</p>
        <button onClick={handleSearch}>
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onLocationSearch: PropTypes.func.isRequired,
  onCompanyOrPositionSearch: PropTypes.func.isRequired,
  onFullTimeSearch: PropTypes.func.isRequired,
};

export default SearchBar;
