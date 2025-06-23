import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const SubmitBanner = () => {
  return (
    <section className="px-4 max-w-7xl mx-auto w-full">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Plus className="w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Know Great Software?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Help the community discover amazing free and open-source software by
          submitting your recommendations. Share the tools that have made a
          difference in your workflow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/submit"
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-md hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Submit Software
          </Link>

          <div className="flex items-center text-blue-100 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>No account required for your first submission</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmitBanner;
