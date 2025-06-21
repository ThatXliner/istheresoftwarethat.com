"use client";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Password() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        Password
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-slate-400" />
        </div>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your password"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
          ) : (
            <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
          )}
        </button>
      </div>
    </div>
  );
}
