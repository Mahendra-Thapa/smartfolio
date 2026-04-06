"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getTokenFromCookies } from "@/utils/cookies";
import { axiosAuthInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";


const Settings = () => {
  const ownerEmailCookie = getTokenFromCookies();
  const ownerEmail = ownerEmailCookie?.email ?? "";

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { label: "Weak", color: "text-red-500" };

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (hasLetters && hasNumbers && hasSpecial && password.length >= 8) {
      return { label: "Strong", color: "text-green-500" };
    }

    if (hasLetters && hasNumbers) {
      return { label: "Medium", color: "text-yellow-500" };
    }

    return { label: "Weak", color: "text-red-500" };
  };

  const strength = getPasswordStrength(formData.newPassword);

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle password
  const togglePassword = (field: "old" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validation
  const validate = () => {
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      return "All fields are required";
    }

    if (formData.newPassword.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    if (formData.oldPassword === formData.newPassword) {
      return "New password must be different";
    }

    return null;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);

    try {
      await axiosAuthInstance.put("/api/auth/update-password", {
        email: ownerEmail,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      toast.success("Password updated successfully ✅");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Old Password */}
          <div className="relative">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Current Password
            </label>
            <input
              type={showPassword.old ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 pr-10 rounded-lg border"
              placeholder="Enter current password"
            />
            <button type="button" onClick={() => togglePassword("old")}
              className="absolute right-3 top-9">
              {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              New Password
            </label>
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 pr-10 rounded-lg border"
              placeholder="Enter new password"
            />
            <button type="button" onClick={() => togglePassword("new")}
              className="absolute right-3 top-9">
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {/* Strength Indicator */}
            {formData.newPassword && (
              <p className={`text-sm mt-1 ${strength.color}`}>
                Strength: {strength.label}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 pr-10 rounded-lg border"
              placeholder="Confirm new password"
            />
            <button type="button" onClick={() => togglePassword("confirm")}
              className="absolute right-3 top-9">
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;