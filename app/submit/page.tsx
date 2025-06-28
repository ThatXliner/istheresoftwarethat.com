"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import spdxLicenseList from "spdx-license-list";
import { z } from "zod/v4";
import { categories, categoriesEnum } from "@/lib/components/common/data";
import { submit } from "./actions";

// For some reason if I have any sort of string validation
// Which invalidates an empty string, I cannot make the field
// not required...
const schema = z.object({
  // Required component
  name: z.string(),
  category: categoriesEnum,
  shortDescription: z.string(),
  longDescription: z.string(),
  website: z.url(),
  github: z
    .string()
    // This essentially allows for either an empty string or a valid
    // GitHub repository identifier. See the comment above
    .regex(/^(\w+\/\w+)|$/)
    .optional(),
  license: z.enum([...Object.keys(spdxLicenseList)]),
  platforms: z.string().array(),
  tags: z
    .string()
    .transform((val) => val.split(",").map((tag) => tag.trim()))
    .optional(),
  submitterName: z.string().optional(),
  submitterEmail: z.string().optional(),
  additionalNotes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;
const SubmitPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    // TODO: Show errors
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  // const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  const onSubmit = async (data: FormData) => {
    console.log("onsubtmit");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log("Submitting data:", data);

    const result = await submit(formData);

    // if (!result.success && result.errors) {
    //    for (const [field, messages] of Object.entries(result.errors)) {
    //       setError(field as keyof FormInput, {
    //          type: "server",
    //           message: messages[0],
    //         });
    //       }
    //     } else {
    //       alert("Submitted successfully!");
    //     }
  };
  const shortDescription = watch("shortDescription");

  const platforms = ["Windows", "macOS", "Linux", "Web", "Android", "iOS"];

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
          onSubmit={handleSubmit(onSubmit)}
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
                required
                {...register("name")}
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
                required
                {...register("category")}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
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
              required
              {...register("shortDescription")}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief one-line description of the software"
              maxLength={150}
            />
            <p className="text-sm text-slate-500 mt-1">
              {shortDescription?.length || 0}/150 characters
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
              {...register("longDescription")}
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
              {errors.website && <p role="alert">{errors.website.message}</p>}
              <input
                required
                type="url"
                {...register("website")}
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
                pattern="^(\w+\/\w+)|$"
                {...register("github")}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="user/repo"
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
                required
                {...register("license")}
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
                {...register("tags")}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="editor, ide, typescript, git (comma-separated)"
              />
            </div>
          </div>

          {/* Platform Support */}
          <div className="mb-8">
            <div className="block text-sm font-medium text-slate-700 mb-4">
              Supported Platforms *
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <label
                  key={platform}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    {...register("platforms")}
                    value={platform}
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
                  {...register("submitterName")}
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
                {/* I'm pretty sure adding type="email" is unnecessary because Zod
                can validate it for us? However if we do that
                either we need to include a .message in the schema or pass it in the
                register as an argument?? idk i'll check this when i have wifi*/}
                <input
                  {...register("submitterEmail")}
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
              {...register("additionalNotes")}
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
