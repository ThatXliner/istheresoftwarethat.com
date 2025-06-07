import React from 'react';
import { Link } from 'react-router-dom';
import { Software } from '../../types/Software';
import { ExternalLink, Bookmark, CheckCircle, AlertCircle, ThumbsUp } from 'lucide-react';

interface SoftwareListProps {
  software: Software[];
}

const SoftwareList = ({ software }: SoftwareListProps) => {
  return (
    <div className="space-y-4">
      {software.map((item) => (
        <SoftwareCard key={item.id} software={item} />
      ))}
    </div>
  );
};

interface SoftwareCardProps {
  software: Software;
}

const SoftwareCard = ({ software }: SoftwareCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Icon/Logo */}
        <div className="flex items-center justify-center p-6 bg-blue-50 md:w-24">
          <div className="bg-blue-100 p-3 rounded-lg">
            <software.icon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-grow p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-slate-800">{software.name}</h3>
                {software.isActive ? (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </span>
                ) : (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Maintenance
                  </span>
                )}
              </div>
              <p className="text-slate-600 mt-1">{software.shortDescription}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 text-sm text-slate-500">
              <div className="flex items-center mr-4">
                <ThumbsUp className="w-4 h-4 mr-1 text-blue-500" />
                <span>{software.upvotes}</span>
              </div>
              <span>Updated {new Date(software.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {software.categories.slice(0, 4).map((category, index) => (
              <span key={index} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
                {category}
              </span>
            ))}
            {software.categories.length > 4 && (
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
                +{software.categories.length - 4} more
              </span>
            )}
          </div>
          
          {/* Features summary */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Key Features:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
              {software.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="text-sm text-slate-600 flex items-start">
                  <span className="text-blue-500 mr-1">•</span>
                  <span>{feature.title}</span>
                </li>
              ))}
              {software.features.length > 4 && (
                <li className="text-sm text-blue-600 font-medium">
                  +{software.features.length - 4} more features
                </li>
              )}
            </ul>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Link
              to={`/software/${software.id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
            >
              View Details
            </Link>
            <a
              href={software.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              <span>Visit Website</span>
            </a>
            <button className="flex items-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-md transition-colors text-sm">
              <Bookmark className="w-4 h-4 mr-1" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareList;