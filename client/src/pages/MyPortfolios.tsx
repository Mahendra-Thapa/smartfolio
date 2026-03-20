"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TEMPLATES } from "@/components/PortfolioTemplates";
import ScrollToTop from "@/components/ScrollToTop";
import { Check, Copy, Edit2, Eye, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

import PortfolioCardSkeleton from "@/components/skeleton/PortfolioCardSkeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { axiosAuthInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";

export default function MyPortfolios() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [duplicateSuccess, setDuplicateSuccess] = useState<number | null>(null);

  //  Fetch Portfolios From API
  const fetchPortfolios = () => {
    setLoading(true);

    axiosAuthInstance
      .get("/api/portfolios")
      .then(res => {
        // Normalize API Data (VERY IMPORTANT)
        const normalized = res.data.map((p: any) => ({
          ...p,

          // Fallbacks so UI NEVER breaks
          templateId: p.templateId || TEMPLATES[0]?.id,
          colorScheme: p.colorScheme || TEMPLATES[0]?.colorSchemes?.[0]?.id,

          createdAt: p.createdAt || new Date().toISOString(),
        }));

        setPortfolios(normalized);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  //  Delete Portfolio (API)
  const handleDelete = (id: number) => {
    axiosAuthInstance
      .delete(`/api/portfolios/${id}`)
      .then(() => {
        fetchPortfolios();
        setDeleteConfirm(null);
        toast.dismiss();
        toast.success("Portfolio deleted successfully!");
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error("Failed to delete portfolio!");
      });
  };

  //  Duplicate Portfolio (API)
  const handleDuplicate = (id: number) => {
    axiosAuthInstance
      .post(`/api/portfolios/${id}/duplicate`)
      .then(() => {
        fetchPortfolios();
        setDuplicateSuccess(id);

        setTimeout(() => setDuplicateSuccess(null), 3000);
        toast.dismiss();
        toast.success("Portfolio duplicated successfully!");
      })
      .catch(err => {
        console.error(err);
        toast.dismiss();
        toast.error("Failed to duplicate portfolio.");
      });
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
            "url('https://hexagon.com/-/media/project/one-web/master-site/ali/images/hexagon-project-portfolio-management-marquee5-2560x880.jpg?h=880&iar=0&w=2560&hash=7F84FA1C056179AF371975A3B0396663')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
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
          {loading ? (
            <div className="grid grid-cols-3 md:gap-8 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <PortfolioCardSkeleton key={i} />
              ))}
            </div>
          ) : portfolios.length === 0 ? (
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
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/view-portfolio/${portfolio.id}`}>
                            <button className="w-full border border-blue-600 dark:border-blue-400 text-[#04296c] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                              <Eye className="w-4 h-6" />
                            </button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>View</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/create-portfolio?edit=${portfolio.id}`}>
                            <button className="w-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                              <Edit2 className="w-4 h-6" />
                            </button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleDuplicate(portfolio.id)}
                            className="border border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setDeleteConfirm(portfolio.id)}
                            className="border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg font-semibold transition"
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

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-sm w-[400px] mx-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Delete Portfolio?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg"
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
