import React, { useState } from 'react';
import { AIStartupTools } from '../components/AIStartupTools';
import { useAuth } from '../context/AuthContext';
import { useEcell } from '../context/EcellContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Wand2, 
  MessageSquare, 
  Lightbulb, 
  RotateCcw,
  Zap,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIAssistantPage: React.FC = () => {
  const { user, addXP } = useAuth();
  const { showToast } = useEcell();

  const [activeTab, setActiveTab] = useState<'tools' | 'chat'>('tools');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content: 'Welcome to the E-CELL Venture Intelligence Copilot. I am trained on Y-Combinator frameworks, Lean Canvas methodologies, and collegiate startup ecosystems.\n\nHow can I accelerate your startup today? You can ask me to critique your value proposition, craft a go-to-market strategy, or draft cold emails to angel syndicates.',
      timestamp: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const starterPrompts = [
    'How do I calculate a defensible TAM for a campus B2B SaaS?',
    'Draft a 3-paragraph cold outreach email to angel investors',
    'What are the 5 fatal failure modes for student hardware startups?',
    'Help me structure a 10-slide pitch deck outline for Demo Day'
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage;
    if (!textToSend.trim() || chatLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: `User: ${user?.name || 'Student Innovator'}, Branch: ${user?.branch || 'Engineering'}, XP: ${user?.xp || 100}`
        })
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Your venture logic has been analyzed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiReply]);
      addXP(15, 'Consulted E-CELL AI Copilot');
    } catch (e) {
      showToast('AI Response failed', 'Please try again', 'warning');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Venture Co-Pilot</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
              Gemini 3.7 Flash Engine
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            E-CELL AI Entrepreneurship Co-Pilot
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Accelerate your venture lifecycle with 7 specialized strategic generation tools and an interactive founder advisory chat agent.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tools'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>7 Venture AI Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live Advisor Chat</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 7 AI TOOLS */}
      {activeTab === 'tools' && (
        <AIStartupTools />
      )}

      {/* TAB 2: LIVE CHAT */}
      {activeTab === 'chat' && (
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0b0e1a] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[650px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-[#0a0d17] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">E-CELL Venture Mentor Copilot</h3>
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active • Gemini 3.7 Flash Model
                </p>
              </div>
            </div>

            <button
              onClick={() => setMessages([messages[0]])}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-indigo-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                      isAssistant
                        ? 'bg-[#121729] border border-white/10 text-slate-200 shadow-md whitespace-pre-wrap'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="text-[9px] opacity-60 block mt-2 text-right">
                      {msg.timestamp}
                    </span>
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                  )}
                </div>
              );
            })}

            {chatLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="p-4 rounded-2xl bg-[#121729] border border-white/10 text-xs text-slate-400 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-slate-300 ml-1">Analyzing venture hypothesis...</span>
                </div>
              </div>
            )}
          </div>

          {/* Starter Prompts */}
          <div className="p-3 border-t border-white/5 bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {starterPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-white/10 bg-[#0a0d17] flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything regarding startup strategy, legal term sheets, MVP..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={chatLoading || !inputMessage.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/25"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
