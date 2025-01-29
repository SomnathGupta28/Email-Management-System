import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { EmailTemplate } from '../types';

interface ComposeEmailProps {
  onClose: () => void;
  onSend: (email: { to: string; subject: string; body: string }) => void;
  templates: EmailTemplate[];
  onSaveTemplate: (template: Omit<EmailTemplate, 'id'>) => void;
}

export default function ComposeEmail({
  onClose,
  onSend,
  templates,
  onSaveTemplate,
}: ComposeEmailProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleSend = () => {
    if (!to || !subject || !body) {
      alert('Please fill in all fields');
      return;
    }
    onSend({ to, subject, body });
  };

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSubject(template.subject);
    setBody(template.body);
    setShowTemplates(false);
  };

  const handleSaveTemplate = () => {
    if (!templateName || !subject || !body) {
      alert('Please fill in template name and content');
      return;
    }
    onSaveTemplate({
      name: templateName,
      subject,
      body,
    });
    setShowSaveTemplate(false);
    setTemplateName('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-4 z-50">
      <div className="w-full max-w-5xl h-[90vh] bg-gray-900 rounded-2xl shadow-2xl flex flex-col border border-gray-800">
        <div className="flex items-center justify-between p-8 border-b border-gray-800 bg-gray-900 rounded-t-2xl">
          <h2 className="text-3xl font-bold text-white">New Message</h2>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-gray-300 hover:text-white transition-colors p-3 hover:bg-gray-800 rounded-xl"
              title="Use Template"
            >
              {showTemplates ? <ChevronUp className="w-7 h-7" /> : <ChevronDown className="w-7 h-7" />}
            </button>
            <button
              onClick={() => setShowSaveTemplate(!showSaveTemplate)}
              className="text-gray-300 hover:text-white transition-colors p-3 hover:bg-gray-800 rounded-xl"
              title="Save as Template"
            >
              <Save className="w-7 h-7" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors p-3 hover:bg-gray-800 rounded-xl"
              title="Close"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>

        {showTemplates && (
          <div className="border-b border-gray-800 p-6 max-h-64 overflow-auto bg-gray-900">
            <h3 className="text-xl font-bold text-white mb-4 px-4">Templates</h3>
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="w-full text-left px-6 py-4 text-gray-300 hover:bg-gray-800 rounded-xl transition-all"
                >
                  <span className="text-lg font-medium">{template.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {showSaveTemplate && (
          <div className="border-b border-gray-800 p-8 bg-gray-900">
            <h3 className="text-xl font-bold text-white mb-6">Save as Template</h3>
            <input
              type="text"
              placeholder="Template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800 text-white placeholder-gray-400 rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-lg mb-6"
            />
            <button
              onClick={handleSaveTemplate}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/20"
            >
              Save Template
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col min-h-0">
          <div className="space-y-px">
            <input
              type="email"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-8 py-6 bg-gray-900 text-white placeholder-gray-400 border-b border-gray-800 focus:outline-none focus:border-blue-500 text-xl"
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-8 py-6 bg-gray-900 text-white placeholder-gray-400 border-b border-gray-800 focus:outline-none focus:border-blue-500 text-xl"
            />
          </div>
          <textarea
            placeholder="Write your message..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="flex-1 p-8 bg-gray-900 text-white placeholder-gray-400 resize-none focus:outline-none text-xl"
          />
        </div>

        <div className="p-8 border-t border-gray-800 bg-gray-900 rounded-b-2xl">
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700 text-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}