import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Zap,
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Bot,
} from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col transition-colors duration-300">
      <Header />
      <ScrollToTop />
      {/* Hero Section */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent opacity-60"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-900 dark:to-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="max-w-4xl mx-auto text-center lg:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Create Your Professional Portfolio in
                <span className="bg-gradient-to-r from-[#04296c] to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Minutes
                </span>
              </h1>

              <p className="text-sm md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
                SmartFolio helps you build a stunning, professional portfolio
                without any coding or design skills. Perfect for students, job
                seekers, and professionals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link href="/create-portfolio">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-[#04296c] hover:from-blue-700 hover:to-[#04296c] text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    {/* <Sparkles className="w-5 h-5" /> */}
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link href="/templates">
                  <button className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                    View Templates
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <img
                  src="/portfoliSideBanner.jpg"
                  alt="Portfolio Preview"
                  className="rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700"
                />

                {/* Decorative gradient blur */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose SmartFolio?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Everything you need to create a professional portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Bot className="w-8 h-8 text-blue-600" />,
                title: "AI-Powered",
                description: "Get intelligent suggestions for your content",
              },
              {
                icon: <FileText className="w-8 h-8 text-purple-600" />,
                title: "Easy to Use",
                description: "Simple 4-step process to create your portfolio",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-pink-600" />,
                title: "Professional Templates",
                description: "Choose from modern, responsive templates",
              },
              {
                icon: <Zap className="w-8 h-8 text-orange-600" />,
                title: "Instant Preview",
                description: "See your portfolio in real-time as you build",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="mb-4 p-3 bg-white dark:bg-slate-600 rounded-lg w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Personal Info",
                description: "Enter your name, title, and introduction",
              },
              {
                step: "2",
                title: "Education & Skills",
                description: "Add your education, skills, and qualifications",
              },
              {
                step: "3",
                title: "Experience",
                description: "Share your work experience and achievements",
              },
              {
                step: "4",
                title: "Download Code",
                description: "Get your portfolio as a Next.js project",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-[#04296c] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
                Packed with Features
              </h2>
              <ul className="space-y-4">
                {[
                  "Multiple professional templates with color customization",
                  "Real-time portfolio preview while building",
                  "Download portfolio as Next.js project",
                  "Fully responsive and mobile-friendly design",
                  "Easy to edit and update anytime",
                  "No coding or design skills required",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-800 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 h-96 flex items-center justify-center">
            <img width={200} height={200} src="/Packed with Features" alt="" />
              <div className="text-center">
                <Bot className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-600 dark:text-slate-400">
                  Portfolio Preview
                </p>
              </div>
            </div> */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <img
                  src="/portfolioSave.png"
                  alt="Portfolio Preview"
                  className="rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700"
                />

                {/* Decorative gradient blur */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 to-[#04296c] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students and professionals who have created
            stunning portfolios with SmartFolio.
          </p>
          <Link href="/create-portfolio">
            <button className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl ">
              Start Creating Now
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
