import { useNavigate } from "react-router-dom";
import { Search, Sparkles, Database, GitCompare } from "lucide-react";
import SearchBar from "../components/search/SearchBar";
import CategoryList from "../components/categories/CategoryList";
import FeaturedSoftware from "../components/software/FeaturedSoftware";
import RecentAdditions from "../components/software/RecentAdditions";
import SubmitBanner from "../components/common/SubmitBanner";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-16 text-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 md:text-5xl lg:text-6xl">
            Is There Software That...
          </h1>
          <p className="text-slate-600 text-lg mb-8 md:text-xl">
            Discover the perfect free and open-source software for your needs
          </p>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Describe what you're looking for..."
            buttonText="Find Software"
          />
          <div className="mt-6 text-sm text-slate-500">
            Try: "helps me edit videos" or "lets me design websites without
            coding"
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Search className="w-8 h-8 text-blue-500" />}
            title="Semantic Search"
            description="Describe what you need in plain English and we'll find the right software"
          />
          <FeatureCard
            icon={<Database className="w-8 h-8 text-blue-500" />}
            title="Comprehensive Catalog"
            description="Browse our extensive collection of free and open-source software"
          />
          <FeatureCard
            icon={<GitCompare className="w-8 h-8 text-blue-500" />}
            title="Compare Tools"
            description="Side-by-side comparison to find the best fit for your needs"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-blue-500" />}
            title="Community Powered"
            description="Recommendations and reviews from real users like you"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          Browse By Category
        </h2>
        <CategoryList />
      </section>

      {/* Featured Software */}
      <section className="px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          Featured Software
        </h2>
        <FeaturedSoftware />
      </section>

      {/* Recent Additions */}
      <section className="px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          Recently Added
        </h2>
        <RecentAdditions />
      </section>

      {/* Submit Banner */}
      <SubmitBanner />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

export default HomePage;
