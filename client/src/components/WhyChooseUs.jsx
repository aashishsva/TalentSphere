import { motion } from "framer-motion";

const reasons = [
  {
    title: "AI-Powered Matching",
    desc: "Our neural engine scans deep into your tech stack to find roles that actually fit your skill set, not just keywords.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M18.4 4.6a10 10 0 1 1-12.8 0"/><path d="M12 17v4"/><path d="M8 21h8"/></svg>
    ),
    color: "bg-blue-500",
  },
  {
    title: "Verified Talent Only",
    desc: "We bridge the gap between high-growth startups and the top 1% of vetted developers worldwide.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
    ),
    color: "bg-indigo-500",
  },
  {
    title: "Real-time Transparency",
    desc: "No more ghosting. Get instant updates on your application status and recruiter feedback directly in your dashboard.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    color: "bg-emerald-500",
  },
  {
    title: "Enterprise Grade Security",
    desc: "Your data is encrypted and private. You control who sees your profile and when you want to be discovered.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    color: "bg-slate-900",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 items-center gap-16 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4">
              Core Philosophy
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
              Built for the <br />
              <span className="text-slate-400 italic">modern engineer.</span>
            </h3>
          </div>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            TalentSphere isn't just another job board. It's a curated ecosystem 
            designed to eliminate the noise and focus on what matters: **Excellence.**
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Icon Holder */}
                <div className={`w-16 h-16 shrink-0 rounded-2xl ${reason.color} text-white flex items-center justify-center shadow-2xl shadow-blue-200 transition-transform group-hover:rotate-6`}>
                  {reason.icon}
                </div>

                <div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight mb-4 uppercase text-sm italic">
                    {reason.title}
                  </h4>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Signals / Footer of section */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-wrap justify-center gap-12 opacity-40 grayscale">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-blue-600" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">12k+ Active Users</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-blue-600" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">450+ Top Companies</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-blue-600" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">99% Match Accuracy</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;