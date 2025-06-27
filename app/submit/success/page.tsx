import { Check } from "lucide-react";

export default function Success() {
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
          <a
            href="/submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Submit Another
          </a>
        </div>
      </div>
    </div>
  );
}
