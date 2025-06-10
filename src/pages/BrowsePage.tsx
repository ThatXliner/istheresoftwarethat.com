import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { featuredSoftware, recentAdditions } from '../components/common/data';
import { Star, ExternalLink, Calendar, Award } from 'lucide-react';

const BrowsePage = () => {
  const [allSoftware, setAllSoftware] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Combine all software from different sources
    const combined = [...featuredSoftware, ...recentAdditions];
    
    // Remove duplicates based on ID
    const unique = combined.filter((software, index, self) => 
      index === self.findIndex(s => s.id === software.id)
    );
    
    // Sort alphabetically by default
    const sorted = unique.sort((a, b) => a.name.localeCompare(b.name));
    setAllSoftware(sorted);
  }, []);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    
    const sorted = [...allSoftware].sort((a, b) => {
      switch (newSortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'upvotes':
          return b.upvotes - a.upvotes;
        case 'recent':
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
    
    setAllSoftware(sorted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Browse Software</h1>
        <p className="text-slate-600 mb-6">
          Discover amazing free and open-source software for all your needs
        </p>
        
        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center text-slate-600">
            <span className="text-sm font-medium mr-3">
              Showing {allSoftware.length} software packages
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-slate-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name (A-Z)</option>
              <option value="upvotes">Most Popular</option>
              <option value="recent">Recently Added</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Software Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allSoftware.map((software) => (
          <SoftwareCard key={software.id} software={software} />
        ))}
      </div>

      {/* Empty State */}
      {allSoftware.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No Software Found</h3>
          <p className="text-slate-600 mb-6">
            We're working on adding more software to our catalog.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Submit Software
          </Link>
        </div>
      )}
    </div>
  );
};

interface SoftwareCardProps {
  software: any;
}

const SoftwareCard = ({ software }: SoftwareCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02] group">
      {/* Card Header */}
      <div className="p-6">
        {/* Icon and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <software.icon className="w-6 h-6 text-blue-600" />
          </div>
          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
            {software.category}
          </span>
        </div>

        {/* Software Name */}
        <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {software.name}
        </h3>

        {/* Description with ellipsis */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {software.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span className="text-sm font-medium text-slate-700">{software.upvotes}</span>
          </div>
          
          <div className="flex items-center text-slate-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-xs">
              {new Date(software.addedDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Pricing Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            <Award className="w-3 h-3 mr-1" />
            Free & Open Source
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6">
        <Link
          to={`/software/${software.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-center text-sm flex items-center justify-center group-hover:bg-blue-700"
        >
          <span>View Details</span>
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default BrowsePage;