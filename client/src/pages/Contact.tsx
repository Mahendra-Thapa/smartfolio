import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import ScrollToTop from "@/components/ScrollToTop";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <ScrollToTop />
      {/* Page Header */}
      <section
        className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-800 py-28"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/thumbnails/007/925/803/small/contact-us-concept-the-icons-such-as-phone-e-mail-address-chat-global-communication-for-presentation-web-banner-and-article-business-and-network-connection-and-company-vector.jpg')", // replace with your background image path
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/75">
            We'd love to hear from you. Get in touch with us today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 dark:bg-accent ">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 text-white mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: (
                      <Mail className="w-6 h-6 text-blue-600 dark:text-white" />
                    ),
                    title: "Email",
                    content: "info@smartfolio.com",
                    link: "mailto:info@smartfolio.com",
                  },
                  {
                    icon: (
                      <Phone className="w-6 h-6 text-blue-600 dark:text-white" />
                    ),
                    title: "Phone",
                    content: "+977-9804647772",
                    link: "tel:977-9804647772",
                  },
                  {
                    icon: (
                      <MapPin className="w-6 h-6 text-blue-600 dark:text-white" />
                    ),
                    title: "Address",
                    content: "Tinkune, Kathmandu, Nepal",
                    link: "#",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1 dark:text-white">
                        {item.title}
                      </h3>
                      <a
                        href={item.link}
                        className="text-slate-600 hover:text-blue-600 transition dark:text-white/75"
                      >
                        {item.content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="mt-12 p-8 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Business Hours
                </h3>
                <p className="text-slate-600 mb-2">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-slate-600 mb-2">
                  Saturday: 10:00 AM - 4:00 PM
                </p>
                <p className="text-slate-600">Sunday: Closed</p>
              </div> */}
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg ">
                  <p className="text-green-800 font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="your@email.com dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2 dark:text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2 dark:text-white">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
