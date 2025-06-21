import { useEffect, useState } from "react";
import { useSoftware, useUser } from "@/lib/contexts";
import type { Software } from "@/lib/components/common/data";
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
  Server,
  CheckCircle,
  AlertCircle,
  Code,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const SoftwareDetailsPage = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const { getSoftwareById, addToBookmarks, upvoteSoftware, downvoteSoftware } =
    useSoftware();
  const { isLoggedIn } = useUser();
  const [software, setSoftware] = useState<Software | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [voteReason, setVoteReason] = useState("");
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voteType, setVoteType] = useState<"up" | "down" | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchSoftware = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const data = await getSoftwareById(id);
        setSoftware(data);
        // Check if software is already bookmarked by the user
        setIsBookmarked(data.isBookmarked || false);
      } catch (error) {
        console.error("Error fetching software details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSoftware();
  }, [id, getSoftwareById]);

  const handleVote = (type: "up" | "down") => {
    if (!isLoggedIn) {
      // Handle login prompt
      return;
    }

    setVoteType(type);
    setShowVoteModal(true);
  };

  const submitVote = async () => {
    if (!software || !voteType || !voteReason.trim()) return;

    try {
      if (voteType === "up") {
        await upvoteSoftware(software.id, voteReason);
      } else {
        await downvoteSoftware(software.id, voteReason);
      }

      // Update the UI accordingly
      const updatedSoftware = await getSoftwareById(software.id);
      setSoftware(updatedSoftware);

      // Close modal and reset state
      setShowVoteModal(false);
      setVoteReason("");
      setVoteType(null);
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const handleBookmark = async () => {
    if (!software || !isLoggedIn) return;

    try {
      await addToBookmarks(software.id);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error bookmarking software:", error);
    }
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Show toast notification
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!software) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Software Not Found
        </h2>
        <p className="text-slate-600 mb-6">
          The software you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Code className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {software.name}
              </h1>
              <p className="text-slate-600">{software.shortDescription}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              className={`flex items-center gap-1 px-3 py-2 rounded-md ${isBookmarked ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-700"} hover:bg-blue-100 transition-colors`}
              onClick={handleBookmark}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>

            <button
              className="flex items-center gap-1 px-3 py-2 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              onClick={shareLink}
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatusCard
            icon={<Calendar className="w-4 h-4 text-slate-500" />}
            label="Last Updated"
            value={new Date(software.lastUpdated).toLocaleDateString()}
          />

          <StatusCard
            icon={<Award className="w-4 h-4 text-slate-500" />}
            label="License"
            value={software.license}
          />

          <StatusCard
            icon={
              software.isActive ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )
            }
            label="Status"
            value={
              software.isActive ? "Active Development" : "Maintenance Only"
            }
          />

          <StatusCard
            icon={<ThumbsUp className="w-4 h-4 text-blue-500" />}
            label="Upvotes"
            value={software.upvotes.toString()}
          />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-2/3">
          <nav className="border-b border-slate-200 mb-6">
            <ul className="flex space-x-8">
              <TabButton
                isActive={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                label="Overview"
              />
              <TabButton
                isActive={activeTab === "features"}
                onClick={() => setActiveTab("features")}
                label="Features"
              />
              <TabButton
                isActive={activeTab === "installation"}
                onClick={() => setActiveTab("installation")}
                label="Installation"
              />
              <TabButton
                isActive={activeTab === "reviews"}
                onClick={() => setActiveTab("reviews")}
                label="Reviews"
              />
            </ul>
          </nav>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                  About {software.name}
                </h2>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {software.longDescription}
                </p>

                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  System Requirements
                </h3>
                <ul className="mb-6 space-y-2">
                  {software.systemRequirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{req}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Platforms
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {software.platforms.map((platform, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                  Key Features
                </h2>
                <ul className="space-y-4">
                  {software.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {feature.title}
                        </h4>
                        <p className="text-slate-600">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "installation" && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                  Installation Instructions
                </h2>
                <div className="bg-slate-50 p-4 rounded-md mb-6">
                  <pre className="whitespace-pre-wrap text-slate-700 font-mono text-sm">
                    {software.installationInstructions}
                  </pre>
                </div>

                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  System Requirements
                </h3>
                <ul className="mb-6 space-y-2">
                  {software.systemRequirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <Server className="w-5 h-5 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">
                    User Reviews
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      onClick={() => handleVote("up")}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Upvote</span>
                    </button>

                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                      onClick={() => handleVote("down")}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>Downvote</span>
                    </button>
                  </div>
                </div>

                {software.reviews.length > 0 ? (
                  <ul className="space-y-6">
                    {software.reviews.map((review, index) => (
                      <li
                        key={index}
                        className="border-b border-slate-100 pb-6"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-medium">
                                {review.username.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">
                                {review.username}
                              </p>
                              <p className="text-sm text-slate-500">
                                {new Date(review.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center ${review.isUpvote ? "text-green-500" : "text-red-500"}`}
                          >
                            {review.isUpvote ? (
                              <ThumbsUp className="w-4 h-4 mr-1" />
                            ) : (
                              <ThumbsDown className="w-4 h-4 mr-1" />
                            )}
                            <span>
                              {review.isUpvote ? "Upvoted" : "Downvoted"}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-700">{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-lg">
                    <p className="text-slate-600 mb-2">No reviews yet.</p>
                    <p className="text-slate-700 font-medium">
                      Be the first to share your experience!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <aside className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={software.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <Globe className="w-5 h-5 mr-3 text-slate-500" />
                  <span>Official Website</span>
                </a>
              </li>
              <li>
                <a
                  href={software.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <Github className="w-5 h-5 mr-3 text-slate-500" />
                  <span>Source Code</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {software.categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/search?category=${category}`}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm hover:bg-slate-200 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Similar Software
            </h3>
            {software.similar.length > 0 ? (
              <ul className="space-y-4">
                {software.similar.map((sim, index) => (
                  <li key={index}>
                    <Link
                      to={`/software/${sim.id}`}
                      className="flex items-start hover:bg-slate-50 p-2 rounded-md transition-colors"
                    >
                      <div className="bg-blue-100 p-2 rounded-md mr-3">
                        <Code className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">
                          {sim.name}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {sim.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600">No similar software found.</p>
            )}
          </div>
        </aside>
      </div>

      {/* Vote Modal */}
      {showVoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              {voteType === "up"
                ? "Why do you recommend this?"
                : "Why do you not recommend this?"}
            </h3>
            <textarea
              className="w-full border border-slate-300 rounded-md p-3 mb-4 h-32"
              placeholder="Please provide a reason for your vote..."
              value={voteReason}
              onChange={(e) => setVoteReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setShowVoteModal(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded-md transition-colors ${
                  voteReason.trim()
                    ? voteType === "up"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                    : "bg-slate-400 cursor-not-allowed"
                }`}
                onClick={submitVote}
                disabled={!voteReason.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatusCard = ({ icon, label, value }: StatusCardProps) => (
  <div className="bg-white p-3 rounded-lg shadow-sm">
    <div className="flex items-center mb-1">
      {icon}
      <span className="text-xs text-slate-500 ml-1">{label}</span>
    </div>
    <div className="font-medium text-slate-800">{value}</div>
  </div>
);

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton = ({ isActive, onClick, label }: TabButtonProps) => (
  <li>
    <button
      className={`py-3 font-medium ${
        isActive
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-slate-600 hover:text-slate-800"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  </li>
);

export default SoftwareDetailsPage;
