import { Award, Code, FileText, Scale } from "lucide-react";
import Link from "next/link";

const LicensesPage = () => {
  const licenses = [
    {
      name: "MIT License",
      description: "A permissive license that allows commercial use, modification, and distribution with minimal restrictions.",
      permissions: ["Commercial use", "Modification", "Distribution", "Private use"],
      conditions: ["License and copyright notice"],
      limitations: ["Liability", "Warranty"],
      popularity: "Very High",
      examples: ["React", "jQuery", "Bootstrap", "VS Code"]
    },
    {
      name: "GNU GPL v3",
      description: "A copyleft license that requires derivative works to be open source under the same license.",
      permissions: ["Commercial use", "Modification", "Distribution", "Patent use"],
      conditions: ["License and copyright notice", "State changes", "Disclose source", "Same license"],
      limitations: ["Liability", "Warranty"],
      popularity: "High",
      examples: ["Linux Kernel", "GIMP", "Blender", "WordPress"]
    },
    {
      name: "Apache 2.0",
      description: "A permissive license that provides patent protection and requires preservation of copyright notices.",
      permissions: ["Commercial use", "Modification", "Distribution", "Patent use", "Private use"],
      conditions: ["License and copyright notice", "State changes"],
      limitations: ["Liability", "Trademark use", "Warranty"],
      popularity: "High",
      examples: ["Android", "Apache HTTP Server", "Kubernetes", "TensorFlow"]
    },
    {
      name: "BSD 3-Clause",
      description: "A permissive license similar to MIT but with an additional clause about endorsement.",
      permissions: ["Commercial use", "Modification", "Distribution", "Private use"],
      conditions: ["License and copyright notice"],
      limitations: ["Liability", "Warranty", "Endorsement"],
      popularity: "Medium",
      examples: ["FreeBSD", "Django", "Flask", "Nginx"]
    },
    {
      name: "GNU LGPL v3",
      description: "A copyleft license that allows linking with proprietary software while keeping the library open source.",
      permissions: ["Commercial use", "Modification", "Distribution", "Patent use"],
      conditions: ["License and copyright notice", "Disclose source", "Same license (library)"],
      limitations: ["Liability", "Warranty"],
      popularity: "Medium",
      examples: ["GTK", "Qt (some versions)", "FFmpeg", "GStreamer"]
    },
    {
      name: "Mozilla Public License 2.0",
      description: "A copyleft license that allows mixing with proprietary code while keeping MPL-licensed files open.",
      permissions: ["Commercial use", "Modification", "Distribution", "Patent use", "Private use"],
      conditions: ["License and copyright notice", "Disclose source"],
      limitations: ["Liability", "Trademark use", "Warranty"],
      popularity: "Medium",
      examples: ["Firefox", "Thunderbird", "LibreOffice", "VLC"]
    }
  ];

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "Very High":
        return "bg-green-100 text-green-800";
      case "High":
        return "bg-blue-100 text-blue-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">
            Open Source Licenses Guide
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Understanding open source licenses is crucial for choosing the right software for your projects. 
            Learn about the most common licenses and what they mean for you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-3" />
            Why Licenses Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-xl w-fit mx-auto mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Legal Clarity</h3>
              <p className="text-slate-600 text-sm">
                Licenses define what you can and cannot do with the software legally.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-xl w-fit mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Commercial Use</h3>
              <p className="text-slate-600 text-sm">
                Some licenses allow commercial use, while others have restrictions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-xl w-fit mx-auto mb-4">
                <Scale className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Obligations</h3>
              <p className="text-slate-600 text-sm">
                Understanding your obligations when using or modifying the software.
              </p>
            </div>
          </div>
        </div>

        {/* License Types Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">License Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Permissive Licenses</h3>
              <p className="text-slate-600 mb-4">
                Allow maximum freedom with minimal restrictions. You can use, modify, and distribute 
                the software with few obligations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">MIT</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Apache 2.0</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">BSD</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Copyleft Licenses</h3>
              <p className="text-slate-600 mb-4">
                Require derivative works to be released under the same license, ensuring the software 
                remains open source.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">GPL v3</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">LGPL v3</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">MPL 2.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* License Details */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Popular Open Source Licenses</h2>
          
          {licenses.map((license, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{license.name}</h3>
                    <p className="text-slate-600 leading-relaxed">{license.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPopularityColor(license.popularity)}`}>
                    {license.popularity} Usage
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Permissions */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <div className="bg-green-100 p-1 rounded mr-2">
                        <Award className="w-4 h-4 text-green-600" />
                      </div>
                      Permissions
                    </h4>
                    <ul className="space-y-2">
                      {license.permissions.map((permission, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Conditions */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <div className="bg-blue-100 p-1 rounded mr-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      Conditions
                    </h4>
                    <ul className="space-y-2">
                      {license.conditions.map((condition, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <div className="bg-red-100 p-1 rounded mr-2">
                        <Scale className="w-4 h-4 text-red-600" />
                      </div>
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {license.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Examples */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Popular Software Using This License</h4>
                  <div className="flex flex-wrap gap-2">
                    {license.examples.map((example, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Choosing a License */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">How to Choose the Right License</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">For Users</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span><strong>Commercial Use:</strong> Check if the license allows commercial use if you plan to use the software in a business context.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span><strong>Modification:</strong> Consider whether you need to modify the software and what obligations that creates.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span><strong>Distribution:</strong> If you plan to distribute the software, understand your obligations.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span><strong>Compatibility:</strong> Ensure the license is compatible with other software you're using.</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">For Developers</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span><strong>Project Goals:</strong> Choose based on whether you want to keep derivatives open source (copyleft) or allow proprietary use (permissive).</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span><strong>Community:</strong> Consider what license will attract the community you want.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span><strong>Patent Protection:</strong> Some licenses provide explicit patent protection.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span><strong>Simplicity:</strong> Simpler licenses like MIT are easier to understand and comply with.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              For detailed legal advice about software licenses, consult with a qualified attorney. 
              This guide provides general information only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://choosealicense.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Choose a License
              </a>
              <Link
                href="/contact"
                className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensesPage;