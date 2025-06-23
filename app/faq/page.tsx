"use client";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is IsThereSoftwareThat.com?",
          answer: "IsThereSoftwareThat.com is a curated catalog of free and open-source software. We help you discover alternatives to expensive commercial software by providing detailed information, user reviews, and comparison tools."
        },
        {
          question: "Is all software on your site completely free?",
          answer: "Yes! We focus exclusively on free and open-source software (FOSS). While some software may offer premium features or support, the core functionality is always available at no cost."
        },
        {
          question: "How do you choose which software to include?",
          answer: "We carefully curate our catalog based on several criteria: active development, community support, reliability, user feedback, and overall quality. We prioritize software that's well-maintained and has a strong user base."
        },
        {
          question: "Can I trust the software recommendations?",
          answer: "Absolutely. All software in our catalog is vetted for security and reliability. We only include projects that are actively maintained, have good community support, and positive user feedback. However, we always recommend reviewing the software yourself before installation."
        }
      ]
    },
    {
      category: "Using the Site",
      questions: [
        {
          question: "How does the semantic search work?",
          answer: "Our semantic search understands the intent behind your query, not just keywords. You can describe what you want to do in plain English, like 'edit videos for YouTube' or 'manage my finances,' and we'll find relevant software."
        },
        {
          question: "How do I compare different software options?",
          answer: "Use our comparison tool by visiting the /compare page or clicking 'Compare' in the navigation. You can add up to 3 software packages and see their features, pros, cons, and user ratings side by side."
        },
        {
          question: "Can I filter search results?",
          answer: "Yes! Our search page includes filters for platforms (Windows, macOS, Linux), categories, licenses, and more. This helps you narrow down results to find exactly what you need."
        },
        {
          question: "How are software ratings calculated?",
          answer: "Our rating system combines user upvotes/downvotes with detailed star ratings and reviews. We use a sophisticated algorithm that weighs both the quantity and quality of feedback to provide accurate scores."
        }
      ]
    },
    {
      category: "Contributing",
      questions: [
        {
          question: "How can I submit new software?",
          answer: "Visit our Submit page (/submit) to recommend new software. You'll need to provide basic information about the software, including its name, description, category, and links. Our team reviews all submissions before adding them to the catalog."
        },
        {
          question: "Can I write reviews for software?",
          answer: "Yes! User reviews are essential to our community. You can write detailed reviews with star ratings or simply upvote/downvote software you've used. Creating an account allows you to manage your reviews and bookmarks."
        },
        {
          question: "What makes a good software submission?",
          answer: "Good submissions include: accurate descriptions, proper categorization, working download links, clear licensing information, and evidence that the software is actively maintained. Include screenshots if possible!"
        },
        {
          question: "Do you accept commercial software?",
          answer: "No, we focus exclusively on free and open-source software. However, we do include freemium software where the core functionality is available for free, clearly marking any premium features."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "Do I need to create an account?",
          answer: "An account isn't required to browse and search our catalog. However, creating an account allows you to bookmark software, write reviews, submit new software, and get personalized recommendations."
        },
        {
          question: "Is my data safe?",
          answer: "Yes. We take privacy seriously and only collect essential information. We don't sell user data, and our platform is built with privacy-first principles. Check our Privacy Policy for detailed information."
        },
        {
          question: "Can I use your data via an API?",
          answer: "We're working on a public API for developers. If you're interested in accessing our software catalog programmatically, please contact us through our Contact page."
        },
        {
          question: "What browsers do you support?",
          answer: "Our site works on all modern browsers including Chrome, Firefox, Safari, and Edge. We also ensure full mobile compatibility for browsing on phones and tablets."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          question: "I found incorrect information about software. How do I report it?",
          answer: "Please contact us through our Contact page with details about the incorrect information. We take accuracy seriously and will investigate and correct any issues promptly."
        },
        {
          question: "A download link isn't working. What should I do?",
          answer: "Report broken links through our Contact page. We regularly check our links, but with thousands of software packages, some may occasionally break. We'll fix them as soon as possible."
        },
        {
          question: "Why isn't my submitted software appearing?",
          answer: "All submissions go through a review process that typically takes 2-5 business days. We verify the software meets our criteria and ensure all information is accurate before publishing."
        },
        {
          question: "The search isn't finding what I'm looking for. Any tips?",
          answer: "Try different keywords or describe your need differently. Use our category filters to narrow results. If you still can't find what you need, try our 'Submit Software' page to request it!"
        }
      ]
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about using IsThereSoftwareThat.com, 
            contributing to our catalog, and discovering great free software.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              placeholder="Search frequently asked questions..."
            />
          </div>
        </div>

        {/* FAQ Categories */}
        {filteredFAQs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              {category.category}
            </h2>
            
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const globalIndex = categoryIndex * 100 + questionIndex;
                const isOpen = openItems.includes(globalIndex);
                
                return (
                  <div
                    key={questionIndex}
                    className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <h3 className="text-lg font-medium text-slate-800 pr-4">
                        {faq.question}
                      </h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <div className="border-t border-slate-100 pt-4">
                          <p className="text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* No Results */}
        {searchQuery && filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              No results found
            </h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search terms or browse all categories above.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Still Need Help */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help. 
              Reach out and we'll get back to you as soon as possible.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-colors inline-flex items-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;