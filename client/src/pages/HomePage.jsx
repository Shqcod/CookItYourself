import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12; // Memuat 12 resep per halaman (3 kolom × 4 baris)

  useEffect(() => {
    // Fetch semua resep dari backend
    fetch('http://localhost:3001/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); // awalnya tampilkan semua
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Get current recipes for pagination
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
  <div className="min-h-screen bg-[#FFF9EC] py-12 px-6">
    <div className="max-w-6xl mx-auto bg-[#FFF3D4] p-8 rounded-3xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold text-amber-800">My Recipe Collection</h1>
        <button
          onClick={() => navigate('/add')}
          className="bg-orange-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-orange-700 transition"
        >
          + Add Recipe
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3 mb-10">
        <input
          type="text"
          placeholder="Search recipes..."
          className="flex-grow border border-orange-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 transition"
        >
          Search
        </button>
      </div>

      {/* Recipe Cards */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No recipes found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="inline-flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-xl ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  }`}
                >
                  &laquo;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-xl font-medium ${
                      currentPage === index + 1
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-xl ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  }`}
                >
                  &raquo;
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
};

export default HomePage;