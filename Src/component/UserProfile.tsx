import React, { useState } from 'react';
import { X, User, Settings, LogOut, Moon, Bell, Shield, HelpCircle, Keyboard } from 'lucide-react';

interface UserProfileProps {
  userProfile: {
    name: string;
    email: string;
  };
  onClose: () => void;
}

export default function UserProfile({ userProfile, onClose }: UserProfileProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);

  const sections = [
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-gray-400" />
              <span>Dark Mode</span>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`w-12 h-6 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-600'
              } relative`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <span>Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-gray-600'
              } relative`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      icon: Shield,
      label: 'Security',
      content: (
        <div className="space-y-4">
          <button className="w-full text-left p-3 hover:bg-gray-800 rounded-lg flex items-center gap-3">
            <span className="text-blue-500">•</span>
            Change Password
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-800 rounded-lg flex items-center gap-3">
            <span className="text-blue-500">•</span>
            Two-factor Authentication
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-800 rounded-lg flex items-center gap-3">
            <span className="text-blue-500">•</span>
            Connected Devices
          </button>
        </div>
      ),
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help & Support',
      content: (
        <div className="space-y-4">
          <button className="w-full text-left p-3 hover:bg-gray-800 rounded-lg flex items-center gap-3">
            <span className="text-blue-500">•</span>
            Help Center
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-800 rounded-lg flex items-center gap-3">
            <span className="text-blue-500">•</span>
            Contact Support
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-800 rounded-lg flex items-center gap-3">
            <span className="text-blue-500">•</span>
            Keyboard Shortcuts
            <Keyboard className="w-4 h-4 ml-auto" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-gray-800">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-[250px,1fr] gap-8">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center group relative cursor-pointer hover:bg-blue-700 transition-colors">
                  <span className="text-4xl font-bold text-white">{userProfile.name[0]}</span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm text-white">Change</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{userProfile.name}</h3>
                <p className="text-gray-400">{userProfile.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </button>
              ))}
              <button
                className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-red-500 hover:bg-gray-800"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>

          <div className="border-l border-gray-800 pl-8">
            {activeSection ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">
                  {sections.find((s) => s.id === activeSection)?.label}
                </h3>
                {sections.find((s) => s.id === activeSection)?.content}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a section to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}