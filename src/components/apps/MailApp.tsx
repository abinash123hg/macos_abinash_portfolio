import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Mail, 
  Send, 
  Inbox, 
  Star, 
  Trash2, 
  Reply, 
  CheckCircle, 
  User, 
  Paperclip, 
  Sparkles 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

interface EmailItem {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  date: string;
  body: string;
  unread: boolean;
  starred?: boolean;
}

const INITIAL_EMAILS: EmailItem[] = [
  {
    id: 'mail-1',
    sender: 'Oracle University Credentials',
    senderEmail: 'certifications@oracle.com',
    subject: 'Verification Confirmed: Agentic AI Certified Foundations Associate',
    preview: 'Congratulations Abinash! Your Oracle Agentic AI certification is officially registered...',
    date: 'Aug 17, 2026',
    unread: false,
    starred: true,
    body: `Dear Abinash Swain,

We are delighted to confirm that your official credential for Oracle Certified Foundations Associate — Agentic AI has been verified and registered in the Oracle Global Database under Verification ID: 103519150AAI26OFA.

Your mastery in autonomous agent loops, multi-agent frameworks, and enterprise AI orchestration has met the highest technical standards.

Best regards,
Oracle University Certification Board`
  },
  {
    id: 'mail-2',
    sender: 'Tata & Forage Programs',
    senderEmail: 'jobsim@forage.com',
    subject: 'GenAI Powered Data Analytics Simulation Complete',
    preview: 'Abinash, your practical tasks for the Tata GenAI analytics simulation have been reviewed...',
    date: 'Aug 12, 2026',
    unread: false,
    starred: true,
    body: `Hello Abinash,

Your completion of the GenAI Powered Data Analytics Job Simulation has been formally certified (Verification: 6a7c8a233266dbc982059c85).

Key evaluated tasks:
1. Exploratory Data Analysis & Delinquency Profiling
2. AI-driven predictive modeling for collection strategies
3. Executive data storytelling & reporting

Congratulations on your analytical excellence!`
  },
  {
    id: 'mail-3',
    sender: 'Centurion University CUTM',
    senderEmail: 'academics@cutm.ac.in',
    subject: 'Semester Academic Standing — CGPA: 8.32',
    preview: 'Department of Computer Science & Engineering (AI & ML) official records...',
    date: 'Aug 05, 2026',
    unread: true,
    starred: false,
    body: `Dear Abinash,

Your current academic performance in the B.Tech AI/ML program stands at CGPA 8.32 / 10.0. Keep up the high standard in Machine Learning, Statistical Analysis, and Predictive Modeling coursework.

CUTM Examination & Academic Cell`
  }
];

interface MailAppProps {
  initialCompose?: boolean;
  onInitialComposeHandled?: () => void;
}

