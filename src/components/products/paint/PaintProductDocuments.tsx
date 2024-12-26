import React from 'react';
import { FileText, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size: string;
}

interface PaintProductDocumentsProps {
  documents: Document[];
}

export function PaintProductDocuments({ documents }: PaintProductDocumentsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Documentation technique</h3>
      
      <div className="space-y-2">
        {documents.map((doc) => (
          <a
            key={doc.id}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-primary-500" />
              <div>
                <span className="block font-medium">{doc.name}</span>
                <span className="text-sm text-gray-500">
                  {doc.type} • {doc.size}
                </span>
              </div>
            </div>
            <Download className="h-5 w-5 text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
}