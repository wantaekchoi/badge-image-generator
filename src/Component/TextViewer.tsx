import React from "react";
import "./TextViewer.css";

interface TextViewerProps {
  label?: string;
  data: object;
}

const TextViewer: React.FC<TextViewerProps> = ({ label, data }) => {
  return (
    <div className="text-viewer-container">
      {label && <h3>{label}</h3>}
      <pre className="text-viewer-content">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TextViewer;
