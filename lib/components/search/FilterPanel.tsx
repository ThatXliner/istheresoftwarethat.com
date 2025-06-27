"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/components/common/data";
// I'll need filters for
// - Tags (text thing similar to the "add tag" component)
// - Platforms (checkboxes, but eventually maybe we
// should have more advanced checks for version compatibility)
// - Licenses
// - Size
// - last updated
export type Filters = {
  platforms: string[];
  tags: string[];
  licenses: string[];
  categories: string[];
  // activeStatus: boolean;
};
interface FilterPanelProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

// Sample data for filters
// TODO: create these from the data
const PLATFORMS = ["Windows", "macOS", "Linux", "Web", "Android", "iOS"];
const LICENSES = ["MIT", "GPL", "Apache", "BSD", "LGPL", "MPL"];

const FilterPanel = ({ filters, setFilters }: FilterPanelProps) => {
  const [expandedSections, setExpandedSections] = useState({
    platforms: true,
    licenses: true,
    categories: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handlePlatformChange = (platform: string) => {
    let newPlatforms;
    if (filters.platforms.includes(platform)) {
      newPlatforms = filters.platforms.filter((p) => p !== platform);
    } else {
      newPlatforms = [...filters.platforms, platform];
    }
    setFilters({ ...filters, platforms: newPlatforms });
  };

  const handleLicenseChange = (license: string) => {
    let newLicenses;
    if (filters.licenses.includes(license)) {
      newLicenses = filters.licenses.filter((l) => l !== license);
    } else {
      newLicenses = [...filters.licenses, license];
    }
    setFilters({ ...filters, licenses: newLicenses });
  };

  const handleCategoryChange = (category: string) => {
    let newCategories;
    if (filters.categories.includes(category)) {
      newCategories = filters.categories.filter((c) => c !== category);
    } else {
      newCategories = [...filters.categories, category];
    }
    setFilters({ ...filters, categories: newCategories });
  };

  // const handleActiveStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   onFilterChange({ activeStatus: e.target.checked });
  // };

  const clearAllFilters = () => {
    setFilters({
      platforms: [],
      licenses: [],
      categories: [],
    });
  };

  const hasActiveFilters =
    filters.platforms.length > 0 ||
    filters.licenses.length > 0 ||
    filters.categories.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
        {hasActiveFilters && (
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={clearAllFilters}
            type="reset"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Development Filter */}
      {/* <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.activeStatus}
            onChange={handleActiveStatusChange}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          <span className="ml-2 text-slate-700">Active Development Only</span>
        </label>
      </div> */}

      {/* Platforms Filter */}
      <FilterSection
        title="Platforms"
        isExpanded={expandedSections.platforms}
        onToggle={() => toggleSection("platforms")}
      >
        <div className="space-y-2">
          {PLATFORMS.map((platform) => (
            <label key={platform} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.platforms.includes(platform)}
                onChange={() => handlePlatformChange(platform)}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-slate-700">{platform}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Licenses Filter */}
      <FilterSection
        title="Licenses"
        isExpanded={expandedSections.licenses}
        onToggle={() => toggleSection("licenses")}
      >
        <div className="space-y-2">
          {LICENSES.map((license) => (
            <label key={license} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.licenses.includes(license)}
                onChange={() => handleLicenseChange(license)}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-slate-700">{license}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Categories Filter */}
      <FilterSection
        title="Categories"
        isExpanded={expandedSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-2">
          {categories.map(({ name: category }) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-slate-700">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection = ({
  title,
  isExpanded,
  onToggle,
  children,
}: FilterSectionProps) => {
  return (
    <div className="border-t border-slate-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-slate-800"
        onClick={onToggle}
        type="button"
      >
        {title}
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-slate-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500" />
        )}
      </button>
      {isExpanded && <div className="mt-3">{children}</div>}
    </div>
  );
};

export default FilterPanel;
