import { FileText, Scale } from "lucide-react";
import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using IsThereSoftwareThat.com. 
            By accessing our service, you agree to be bound by these terms.
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Last updated: January 15, 2025
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="prose prose-slate max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                By accessing and using IsThereSoftwareThat.com (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-slate-700 leading-relaxed">
                These Terms of Service may be updated from time to time without notice. Your continued use of the Service constitutes acceptance of any changes to these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Description of Service</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                IsThereSoftwareThat.com is a catalog and discovery platform for free and open-source software. We provide:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Software discovery and search functionality</li>
                <li>User reviews and ratings</li>
                <li>Software comparison tools</li>
                <li>Community-driven content and recommendations</li>
                <li>Educational content about open-source software</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                The Service is provided "as is" and we make no warranties about the accuracy, reliability, or availability of the information provided.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">3. User Accounts and Registration</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                To access certain features of the Service, you may be required to create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in prohibited activities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">4. User Content and Conduct</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Users may submit content including reviews, ratings, software submissions, and comments. By submitting content, you:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Grant us a non-exclusive, royalty-free license to use, modify, and display your content</li>
                <li>Represent that you own or have permission to use the content</li>
                <li>Agree that your content does not violate any laws or third-party rights</li>
                <li>Understand that we may remove content at our discretion</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Prohibited Activities</h3>
              <p className="text-slate-700 leading-relaxed mb-2">You agree not to:</p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Post spam, advertisements, or promotional content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Submit malware or malicious software recommendations</li>
                <li>Manipulate ratings or reviews</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Intellectual Property</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by IsThereSoftwareThat.com and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                Software listed in our catalog remains the property of their respective owners. We do not claim ownership of any third-party software or content.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Our logo, trademarks, and service marks may not be used without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Third-Party Software and Links</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Our Service contains links to third-party websites and software. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                <li>The content, privacy policies, or practices of third-party sites</li>
                <li>The functionality, security, or reliability of third-party software</li>
                <li>Any damages resulting from your use of third-party software</li>
                <li>The availability or continued operation of external links</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                You download and use third-party software at your own risk. We recommend reviewing the terms and licenses of any software before installation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Privacy and Data Protection</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-slate-700 leading-relaxed">
                By using the Service, you consent to the collection and use of information as outlined in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Disclaimers and Limitation of Liability</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Disclaimer:</strong> The Service is provided "as is" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Limitation of Liability:</strong> In no event shall IsThereSoftwareThat.com be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or related to your use of the Service.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so these limitations may not apply to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Indemnification</h2>
              <p className="text-slate-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless IsThereSoftwareThat.com and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Termination</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Upon termination, your right to use the Service will cease immediately. All provisions that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Governing Law</h2>
              <p className="text-slate-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">12. Changes to Terms</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Service. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
              </p>
              <p className="text-slate-700 leading-relaxed">
                We will make reasonable efforts to notify users of significant changes to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">13. Contact Information</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-700">
                  <strong>Email:</strong> legal@istheresoftwarethat.com<br />
                  <strong>Website:</strong> <Link href="/contact" className="text-blue-600 hover:underline">Contact Form</Link>
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
              Learn more about how we protect your privacy and handle your data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/privacy"
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Privacy Policy
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

export default TermsPage;