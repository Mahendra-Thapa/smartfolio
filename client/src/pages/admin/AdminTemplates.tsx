import Footer from "@/components/Footer";
import { TEMPLATES } from "@/components/PortfolioTemplates";
import ScrollToTop from "@/components/ScrollToTop";
import TemplatePreview from "@/components/preview/TemplatePreview";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function AdminTemplates() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
    
      <section
       
      >
       

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white my-4">
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
                <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-800 flex items-center justify-center object-center bg-cover bg-center" 
                style={{backgroundImage: `url("/placeholder.png")`}}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2 dark:text-white">
                      {template.name}
                    </div>
                    <p className="text-slate-800 dark:text-slate-100">
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
                      onClick={() => setSelectedTemplateId(template.id)}
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
      

    

      {/* <Footer /> */}

      {selectedTemplateId && (
        <TemplatePreview 
          templateId={selectedTemplateId} 
          onClose={() => setSelectedTemplateId(null)} 
        />
      )}
    </div>
  );
}
