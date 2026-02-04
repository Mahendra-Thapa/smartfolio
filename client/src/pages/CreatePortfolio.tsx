import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { storage, Portfolio } from "@/lib/storage";
import { TEMPLATES } from "@/components/PortfolioTemplates";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function CreatePortfolio() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [portfolio, setPortfolio] = useState<Portfolio>(
    storage.createNewPortfolio()
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load from localStorage if editing
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("edit");
    if (editId) {
      const existing = storage.getPortfolio(editId);
      if (existing) {
        setPortfolio(existing);
      }
    }
  }, []);

  const validateStep = (stepNum: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      if (!portfolio.name.trim()) newErrors.name = "Name is required";
      if (!portfolio.title.trim()) newErrors.title = "Title is required";
      if (!portfolio.intro.trim()) newErrors.intro = "Introduction is required";
      if (!portfolio.email.trim()) newErrors.email = "Email is required";
      if (!portfolio.phone.trim()) newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSave = () => {
    storage.savePortfolio(portfolio);
    setLocation("/my-portfolios");
  };

  const updatePortfolio = (field: string, value: any) => {
    setPortfolio(prev => ({ ...prev, [field]: value }));
  };

  const addEducation = () => {
    setPortfolio(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: "", degree: "", field: "", year: "" },
      ],
    }));
  };

  const updateEducation = (idx: number, field: string, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === idx ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (idx: number) => {
    setPortfolio(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  const addExperience = () => {
    setPortfolio(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: "", position: "", duration: "", description: "" },
      ],
    }));
  };

  const updateExperience = (idx: number, field: string, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === idx ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (idx: number) => {
    setPortfolio(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx),
    }));
  };

  const addSkill = () => {
    const skill = prompt("Enter a skill:");
    if (skill) {
      setPortfolio(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const removeSkill = (idx: number) => {
    setPortfolio(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <ScrollToTop />
      <div className="flex-1 container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s <= step
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${s < step ? "bg-blue-600" : "bg-slate-200"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Personal Info</span>
            <span>Education & Skills</span>
            <span>Experience</span>
            <span>Template</span>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Personal Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={portfolio.name}
                  onChange={e => updatePortfolio("name", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.name ? "border-red-500" : "border-slate-300"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  value={portfolio.title}
                  onChange={e => updatePortfolio("title", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.title ? "border-red-500" : "border-slate-300"
                  }`}
                  placeholder="e.g., Full Stack Developer"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Introduction *
                </label>
                <textarea
                  value={portfolio.intro}
                  onChange={e => updatePortfolio("intro", e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.intro ? "border-red-500" : "border-slate-300"
                  }`}
                  placeholder="Tell us about yourself..."
                />
                {errors.intro && (
                  <p className="text-red-600 text-sm mt-1">{errors.intro}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={portfolio.email}
                    onChange={e => updatePortfolio("email", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      errors.email ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={portfolio.phone}
                    onChange={e => updatePortfolio("phone", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      errors.phone ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Education & Skills */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Education & Skills
            </h2>

            {/* Education */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Education
                </h3>
                <button
                  onClick={addEducation}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  + Add Education
                </button>
              </div>

              <div className="space-y-6">
                {portfolio.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-6 border border-slate-200 rounded-lg"
                  >
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={e =>
                          updateEducation(idx, "institution", e.target.value)
                        }
                        placeholder="Institution Name"
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={e =>
                          updateEducation(idx, "degree", e.target.value)
                        }
                        placeholder="Degree"
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        value={edu.field}
                        onChange={e =>
                          updateEducation(idx, "field", e.target.value)
                        }
                        placeholder="Field of Study"
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={e =>
                          updateEducation(idx, "year", e.target.value)
                        }
                        placeholder="Year of Graduation"
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <button
                      onClick={() => removeEducation(idx)}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Skills</h3>
                <button
                  onClick={addSkill}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  + Add Skill
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(idx)}
                      className="text-blue-800 hover:text-blue-900 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Work Experience
            </h2>

            <div className="mb-6">
              <button
                onClick={addExperience}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                + Add Experience
              </button>
            </div>

            <div className="space-y-6">
              {portfolio.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-slate-200 rounded-lg"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={e =>
                        updateExperience(idx, "company", e.target.value)
                      }
                      placeholder="Company Name"
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                      type="text"
                      value={exp.position}
                      onChange={e =>
                        updateExperience(idx, "position", e.target.value)
                      }
                      placeholder="Job Title"
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={e =>
                      updateExperience(idx, "duration", e.target.value)
                    }
                    placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                  />
                  <textarea
                    value={exp.description}
                    onChange={e =>
                      updateExperience(idx, "description", e.target.value)
                    }
                    placeholder="Job description and achievements"
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                  />
                  <button
                    onClick={() => removeExperience(idx)}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Additional Experience
              </label>
              <textarea
                value={portfolio.additionalExperience}
                onChange={e =>
                  updatePortfolio("additionalExperience", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Add any other relevant experience or achievements..."
              />
            </div>
          </div>
        )}

        {/* Step 4: Template Selection */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Choose Your Template
            </h2>

            <div className="space-y-4">
              {TEMPLATES.map(template => (
                <div
                  key={template.id}
                  onClick={() => updatePortfolio("templateId", template.id)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                    portfolio.templateId === template.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-slate-600 mb-4">{template.description}</p>
                  <div className="flex gap-2">
                    {template.colorSchemes.map(scheme => (
                      <div
                        key={scheme.id}
                        className="w-6 h-6 rounded-full border border-slate-300"
                        style={{ backgroundColor: scheme.primary }}
                        title={scheme.name}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Color Scheme Selection */}
            {TEMPLATES.find(t => t.id === portfolio.templateId) && (
              <div className="mt-8">
                <label className="block text-sm font-semibold text-slate-900 mb-4">
                  Select Color Scheme
                </label>
                <div className="flex gap-4">
                  {TEMPLATES.find(
                    t => t.id === portfolio.templateId
                  )?.colorSchemes.map(scheme => (
                    <button
                      key={scheme.id}
                      onClick={() => updatePortfolio("colorScheme", scheme.id)}
                      className={`w-12 h-12 rounded-full border-4 transition ${
                        portfolio.colorScheme === scheme.id
                          ? "border-slate-900"
                          : "border-slate-300"
                      }`}
                      style={{ backgroundColor: scheme.primary }}
                      title={scheme.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="max-w-2xl mx-auto mt-12 flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-900 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white transition"
            >
              Save Portfolio
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
