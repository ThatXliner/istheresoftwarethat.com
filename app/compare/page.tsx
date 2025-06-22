"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Check,
  X,
  Plus,
  Trash2,
  Star,
  Download,
  Globe,
  Github,
  Calendar,
  Award,
  Users,
  Zap,
  Shield,
  Code,
  ExternalLink,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Heart,
  BookOpen,
} from "lucide-react";

// Enhanced mock data for comparison
const mockCompareData = {
  "1": {
    id: "1",
    name: "VS Code",
    shortDescription: "Powerful, lightweight code editor with extensive extension support",
    category: "Development",
    rating: 4.8,
    upvotes: 1250,
    downloads: "50M+",
    license: "MIT",
    version: "1.95.3",
    size: "85.2 MB",
    lastUpdated: "2024-12-15",
    platforms: ["Windows", "macOS", "Linux", "Web"],
    features: [
      "IntelliSense",
      "Debugging",
      "Built-in Git",
      "Extensions",
      "Integrated Terminal",
      "Multi-cursor Editing",
      "Live Share",
      "Code Refactoring"
    ],
    pros: [
      "Excellent extension ecosystem",
      "Fast and lightweight",
      "Great Git integration",
      "Active development"
    ],
    cons: [
      "Can be resource-heavy with many extensions",
      "Learning curve for advanced features"
    ],
    pricing: "Free",
    website: "https://code.visualstudio.com",
    githubUrl: "https://github.com/microsoft/vscode",
    isActive: true,
    communitySize: "Large",
    learningCurve: "Easy",
    performance: "Excellent",
    customization: "High",
    support: "Excellent"
  },
  "2": {
    id: "2",
    name: "GIMP",
    shortDescription: "Professional image editing software with advanced features",
    category: "Design",
    rating: 4.2,
    upvotes: 980,
    downloads: "30M+",
    license: "GPL v3",
    version: "2.10.36",
    size: "200 MB",
    lastUpdated: "2024-11-20",
    platforms: ["Windows", "macOS", "Linux"],
    features: [
      "Advanced Photo Retouching",
      "Layer System",
      "Custom Brushes",
      "Plugin Support",
      "Color Management",
      "Digital Painting",
      "Batch Processing",
      "RAW Support"
    ],
    pros: [
      "Completely free alternative to Photoshop",
      "Powerful editing capabilities",
      "Extensive plugin ecosystem",
      "Cross-platform support"
    ],
    cons: [
      "Steep learning curve",
      "Interface can be overwhelming",
      "Some advanced features missing"
    ],
    pricing: "Free",
    website: "https://www.gimp.org",
    githubUrl: "https://gitlab.gnome.org/GNOME/gimp",
    isActive: true,
    communitySize: "Medium",
    learningCurve: "Hard",
    performance: "Good",
    customization: "High",
    support: "Good"
  },
  "3": {
    id: "3",
    name: "Blender",
    shortDescription: "3D creation suite for modeling, animation, and rendering",
    category: "Media",
    rating: 4.7,
    upvotes: 1420,
    downloads: "25M+",
    license: "GPL v3",
    version: "4.0.2",
    size: "350 MB",
    lastUpdated: "2024-12-01",
    platforms: ["Windows", "macOS", "Linux"],
    features: [
      "3D Modeling",
      "Animation Tools",
      "Rendering Engine",
      "Sculpting",
      "Video Editing",
      "Game Engine",
      "Python Scripting",
      "VR Support"
    ],
    pros: [
      "Industry-standard 3D software",
      "Completely free and open source",
      "Regular updates and improvements",
      "Huge community and tutorials"
    ],
    cons: [
      "Very steep learning curve",
      "Resource intensive",
      "Complex interface for beginners"
    ],
    pricing: "Free",
    website: "https://www.blender.org",
    githubUrl: "https://github.com/blender/blender",
    isActive: true,
    communitySize: "Large",
    learningCurve: "Very Hard",
    performance: "Excellent",
    customization: "Very High",
    support: "Excellent"
  }
};

