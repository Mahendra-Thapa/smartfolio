"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { MdError } from "react-icons/md";
import Header from "@/components/Header";
import { z } from "zod";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Types
interface FormData {
  email: string;
  password: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  // Disable submit if empty fields or loading
  const isSubmitDisabled =
    loading || !formData.email.trim() || !formData.password.trim();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (error) setError("");
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Validate form data first
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const errors: FieldErrors = {};
      validation.error.errors.forEach(err => {
        const key = err.path[0] as string;
        errors[key] = err.message;
      });
      setFieldErrors(errors);
      return; // Stop here, do not start loading
    }

    // ✅ Start loading only if validation passes
    setLoading(true);

    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        return data;
      })
      .then(data => {
        if (data.token) localStorage.setItem("token", data.token);
        console.log("Login successful:", data);
        // redirect to dashboard
      })
      .catch(err => setError(err.message || "An error occurred"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12">
        <main className="w-full max-w-md">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/50">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Welcome back
              </h1>
              <p className="text-slate-400 text-sm">
                Sign in to access your portfolio dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" aria-busy={loading}>
              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm">
                  <MdError className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <InputField
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                disabled={loading}
              />

              <InputField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                disabled={loading}
                togglePassword={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0"
                  />
                  Remember me
                </label>
                <a
                  href="#forgot"
                  className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 relative overflow-hidden group "
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2.5">
                  {loading && (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-white" />
                  )}
                  {loading ? "Signing in..." : "Sign In"}
                </span>
              </button>
            </form>

            <Divider />
          </div>
        </main>
      </div>
    </div>
  );
};

// Reusable Input Field Component
interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  togglePassword?: () => void;
  showPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  togglePassword,
  showPassword,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-slate-200 mb-2.5"
    >
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id} // matches formData keys
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`w-full px-4 py-3.5 ${togglePassword ? "pr-12" : ""} bg-slate-950/60 border-[1.5px] ${
          error ? "border-red-500" : "border-slate-700/50"
        } rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-950/80 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      {togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1.5 transition-colors duration-200"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-5 h-5" />
          ) : (
            <AiOutlineEye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
    {error && (
      <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
        <MdError className="w-4 h-4" /> {error}
      </p>
    )}
  </div>
);

// Divider & Signup
const Divider: React.FC = () => (
  <>
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-slate-700/50" />
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Or
      </span>
      <div className="flex-1 h-px bg-slate-700/50" />
    </div>
    <p className="text-center text-sm text-slate-400">
      Don't have an account?{" "}
      <a
        href="#signup"
        className="font-bold text-blue-400 hover:text-blue-300 transition-colors duration-200"
      >
        Create account
      </a>
    </p>
  </>
);

export default Login;
