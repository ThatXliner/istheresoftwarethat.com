import { Cookie, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CookiesPage = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    analytics: true,
    functional: true,
    advertising: false
  });

  const togglePreference = (type: keyof typeof cookiePreferences) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    // Here you would typically save preferences to localStorage or send to server
    console.log('Saving cookie preferences:', cookiePreferences);
    alert('Cookie preferences saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Learn about how we use cookies and similar technologies to enhance your 
            experience on IsThereSoftwareThat.com and how you can control them.
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Last updated: January 15, 2025
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Cookie Preferences Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Settings className="w-6 h-6 text-blue-600 mr-3" />
            Cookie Preferences
          </h2>
          <p className="text-slate-600 mb-6">
            Manage your cookie preferences below. You can enable or disable different types of cookies, 
            except for essential cookies which are required for the website to function properly.
          </p>
          
          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Essential Cookies</h3>
                <p className="text-slate-600 text-sm">
                  These cookies are necessary for the website to function and cannot be disabled. 
                  They include authentication, security, and basic functionality cookies.
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <span className="text-sm text-slate-500 mr-2">Always On</span>
                <div className="bg-green-500 p-1 rounded-full">
                  <ToggleRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Analytics Cookies</h3>
                <p className="text-slate-600 text-sm">
                  These cookies help us understand how visitors interact with our website by 
                  collecting and reporting information anonymously.
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <button
                  onClick={() => togglePreference('analytics')}
                  className="flex items-center"
                >
                  <span className="text-sm text-slate-500 mr-2">
                    {cookiePreferences.analytics ? 'Enabled' : 'Disabled'}
                  </span>
                  <div className={`p-1 rounded-full ${cookiePreferences.analytics ? 'bg-green-500' : 'bg-slate-400'}`}>
                    {cookiePreferences.analytics ? (
                      <ToggleRight className="w-6 h-6 text-white" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Functional Cookies</h3>
                <p className="text-slate-600 text-sm">
                  These cookies enable enhanced functionality and personalization, such as 
                  remembering your preferences and providing personalized content.
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <button
                  onClick={() => togglePreference('functional')}
                  className="flex items-center"
                >
                  <span className="text-sm text-slate-500 mr-2">
                    {cookiePreferences.functional ? 'Enabled' : 'Disabled'}
                  </span>
                  <div className={`p-1 rounded-full ${cookiePreferences.functional ? 'bg-green-500' : 'bg-slate-400'}`}>
                    {cookiePreferences.functional ? (
                      <ToggleRight className="w-6 h-6 text-white" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Advertising Cookies */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Advertising Cookies</h3>
                <p className="text-slate-600 text-sm">
                  These cookies are used to make advertising messages more relevant to you and 
                  may be set by third-party advertising partners.
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <button
                  onClick={() => togglePreference('advertising')}
                  className="flex items-center"
                >
                  <span className="text-sm text-slate-500 mr-2">
                    {cookiePreferences.advertising ? 'Enabled' : 'Disabled'}
                  </span>
                  <div className={`p-1 rounded-full ${cookiePreferences.advertising ? 'bg-green-500' : 'bg-slate-400'}`}>
                    {cookiePreferences.advertising ? (
                      <ToggleRight className="w-6 h-6 text-white" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={savePreferences}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Cookie Policy Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="prose prose-slate max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">What Are Cookies?</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Cookies are small text files that are stored on your device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Cookies can be "persistent" (remain on your device until deleted) or "session" cookies 
                (deleted when you close your browser). They can also be "first-party" (set by our website) 
                or "third-party" (set by other websites).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">How We Use Cookies</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We use cookies for several purposes to enhance your experience on our website:
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Essential Cookies</h3>
              <p className="text-slate-700 leading-relaxed mb-2">
                These cookies are strictly necessary for our website to function properly:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Authentication:</strong> Keep you logged in to your account</li>
                <li><strong>Security:</strong> Protect against cross-site request forgery attacks</li>
                <li><strong>Session Management:</strong> Maintain your session state across pages</li>
                <li><strong>Load Balancing:</strong> Distribute traffic across our servers</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Analytics Cookies</h3>
              <p className="text-slate-700 leading-relaxed mb-2">
                These cookies help us understand how our website is being used:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Usage Statistics:</strong> Track page views, user interactions, and popular content</li>
                <li><strong>Performance Monitoring:</strong> Identify slow-loading pages and technical issues</li>
                <li><strong>User Journey Analysis:</strong> Understand how users navigate through our site</li>
                <li><strong>A/B Testing:</strong> Test different versions of pages to improve user experience</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Functional Cookies</h3>
              <p className="text-slate-700 leading-relaxed mb-2">
                These cookies enhance functionality and personalization:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Preferences:</strong> Remember your settings and preferences</li>
                <li><strong>Language Selection:</strong> Store your preferred language</li>
                <li><strong>Theme Settings:</strong> Remember your dark/light mode preference</li>
                <li><strong>Bookmarks:</strong> Store your saved software for quick access</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Advertising Cookies</h3>
              <p className="text-slate-700 leading-relaxed mb-2">
                These cookies are used for advertising purposes:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Targeted Advertising:</strong> Show relevant ads based on your interests</li>
                <li><strong>Frequency Capping:</strong> Limit how often you see the same ad</li>
                <li><strong>Campaign Measurement:</strong> Measure the effectiveness of advertising campaigns</li>
                <li><strong>Cross-Site Tracking:</strong> Track your activity across different websites</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Third-Party Cookies</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may use third-party services that set their own cookies on our website:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Media Platforms:</strong> For social sharing buttons and embedded content</li>
                <li><strong>Content Delivery Networks:</strong> For faster loading of website resources</li>
                <li><strong>Customer Support Tools:</strong> For live chat and help desk functionality</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                These third parties have their own privacy policies and cookie practices. We recommend 
                reviewing their policies to understand how they use cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                You have several options for managing cookies:
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Browser Settings</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Most browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Delete existing cookies</li>
                <li>Set cookies to be deleted when you close your browser</li>
                <li>Receive notifications when cookies are set</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Our Cookie Preference Center</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Use our cookie preference center above to control which types of cookies we set. 
                Your preferences will be remembered for future visits.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Opt-Out Tools</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                You can opt out of certain third-party cookies using these tools:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
                <li><strong>Advertising:</strong> Visit the Digital Advertising Alliance opt-out page</li>
                <li><strong>Social Media:</strong> Adjust privacy settings on social media platforms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Impact of Disabling Cookies</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Disabling certain cookies may affect your experience on our website:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> The website may not function properly</li>
                <li><strong>Analytics Cookies:</strong> We won't be able to improve our service based on usage data</li>
                <li><strong>Functional Cookies:</strong> You may lose personalized features and preferences</li>
                <li><strong>Advertising Cookies:</strong> You may see less relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Cookie Retention</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Authentication Cookies:</strong> Typically 30 days or until you log out</li>
                <li><strong>Preference Cookies:</strong> Up to 1 year</li>
                <li><strong>Analytics Cookies:</strong> Up to 2 years</li>
                <li><strong>Advertising Cookies:</strong> Varies by provider, typically 30-90 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Updates to This Policy</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>
              <p className="text-slate-700 leading-relaxed">
                When we make changes, we will update the "Last updated" date at the top of this policy 
                and notify you through our website or other appropriate means.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Contact Us</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-700">
                  <strong>Email:</strong> privacy@istheresoftwarethat.com<br />
                  <strong>Website:</strong> <Link href="/contact" className=\"text-blue-600 hover:underline">Contact Form</Link>
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Related Policies</h2>
            <p className="text-blue-100 mb-6">
              Learn more about how we protect your privacy and our terms of service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/privacy"
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;