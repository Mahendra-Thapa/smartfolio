import React from "react";
import { useParams, useLocation } from "wouter";
import TemplatePreview from "./TemplatePreview";

const PreviewTemplate: React.FC = () => {
  const { templateId } = useParams();
  const [, setLocation] = useLocation();

  if (!templateId) {
    setLocation("/templates");
    return null;
  }

  return (
    <TemplatePreview 
      templateId={templateId} 
      onClose={() => setLocation("/templates")} 
    />
  );
};

export default PreviewTemplate;