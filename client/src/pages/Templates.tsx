import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TEMPLATES } from "@/components/PortfolioTemplates";
import { Link } from "wouter";
import { Eye } from "lucide-react";
import { useState } from "react";
import ScrollToTop from "@/components/ScrollToTop";

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <ScrollToTop />
      {/* Page Header */}
      <section
        className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-800 py-28"
        style={{
          backgroundImage: `url('https://t3.ftcdn.net/jpg/16/67/66/16/360_F_1667661606_1w7kl0okt3afGXVCSfQ7GEjzxR6OVYPB.jpg')`, // replace with your image path
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Portfolio Templates
          </h1>
          <p className="text-xl text-slate-600 dark:text-white/75">
            Choose from our professionally designed templates
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20 dark:bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {TEMPLATES.map(template => (
              <div
                key={template.id}
                className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Template Preview */}
                <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-400 mb-2 dark:text-white">
                      {template.name}
                    </div>
                    <p className="text-slate-500 dark:text-slate-100">
                      Template Preview
                    </p>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 dark:text-white">
                    {template.name}
                  </h3>
                  <p className="text-slate-600 mb-6 dark:text-white/75">
                    {template.description}
                  </p>

                  {/* Color Schemes */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-slate-900 mb-3 dark:text-white">
                      Available Colors:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {template.colorSchemes.map(scheme => (
                        <div
                          key={scheme.id}
                          className="w-8 h-8 rounded-full border-2 border-slate-300 hover:border-slate-600 cursor-pointer transition"
                          style={{ backgroundColor: scheme.primary }}
                          title={scheme.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedTemplate(template.id)}
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <Link href="/create-portfolio">
                      <button className="flex-1 bg-[#04296c] hover:bg-[#04296c]/80 text-white px-4 py-2 rounded-lg font-semibold transition">
                        Use Template
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Features */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 dark:text-white">
            All Templates Include
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Responsive Design",
                description: "Works perfectly on all devices and screen sizes",
              },
              {
                title: "Customizable Colors",
                description:
                  "Choose from multiple color schemes for each template",
              },
              {
                title: "Easy to Edit",
                description:
                  "Simple interface to update your portfolio anytime",
              },
              {
                title: "Professional Look",
                description:
                  "Impress employers and clients with a polished design",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
