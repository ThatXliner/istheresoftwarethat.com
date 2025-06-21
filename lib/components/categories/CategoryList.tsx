import Link from "next/link";
import { categories } from "../common/data";

const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/search?category=${encodeURIComponent(category.name)}`}
          className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md group"
        >
          <div
            className={`mb-4 text-${category.color}-500 group-hover:scale-110 transition-transform`}
          >
            <category.icon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
