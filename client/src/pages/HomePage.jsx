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
    <div className="container">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-3xl font-bold text-amber-800">My Recipe Collection</h1>
        <button
          onClick={() => navigate('/add')}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          + Add Recipe
        </button>
      </div>

      <div className="mb-16 flex">
        <input
          type="text"
          placeholder="Search recipes..."
          className="search-box flex-grow mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Search
        </button>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No recipes found.
        </div>
      ) : (
        <>
          <div className="flex flex-wrap -mx-3">
            {currentRecipes.map((recipe) => (
              <div key={recipe._id} className="w-full sm:w-1/2 md:w-1/3 px-3 mb-6">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16">
              <div className="inline-flex space-x-3">
                <button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  }`}
                >
                  &laquo;
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
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
  );
};

export default HomePage;