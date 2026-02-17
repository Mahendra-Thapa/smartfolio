import React, { useState, ChangeEvent, FormEvent } from "react";
import { MdError } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import toast from "react-hot-toast";
import InputField from "@/components/ui/InputField";
import Header from "@/components/Header";
import { axiosInstance } from "@/utils/axiosInstance";

/* =======================
   ZOD SCHEMA
======================= */
const signupSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* =======================
   TYPES
======================= */
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string; // UI ONLY
}

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

/* =======================
   COMPONENT
======================= */
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

  /* =======================
     HANDLE CHANGE
  ======================= */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors(prev => ({
      ...prev,
      [name]: undefined,
    }));

    setError("");
  };

  /* =======================
     HANDLE SUBMIT
  ======================= */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const validation = signupSchema.safeParse(formData);

    if (!validation.success) {
      const errors: FieldErrors = {};
      validation.error.issues.forEach(issue => {
        const key = issue.path[0] as keyof FieldErrors;
        errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    //  ONLY SEND REQUIRED DATA
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      roles: ["ROLE_USER"],
    };

    axiosInstance
      .post("/api/auth/signup", payload)
      .then(() => {
        toast.dismiss();
        toast.success("Account created successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        window.location.href = "/signin";
      })
      .catch(err => {
        const msg = err.response?.data?.message || "Failed to create account";
        setError(msg);
        toast.dismiss();
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  /* =======================
     JSX
  ======================= */
  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-4">
        <div className="w-full max-w-md bg-white/60 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/20 dark:border-white/10 rounded-3xl p-10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Create Account
          </h1>

          {error && (
            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl mb-4">
              <MdError className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="username"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              error={fieldErrors.username}
              disabled={loading}
            />

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
              togglePassword={() => setShowPassword(v => !v)}
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={fieldErrors.confirmPassword}
              disabled={loading}
              showPassword={showConfirmPassword}
              togglePassword={() => setShowConfirmPassword(v => !v)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-colors duration-200"
            >
              {loading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <Divider />
        </div>
      </div>
    </div>
  );
};

/* =======================
   DIVIDER
======================= */
const Divider = () => (
  <>
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-slate-300/50 dark:bg-slate-700/50" />
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
        Or
      </span>
      <div className="flex-1 h-px bg-slate-300/50 dark:bg-slate-700/50" />
    </div>
    <p className="text-center text-sm text-slate-600 dark:text-slate-400">
      Already have an account?{" "}
      <a
        href="/signin"
        className="font-bold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
      >
        Sign in
      </a>
    </p>
  </>
);

export default CreateAccount;
