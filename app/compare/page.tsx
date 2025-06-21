"use client";
import { useState, useEffect } from "react";
import { useSoftware } from "@/lib/contexts";
import { Search, Check, X, Plus, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Software } from "@/lib/components/common/data";

const ComparePage = () => {
  const searchParams = useSearchParams();
  const { getSoftwareById, getAllSoftware, searchSoftware } = useSoftware();
  const [compareItems, setCompareItems] = useState<Software[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Software[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadInitialCompare = async () => {
      const ids = searchParams.getAll("ids");
      if (ids.length === 0) return;

      setIsLoading(true);
      try {
        const items = await Promise.all(ids.map((id) => getSoftwareById(id)));
        setCompareItems(items.filter(Boolean));
      } catch (error) {
        console.error("Error loading compare items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialCompare();
  }, [searchParams, getSoftwareById]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchSoftware(searchQuery);
      // Filter out already selected items
      const filteredResults = results.filter(
        (item) => !compareItems.some((compare) => compare.id === item.id),
      );
      setSearchResults(filteredResults);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error searching software:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCompare = (software: Software) => {
    if (compareItems.length >= 3) {
      // Show notification that max items reached
      return;
    }

    setCompareItems([...compareItems, software]);
    setShowSearchResults(false);
    setSearchQuery("");

    // Update URL params
    const ids = compareItems.map((item) => item.id);
    ids.push(software.id);
    setSearchParams({ ids: ids });
  };

  const removeFromCompare = (softwareId: string) => {
    const updatedItems = compareItems.filter((item) => item.id !== softwareId);
    setCompareItems(updatedItems);

    // Update URL params
    const ids = updatedItems.map((item) => item.id);
    setSearchParams({ ids });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Compare Software
      </h1>

      {/* Add software to compare */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Add Software to Compare{" "}
          {compareItems.length > 0 && `(${compareItems.length}/3)`}
        </h2>

        <form onSubmit={handleSearch} className="flex max-w-xl mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-slate-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search for software to compare..."
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-md shadow-lg mt-1 z-10 max-h-64 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0"
                    onClick={() => addToCompare(result)}
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {result.name}
                      </p>
                      <p className="text-sm text-slate-600 truncate">
                        {result.shortDescription}
                      </p>
                    </div>
                    <Plus className="h-5 w-5 text-blue-500" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r-md transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Currently comparing */}
        <div className="flex flex-wrap gap-4">
          {compareItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-slate-100 rounded-md pl-3 pr-2 py-2"
            >
              <span className="font-medium text-slate-800 mr-2">
                {item.name}
              </span>
              <button
                className="text-slate-500 hover:text-red-500 transition-colors"
                onClick={() => removeFromCompare(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      {compareItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-4 border-b border-slate-200 w-1/4">
                  Feature
                </th>
                {compareItems.map((item) => (
                  <th
                    key={item.id}
                    className="p-4 border-b border-slate-200 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-slate-800">
                        {item.name}
                      </span>
                      <Link
                        href={`/software/${item.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium bg-slate-50">
                  Description
                </td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 border-b border-slate-200">
                    {item.shortDescription}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium bg-slate-50">
                  License
                </td>
                {compareItems.map((item) => (
                  <td
                    key={item.id}
                    className="p-4 border-b border-slate-200 text-center"
                  >
                    {item.license}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium bg-slate-50">
                  Platforms
                </td>
                {compareItems.map((item) => (
                  <td key={item.id} className="p-4 border-b border-slate-200">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {item.platforms.map((platform, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium bg-slate-50">
                  Last Updated
                </td>
                {compareItems.map((item) => (
                  <td
                    key={item.id}
                    className="p-4 border-b border-slate-200 text-center"
                  >
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-200 font-medium bg-slate-50">
                  Active Development
                </td>
                {compareItems.map((item) => (
                  <td
                    key={item.id}
                    className="p-4 border-b border-slate-200 text-center"
                  >
                    {item.isActive ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Features comparison */}
              <tr>
                <td
                  colSpan={compareItems.length + 1}
                  className="p-4 border-b border-slate-200 bg-slate-100 font-bold"
                >
                  Features
                </td>
              </tr>

              {/* Generate a set of all features from all software being compared */}
              {Array.from(
                new Set(
                  compareItems.flatMap((item) =>
                    item.features.map((feature) => feature.title),
                  ),
                ),
              ).map((featureTitle, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-slate-200 font-medium bg-slate-50">
                    {featureTitle}
                  </td>
                  {compareItems.map((item) => {
                    const hasFeature = item.features.some(
                      (f) => f.title === featureTitle,
                    );
                    return (
                      <td
                        key={item.id}
                        className="p-4 border-b border-slate-200 text-center"
                      >
                        {hasFeature ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            No Software Selected
          </h3>
          <p className="text-slate-600 mb-4">
            Add software to compare their features side by side
          </p>
          <Link
            href="/search"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Browse Software
          </Link>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
