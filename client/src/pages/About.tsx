import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900  flex flex-col">
      <Header />
      <ScrollToTop />
      {/* Page Header */}
      <section
        className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-800 py-28"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/teamwork-human-resources-hr-management-technology-business-kudos_31965-498035.jpg?semt=ais_hybrid&w=740&q=80')`, // path to your image
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 dark:text-white">
            About SmartFolio
          </h1>
          <p className="text-xl text-slate-600 dark:text-white/75">
            Learn more about our mission and vision
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed dark:text-white/75">
              SmartFolio is dedicated to democratizing portfolio creation. We
              believe that everyone deserves a professional online presence,
              regardless of their technical skills or design experience. Our
              mission is to make portfolio building accessible, intuitive, and
              empowering for students, job seekers, and professionals worldwide.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12 dark:text-white">
              Why We Built SmartFolio
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed dark:text-white/75">
              Creating a professional portfolio traditionally requires knowledge
              of web design, coding, and layout planning. Many talented
              individuals struggle to showcase their abilities effectively
              because they lack these technical skills. SmartFolio solves this
              problem by providing an intuitive, user-friendly platform that
              guides you through the portfolio creation process step by step.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12 dark:text-white">
              What Makes Us Different
            </h2>
            <div className="space-y-4">
              {[
                "Simple 4-step process that takes just minutes",
                "Multiple professional templates with customizable color schemes",
                "Real-time preview of your portfolio as you build it",
                "No coding or design skills required",
                "Fully responsive and mobile-friendly portfolios",
                "Easy to edit and update anytime",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1 dark:text-white" />
                  <span className="text-lg text-slate-700 dark:text-white/75">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12 dark:text-white">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Simplicity",
                  description:
                    "We believe in making complex things simple and accessible to everyone.",
                },
                {
                  title: "Quality",
                  description:
                    "We're committed to delivering high-quality, professional portfolios.",
                },
                {
                  title: "Innovation",
                  description:
                    "We continuously improve and innovate to serve our users better.",
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-slate-50 rounded-lg dark:bg-slate-900 dark:rounded dark:border-white dark:border-2 "
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 dark:text-white ">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-white/75">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
