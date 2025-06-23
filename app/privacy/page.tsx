import { Shield, Eye, Lock, Database } from "lucide-react";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your personal information when you use IsThereSoftwareThat.com.
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Last updated: January 15, 2025
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Privacy Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 text-center">
            <div className="bg-blue-100 p-3 rounded-xl w-fit mx-auto mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Transparency</h3>
            <p className="text-slate-600 text-sm">
              We're clear about what data we collect and how we use it.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 text-center">
            <div className="bg-green-100 p-3 rounded-xl w-fit mx-auto mb-4">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Security</h3>
            <p className="text-slate-600 text-sm">
              Your data is protected with industry-standard security measures.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 text-center">
            <div className="bg-purple-100 p-3 rounded-xl w-fit mx-auto mb-4">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Minimal Data</h3>
            <p className="text-slate-600 text-sm">
              We only collect what's necessary to provide our service.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="prose prose-slate max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Information You Provide</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                When you create an account or interact with our service, we may collect:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Account Information:</strong> Username, email address, and password</li>
                <li><strong>Profile Information:</strong> Optional profile details you choose to share</li>
                <li><strong>User Content:</strong> Reviews, ratings, comments, and software submissions</li>
                <li><strong>Communication:</strong> Messages you send through our contact forms or support channels</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Information Automatically Collected</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                When you use our service, we automatically collect certain information:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Usage Data:</strong> Pages visited, features used, search queries, and interaction patterns</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution</li>
                <li><strong>Log Data:</strong> IP address, access times, and referring URLs</li>
                <li><strong>Cookies:</strong> Small data files stored on your device (see our Cookie Policy for details)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Provide, maintain, and improve our service</li>
                <li>Create and manage your account</li>
                <li>Process and display your reviews and submissions</li>
                <li>Personalize your experience and provide relevant recommendations</li>
                <li>Communicate with you about your account and our service</li>
                <li>Respond to your questions and provide customer support</li>
                <li>Analyze usage patterns to improve our service</li>
                <li>Detect and prevent fraud, abuse, and security issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Public Information</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Reviews, ratings, and comments you post are publicly visible</li>
                <li>Your username may be displayed with your public contributions</li>
                <li>Software submissions you make may be attributed to you</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Service Providers</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may share information with trusted third-party service providers who help us operate our service, such as:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Cloud hosting and infrastructure providers</li>
                <li>Analytics and performance monitoring services</li>
                <li>Email delivery services</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Legal Requirements</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may disclose your information if required by law or in response to:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Legal process, such as a court order or subpoena</li>
                <li>Government or regulatory requests</li>
                <li>Protecting our rights, property, or safety</li>
                <li>Protecting the rights, property, or safety of our users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Data Security</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Encryption:</strong> Data is encrypted in transit and at rest</li>
                <li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
                <li><strong>Regular Security Audits:</strong> We regularly review and update our security practices</li>
                <li><strong>Secure Infrastructure:</strong> We use reputable cloud providers with strong security standards</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Your Rights and Choices</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                You have several rights regarding your personal information:
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Account Management</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Update your account information and preferences</li>
                <li>Delete your account and associated data</li>
                <li>Download a copy of your data</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Communication Preferences</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Opt out of promotional emails</li>
                <li>Manage notification settings</li>
                <li>Control how we communicate with you</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">Data Rights (GDPR/CCPA)</h3>
              <p className="text-slate-700 leading-relaxed mb-2">
                If you're in the EU or California, you may have additional rights:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your personal information</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Cookies and Tracking</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience. Our cookies help us:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Keep you logged in</li>
                <li>Analyze how you use our service</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                You can control cookies through your browser settings. For more details, see our <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Data Retention</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We retain your information for as long as necessary to provide our service and fulfill the purposes outlined in this policy:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li><strong>Account Data:</strong> Until you delete your account</li>
                <li><strong>User Content:</strong> Until you delete it or your account is deleted</li>
                <li><strong>Usage Data:</strong> Typically 2-3 years for analytics purposes</li>
                <li><strong>Legal Requirements:</strong> As required by applicable law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Children's Privacy</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
              <p className="text-slate-700 leading-relaxed">
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">9. International Data Transfers</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
              <p className="text-slate-700 leading-relaxed">
                By using our service, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Changes to This Policy</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Posting the updated policy on our website</li>
                <li>Sending you an email notification</li>
                <li>Displaying a prominent notice on our service</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                Your continued use of our service after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Contact Us</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-700">
                  <strong>Email:</strong> privacy@istheresoftwarethat.com<br />
                  <strong>Website:</strong> <Link href="/contact" className=\"text-blue-600 hover:underline">Contact Form</Link><br />
                  <strong>Data Protection Officer:</strong> dpo@istheresoftwarethat.com
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
              Learn more about our terms and how we use cookies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/terms"
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;