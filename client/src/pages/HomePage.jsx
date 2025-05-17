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
  const recipesPerPage = 12;

  useEffect(() => {
    // Fetch semua resep dari backend
    fetch('http://localhost:3001/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1);
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
    <div className="min-h-screen bg-[#FFF9EC] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-[#FFF3D4] p-6 sm:p-8 rounded-3xl shadow-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-1">My Recipe Collection</h1>
            <p className="text-amber-700/80">Discover and manage your favorite recipes</p>
          </div>
          <button
            onClick={() => navigate('/add')}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-orange-700 transition transform hover:scale-105 active:scale-95"
          >
            + Add Recipe
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full border border-orange-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <svg
              className="absolute right-3 top-3.5 h-5 w-5 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={handleSearch}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition shadow-md w-full md:w-auto"
          >
            Search
          </button>
        </div>

        {/* Recipe Cards */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">No recipes found</div>
            <button 
              onClick={() => {setSearchTerm(''); setFilteredRecipes(recipes)}}
              className="text-orange-600 hover:text-orange-700 underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className={`px-4 py-2 rounded-xl shadow ${
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
                      className={`px-4 py-2 rounded-xl font-medium shadow ${
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
                    className={`px-4 py-2 rounded-xl shadow ${
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