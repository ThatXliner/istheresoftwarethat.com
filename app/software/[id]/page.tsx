"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Globe,
  Github,
  Calendar,
  Award,
  Check,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Download,
  CheckCircle,
  AlertCircle,
  Code,
  Star,
  ExternalLink,
  Users,
  Zap,
  Shield,
  Heart,
  ArrowLeft,
  Copy,
  BookOpen,
  Terminal,
  Smartphone,
  Monitor,
  Laptop,
} from "lucide-react";

// Enhanced mock data for detailed software view
const mockSoftwareDetails = {
  "1": {
    id: "1",
    name: "VS Code",
    shortDescription:
      "Powerful, lightweight code editor with extensive extension support",
    longDescription:
      "Visual Studio Code is a streamlined code editor with support for development operations like debugging, task running, and version control. It aims to provide just the tools a developer needs for a quick code-build-debug cycle and leaves more complex workflows to fuller featured IDEs, such as Visual Studio IDE.",
    category: "Development",
    upvotes: 1250,
    downvotes: 45,
    rating: 4.8,
    totalReviews: 892,
    addedDate: "2025-01-01",
    lastUpdated: "2024-12-15",
    isActive: true,
    license: "MIT",
    version: "1.95.3",
    size: "85.2 MB",
    platforms: ["Windows", "macOS", "Linux", "Web"],
    tags: ["Editor", "IDE", "TypeScript", "JavaScript", "Git", "Extensions"],
    website: "https://code.visualstudio.com",
    githubUrl: "https://github.com/microsoft/vscode",
    downloadUrl: "https://code.visualstudio.com/download",
    documentationUrl: "https://code.visualstudio.com/docs",
    systemRequirements: [
      "1.6 GHz or faster processor",
      "1 GB of RAM",
      "200 MB of available hard disk space",
      "DirectX 9-capable video card running at 1024 x 768 or higher display resolution",
    ],
    features: [
      {
        title: "IntelliSense",
        description:
          "Smart completions based on variable types, function definitions, and imported modules",
        category: "Core",
      },
      {
        title: "Debugging",
        description:
          "Debug code right from the editor with breakpoints, call stacks, and an interactive console",
        category: "Core",
      },
      {
        title: "Built-in Git",
        description:
          "Review diffs, stage files, and make commits right from the editor",
        category: "Version Control",
      },
      {
        title: "Extensions",
        description:
          "Install extensions to add new languages, themes, debuggers, and connect to additional services",
        category: "Extensibility",
      },
      {
        title: "Integrated Terminal",
        description:
          "Use your favorite shell whether it's zsh, pwsh, or git bash, all inside the editor",
        category: "Terminal",
      },
      {
        title: "Multi-cursor Editing",
        description: "Edit multiple lines at once with multiple cursors",
        category: "Editing",
      },
    ],
    installationInstructions: {
      windows:
        "Download the installer from the official website and run the .exe file. Follow the installation wizard.",
      macos:
        "Download the .dmg file and drag VS Code to your Applications folder, or install via Homebrew: brew install --cask visual-studio-code",
      linux:
        "Download the .deb or .rpm package, or use Snap: sudo snap install code --classic",
    },
    reviews: [
      {
        id: "1",
        username: "DevMaster2024",
        avatar: "DM",
        date: "2024-12-10",
        comment:
          "Absolutely love VS Code! The extension ecosystem is incredible and it handles large codebases with ease. The integrated terminal and Git support make it my go-to editor.",
        isUpvote: true,
        rating: 5,
        helpful: 24,
      },
      {
        id: "2",
        username: "CodeNinja",
        avatar: "CN",
        date: "2024-12-08",
        comment:
          "Great editor but can be resource-heavy with too many extensions. The debugging features are top-notch though.",
        isUpvote: true,
        rating: 4,
        helpful: 12,
      },
      {
        id: "3",
        username: "WebDevPro",
        avatar: "WP",
        date: "2024-12-05",
        comment:
          "Perfect for web development. The live server extension and Emmet support make HTML/CSS development a breeze.",
        isUpvote: true,
        rating: 5,
        helpful: 18,
      },
    ],
    screenshots: [
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    alternatives: [
      { id: "2", name: "Sublime Text", reason: "Faster startup time" },
      { id: "3", name: "Atom", reason: "More customizable" },
      { id: "4", name: "IntelliJ IDEA", reason: "Better for Java development" },
    ],
    stats: {
      downloads: "50M+",
      githubStars: "162k",
      contributors: "1.9k",
      issues: "5.2k",
    },
  },
  "2": {
    id: "2",
    name: "GIMP",
    shortDescription:
      "Professional image editing software with advanced features",
    longDescription:
      "GIMP is a cross-platform image editor available for GNU/Linux, macOS, and Windows. It is free software, you can change its source code and distribute your changes. Whether you are a graphic designer, photographer, illustrator, or scientist, GIMP provides you with sophisticated tools to get your job done.",
    category: "Design",
    upvotes: 980,
    downvotes: 120,
    rating: 4.2,
    totalReviews: 456,
    addedDate: "2025-01-01",
    lastUpdated: "2024-11-20",
    isActive: true,
    license: "GPL v3",
    version: "2.10.36",
    size: "200 MB",
    platforms: ["Windows", "macOS", "Linux"],
    tags: [
      "Image Editor",
      "Graphics",
      "Photo Editing",
      "Design",
      "Open Source",
    ],
    website: "https://www.gimp.org",
    githubUrl: "https://gitlab.gnome.org/GNOME/gimp",
    downloadUrl: "https://www.gimp.org/downloads/",
    documentationUrl: "https://docs.gimp.org/",
    systemRequirements: [
      "2 GB of RAM minimum, 4 GB recommended",
      "1 GB of available hard disk space",
      "1024x768 display resolution minimum",
      "Graphics card with OpenGL support recommended",
    ],
    features: [
      {
        title: "Advanced Photo Retouching",
        description:
          "Restore old photographs or touch-up digital images with professional tools",
        category: "Photo Editing",
      },
      {
        title: "Layer System",
        description:
          "Work with multiple layers for complex compositions and non-destructive editing",
        category: "Core",
      },
      {
        title: "Custom Brushes",
        description:
          "Create and use custom brushes for unique artistic effects",
        category: "Painting",
      },
      {
        title: "Plugin Support",
        description:
          "Extend functionality with third-party plugins and scripts",
        category: "Extensibility",
      },
    ],
    installationInstructions: {
      windows:
        "Download the installer from gimp.org and run the setup file. Follow the installation wizard.",
      macos:
        "Download the DMG file and drag GIMP to Applications, or use Homebrew: brew install --cask gimp",
      linux:
        "Install via package manager: sudo apt install gimp (Ubuntu/Debian) or sudo dnf install gimp (Fedora)",
    },
    reviews: [
      {
        id: "1",
        username: "DesignGuru",
        avatar: "DG",
        date: "2024-12-12",
        comment:
          "Powerful alternative to Photoshop! Takes some time to learn the interface, but once you do, it's incredibly capable.",
        isUpvote: true,
        rating: 4,
        helpful: 15,
      },
    ],
    screenshots: [
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    alternatives: [
      { id: "1", name: "Photoshop", reason: "Industry standard" },
      { id: "3", name: "Krita", reason: "Better for digital painting" },
    ],
    stats: {
      downloads: "30M+",
      githubStars: "4.2k",
      contributors: "500+",
      issues: "2.1k",
    },
  },
};

const SoftwareDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [software, setSoftware] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      console.log(id);
      const mockData =
        mockSoftwareDetails[id as keyof typeof mockSoftwareDetails];
      setSoftware(mockData || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading software details...</p>
        </div>
      </div>
    );
  }

  if (!software) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Software Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            The software you're looking for doesn't exist or has been removed
            from our catalog.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Browse Software
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-start justify-between mb-6">
            <Link
              href="/search"
              className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Browse
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                  <Code className="w-12 h-12 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-4xl font-bold text-slate-800">
                      {software.name}
                    </h1>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      v{software.version}
                    </span>
                  </div>

                  <p className="text-xl text-slate-600 mb-4">
                    {software.shortDescription}
                  </p>

                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(software.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-slate-700 font-medium">
                        {software.rating}
                      </span>
                      <span className="text-slate-500">
                        ({software.totalReviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-green-600">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-medium">{software.upvotes}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {software.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <div className="space-y-4">
                  <a
                    href={software.downloadUrl}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
                        isBookmarked
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
                      />
                      {isBookmarked ? "Saved" : "Save"}
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center justify-center py-3 px-4 rounded-lg font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Downloads</span>
                      <span className="font-medium text-slate-800">
                        {software.stats.downloads}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">GitHub Stars</span>
                      <span className="font-medium text-slate-800">
                        {software.stats.githubStars}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">License</span>
                      <span className="font-medium text-slate-800">
                        {software.license}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Size</span>
                      <span className="font-medium text-slate-800">
                        {software.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Platform Support */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Supported Platforms
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {software.platforms.map(
                      (platform: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm text-slate-700"
                        >
                          {platform === "Windows" && (
                            <Monitor className="w-4 h-4" />
                          )}
                          {platform === "macOS" && (
                            <Laptop className="w-4 h-4" />
                          )}
                          {platform === "Linux" && (
                            <Terminal className="w-4 h-4" />
                          )}
                          {platform === "Web" && <Globe className="w-4 h-4" />}
                          {platform === "Mobile" && (
                            <Smartphone className="w-4 h-4" />
                          )}
                          <span>{platform}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="border-b border-slate-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "overview", label: "Overview", icon: BookOpen },
                    { id: "features", label: "Features", icon: Zap },
                    {
                      id: "installation",
                      label: "Installation",
                      icon: Terminal,
                    },
                    { id: "reviews", label: "Reviews", icon: Users },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 font-medium transition-colors border-b-2 ${
                        activeTab === tab.id
                          ? "text-blue-600 border-blue-600"
                          : "text-slate-600 border-transparent hover:text-slate-800"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        About {software.name}
                      </h2>
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {software.longDescription}
                      </p>
                    </div>

                    {software.screenshots &&
                      software.screenshots.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-4">
                            Screenshots
                          </h3>
                          <div className="space-y-4">
                            <div className="relative">
                              <img
                                src={software.screenshots[activeScreenshot]}
                                alt={`${software.name} screenshot ${activeScreenshot + 1}`}
                                className="w-full h-96 object-cover rounded-xl shadow-lg"
                              />
                            </div>
                            {software.screenshots.length > 1 && (
                              <div className="flex space-x-2">
                                {software.screenshots.map(
                                  (_: any, index: number) => (
                                    <button
                                      key={index}
                                      onClick={() => setActiveScreenshot(index)}
                                      className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                                        activeScreenshot === index
                                          ? "border-blue-500"
                                          : "border-slate-200 hover:border-slate-300"
                                      }`}
                                    >
                                      <img
                                        src={software.screenshots[index]}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </button>
                                  ),
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">
                        System Requirements
                      </h3>
                      <ul className="space-y-2">
                        {software.systemRequirements.map(
                          (req: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-700">{req}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "features" && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                      Key Features
                    </h2>
                    <div className="grid gap-6">
                      {software.features.map((feature: any, index: number) => (
                        <div
                          key={index}
                          className="bg-slate-50 rounded-xl p-6 border border-slate-100"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Zap className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-slate-800">
                                  {feature.title}
                                </h3>
                                {feature.category && (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {feature.category}
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-600">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "installation" && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                      Installation Instructions
                    </h2>
                    <div className="space-y-6">
                      {Object.entries(software.installationInstructions).map(
                        ([platform, instructions]) => (
                          <div
                            key={platform}
                            className="bg-slate-50 rounded-xl p-6 border border-slate-100"
                          >
                            <div className="flex items-center space-x-3 mb-4">
                              {platform === "windows" && (
                                <Monitor className="w-6 h-6 text-blue-600" />
                              )}
                              {platform === "macos" && (
                                <Laptop className="w-6 h-6 text-slate-600" />
                              )}
                              {platform === "linux" && (
                                <Terminal className="w-6 h-6 text-orange-600" />
                              )}
                              <h3 className="text-lg font-semibold text-slate-800 capitalize">
                                {platform}
                              </h3>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-4">
                              <code className="text-green-400 text-sm font-mono">
                                {instructions}
                              </code>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">
                        User Reviews
                      </h2>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Write Review
                      </button>
                    </div>

                    <div className="space-y-6">
                      {software.reviews.map((review: any) => (
                        <div
                          key={review.id}
                          className="bg-slate-50 rounded-xl p-6 border border-slate-100"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <h4 className="font-semibold text-slate-800">
                                    {review.username}
                                  </h4>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? "text-yellow-400 fill-current"
                                            : "text-slate-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-sm text-slate-500">
                                  {review.date}
                                </span>
                              </div>
                              <p className="text-slate-700 mb-3">
                                {review.comment}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <button className="flex items-center space-x-1 hover:text-slate-700 transition-colors">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                                <button className="hover:text-slate-700 transition-colors">
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Links
              </h3>
              <div className="space-y-3">
                <a
                  href={software.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Official Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={software.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>Source Code</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={software.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Documentation</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Alternatives */}
            {software.alternatives && software.alternatives.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Similar Software
                </h3>
                <div className="space-y-3">
                  {software.alternatives.map((alt: any, index: number) => (
                    <Link
                      key={index}
                      href={`/software/${alt.id}`}
                      className="block p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-slate-100 p-2 rounded-lg">
                          <Code className="w-4 h-4 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">
                            {alt.name}
                          </h4>
                          <p className="text-sm text-slate-600">{alt.reason}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">
                Share {software.name}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 bg-transparent text-slate-700 text-sm"
                />
                <button
                  onClick={() => copyToClipboard(window.location.href)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <span>Twitter</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftwareDetailsPage;