export const MailApp: React.FC<MailAppProps> = ({ initialCompose = false, onInitialComposeHandled }) => {
  const [emails, setEmails] = useState<EmailItem[]>(INITIAL_EMAILS);
  const [selectedMailId, setSelectedMailId] = useState<string>(INITIAL_EMAILS[0].id);
  const [isComposing, setIsComposing] = useState(initialCompose);
  
  // Compose form states
  const [composeName, setComposeName] = useState('');
  const [composeEmail, setComposeEmail] = useState(() => {
    try {
      return window.localStorage.getItem('portfolio-compose-email') || '';
    } catch {
      return '';
    }
  });
  const [composeSubject, setComposeSubject] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const composeOpenedAt = useRef(Date.now());

  useEffect(() => {
    if (initialCompose) onInitialComposeHandled?.();
  }, [initialCompose, onInitialComposeHandled]);

  const selectedMail = emails.find(e => e.id === selectedMailId) || emails[0];

  const handleSelectMail = (id: string) => {
    sound.tap();
    setSelectedMailId(id);
    setIsComposing(false);
    setEmails(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m));
  };

  const handleSendCompose = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.tap();
    setSendError('');
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const errors: Record<string, string> = {};
    if (composeName.trim().length < 2) errors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(composeEmail.trim())) errors.email = 'Enter a valid email address.';
    if (composeSubject.trim().length < 3) errors.subject = 'Please add a subject.';
    if (composeMessage.trim().length < 10) errors.message = 'Please write at least 10 characters.';
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
          name: composeName,
          email: composeEmail,
          subject: composeSubject,
          message: composeMessage,
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
        setIsComposing(false);
        setComposeName('');
        setComposeEmail('');
        setComposeMessage('');
        setComposeSubject('');
      }, 2000);
    } catch (error) {
      setSendError(error instanceof DOMException && error.name === 'AbortError' ? 'The request took too long. Please try again.' : error instanceof Error ? error.message : 'Message could not be sent.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-neutral-950/90 text-neutral-100 overflow-hidden select-text">
      {/* Sidebar: Mailboxes & Compose Button */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-900/30 p-3 flex flex-col shrink-0">
        <button
          onClick={() => {
            sound.tap();
            composeOpenedAt.current = Date.now();
            setFieldErrors({});
            setIsComposing(true);
          }}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 mb-3 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Compose to Abinash
        </button>

        <div className="flex-1 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-2 py-1">
            Mailboxes
          </div>
          <button
            onClick={() => { sound.tap(); setIsComposing(false); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
              !isComposing ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-850'
            }`}
          >
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-cyan-400" />
              <span>Inbox</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
              {emails.filter(e => e.unread).length || 3}
            </span>
          </button>
        </div>

        {/* Quick Contact Info in Mail */}
        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-[11px] space-y-1 text-neutral-400">
          <div className="font-semibold text-neutral-300">Direct Email:</div>
          <button
            type="button"
            onClick={() => {
              sound.tap();
              composeOpenedAt.current = Date.now();
              setFieldErrors({});
              setIsComposing(true);
            }}
            className="text-left text-cyan-400 break-all hover:underline block font-mono cursor-pointer"
          >
            {portfolioData.email}
          </button>
          <div>Phone: {portfolioData.phone}</div>
        </div>
      </div>

      {/* Message List Column */}
      <div className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-900/20 flex flex-col shrink-0">
        <div className="p-3 border-b border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-400">
          <span>Official Inbox</span>
          <span className="text-[11px] font-mono text-neutral-500">{emails.length} Messages</span>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {emails.map((mail) => {
            const isSelected = !isComposing && selectedMailId === mail.id;
            return (
              <button
                key={mail.id}
                onClick={() => handleSelectMail(mail.id)}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-neutral-800/90 border-cyan-500/50 text-white shadow-xs'
                    : 'bg-neutral-900/30 border-neutral-800/60 hover:bg-neutral-900/80 text-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold truncate ${mail.unread ? 'text-cyan-400' : 'text-neutral-200'}`}>
                    {mail.sender}
                  </span>
                  <span className="text-[10px] text-neutral-500">{mail.date}</span>
                </div>
                <div className="text-xs font-medium text-neutral-300 truncate">{mail.subject}</div>
                <div className="text-[11px] text-neutral-500 truncate">{mail.preview}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reader or Compose View */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-neutral-950/60">
        {isComposing ? (
          /* Compose View */
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
            <div className="border-b border-neutral-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                New Message to Abinash Swain
              </h2>
            </div>

            {sentSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Ready to Send!</h3>
                <p className="text-xs text-neutral-400">Message prepared in Portfolio Mail for {portfolioData.email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSendCompose} className="space-y-3">
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                {fieldErrors.form && <p role="alert" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-300">{fieldErrors.form}</p>}
                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1" htmlFor="mail-from">From (Your Gmail)</label>
                  <input
                    id="mail-from"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@gmail.com"
                    value={composeEmail}
                    onChange={(e) => {
                      const email = e.target.value;
                      setComposeEmail(email);
                      try {
                        window.localStorage.setItem('portfolio-compose-email', email);
                      } catch {
                        // Local storage can be unavailable in private browsing.
                      }
                    }}
                    className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  {fieldErrors.email && <p className="mt-1 text-[11px] text-red-300" role="alert">{fieldErrors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1" htmlFor="mail-to">To</label>
                  <input
                    id="mail-to"
                    type="text"
                    readOnly
                    value={`${portfolioData.name} <${portfolioData.email}>`}
                    className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                  {fieldErrors.name && <p className="mt-1 text-[11px] text-red-300" role="alert">{fieldErrors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1" htmlFor="mail-name">Your Name</label>
                  <input
                    id="mail-name"
                    type="text"
                    required
                    placeholder="e.g. Recruiter / Collaborator"
                    value={composeName}
                    onChange={(e) => setComposeName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  {fieldErrors.subject && <p className="mt-1 text-[11px] text-red-300" role="alert">{fieldErrors.subject}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1" htmlFor="mail-subject">Subject</label>
                  <input
                    id="mail-subject"
                    type="text"
                    required
                    placeholder="e.g. Data Analyst / AI Engineering Opportunity"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  {fieldErrors.message && <p className="mt-1 text-[11px] text-red-300" role="alert">{fieldErrors.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1" htmlFor="mail-message">Message</label>
                  <textarea
                    id="mail-message"
                    rows={6}
                    required
                    placeholder="Hi Abinash, I was impressed by your 5G SLA management model and SafeDrive AI project..."
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                {sendError && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">{sendError}</p>}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSending ? 'Sending message…' : 'Prepare Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Email Detail View */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-neutral-800 bg-neutral-900/20 shrink-0 space-y-2">
              <h1 className="text-base sm:text-lg font-bold text-white">{selectedMail.subject}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="text-neutral-300">
                  <span className="font-semibold text-white">{selectedMail.sender}</span>
                  <span className="text-neutral-500 ml-1.5 font-mono text-[11px]">&lt;{selectedMail.senderEmail}&gt;</span>
                </div>
                <div className="text-neutral-500 text-[11px]">{selectedMail.date}</div>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal whitespace-pre-line">
                {selectedMail.body}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
