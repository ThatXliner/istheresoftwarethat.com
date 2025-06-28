/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/performance/noImgElement: can't deal with it for now */
"use client";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Code,
  Copy,
  Download,
  ExternalLink,
  Github,
  Globe,
  Heart,
  InfoIcon,
  Laptop,
  Monitor,
  Share2,
  Smartphone,
  Star,
  Terminal,
  ThumbsUp,
  Users,
  Zap,
} from "lucide-react";
import millify from "millify";
import Link from "next/link";
import prettyBytes from "pretty-bytes";
import { useState } from "react";
import type { Feature, Review, Software } from "@/lib/components/common/data";

export default function DetailsComponent({
  software,
}: {
  software: Software | null;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

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
            The software you&apos;re looking for doesn&apos;t exist or has been
            removed from our catalog.
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

  const averageStars =
    software.reviews.reduce(
      (acc, review: Review) => acc + (review?.stars ?? 0),
      0,
    ) / software.reviews.filter((review) => review.stars !== null).length;

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
                    {software.other_details.short_description}
                  </p>

                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(averageStars)
                                ? "text-yellow-400 fill-current"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-slate-700 font-medium">
                        {averageStars.toPrecision(2)}
                      </span>
                      <span className="text-slate-500">
                        ({software.reviews.length} reviews)
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-green-600">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-medium">
                        {
                          software.reviews.filter(
                            (review) => review.is_upvote === true,
                          ).length
                        }
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {software.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
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
                      type="Button"
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
                        {software.other_details.long_description}
                      </p>
                    </div>

                    {software.other_details.screenshots &&
                      software.other_details.screenshots.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-4">
                            Screenshots
                          </h3>
                          <div className="space-y-4">
                            <div className="relative">
                              <img
                                src={
                                  software.other_details.screenshots[
                                    activeScreenshot
                                  ]
                                }
                                alt={`${software.name} screenshot ${activeScreenshot + 1}`}
                                className="w-full h-96 object-cover rounded-xl shadow-lg"
                              />
                            </div>
                            {software.other_details.screenshots &&
                              software.other_details.screenshots.length > 1 && (
                                <div className="flex space-x-2">
                                  {software.other_details.screenshots.map(
                                    (screenshot, index) => (
                                      <button
                                        key={screenshot}
                                        type="button"
                                        onClick={() =>
                                          setActiveScreenshot(index)
                                        }
                                        className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                                          activeScreenshot === index
                                            ? "border-blue-500"
                                            : "border-slate-200 hover:border-slate-300"
                                        }`}
                                      >
                                        <img
                                          src={
                                            (
                                              software.other_details
                                                .screenshots as string[]
                                            )[index]
                                          }
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

                    {/* <div>
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
                    </div> */}
                  </div>
                )}

                {activeTab === "features" && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                      Key Features
                    </h2>
                    <div className="grid gap-6">
                      {software.other_details.features?.map(
                        (feature: Feature) => (
                          <div
                            key={feature.title}
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
                        ),
                      ) ?? <p>No features</p>}
                    </div>
                  </div>
                )}

                {activeTab === "installation" && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                      Installation Instructions
                    </h2>
                    <div className="space-y-6">
                      {software.other_details.installation_instructions
                        ? Object.entries(
                            software.other_details.installation_instructions[
                              navigator.platform.toLowerCase().includes("mac")
                                ? "macos"
                                : navigator.platform
                                      .toLowerCase()
                                      .includes("win")
                                  ? "windows"
                                  : "linux"
                            ],
                          ).map(([platform, instructions]) => (
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
                          ))
                        : "None found"}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">
                        User Reviews
                      </h2>
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Write Review
                      </button>
                    </div>

                    <div className="space-y-6">
                      {software.reviews.map(
                        (review: Review) =>
                          review.type !== "upvote" && (
                            <div
                              key={review.username}
                              className="bg-slate-50 rounded-xl p-6 border border-slate-100"
                            >
                              <div className="flex items-start space-x-4">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold">
                                  {review?.avatar}
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
                                              i < review.stars
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
                                      <span>
                                        Helpful ({review.helpful_count})
                                      </span>
                                    </button>
                                    <button className="hover:text-slate-700 transition-colors">
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Action Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <div className="space-y-4">
                  <a
                    href={software.other_details.links?.download}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
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
                      type="button"
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
                        {millify(software.stats.downloads)}
                      </span>
                    </div>
                    {software.stats.github_stars !== null && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">GitHub Stars</span>
                        <span className="font-medium text-slate-800">
                          {millify(software.stats.github_stars)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between group relative">
                      <span className="text-slate-600">License</span>
                      <div className="flex items-center">
                        <span className="font-medium text-slate-800">
                          {software.license}
                        </span>
                        <div className="relative">
                          <InfoIcon className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
                          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="mb-2">
                              Click to learn more about this license&apos;s:
                            </p>
                            <ul className="list-disc pl-4">
                              <li>Permissions</li>
                              <li>Conditions</li>
                              <li>Limitations</li>
                            </ul>
                            <a
                              href={`https://opensource.org/licenses/${software.license}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300 hover:text-blue-200 mt-2 inline-block"
                            >
                              View OSI License Details →
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">License</span>
                      <span className="font-medium text-slate-800">
                        {software.license}
                      </span>
                    </div>
                    {software.size !== null && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Size</span>
                        <span className="font-medium text-slate-800">
                          {prettyBytes(software.size)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Platform Support */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Supported Platforms
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(software.compatibility).map(
                      (platform: string) => (
                        <div
                          key={platform}
                          className="flex items-center space-x-2 text-sm text-slate-700"
                        >
                          {platform === "windows" && (
                            <Monitor className="w-4 h-4" />
                          )}
                          {platform === "macos" && (
                            <Laptop className="w-4 h-4" />
                          )}
                          {platform === "linux" && (
                            <Terminal className="w-4 h-4" />
                          )}
                          {platform === "web" && <Globe className="w-4 h-4" />}
                          {platform === "mobile" && (
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
            {/* Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Links
              </h3>
              <div className="space-y-3">
                <a
                  href={software.other_details.links?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Official Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                {software.other_details.links?.github && (
                  <a
                    href={software.other_details.links?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>Source Code</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {software.other_details.links?.documentation && (
                  <a
                    href={software.other_details.links?.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Documentation</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Alternatives
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
            )} */}
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
}