const allSoftwareOptions = [
  { id: "1", name: "VS Code", description: "Powerful code editor" },
  { id: "2", name: "GIMP", description: "Image editing software" },
  { id: "3", name: "Blender", description: "3D creation suite" },
  { id: "4", name: "LibreOffice", description: "Office suite" },
  { id: "5", name: "Firefox", description: "Web browser" },
  { id: "6", name: "VLC", description: "Media player" },
  { id: "7", name: "Audacity", description: "Audio editor" },
  { id: "8", name: "OBS Studio", description: "Streaming software" },
];

const ComparePage = () => {
  const searchParams = useSearchParams();
  const [compareItems, setCompareItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadInitialCompare = () => {
      const ids = searchParams.getAll("ids");
      if (ids.length === 0) return;

      const items = ids.map(id => mockCompareData[id as keyof typeof mockCompareData]).filter(Boolean);
      setCompareItems(items);
    };

    loadInitialCompare();
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    // Simulate search
    setTimeout(() => {
      const results = allSoftwareOptions.filter(
        item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).filter(item => !compareItems.some(compare => compare.id === item.id));
      
      setSearchResults(results);
      setShowSearchResults(true);
      setIsLoading(false);
    }, 300);
  };

  const addToCompare = (softwareOption: any) => {
    if (compareItems.length >= 3) return;

    const fullSoftware = mockCompareData[softwareOption.id as keyof typeof mockCompareData];
    if (fullSoftware) {
      setCompareItems([...compareItems, fullSoftware]);
    }
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const removeFromCompare = (softwareId: string) => {
    setCompareItems(compareItems.filter(item => item.id !== softwareId));
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case "Excellent": return "text-green-600 bg-green-100";
      case "Very High": return "text-green-600 bg-green-100";
      case "Good": return "text-blue-600 bg-blue-100";
      case "High": return "text-blue-600 bg-blue-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Easy": return "text-green-600 bg-green-100";
      case "Hard": return "text-orange-600 bg-orange-100";
      case "Very Hard": return "text-red-600 bg-red-100";
      case "Large": return "text-green-600 bg-green-100";
      default: return "text-slate-600 bg-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Compare Software
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Make informed decisions by comparing features, performance, and user reviews side by side
            </p>
          </div>

          {/* Add Software Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">
                  Add Software to Compare
                </h2>
                {compareItems.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                    {compareItems.length}/3 selected
                  </span>
                )}
              </div>

              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-32 py-4 text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    placeholder="Search for software to compare..."
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "..." : "Search"}
                  </button>
                </div>

                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg mt-2 z-10 max-h-64 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        className="w-full text-left px-6 py-4 hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors"
                        onClick={() => addToCompare(result)}
                      >
                        <div>
                          <p className="font-medium text-slate-800">{result.name}</p>
                          <p className="text-sm text-slate-600">{result.description}</p>
                        </div>
                        <Plus className="h-5 w-5 text-blue-500" />
                      </button>
                    ))}
                  </div>
                )}
              </form>

              {/* Currently Selected */}
              {compareItems.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Currently Comparing:</h3>
                  <div className="flex flex-wrap gap-3">
                    {compareItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center bg-white rounded-xl pl-4 pr-3 py-3 shadow-sm border border-slate-200"
                      >
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <Code className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-800 mr-3">{item.name}</span>
                        <button
                          className="text-slate-400 hover:text-red-500 transition-colors"
                          onClick={() => removeFromCompare(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {compareItems.length > 0 ? (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {compareItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Code className="w-8 h-8" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-current text-yellow-300" />
                        <span className="font-medium">{item.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                    <p className="text-blue-100 text-sm">{item.shortDescription}</p>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-800">{item.downloads}</div>
                        <div className="text-sm text-slate-600">Downloads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{item.upvotes}</div>
                        <div className="text-sm text-slate-600">Upvotes</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Version</span>
                        <span className="font-medium">{item.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">License</span>
                        <span className="font-medium">{item.license}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Size</span>
                        <span className="font-medium">{item.size}</span>
                      </div>
                    </div>

                    <Link
                      href={`/software/${item.id}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Comparison Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800">Detailed Comparison</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-6 border-b border-slate-200 font-semibold text-slate-800 min-w-48">
                        Feature
                      </th>
                      {compareItems.map((item) => (
                        <th key={item.id} className="p-6 border-b border-slate-200 text-center min-w-64">
                          <div className="flex flex-col items-center">
                            <div className="bg-blue-100 p-2 rounded-lg mb-2">
                              <Code className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="font-bold text-slate-800">{item.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Basic Info */}
                    <tr className="bg-blue-50">
                      <td colSpan={compareItems.length + 1} className="p-4 font-bold text-slate-800 bg-blue-100">
                        📊 Basic Information
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Category</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {item.category}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Rating</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(item.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">{item.rating}</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Last Updated</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          {new Date(item.lastUpdated).toLocaleDateString()}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Active Development</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          {item.isActive ? (
                            <div className="flex items-center justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-2 text-green-600 font-medium">Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <X className="h-5 w-5 text-red-500" />
                              <span className="ml-2 text-red-600 font-medium">Inactive</span>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Platform Support */}
                    <tr className="bg-green-50">
                      <td colSpan={compareItems.length + 1} className="p-4 font-bold text-slate-800 bg-green-100">
                        💻 Platform Support
                      </td>
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Supported Platforms</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {item.platforms.map((platform: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Performance & Usability */}
                    <tr className="bg-purple-50">
                      <td colSpan={compareItems.length + 1} className="p-4 font-bold text-slate-800 bg-purple-100">
                        ⚡ Performance & Usability
                      </td>
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Performance</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(item.performance)}`}>
                            {item.performance}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Learning Curve</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(item.learningCurve)}`}>
                            {item.learningCurve}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Customization</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(item.customization)}`}>
                            {item.customization}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Community Size</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(item.communitySize)}`}>
                            {item.communitySize}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Features */}
                    <tr className="bg-yellow-50">
                      <td colSpan={compareItems.length + 1} className="p-4 font-bold text-slate-800 bg-yellow-100">
                        ✨ Key Features
                      </td>
                    </tr>

                    {/* Generate feature comparison rows */}
                    {Array.from(
                      new Set(
                        compareItems.flatMap((item) => item.features)
                      )
                    ).map((featureTitle, index) => (
                      <tr key={index}>
                        <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">
                          {featureTitle}
                        </td>
                        {compareItems.map((item) => {
                          const hasFeature = item.features.includes(featureTitle);
                          return (
                            <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                              {hasFeature ? (
                                <div className="flex items-center justify-center">
                                  <Check className="h-5 w-5 text-green-500" />
                                </div>
                              ) : (
                                <div className="flex items-center justify-center">
                                  <X className="h-5 w-5 text-slate-300" />
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Pros & Cons */}
                    <tr className="bg-red-50">
                      <td colSpan={compareItems.length + 1} className="p-4 font-bold text-slate-800 bg-red-100">
                        👍 Pros & Cons
                      </td>
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Pros</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200">
                          <ul className="space-y-1 text-sm">
                            {item.pros.map((pro: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Cons</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200">
                          <ul className="space-y-1 text-sm">
                            {item.cons.map((con: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* Links */}
                    <tr className="bg-indigo-50">
                      <td colSpan={compareItems.length + 1} className="p-4 font-bold text-slate-800 bg-indigo-100">
                        🔗 Links & Resources
                      </td>
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Official Website</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Globe className="w-4 h-4 mr-1" />
                            Visit
                          </a>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-6 border-b border-slate-200 font-medium bg-slate-50">Source Code</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-6 border-b border-slate-200 text-center">
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Github className="w-4 h-4 mr-1" />
                            View
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Panel */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Choose?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Based on your comparison, select the software that best fits your needs and start using it today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {compareItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/software/${item.id}`}
                    className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-colors inline-flex items-center"
                  >
                    Choose {item.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Start Your Comparison
                </h3>
                <p className="text-slate-600 mb-6">
                  Add software to compare their features, performance, and user reviews side by side
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Browse Software
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;