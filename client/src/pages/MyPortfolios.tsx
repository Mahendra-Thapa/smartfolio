import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { storage } from "@/lib/storage";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Edit2, Trash2, Eye, Plus, Copy, Check } from "lucide-react";

export default function MyPortfolios() {
  const [portfolios, setPortfolios] = useState(storage.getAllPortfolios());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [duplicateSuccess, setDuplicateSuccess] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    storage.deletePortfolio(id);
    setPortfolios(storage.getAllPortfolios());
    setDeleteConfirm(null);
  };

  const handleDuplicate = (id: string) => {
    const duplicated = storage.duplicatePortfolio(id);
    if (duplicated) {
      setPortfolios(storage.getAllPortfolios());
      setDuplicateSuccess(duplicated.id);
      setTimeout(() => setDuplicateSuccess(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <Header />
      <ScrollToTop />
      {/* Page Header */}
      <section
        className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 py-28"
        style={{
          backgroundImage:
            "url('https://hexagon.com/-/media/project/one-web/master-site/ali/images/hexagon-project-portfolio-management-marquee5-2560x880.jpg?h=880&iar=0&w=2560&hash=7F84FA1C056179AF371975A3B0396663')", // Replace with your image
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>

        <div className="relative container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                My Portfolios
              </h1>
              <p className="text-xl text-slate-300 dark:text-slate-300">
                Manage your created portfolios
              </p>
            </div>

            <Link href="/create-portfolio">
              <button className="bg-[#04296c] hover:bg-[#04296c]/80 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Portfolio
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolios List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {portfolios.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                No portfolios yet
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                Create your first portfolio to get started
              </p>
              <Link href="/create-portfolio">
                <button className="bg-[#04296c] hover:bg-[#04296c]/80 text-white px-8 py-3 rounded-lg font-semibold transition">
                  Create Portfolio
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map(portfolio => (
                <div
                  key={portfolio.id}
                  className={`border rounded-lg overflow-hidden hover:shadow-lg transition-all ${
                    duplicateSuccess === portfolio.id
                      ? "border-green-500 shadow-lg shadow-green-200"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {/* Card Header */}
                  <div
                    className="h-32 text-white flex items-end p-6"
                    style={{
                      backgroundColor:
                        TEMPLATES.find(
                          t => t.id === portfolio.templateId
                        )?.colorSchemes.find(
                          c => c.id === portfolio.colorScheme
                        )?.primary || "#04296c",
                    }}
                  >
                    <div>
                      <h3 className="text-2xl font-bold">{portfolio.name}</h3>
                      <p className="opacity-90">{portfolio.title}</p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 bg-white dark:bg-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                      {portfolio.intro}
                    </p>

                    {/* Metadata */}
                    <div className="mb-6 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <p>
                        <span className="font-semibold">Template:</span>{" "}
                        {
                          TEMPLATES.find(t => t.id === portfolio.templateId)
                            ?.name
                        }
                      </p>
                      <p>
                        <span className="font-semibold">Created:</span>{" "}
                        {new Date(portfolio.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Success Message */}
                    {duplicateSuccess === portfolio.id && (
                      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Duplicated successfully!
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      {/* View */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/view-portfolio/${portfolio.id}`}>
                            <button className="w-full border border-blue-600 dark:border-blue-400 text-[#04296c] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                              <Eye className="w-4 h-6" />
                            </button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span className="hidden sm:inline">View</span>
                        </TooltipContent>
                      </Tooltip>
                      {/* edit */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/create-portfolio?edit=${portfolio.id}`}>
                            <button className="w-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                              <Edit2 className="w-4 h-6" />
                            </button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span className="hidden sm:inline">Edit</span>
                        </TooltipContent>
                      </Tooltip>
                      {/* duplicate */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleDuplicate(portfolio.id)}
                            className="border border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                            title="Duplicate portfolio"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {" "}
                          <span className="hidden sm:inline">Duplicate</span>
                        </TooltipContent>
                      </Tooltip>
                      {/* Delete */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setDeleteConfirm(portfolio.id)}
                            className="border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg font-semibold transition"
                            title="Delete portfolio"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-sm mx-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Delete Portfolio?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              This action cannot be undone. Are you sure you want to delete this
              portfolio?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// Import templates for reference
import { TEMPLATES } from "@/components/PortfolioTemplates";
import ScrollToTop from "@/components/ScrollToTop";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
