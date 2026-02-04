import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function PortfolioCreate() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [userProfile, setUserProfile] = useState<"student" | "fresher" | "professional">("student");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: templates } = trpc.template.list.useQuery();
  const createMutation = trpc.portfolio.create.useMutation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a portfolio title");
      return;
    }

    if (!templateId) {
      toast.error("Please select a template");
      return;
    }

    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync({
        title,
        description,
        templateId,
        userProfile,
      });

      toast.success("Portfolio created successfully!");
      setLocation("/dashboard");
    } catch (error) {
      toast.error("Failed to create portfolio");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
       <ScrollToTop />
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create New Portfolio</h1>
          <p className="text-slate-600 mb-8">Fill in the details below to get started</p>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-semibold text-slate-900">
                  Portfolio Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., My Professional Portfolio"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-semibold text-slate-900">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your portfolio"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="profile" className="text-base font-semibold text-slate-900">
                  I am a...
                </Label>
                <Select value={userProfile} onValueChange={(value: any) => setUserProfile(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="fresher">Fresher/Graduate</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="template" className="text-base font-semibold text-slate-900">
                  Select Template
                </Label>
                <Select value={templateId} onValueChange={setTemplateId}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates?.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Creating..." : "Create Portfolio"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
