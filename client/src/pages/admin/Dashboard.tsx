import { CheckCircle, Clock, Folder, User } from "lucide-react";
import React from "react";

const Dashboard: React.FC = () => {
  // Temporary static data (replace with API later)
  const stats = [
    { title: "Total Users", value: 128 },
    { title: "Total Portfolios", value: 342 },
    { title: "Active Portfolios", value: 290 },
    { title: "Pending Reviews", value: 18 },
  ];

  const latestPortfolios = [
    {
      id: 1,
      name: "John Doe",
      title: "Frontend Developer Portfolio",
      createdAt: "2026-02-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "UI/UX Designer Portfolio",
      createdAt: "2026-02-14",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alex Thapa",
      title: "Full Stack Developer",
      createdAt: "2026-02-13",
      status: "Active",
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
      <div className="p-6 space-y-8">
        {/* Page Title */}
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex items-center gap-4"
            >
              {/* Icon */}
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400">
                {index === 0 && <User className="w-6 h-6" />}
                {index === 1 && <Folder className="w-6 h-6" />}
                {index === 2 && <CheckCircle className="w-6 h-6" />}
                {index === 3 && <Clock className="w-6 h-6" />}
              </div>

              {/* Content */}
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Portfolios */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Latest Portfolios</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                  <th className="py-3">User</th>
                  <th>Portfolio Title</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {latestPortfolios.map(portfolio => (
                  <tr
                    key={portfolio.id}
                    className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-700/40 transition"
                  >
                    <td className="py-3">{portfolio.name}</td>
                    <td>{portfolio.title}</td>
                    <td>{portfolio.createdAt}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          portfolio.status === "Active"
                            ? "bg-green-500/20 text-green-600 dark:text-green-400"
                            : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                        }`}
                      >
                        {portfolio.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
