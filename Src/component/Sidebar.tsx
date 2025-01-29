import React from 'react';
import { Inbox, Send, Star, Trash2, Mail, Users, Tag } from 'lucide-react';

interface SidebarProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  onCompose: () => void;
}

export default function Sidebar({ currentCategory, onCategoryChange, onCompose }: SidebarProps) {
  const categories = [
    { id: 'primary', icon: Inbox, label: 'Primary' },
    { id: 'social', icon: Users, label: 'Social' },
    { id: 'promotions', icon: Tag, label: 'Promotions' },
    { id: 'starred', icon: Star, label: 'Starred' },
    { id: 'sent', icon: Send, label: 'Sent' },
    { id: 'trash', icon: Trash2, label: 'Trash' },
  ];

  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 h-full flex flex-col">
      <div className="p-6">
        <button
          onClick={onCompose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-4 flex items-center gap-3 transition-colors font-bold text-lg shadow-lg hover:shadow-blue-500/20"
        >
          <Mail className="w-6 h-6" />
          <span>Compose</span>
        </button>
      </div>
      
      <nav className="flex-1 px-2">
        {categories.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onCategoryChange(id)}
            className={`w-full flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-gray-800 rounded-xl transition-all ${
              currentCategory === id ? 'bg-gray-800 text-white font-bold shadow-lg' : ''
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-lg">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}