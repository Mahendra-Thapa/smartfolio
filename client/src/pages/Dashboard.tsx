import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText, Trash2, Edit2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import ScrollToTop from "@/components/ScrollToTop";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { data: portfolios, isLoading } = trpc.portfolio.list.useQuery(
    undefined,
    {
      enabled: isAuthenticated,
    }
  );

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <ScrollToTop />
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900">
            SmartFolio Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <Link href="/">
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              My Portfolios
            </h2>
            <p className="text-slate-600">
              Create and manage your professional portfolios
            </p>
          </div>
          <Link href="/portfolio/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Portfolio
            </Button>
          </Link>
        </div>

        {/* Portfolios Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-600">Loading portfolios...</p>
          </div>
        ) : portfolios && portfolios.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map(portfolio => (
              <Card
                key={portfolio.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      portfolio.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {portfolio.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {portfolio.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {portfolio.description}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/portfolio/${portfolio.id}/edit`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No portfolios yet
            </h3>
            <p className="text-slate-600 mb-6">
              Create your first portfolio to get started
            </p>
            <Link href="/portfolio/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Portfolio
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
