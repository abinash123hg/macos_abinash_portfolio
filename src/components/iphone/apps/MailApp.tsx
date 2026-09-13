import React, { useRef, useState } from 'react';
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
  const [senderEmail, setSenderEmail] = useState(() => {
    try {
      return window.localStorage.getItem('portfolio-compose-email') || '';
    } catch {
      return '';
    }
  });
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const composeOpenedAt = useRef(Date.now());

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
      subject: 'B.Tech AI/ML Academic Evaluation • CGPA 8.32',
      preview: 'Congratulations on maintaining consistent academic excellence across ML & Data Structures...',
      body: `Dear Abinash,\n\nThis is an official acknowledgment of your academic standing (8.32 CGPA) in the B.Tech AI/ML program.\n\nKeep up the high standard in your capstone projects!\n\nFaculty Dean`,
      time: 'Yesterday',
      unread: false,
    },
  ];

  const handleSendMail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sound.success();
    setSendError('');
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const errors: Record<string, string> = {};
    if (senderName.trim().length < 2) errors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())) errors.email = 'Enter a valid email address.';
    if (subject.trim().length < 3) errors.subject = 'Please add a subject.';
    if (message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
    if (Date.now() - composeOpenedAt.current < 1000) errors.form = 'Please take a moment to review your message.';
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;
    setIsSending(true);

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12000);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject,
          message,
          website: String(formData.get('website') || ''),
        }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error?.message || 'Message could not be sent.');

      setSentSuccess(true);
      window.setTimeout(() => {
        setSentSuccess(false);
        setView('inbox');
        setSenderName('');
        setMessage('');
        setSubject('');
      }, 1500);
    } catch (error) {
      setSendError(error instanceof DOMException && error.name === 'AbortError' ? 'The request took too long. Please try again.' : error instanceof Error ? error.message : 'Message could not be sent.');
    } finally {
      setIsSending(false);
    }
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
              composeOpenedAt.current = Date.now();
              setFieldErrors({});
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
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {fieldErrors.form && <p role="alert" className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-center text-xs text-amber-700 dark:text-amber-300">{fieldErrors.form}</p>}
          <IOSCard className="space-y-2.5">
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <label htmlFor="iphone-mail-from" className="mb-1 block text-[12px] font-semibold text-neutral-400">From (Your Gmail)</label>
              <input
                id="iphone-mail-from"
                type="email"
                required
                autoComplete="email"
                placeholder="you@gmail.com"
                value={senderEmail}
                onChange={(e) => {
                  const email = e.target.value;
                  setSenderEmail(email);
                  try {
                    window.localStorage.setItem('portfolio-compose-email', email);
                  } catch {
                    // Local storage can be unavailable in private browsing.
                  }
                }}
                className="w-full rounded-lg bg-neutral-100/70 px-2.5 py-2 text-[13px] text-neutral-900 outline-none focus:ring-2 focus:ring-[#007AFF]/40 dark:bg-neutral-800/70 dark:text-white"
              />
              {fieldErrors.email && <p className="mt-1 text-[11px] text-red-600 dark:text-red-400" role="alert">{fieldErrors.email}</p>}
            </div>
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <label htmlFor="iphone-mail-to" className="mb-1 block text-[12px] font-semibold text-neutral-400">To</label>
              <input
                id="iphone-mail-to"
                type="text"
                readOnly
                value={`${portfolioData.name} <${portfolioData.email}>`}
                className="w-full rounded-lg bg-neutral-100/70 px-2.5 py-2 text-[13px] font-medium text-neutral-800 outline-none dark:bg-neutral-800/70 dark:text-neutral-200"
              />
            </div>
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <label htmlFor="iphone-mail-name" className="mb-1 block text-[12px] font-semibold text-neutral-400">Your Name</label>
              <input
                id="iphone-mail-name"
                type="text"
                required
                placeholder="Recruiter or Hiring Manager"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-neutral-900 dark:text-white text-[13px]"
              />
              {fieldErrors.name && <p className="mt-1 text-[11px] text-red-600 dark:text-red-400" role="alert">{fieldErrors.name}</p>}
            </div>
            <div className="border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <label htmlFor="iphone-mail-subject" className="mb-1 block text-[12px] font-semibold text-neutral-400">Subject</label>
              <input
                id="iphone-mail-subject"
                type="text"
                required
                placeholder="Job Opportunity / Project Collaboration"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-neutral-900 dark:text-white text-[13px]"
              />
              {fieldErrors.subject && <p className="mt-1 text-[11px] text-red-600 dark:text-red-400" role="alert">{fieldErrors.subject}</p>}
            </div>
            <div>
              <label htmlFor="iphone-mail-message" className="mb-1 block text-[12px] font-semibold text-neutral-400">Message</label>
              <textarea
                id="iphone-mail-message"
                required
                rows={5}
                placeholder="Write your note or interview proposal here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-neutral-900 dark:text-white text-[13px] resize-none pt-1"
              />
              {fieldErrors.message && <p className="mt-1 text-[11px] text-red-600 dark:text-red-400" role="alert">{fieldErrors.message}</p>}
            </div>
          </IOSCard>

          {sendError && <p role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs text-red-600 dark:text-red-400">{sendError}</p>}

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
              disabled={isSending}
            >
              {isSending ? 'Sending message…' : 'Send Message'}
            </IOSButton>
          )}
        </form>
      )}
    </AppWindow>
  );
};
