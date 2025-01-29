import React from 'react';
import { Star, StarOff, Trash2, RotateCcw } from 'lucide-react';
import { Email } from '../types';

interface EmailListProps {
  emails: Email[];
  onEmailClick: (email: Email) => void;
  onStarClick: (emailId: string) => void;
  onDelete: (emailId: string) => void;
  onRecover: (emailId: string) => void;
  currentCategory: string;
}

export default function EmailList({
  emails,
  onEmailClick,
  onStarClick,
  onDelete,
  onRecover,
  currentCategory,
}: EmailListProps) {
  if (emails.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-300 mb-2">No emails in {currentCategory}</p>
          <p className="text-gray-400">
            {currentCategory === 'trash'
              ? 'Deleted emails will appear here'
              : 'New emails will appear here'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-950">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`group flex items-center gap-4 p-6 border-b border-gray-800 hover:bg-gray-900 transition-all cursor-pointer ${
            !email.read ? 'bg-gray-900 font-medium' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStarClick(email.id);
              }}
              className="text-gray-500 hover:text-yellow-400 transition-colors"
            >
              {email.starred ? (
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="w-6 h-6" />
              )}
            </button>
            {currentCategory === 'trash' ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRecover(email.id);
                  }}
                  className="text-gray-500 hover:text-green-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Recover email"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(email.id);
                  }}
                  className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete permanently"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(email.id);
                }}
                className="text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title="Move to trash"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            )}
          </div>
          <div
            className="flex-1 min-w-0"
            onClick={() => onEmailClick(email)}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="font-medium text-white text-lg truncate">{email.from}</span>
              <span className="text-sm text-gray-400">
                {new Date(email.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="text-lg text-gray-200 font-medium truncate mb-1">{email.subject}</div>
            <div className="text-gray-400 truncate">{email.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}