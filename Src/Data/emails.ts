import { Email, EmailTemplate } from '../types';

export const dummyEmails: Email[] = [
  {
    id: '1',
    from: 'john.doe@example.com',
    subject: 'Project Update Meeting',
    body: 'Hi team, let\'s sync up tomorrow at 10 AM to discuss the latest project developments.',
    timestamp: '2024-03-15T10:30:00',
    read: false,
    category: 'primary',
    starred: false,
  },
  {
    id: '2',
    from: 'sarah.smith@company.com',
    subject: 'Design Review',
    body: 'The new design mockups are ready for review. Please provide your feedback by EOD.',
    timestamp: '2024-03-15T09:15:00',
    read: true,
    category: 'primary',
    starred: true,
  },
  {
    id: '3',
    from: 'linkedin@mail.linkedin.com',
    subject: 'New connection requests',
    body: 'You have 3 new connection requests waiting for your response.',
    timestamp: '2024-03-15T08:45:00',
    read: false,
    category: 'social',
    starred: false,
  },
  {
    id: '4',
    from: 'github@github.com',
    subject: 'Pull Request Review',
    body: 'A new pull request has been opened in your repository.',
    timestamp: '2024-03-14T16:30:00',
    read: true,
    category: 'primary',
    starred: true,
  },
  {
    id: '5',
    from: 'newsletter@medium.com',
    subject: 'Your Weekly Reading Digest',
    body: 'Check out the top stories in your personalized reading list.',
    timestamp: '2024-03-14T14:20:00',
    read: true,
    category: 'promotions',
    starred: false,
  }
];

export const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Meeting Request',
    subject: 'Meeting Request: [Topic]',
    body: 'Hi [Name],\n\nI would like to schedule a meeting to discuss [topic].\n\nProposed time: [Time]\nDuration: [Duration]\n\nBest regards,\n[Your Name]',
  },
  {
    id: '2',
    name: 'Project Update',
    subject: 'Project Status Update',
    body: 'Hi team,\n\nHere\'s the latest update on our project:\n\nProgress:\n- [Achievement 1]\n- [Achievement 2]\n\nNext Steps:\n- [Step 1]\n- [Step 2]\n\nBest regards,\n[Your Name]',
  }
];