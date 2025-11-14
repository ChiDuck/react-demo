import "../styles/SearchBar.scss";

export default function SearchBar() {
  return (
    <div className="search-bar-container">
      <input
        name="search"
        className="search-bar"
        placeholder="Search by name | Address"
      />
      <div className="search-icon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
