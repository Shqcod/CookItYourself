import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border border-gray-300 px-4 py-2 rounded-md w-full"
      />
      <button
        type="submit"
        className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
