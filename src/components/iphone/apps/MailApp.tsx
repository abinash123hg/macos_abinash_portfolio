import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSButton } from '../ui/IOSButton';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  Mail, 
  Send, 
  Inbox, 
  Star, 
  Archive, 
  Trash2, 
  Check, 
  User, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioHaptics';

export const MailApp: React.FC = () => {
  const [view, setView] = useState<'inbox' | 'compose'>('inbox');
  const [selectedMail, setSelectedMail] = useState<number | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const sampleEmails = [
    {
      id: 1,
      from: 'Enterprise Recruiter',
      email: 'talent@techcorpglobal.com',
      subject: 'Interview Invitation: Data Analyst / AI Engineer Role',
      preview: 'Hi Abinash, we reviewed your 5G small-cell KPI classifier and Oracle Agentic AI certification...',
      body: `Hi Abinash,\n\nWe were extremely impressed by your live demo systems, particularly the 5G Small-Cell KPI Random Forest telemetry model and your Oracle Agentic AI Associate credential.\n\nWe would love to invite you for an introductory technical conversation regarding upcoming opportunities on our Data & AI engineering team.\n\nBest regards,\nTalent Acquisition Team`,
      time: '9:41 AM',
      unread: true,
    },
    {
      id: 2,
      from: 'CUTM Academic Department',
      email: 'cse.ai@cutm.ac.in',
      subject: '3rd Year B.Tech Academic Evaluation • CGPA 8.32',
      preview: 'Congratulations on maintaining consistent academic excellence across ML & Data Structures...',
      body: `Dear Abinash,\n\nThis is an official acknowledgment of your academic standing (8.32 CGPA) in the B.Tech Computer Science & Engineering (AI & ML) program.\n\nKeep up the high standard in your capstone projects!\n\nFaculty Dean`,
      time: 'Yesterday',
      unread: false,
    },
  ];

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sound.success();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setView('inbox');
      setMessage('');
      setSubject('');
    }, 1500);
  };

  return (
    <AppWindow
      id="mail"
      title="Mail"
      subtitle={view === 'inbox' ? `${sampleEmails.length} Messages` : 'New Message'}
      icon={<Mail className="w-4 h-4 text-blue-500" />}
      headerRight={
        view === 'inbox' ? (
          <button
            onClick={() => {
              sound.tap();
              setView('compose');
            }}
            className="text-[#007AFF] text-[14px] font-semibold cursor-pointer"
          >
            Compose
          </button>
        ) : (
          <button
            onClick={() => {
              sound.tap();
              setView('inbox');
            }}
            className="text-[#007AFF] text-[14px] font-normal cursor-pointer"
          >
            Cancel
          </button>
        )
      }
    >
      {view === 'inbox' ? (
        selectedMail === null ? (
          <div className="space-y-4">
            <IOSSectionHeader title="Inbox" />
            <IOSList>
              {sampleEmails.map((mail) => (
                <IOSListItem
                  key={mail.id}
                  icon={<Mail className="w-4 h-4" />}
                  iconBg={mail.unread ? 'bg-[#007AFF]' : 'bg-neutral-500'}
                  title={
                    <span className={mail.unread ? 'font-bold text-neutral-900 dark:text-white' : ''}>
                      {mail.from}
                    </span>
                  }
                  subtitle={
                    <span className="truncate block max-w-[200px]">
                      {mail.subject}
                    </span>
                  }
                  value={<span className="text-[11px] text-neutral-400">{mail.time}</span>}
                  chevron
                  onClick={() => {
                    sound.tap();
                    setSelectedMail(mail.id);
                  }}
                />
              ))}
            </IOSList>

            {/* Quick Contact Card */}
            <IOSCard className="text-center p-4 bg-blue-50/60 dark:bg-blue-950/30 border-blue-200/50">
              <h4 className="text-[14px] font-bold text-neutral-900 dark:text-white">
                Send Direct Message to Abinash
              </h4>
              <p className="text-[12px] text-neutral-500 mt-1 mb-3">
                {portfolioData.email}
              </p>
              <IOSButton
                size="sm"
                variant="primary"
                icon={<Send className="w-3.5 h-3.5" />}
                onClick={() => setView('compose')}
              >
                Draft Email to Abinash
              </IOSButton>
            </IOSCard>
          </div>
        ) : (
          /* Email Detail View */
          <div className="space-y-4">
            {(() => {
              const current = sampleEmails.find(m => m.id === selectedMail);
              if (!current) return null;
              return (
                <div>
                  <button
                    onClick={() => setSelectedMail(null)}
                    className="text-[#007AFF] text-xs font-semibold flex items-center gap-1 mb-3 cursor-pointer"
                  >
                    ← Back to Inbox
                  </button>
                  <IOSCard className="space-y-3">
                    <div>
                      <h3 className="text-[16px] font-bold text-neutral-900 dark:text-white">
                        {current.subject}
                      </h3>
                      <div className="flex items-center justify-between text-[12px] text-neutral-500 mt-1">
                        <span>From: <strong>{current.from}</strong> ({current.email})</span>
                        <span>{current.time}</span>
                      </div>
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 text-[13.5px] text-neutral-800 dark:text-neutral-200 whitespace-pre-line leading-relaxed">
                      {current.body}
                    </div>
                  </IOSCard>
                </div>
              );
            })()}
          </div>
        )
      ) : (
        /* Compose View */
        <form onSubmit={handleSendMail} className="space-y-3">
          <IOSCard className="space-y-2.5">
            <div className="flex items-center text-[13px] border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <span className="w-16 text-neutral-400">To:</span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">{portfolioData.email}</span>
            </div>
            <div className="flex items-center text-[13px] border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <span className="w-16 text-neutral-400">Your Name:</span>
              <input
                type="text"
                required
                placeholder="Recruiter or Hiring Manager"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-neutral-900 dark:text-white text-[13px]"
              />
            </div>
            <div className="flex items-center text-[13px] border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <span className="w-16 text-neutral-400">Subject:</span>
              <input
                type="text"
                required
                placeholder="Job Opportunity / Project Collaboration"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-neutral-900 dark:text-white text-[13px]"
              />
            </div>
            <div>
              <textarea
                required
                rows={5}
                placeholder="Write your note or interview proposal here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-neutral-900 dark:text-white text-[13px] resize-none pt-1"
              />
            </div>
          </IOSCard>

          {sentSuccess ? (
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-center text-xs font-semibold flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" /> Message Sent Successfully!
            </div>
          ) : (
            <IOSButton
              fullWidth
              variant="primary"
              icon={<Send className="w-4 h-4" />}
              type="submit"
            >
              Send Message
            </IOSButton>
          )}
        </form>
      )}
    </AppWindow>
  );
};
