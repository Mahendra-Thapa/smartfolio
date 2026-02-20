import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TEMPLATES } from "@/components/PortfolioTemplates";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { axiosAuthInstance } from "@/utils/axiosInstance";
import { getTokenFromCookies } from "@/utils/cookies";
import toast from "react-hot-toast";

export default function CreatePortfolio() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  // const [ownerEmail, setOwnerEmail] = useState("");

  const ownerEmailCookie = getTokenFromCookies();
  const ownerEmail = ownerEmailCookie?.email ?? "";

  const params = new URLSearchParams(window.location.search);
  const editId = params.get("edit");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("edit");

    if (editId) {
      setLoading(true);
      axiosAuthInstance
        .get(`/api/portfolios/${editId}`)
        .then(res => {
          const data = res.data;

          // Initialize preview for personal image if it exists
          if (data.personalImage) {
            data.personalImagePreview = data.personalImage; // URL from API
          }

          // Initialize previews for project images
          if (data.projects && data.projects.length) {
            data.projects = data.projects.map((p: any) => ({
              ...p,
              image: p.image || null, // API image URL
            }));
          }

          setPortfolio(data);
        })
        .catch(err => {
          console.error("Failed to load portfolio", err);
          alert("Failed to load portfolio. Redirecting...");
          setLocation("/my-portfolios");
        })
        .finally(() => setLoading(false));
    } else {
      // Default empty portfolio for create
      setPortfolio({
        name: "",
        title: "",
        intro: "",
        email: "",
        phone: "",
        ownerEmail: "",
        education: [],
        skills: [],
        experience: [],
        projects: [],
        qualifications: [],
        additionalExperience: "",
        templateId: null,
        colorScheme: null,
        personalImage: null,
        personalImagePreview: null,
      });
      setLoading(false);
    }
  }, [setLocation]);

  if (loading || !portfolio) return <div className="p-12">Loading...</div>;

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
    if (validateStep(step)) setStep(step + 1);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSave = () => {
    if (!validateStep(step)) return;

    setSaving(true);

    const formData = new FormData();

    //  Basic Portfolio Info
    formData.append("name", portfolio.name || "");
    formData.append("title", portfolio.title || "");
    formData.append("intro", portfolio.intro || "");
    formData.append("email", portfolio.email || "");
    formData.append("phone", portfolio.phone || "");
    formData.append(
      "additionalExperience",
      portfolio.additionalExperience || ""
    );
    formData.append("ownerEmail", ownerEmail);

    //  Skills
    portfolio.skills.forEach((skill: string) => {
      if (skill.trim()) formData.append("skills", skill);
    });

    //  Qualifications
    portfolio.qualifications?.forEach((q: string) => {
      if (q.trim()) formData.append("qualifications", q);
    });

    //  Education
    portfolio.education?.forEach((edu: any) => {
      formData.append("educationInstitutions", edu.institution || "");
      formData.append("educationDegrees", edu.degree || "");
      formData.append("educationFields", edu.educationField || "");
      formData.append("educationYears", edu.year || "");
      formData.append("educationDetails", edu.details || "");
    });

    //  Experience
    portfolio.experience?.forEach((exp: any) => {
      formData.append("experienceCompanies", exp.company || "");
      formData.append("experiencePositions", exp.position || "");
      formData.append("experienceDurations", exp.duration || "");
      formData.append("experienceDescriptions", exp.description || "");
    });

    // Additional Experience
    if (portfolio.additionalExperience) {
      formData.append("additionalExperience", portfolio.additionalExperience);
    }

    // Projects
    portfolio.projects?.forEach((project: any) => {
      formData.append("projectNames", project.name || "");
      formData.append("projectDescriptions", project.description || "");
      formData.append(
        "projectTechnologies",
        (project.technologiesList || []).join(",")
      );
      formData.append("projectDuration", project.projectDuration || "");
      formData.append("projectRole", project.projectRole || "");
      formData.append("projectLinks", project.link || "");

      // Append the actual File object for upload
      if (project.image instanceof File) {
        formData.append("projectImages", project.image);
      }
    });

    // ---------- Personal Image ----------
    if (portfolio.personalImage instanceof File) {
      formData.append("personalImage", portfolio.personalImage);
    }

    // **Add Template ID & Color Scheme**
    if (portfolio.templateId) {
      formData.append("templateId", portfolio.templateId.toString());
    }
    // Append colorScheme
    if (portfolio.colorScheme !== null && portfolio.colorScheme !== undefined) {
      formData.append("colorSchema", portfolio.colorScheme.toString());
    } else {
      toast.error("ColorScheme not selected!"); // Optional debug
    }

    // Decide POST or PUT
    const request = editId
      ? axiosAuthInstance.put(`/api/portfolios/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      : axiosAuthInstance.post("/api/portfolios", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

    request
      .then(() => {
        setLocation("/my-portfolios");
      })
      .catch(err => {
        console.error("Save failed", err);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  // const updatePortfolio = (field: string, value: any) => {
  //   setPortfolio((prev: any) => ({ ...prev, [field]: value }));
  // };

  const updatePortfolio = (field: string, value: any) => {
    setPortfolio((prev: any) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => updatePortfolio("skills", [...portfolio.skills, ""]);
  const updateSkill = (idx: number, value: string) => {
    updatePortfolio(
      "skills",
      portfolio.skills.map((s: string, i: number) => (i === idx ? value : s))
    );
  };
  const removeSkill = (idx: number) => {
    updatePortfolio(
      "skills",
      portfolio.skills.filter((_: any, i: number) => i !== idx)
    );
  };

  const addProject = () => {
    updatePortfolio("projects", [
      ...portfolio.projects,
      {
        name: "",
        role: "",
        duration: "",
        description: "",
        link: "",
        technologies: "",
        image: null,
      },
    ]);
  };

  const updateProjectImage = (index: number, file: File) => {
    setPortfolio((prev: any) => {
      const projects = [...prev.projects];
      projects[index] = {
        ...projects[index],
        image: file, // actual file for backend
        imagePreview: URL.createObjectURL(file), // for UI only
      };
      return { ...prev, projects };
    });
  };

  const updateProject = (idx: number, field: string, value: any) => {
    updatePortfolio(
      "projects",
      portfolio.projects.map((p: any, i: number) =>
        i === idx ? { ...p, [field]: value } : p
      )
    );
  };

  const removeProject = (idx: number) => {
    updatePortfolio(
      "projects",
      portfolio.projects.filter((_: any, i: number) => i !== idx)
    );
  };

  const addExperience = () => {
    updatePortfolio("experience", [
      ...portfolio.experience,
      {
        company: "",
        role: "",
        duration: "",
        description: "",
      },
    ]);
  };

  const updateExperience = (idx: number, field: string, value: string) => {
    updatePortfolio(
      "experience",
      portfolio.experience.map((exp: any, i: number) =>
        i === idx ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (idx: number) => {
    updatePortfolio(
      "experience",
      portfolio.experience.filter((_: any, i: number) => i !== idx)
    );
  };

  const addEducation = () => {
    updatePortfolio("education", [
      ...portfolio.education,
      {
        institution: "",
        degree: "",
        educationFields: "",
        year: "",
        details: "",
      },
    ]);
  };

  const updateEducation = (idx: number, field: string, value: string) => {
    updatePortfolio(
      "education",
      portfolio.education.map((edu: any, i: number) =>
        i === idx ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (idx: number) => {
    updatePortfolio(
      "education",
      portfolio.education.filter((_: any, i: number) => i !== idx)
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <Header />
      <ScrollToTop />
      <div className="flex-1 container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative flex items-center justify-between mb-6">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2"></div>

            {/* Active progress line */}
            <div
              className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 transition-all"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>

            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                // className=""
                className={`${
                  s <= step
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-600"
                } relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all`}
              >
                {s}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm text-slate-600">
            <span>Personal Info</span>
            <span>Education & Skills</span>
            <span>Experience & project</span>
            <span>Template</span>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 dark:text-white">
              Personal Information
            </h2>
            <ScrollToTop />
            <div className="space-y-6">
              {/* Personal Image */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Personal Image
                </label>{" "}
                {/* Optional preview */}
                {portfolio.personalImagePreview && (
                  <img
                    src={portfolio.personalImagePreview}
                    alt="Personal"
                    className="w-32 h-32 object-cover rounded-full mb-2 shadow-md"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    // Store actual File
                    updatePortfolio("personalImage", file);
                    // Store preview separately
                    updatePortfolio(
                      "personalImagePreview",
                      URL.createObjectURL(file)
                    );
                  }}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

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
                  placeholder="Mahendra Thapa"
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
                    placeholder="thapa@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Owner Email *
                  </label>
                  <input
                    type="email"
                    value={ownerEmail}
                    onChange={e => updatePortfolio("ownerEmail", ownerEmail)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      errors.ownerEmail ? "border-red-500" : "border-slate-300"
                    }`}
                    placeholder="thapa@gmail.com"
                  />
                  {/* {errors.ownerEmail && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.ownerEmail}
                    </p>
                  )} */}
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
            <ScrollToTop />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Education & Skills
            </h2>

            {/* Education */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
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
                {portfolio.education.map((edu: any, idx: number) => (
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
                        value={edu.educationField}
                        onChange={e =>
                          updateEducation(idx, "educationField", e.target.value)
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
                      <input
                        type="text"
                        value={edu.details}
                        onChange={e =>
                          updateEducation(idx, "details", e.target.value)
                        }
                        placeholder="Education Details"
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
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Skills
                </h3>
                <button
                  onClick={addSkill}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  + Add Skill
                </button>
              </div>

              <div className="space-y-4">
                {portfolio.skills.map((skill: any, idx: any) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg"
                  >
                    <input
                      type="text"
                      value={skill}
                      onChange={e => updateSkill(idx, e.target.value)}
                      placeholder="Skill (e.g. React, Java, UI/UX)"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <button
                      onClick={() => removeSkill(idx)}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Qualifications */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Qualifications
                </h3>
                <button
                  onClick={() =>
                    setPortfolio((prev: any) => ({
                      ...prev,
                      qualifications: [...prev.qualifications, ""],
                    }))
                  }
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  + Add Qualification
                </button>
              </div>

              <div className="space-y-4">
                {portfolio.qualifications.map((qual: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg"
                  >
                    <input
                      type="text"
                      value={qual}
                      onChange={e => {
                        const updated = [...portfolio.qualifications];
                        updated[idx] = e.target.value;
                        setPortfolio((prev: any) => ({
                          ...prev,
                          qualifications: updated,
                        }));
                      }}
                      placeholder="Qualification (e.g., B.Sc. Computer Science)"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      onClick={() => {
                        const updated = portfolio.qualifications.filter(
                          (_: any, i: number) => i !== idx
                        );
                        setPortfolio((prev: any) => ({
                          ...prev,
                          qualifications: updated,
                        }));
                      }}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Experience and Projects */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <ScrollToTop />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Work Experience
            </h2>

            <div className="mb-6 flex justify-end">
              <button
                onClick={addExperience}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                + Add Experience
              </button>
            </div>

            <div className="space-y-6">
              {portfolio.experience.map((exp: any, idx: any) => (
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
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2 justify-end">
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
            <div className="max-w-2xl mx-auto mb-8 mt-4">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Projects
              </h2>

              <div className="mb-6 flex justify-end">
                <button
                  onClick={addProject}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  + Add Project
                </button>
              </div>

              <div className="space-y-6">
                {portfolio.projects.map((project: any, idx: any) => (
                  <div
                    key={idx}
                    className="p-6 border border-slate-200 rounded-lg"
                  >
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) updateProjectImage(idx, file);
                        }}
                      />

                      {/* Preview */}
                      {project.image && (
                        <img
                          src={
                            typeof project.image === "string"
                              ? project.image // Backend URL
                              : URL.createObjectURL(project.image) // Newly selected file
                          }
                          alt="Project Preview"
                          className="w-full h-40 object-cover rounded-lg border"
                        />
                      )}

                      <input
                        type="text"
                        value={project.name}
                        onChange={e =>
                          updateProject(idx, "name", e.target.value)
                        }
                        placeholder="Project Title"
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                      />

                      <input
                        type="text"
                        value={project.projectRole}
                        onChange={e =>
                          updateProject(idx, "projectRole", e.target.value)
                        }
                        placeholder="Your Role (e.g. Frontend Developer)"
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <input
                      type="text"
                      value={project.technologiesList?.join(",") || ""}
                      onChange={e =>
                        updateProject(
                          idx,
                          "technologiesList",
                          e.target.value.split(",")
                        )
                      }
                      placeholder="e.g., React, Node.js, Tailwind"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    />

                    <input
                      type="text"
                      value={project.projectDuration}
                      onChange={e =>
                        updateProject(idx, "projectDuration", e.target.value)
                      }
                      placeholder="Duration (e.g. Mar 2023 – Jun 2023)"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 mb-4"
                    />

                    <textarea
                      value={project.description}
                      onChange={e =>
                        updateProject(idx, "description", e.target.value)
                      }
                      placeholder="Project description, features, achievements"
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 mb-4"
                    />

                    <input
                      type="url"
                      value={project.link}
                      onChange={e => updateProject(idx, "link", e.target.value)}
                      placeholder="Project URL (GitHub / Live Demo)"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 mb-4"
                    />

                    <button
                      onClick={() => removeProject(idx)}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Template Selection */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <ScrollToTop />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Choose Your Template
            </h2>

            <div className="space-y-4">
              {TEMPLATES.map(template => (
                <div
                  key={template.id}
                  onClick={() => updatePortfolio("templateId", template.id)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                    portfolio.templateId === template.id
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
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
            className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-900 dark:text-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
