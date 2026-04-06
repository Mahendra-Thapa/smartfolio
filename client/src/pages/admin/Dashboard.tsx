"use client";

import { axiosAuthInstance, axiosInstance } from "@/utils/axiosInstance";
import {
  BlocksIcon,
  CheckCircle,
  Folder,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [latestPortfolios, setLatestPortfolios] = useState<any[]>([]);

  // ✅ Fetch dashboard data + latest portfolios
  useEffect(() => {
    // Dashboard stats
    axiosAuthInstance
      .get("/api/admin/dashboard")
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((err) => {
        console.error("Dashboard API Error:", err);
      });

    // Latest portfolios
    axiosAuthInstance
      .get("/api/portfolios/latest")
      .then((res) => {
        setLatestPortfolios(res.data);
      })
      .catch((err) => {
        console.error("Latest Portfolio API Error:", err);
      });
  }, []);

  // ✅ Stats mapping
  const stats = [
    {
      title: "Total Portfolios",
      value: dashboardData?.totalPortfolios || 0,
    },
    {
      title: "Total Users",
      value: dashboardData?.totalUsers || 0,
    },
    {
      title: "Approved User",
      value: dashboardData?.approvedUsers || 0,
    },
    {
      title: "Suspended Users",
      value: dashboardData?.suspendedUsers || 0,
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400">
                {index === 0 && <Folder className="w-6 h-6" />}
                {index === 1 && <User className="w-6 h-6" />}
                {index === 2 && <CheckCircle className="w-6 h-6" />}
                {index === 3 && <BlocksIcon className="w-6 h-6" />}
              </div>

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

          <div className="overflow-x-scroll">
            <table className="w-full text-left text-sm min-w-xl">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                  <th className="py-3">User</th>
                  <th>Portfolio Title</th>
                  <th>Template</th>
                  <th>email</th>
                </tr>
              </thead>

              <tbody>
                {latestPortfolios.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-4 text-slate-500"
                    >
                      No recent portfolios found
                    </td>
                  </tr>
                ) : (
                  latestPortfolios.map((portfolio) => (
                    <tr
                      key={portfolio.id}
                      className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-700/40 transition"
                    >
                      <td className="py-3">
                        {portfolio.name || "N/A"}
                      </td>
                      <td>{portfolio.title}</td>
                      <td>{portfolio.templateId}</td>
                      <td>{portfolio.email}</td>
                      {/* <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            portfolio.status === "ACTIVE"
                              ? "bg-green-500/20 text-green-600 dark:text-green-400"
                              : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {portfolio.status}
                        </span>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;