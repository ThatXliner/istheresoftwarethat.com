import { Clock, ExternalLink } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Link from "next/link";
import type { Software } from "../common/data";

const recentAdditions: Software[] = [];
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
                <DynamicIcon
                  name={software.other_details.icon as IconName}
                  className="w-5 h-5 text-green-600"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  {software.name}
                </h3>
                <p className="text-slate-600 text-sm mb-2">
                  {software.other_details.short_description}
                </p>
                <div className="flex items-center text-slate-500 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>
                    Added {new Date(software.added_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs mb-2">
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
        </div>
      ))}
    </div>
  );
};

export default RecentAdditions;
