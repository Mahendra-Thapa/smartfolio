import React, { useState, ChangeEvent, FormEvent } from "react";
import { MdError } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import axios from "axios";
import InputField from "@/components/ui/InputField";
import Header from "@/components/Header";

// Zod schema
const signupSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // attach error to confirmPassword
  });

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const CreateAccount: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const validation = signupSchema.safeParse(formData);
    if (!validation.success) {
      const errors: FieldErrors = {};
      validation.error.issues.forEach((err) => {
        const key = err.path[0] as keyof FieldErrors;
        errors[key] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    axios
      .post("/api/auth/signup", { ...formData, roles: ["ROLE_ADMIN"] })
      .then(() => {
        alert("Account created successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to create account");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-4">
        <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Create Account
          </h1>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-4">
              <MdError className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <InputField
              id="username"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              error={fieldErrors.username}
              disabled={loading}
            />

            {/* Email */}
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              disabled={loading}
            />

            {/* Password */}
            <InputField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
              disabled={loading}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Confirm Password */}
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={fieldErrors.confirmPassword}
              disabled={loading}
              showPassword={showConfirmPassword}
              togglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <Divider />
        </div>
      </div>
    </div>
  );
};

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
      Already have an account?{" "}
      <a
        href="/signin"
        className="font-bold text-blue-400 hover:text-blue-300 transition-colors duration-200"
      >
        Sign in
      </a>
    </p>
  </>
);

export default CreateAccount;
