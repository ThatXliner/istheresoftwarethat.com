import { Award, Calendar, Code, ExternalLink, Star } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { CatalogSummary } from "@/lib/components/common/data";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export default function SoftwareCard({
  software,
}: {
  software: ArrayElement<CatalogSummary>;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02] group">
      {/* Card Header */}
      <div className="p-6">
        {/* Icon and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
            {software.icon === null ? (
              <Code className="w-6 h-6" />
            ) : (
              <DynamicIcon
                name={software.icon as IconName}
                className="w-6 h-6 text-blue-600"
              />
            )}
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
            <span className="text-sm font-medium text-slate-700">
              {software.upvotes}
            </span>
          </div>

          <div className="flex items-center text-slate-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-xs">
              {new Date(software.added_date).toLocaleDateString()}
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
        <a
          href={`/software/${software.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-center text-sm flex items-center justify-center group-hover:bg-blue-700"
        >
          <span>View Details</span>
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
