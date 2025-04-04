const FilterSearch = ({ filter, searchQuery, onFilterChange, onSearchChange }) => {
  return (
    <div className="filter-search">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All Tasks</option>
        <option value="done">Completed</option>
        <option value="undone">Pending</option>
      </select>
      
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;