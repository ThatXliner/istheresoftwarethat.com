import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Clock, ExternalLink } from 'lucide-react';

// Mock recent additions data
const recentAdditions = [
  {
    id: '5',
    name: 'Obsidian',
    description: 'Knowledge management app with powerful linking and note-taking features',
    category: 'Productivity',
    addedDate: '2025-01-02',
    icon: Code,
  },
  {
    id: '6',
    name: 'Figma',
    description: 'Collaborative interface design tool with real-time collaboration',
    category: 'Design',
    addedDate: '2025-01-01',
    icon: Code,
  },
  {
    id: '7',
    name: 'Discord',
    description: 'Voice, video and text communication platform for communities',
    category: 'Communication',
    addedDate: '2024-12-30',
    icon: Code,
  },
  {
    id: '8',
    name: 'OBS Studio',
    description: 'Free and open source software for video recording and live streaming',
    category: 'Media',
    addedDate: '2024-12-28',
    icon: Code,
  },
];

const RecentAdditions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recentAdditions.map((software) => (
        <div
          key={software.id}
          className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 transition-all duration-300 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <software.icon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{software.name}</h3>
                <p className="text-slate-600 text-sm mb-2">{software.description}</p>
                <div className="flex items-center text-slate-500 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Added {new Date(software.addedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs mb-2">
                {software.category}
              </span>
              <Link
                to={`/software/${software.id}`}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentAdditions;