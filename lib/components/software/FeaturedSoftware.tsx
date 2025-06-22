import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
const featuredSoftware = [];

// Mock featured software data

const FeaturedSoftware = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredSoftware.map((software) => (
        <div
          key={software.id}
          className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 transition-all duration-300 hover:shadow-md group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg group-hover:scale-110 transition-transform">
              <software.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{software.upvotes}</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            {software.name}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {software.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
              {software.category}
            </span>
            <Link
              href={`/software/${software.id}`}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSoftware;
