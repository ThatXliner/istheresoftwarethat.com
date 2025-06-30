"use client";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import {
  type CatalogSummary,
  catalogSummarySchema,
} from "@/lib/components/common/data";
import SearchBar from "@/lib/components/search/SearchBar";
import { getSoftwareList } from "@/lib/queries";
import { createClient } from "@/lib/supabase/client";
import FilterPanel, { type Filters } from "./FilterPanel";
import SoftwareCard from "./SoftwareCard";

export default function Client({
  initialData,
}: {
  initialData: CatalogSummary;
}) {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [filters, setFilters] = useState<Filters>({
    platforms: [] as string[],
    licenses: [] as string[],
    categories:
      searchParams.get("category") != null
        ? [searchParams.get("category") as string]
        : ([] as string[]),
    // activeStatus: true,
  });

  const { data: software } = useQuery<CatalogSummary>({
    queryKey: ["software", searchQuery, filters],
    staleTime: 0,
    queryFn: async () => {
      // Convert filters to an SQL query
      const client = await createClient();
      let query = getSoftwareList(client);
      if (searchQuery.trim() !== "") {
        query = query.textSearch("fts", searchQuery, {
          type: "phrase",
          config: "english",
        });
        // .or(
        //   `description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`,
        // );
      }
      if (filters.licenses.length > 0) {
        query = query.in("license", filters.licenses);
      }
      if (filters.categories.length > 0) {
        query = query.in("category", filters.categories);
      }
      if (filters.platforms.length > 0) {
        // XXX: I don't know whether I want this to be overlaps (checks if intersection > 0)
        // Or "contains" (checks if all elements in the array are present)
        // Maybe I should make the user decide
        query = query.contains("compatibility", [...filters.platforms]);
      }
      const { data, error } = await query;
      // console.log(data)
      if (error) {
        throw error;
      }
      return catalogSummarySchema.parse(data);
    },
    initialData,
  });
  const filteredSoftware = useMemo(() => {
    // XXX: it would be better to also have a loading state
    return (software ?? []).sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "upvotes":
          return b.upvotes - a.upvotes;
        case "recent":
          return (
            new Date(b.added_date).getTime() - new Date(a.added_date).getTime()
          );
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [software, sortBy]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const hasActiveFilters =
    filters.platforms.length > 0 ||
    filters.licenses.length > 0 ||
    filters.categories.length > 0 ||
    // !filters.activeStatus ||
    searchQuery.trim().length > 0;

  const sortId = useId();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Browse Software
        </h1>
        <p className="text-slate-600 mb-6">
          Discover amazing free and open-source software for all your needs
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle */}
        <button
          type="button"
          className="lg:hidden flex items-center gap-2 text-slate-700 font-medium mb-4"
          onClick={toggleFilters}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filter panel - hidden on mobile unless toggled */}
        <div
          className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}
        >
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search software..."
              buttonText="Search"
              initialValue={searchParams.get("q") ?? ""}
            />
          </div>

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            setFilters={(newFilters) => {
              setFilters({ ...newFilters });
            }}
          />
        </div>

        {/* Main content */}
        <div className="lg:w-3/4">
          {/* Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center text-slate-600">
              <span className="text-sm font-medium mr-3">
                Showing {filteredSoftware.length} software packages
                {searchQuery && ` for "${searchQuery}"`}
              </span>
              {hasActiveFilters && (
                <button
                  type="reset"
                  onClick={() => {
                    setFilters({
                      platforms: [],
                      licenses: [],
                      categories: [],
                    });
                    setSearchQuery("");
                    // XXX: somehow get the state within SearchBar to be cleared
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor={sortId}
                className="text-sm font-medium text-slate-700"
              >
                Sort by:
              </label>
              <select
                id={sortId}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="upvotes">Most Popular</option>
                <option value="recent">Recently Added</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>

          {/* Software Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSoftware.map((software) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>

          {/* No software found */}
          {filteredSoftware.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No Software Found
              </h3>
              <p className="text-slate-600 mb-6">
                {hasActiveFilters
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "We're working on adding more software to our catalog."}
              </p>
              {hasActiveFilters ? (
                <button
                  type="reset"
                  onClick={() => {
                    setFilters({
                      platforms: [] as string[],
                      licenses: [] as string[],
                      categories: [],
                    });
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Clear All Filters
                </button>
              ) : (
                <a
                  href="/submit"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Submit Software
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
