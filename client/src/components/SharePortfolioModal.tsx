import { useState } from "react";
import { Share2, Copy, Check, Linkedin, Twitter, Mail, X } from "lucide-react";

interface SharePortfolioModalProps {
  portfolioId: string;
  portfolioTitle: string;
  onClose?: () => void;
}

export default function SharePortfolioModal({
  portfolioId,
  portfolioTitle,
  onClose,
}: SharePortfolioModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/view-portfolio/${portfolioId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(portfolioTitle);

    let url = "";
    switch (platform) {
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=Check%20out%20my%20portfolio:%20${encodedTitle}`;
        break;
      case "email":
        url = `mailto:?subject=${encodedTitle}&body=Check%20out%20my%20portfolio:%20${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCopied(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      {/* Share Button */}
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
        title="Share portfolio"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium">Share</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Modal Content */}
          <div
            className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-md w-full p-6 animate-in fade-in scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Share2 className="w-6 h-6" />
                Share Portfolio
              </h2>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Portfolio Title */}
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
              Share "{portfolioTitle}" with others
            </p>

            {/* Share Link Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Portfolio Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-mono"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded font-medium transition-all flex items-center gap-2 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 dark:border-slate-700 my-6"></div>

            {/* Social Sharing */}
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Share on Social Media
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors font-medium"
                  title="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare("email")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
                  title="Share via Email"
                >
                  <Mail className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Email</span>
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-full mt-6 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
