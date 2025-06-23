"use client";
import { Check, Plus, Upload, Zap } from "lucide-react";
import { useState } from "react";

const SubmitPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    website: "",
    github: "",
    license: "",
    platforms: [] as string[],
    tags: "",
    submitterName: "",
    submitterEmail: "",
    additionalNotes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    "Development",
    "Design",
    "Communication",
    "Productivity",
    "Media",
    "Security",
    "Utilities",
    "Education",
  ];

  const platforms = ["Windows", "macOS", "Linux", "Web", "Android", "iOS"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformChange = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Submission Received!
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Thank you for contributing to our catalog! We&apos;ll review your
              submission and add it to our database within 2-5 business days.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  category: "",
                  shortDescription: "",
                  longDescription: "",
                  website: "",
                  github: "",
                  license: "",
                  platforms: [],
                  tags: "",
                  submitterName: "",
                  submitterEmail: "",
                  additionalNotes: "",
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center">
            <Plus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">
            Submit Software
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Help grow our catalog by recommending amazing free and open-source
            software. Share the tools that have made a difference in your
            workflow.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Guidelines */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Zap className="w-6 h-6 text-blue-600 mr-3" />
            Submission Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                ✅ We Accept:
              </h3>
              <ul className="text-slate-600 space-y-1">
                <li>• Free and open-source software</li>
                <li>• Actively maintained projects</li>
                <li>• Cross-platform compatibility</li>
                <li>• Well-documented software</li>
                <li>• Community-supported projects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                ❌ We Don&apos;t Accept:
              </h3>
              <ul className="text-slate-600 space-y-1">
                <li>• Paid or commercial software</li>
                <li>• Abandoned or unmaintained projects</li>
                <li>• Malware or suspicious software</li>
                <li>• Duplicate submissions</li>
                <li>• Beta or unstable releases</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submission Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-8">
            Software Information
          </h2>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Software Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., VS Code"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Descriptions */}
          <div className="mb-8">
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Short Description *
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              required
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief one-line description of the software"
              maxLength={150}
            />
            <p className="text-sm text-slate-500 mt-1">
              {formData.shortDescription.length}/150 characters
            </p>
          </div>

          <div className="mb-8">
            <label
              htmlFor="longDescription"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Detailed Description *
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              required
              value={formData.longDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed description of features, use cases, and benefits"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Official Website *
              </label>
              <input
                type="url"
                id="website"
                name="website"
                required
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                GitHub/Source Repository
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          {/* License and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="license"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                License *
              </label>
              <input
                type="text"
                id="license"
                name="license"
                required
                value={formData.license}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., MIT, GPL v3, Apache 2.0"
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="editor, ide, typescript, git (comma-separated)"
              />
            </div>
          </div>

          {/* Platform Support */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-4">
              Supported Platforms *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <label
                  key={platform}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-3"
                  />
                  <span className="text-slate-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submitter Information */}
          <div className="border-t border-slate-200 pt-8 mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">
              Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="submitterName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="submitterName"
                  name="submitterName"
                  value={formData.submitterName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional - for attribution"
                />
              </div>

              <div>
                <label
                  htmlFor="submitterEmail"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="submitterEmail"
                  name="submitterEmail"
                  value={formData.submitterEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional - for follow-up questions"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <label
              htmlFor="additionalNotes"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any additional information about the software or special considerations"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Submit Software
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPage;
