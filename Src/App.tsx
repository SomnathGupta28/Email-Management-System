import React, { useState } from 'react';
import { User } from 'lucide-react';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import ComposeEmail from './components/ComposeEmail';
import UserProfile from './components/UserProfile';
import { dummyEmails, emailTemplates as initialTemplates } from './data/emails';
import { Email, EmailTemplate } from './types';

function App() {
  const [emails, setEmails] = useState<Email[]>(dummyEmails);
  const [currentCategory, setCurrentCategory] = useState('primary');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [showProfile, setShowProfile] = useState(false);

  const userProfile = {
    name: 'Somnath',
    email: '22BCS12737@cuchd.in'
  };

  const filteredEmails = emails.filter((email) => {
    if (currentCategory === 'starred') return email.starred;
    return email.category === currentCategory;
  });

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setEmails(emails.map((e) => 
      e.id === email.id ? { ...e, read: true } : e
    ));
  };

  const handleStarClick = (emailId: string) => {
    setEmails(emails.map((email) =>
      email.id === emailId ? { ...email, starred: !email.starred } : email
    ));
  };

  const handleDeleteEmail = (emailId: string) => {
    if (currentCategory === 'trash') {
      setEmails(emails.filter(email => email.id !== emailId));
    } else {
      setEmails(emails.map(email =>
        email.id === emailId ? { ...email, category: 'trash' } : email
      ));
    }
  };

  const handleRecoverEmail = (emailId: string) => {
    const emailToRecover = emails.find(email => email.id === emailId);
    if (emailToRecover) {
      setEmails(emails.map(email =>
        email.id === emailId ? { ...email, category: 'primary' } : email
      ));
    }
  };

  const handleSendEmail = (email: { to: string; subject: string; body: string }) => {
    const newEmail: Email = {
      id: Date.now().toString(),
      from: userProfile.email,
      to: email.to,
      subject: email.subject,
      body: email.body,
      timestamp: new Date().toISOString(),
      read: true,
      category: 'sent',
      starred: false,
    };
    setEmails([newEmail, ...emails]);
    setShowCompose(false);
  };

  const handleSaveTemplate = (template: Omit<EmailTemplate, 'id'>) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: Date.now().toString(),
    };
    setEmailTemplates([...emailTemplates, newTemplate]);
  };

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar 
        currentCategory={currentCategory} 
        onCategoryChange={setCurrentCategory}
        onCompose={() => setShowCompose(true)}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </h1>
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
          >
            <User className="w-5 h-5 text-gray-300" />
            <span className="text-gray-300">{userProfile.name}</span>
          </button>
        </header>
        <EmailList
          emails={filteredEmails}
          onEmailClick={handleEmailClick}
          onStarClick={handleStarClick}
          onDelete={handleDeleteEmail}
          onRecover={handleRecoverEmail}
          currentCategory={currentCategory}
        />
        {selectedEmail && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-40">
            <div className="bg-gray-900 rounded-2xl max-w-3xl w-full p-8 shadow-2xl border border-gray-800">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">{selectedEmail.subject}</h2>
                  {currentCategory === 'sent' ? (
                    <>
                      <p className="text-lg text-gray-300">To: {selectedEmail.to}</p>
                      <p className="text-lg text-gray-400">From: {selectedEmail.from}</p>
                    </>
                  ) : (
                    <p className="text-lg text-gray-300">From: {selectedEmail.from}</p>
                  )}
                  <p className="text-gray-400">
                    {new Date(selectedEmail.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-200 text-lg whitespace-pre-wrap">{selectedEmail.body}</p>
              </div>
            </div>
          </div>
        )}
        {showProfile && (
          <UserProfile userProfile={userProfile} onClose={() => setShowProfile(false)} />
        )}
        {showCompose && (
          <ComposeEmail
            onClose={() => setShowCompose(false)}
            onSend={handleSendEmail}
            templates={emailTemplates}
            onSaveTemplate={handleSaveTemplate}
          />
        )}
      </main>
    </div>
  );
}

export default App;