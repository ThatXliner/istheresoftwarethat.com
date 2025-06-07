import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import FilterPanel from '../components/search/FilterPanel';
import SoftwareList from '../components/software/SoftwareList';
import { useSoftware } from '../contexts/SoftwareContext';
import { Software } from '../types/Software';
import { SlidersHorizontal, ListFilter } from 'lucide-react';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { getAllSoftware, searchSoftware } = useSoftware();
  const [results, setResults] = useState<Software[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    platforms: [] as string[],
    licenses: [] as string[],
    categories: [] as string[],
    activeStatus: true,
  });

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = query 
          ? await searchSoftware(query) 
          : await getAllSoftware();
          
        // Apply filters
        const filteredData = applyFilters(data, filters);
        setResults(filteredData);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [query, filters, searchSoftware, getAllSoftware]);

  const applyFilters = (data: Software[], filters: any) => {
    return data.filter(software => {
      // Filter by platform
      if (filters.platforms.length > 0 && 
          !software.platforms.some(p => filters.platforms.includes(p))) {
        return false;
      }
      
      // Filter by license
      if (filters.licenses.length > 0 && 
          !filters.licenses.includes(software.license)) {
        return false;
      }
      
      // Filter by category
      if (filters.categories.length > 0 && 
          !software.categories.some(c => filters.categories.includes(c))) {
        return false;
      }
      
      // Filter by active status
      if (filters.activeStatus && !software.isActive) {
        return false;
      }
      
      return true;
    });
  };

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar 
          initialValue={query} 
          onSearch={handleSearch} 
          placeholder="Describe what you're looking for..." 
          buttonText="Search"
        />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle */}
        <button 
          className="lg:hidden flex items-center gap-2 text-slate-700 font-medium mb-4"
          onClick={toggleFilters}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {/* Filter panel - hidden on mobile unless toggled */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterPanel 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        
        {/* Search results */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              {isLoading ? 'Searching...' : `${results.length} Results`}
              {query && ` for "${query}"`}
            </h1>
            
            <div className="flex items-center text-sm text-slate-600">
              <ListFilter className="w-4 h-4 mr-2" />
              <span>Sort by: </span>
              <select className="ml-2 border-none bg-transparent font-medium">
                <option>Relevance</option>
                <option>Most Popular</option>
                <option>Recently Updated</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : results.length > 0 ? (
            <SoftwareList software={results} />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No Results Found</h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button className="text-blue-600 font-medium hover:underline">
                Browse all software
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;