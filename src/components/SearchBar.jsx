import search from "../assets/desktop/icon-search.svg";
import location from "../assets/desktop/icon-location.svg";

function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-container-1">
        <img src={search} alt="search-magnifier" />
        <input
          type="text"
          placeholder="Filter by title, companies, expertise..."
        />
      </div>

      <div className="search-container-2">
        <img src={location} alt="search-magnifier" />
        <input type="text" placeholder="Filter by location..." />
      </div>

      <div className="search-btn">
        <input type="checkbox" />
        <p>Full Time Only</p>
        <button>
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
