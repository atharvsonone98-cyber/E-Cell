import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { CommunityPost, CoFounderCandidate } from '../types';
import { 
  MessageSquare, 
  Users, 
  Plus, 
  ThumbsUp, 
  Search, 
  Tag, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Send,
  UserCheck
} from 'lucide-react';
import { PostCreateModal } from '../components/PostCreateModal';
import { CoFounderConnectModal } from '../components/CoFounderConnectModal';

export const CommunityPage: React.FC = () => {
  const { posts, coFounderCandidates, upvotePost, addCommentToPost } = useEcell();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'discussions' | 'cofounders'>('discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CoFounderCandidate | null>(null);

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Idea Validation', 'Team & Co-Founders', 'Ask Mentors', 'Feedback', 'Wins & Milestones'];

  const filteredPosts = posts.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredCandidates = coFounderCandidates.filter(c => {
    return c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.lookingForRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleSendComment = async (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    await addCommentToPost(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Community & Co-Founders</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              {posts.length} Discussions • {coFounderCandidates.length} Active Candidates
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Founder Network & Co-Founder Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Collaborate with peers, crowdsource early product feedback, and assemble your founding engineering & business team.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discussions'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Discussions ({posts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('cofounders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'cofounders'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Co-Founder Match ({coFounderCandidates.length})</span>
          </button>
        </div>
      </div>

      {/* Action Bar (Search & Create) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'discussions' ? 'Search discussions, tags...' : 'Search skills, candidates...'}
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {activeTab === 'discussions' ? (
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:opacity-90 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Topic (+15 XP)</span>
            </button>
          </div>
        ) : (
          <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algorithmic Skill Complementarity Match Active</span>
          </div>
        )}
      </div>

      {/* Tab 1: DISCUSSIONS */}
      {activeTab === 'discussions' && (
        <div className="space-y-4">
          {filteredPosts.map(post => {
            const isUpvoted = (post.upvotedBy || []).includes(user?.id || '');
            const isCommentsOpen = expandedComments[post.id];

            return (
              <div
                key={post.id}
                className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-xl object-cover border border-white/20" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white leading-tight">{post.authorName}</h4>
                        <span className="text-[10px] text-slate-400">• {post.createdAt}</span>
                      </div>
                      <span className="text-[10px] text-indigo-400 font-semibold">{post.authorRole}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map(t => (
                    <span key={t} className="text-[10px] bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Post Footer Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => upvotePost(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isUpvoted
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-white' : ''}`} />
                      <span>{post.upvotes}</span>
                    </button>

                    <button
                      onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {isCommentsOpen && (
                  <div className="pt-3 space-y-3 border-t border-white/5 bg-black/20 p-4 rounded-xl">
                    <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
                      {post.comments.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-2">No comments yet. Be the first to share your thoughts!</p>
                      ) : (
                        post.comments.map(c => (
                          <div key={c.id} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{c.authorName}</span>
                              <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                            </div>
                            <p className="text-slate-300">{c.content}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* New Comment Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                        placeholder="Write a constructive response..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: CO-FOUNDER MATCHING MATRIX */}
      {activeTab === 'cofounders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map(c => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-xl object-cover border border-white/20" />
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{c.name}</h3>
                      <p className="text-xs text-slate-400">{c.branch} • {c.year}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full block">
                      {c.matchScore}% Match
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Target Role</span>
                  <p className="text-xs font-semibold text-white mt-0.5">{c.lookingForRole}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Core Technical Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.map(s => (
                      <span key={s} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Domain Interests</span>
                  <p className="text-xs text-slate-400">{c.interests.join(' • ')}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" /> Verified Student
                </span>

                <button
                  onClick={() => setSelectedCandidate(c)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-90 text-xs font-bold text-white transition-all shadow-md flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Send Co-Founder Invite</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <PostCreateModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      <CoFounderConnectModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
    </div>
  );
};
