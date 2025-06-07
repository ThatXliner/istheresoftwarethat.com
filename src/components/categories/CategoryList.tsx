import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Palette, MessageSquare, Briefcase, Film, Shield, Wrench, GraduationCap } from 'lucide-react';

const categories = [
  { name: 'Development', icon: Code, color: 'blue' },
  { name: 'Design', icon: Palette, color: 'purple' },
  { name: 'Communication', icon: MessageSquare, color: 'green' },
  { name: 'Productivity', icon: Briefcase, color: 'orange' },
  { name: 'Media', icon: Film, color: 'red' },
  { name: 'Security', icon: Shield, color: 'slate' },
  { name: 'Utilities', icon: Wrench, color: 'amber' },
  { name: 'Education', icon: GraduationCap, color: 'emerald' }
];

const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={`/search?category=${encodeURIComponent(category.name)}`}
          className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md group"
        >
          <div className={`mb-4 text-${category.color}-500 group-hover:scale-110 transition-transform`}>
            <category.icon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;