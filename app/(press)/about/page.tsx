import { Award, Code, Globe, Heart, Users, Zap } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">
            About IsThereSoftwareThat.com
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re passionate about making free and open-source software
            discoverable. Our mission is to help you find the perfect tools for
            your needs without breaking the bank or compromising on quality.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Our Story
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              IsThereSoftwareThat.com was born from a simple frustration:
              finding quality free software shouldn&apos;t be like searching for
              a needle in a haystack. Too often, amazing open-source projects
              remain hidden while people pay for expensive alternatives they
              don&apos;t need.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              We believe that great software should be accessible to everyone,
              regardless of budget. That&apos;s why we&apos;ve created a
              platform that makes it easy to discover, compare, and choose from
              the best free and open-source software available.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our community-driven approach ensures that you get real insights
              from real users, helping you make informed decisions about the
              tools that will power your projects.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="bg-blue-100 p-3 rounded-xl w-fit mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Semantic Search
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Describe what you need in plain English. Our intelligent search
                understands intent, not just keywords, making it easier to find
                exactly what you&apos;re looking for.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="bg-green-100 p-3 rounded-xl w-fit mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Community Driven
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Real reviews from real users. Our community shares honest
                experiences, helping you understand the pros and cons before you
                commit.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Open Source Focus
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We champion transparency and freedom. Every software we feature
                respects your privacy and gives you control over your data and
                workflow.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <div className="bg-orange-100 p-3 rounded-xl w-fit mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Quality Curation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Not all free software is created equal. We carefully curate our
                catalog to ensure you&apos;re discovering tools that are
                actively maintained and reliable.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Our Values
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Accessibility
                </h3>
                <p className="text-slate-600">
                  Great software should be available to everyone, everywhere.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Community
                </h3>
                <p className="text-slate-600">
                  We believe in the power of shared knowledge and collaboration.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Quality
                </h3>
                <p className="text-slate-600">
                  We&apos;re committed to helping you find software that truly
                  works.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Help us build the most comprehensive catalog of free and
              open-source software. Share your discoveries, write reviews, and
              help others find the tools they need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submit"
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Submit Software
              </Link>
              <Link
                href="/search"
                className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
