import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const flowData = {
  candidate: [
    {
      title: "Upload Resume",
      desc: "Sync your professional history in seconds with our high-speed neural parser.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    },
    {
      title: "Intelligence Match",
      desc: "Our AI maps your tech stack against elite opportunities for the perfect fit.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
    },
    {
      title: "Apply Smartly",
      desc: "Direct transmission to decision-makers with AI-optimized profile insights.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>,
    },
  ],
  recruiter: [
    {
      title: "Post Intelligence",
      desc: "Deploy your job requirements to our global network of top-tier engineering talent.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    },
    {
      title: "Neural Filtering",
      desc: "Instantly identify top candidates using our automated skill-scoring engine.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    },
    {
      title: "Onboard Elite",
      desc: "Directly collaborate and hire the world's best developers with zero friction.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
  ],
};

const HowItWorks = () => {
  const [activeFlow, setActiveFlow] = useState("candidate");

  return (
    <section className="py-32 bg-[#fcfcfd] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4">
            The Protocol
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Engineered for <span className="text-slate-400 italic">efficiency.</span>
          </h3>
        </div>

        {/* 🕹️ Flow Switcher (Toggle) */}
        <div className="flex justify-center mb-24">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-[1.5rem] border border-slate-200/50 shadow-inner">
            <button
              onClick={() => setActiveFlow("candidate")}
              className={`px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeFlow === "candidate" 
                ? "bg-white text-blue-600 shadow-xl shadow-slate-200" 
                : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Candidate Flow
            </button>
            <button
              onClick={() => setActiveFlow("recruiter")}
              className={`px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeFlow === "recruiter" 
                ? "bg-white text-blue-600 shadow-xl shadow-slate-200" 
                : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Recruiter Flow
            </button>
          </div>
        </div>

        {/* ⚡ Dynamic Steps Grid */}
        <div className="relative min-h-[300px]">
          {/* Subtle Connection Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
            <AnimatePresence mode="wait">
              {flowData[activeFlow].map((step, i) => (
                <motion.div
                  key={`${activeFlow}-${i}`}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon Frame */}
                  <div className="w-20 h-20 rounded-[2.2rem] bg-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-2xl shadow-slate-200/50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 mb-8 relative">
                    {step.icon}
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-black border-4 border-white">
                      0{i + 1}
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-slate-900 tracking-tight mb-4 uppercase italic text-sm group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-slate-400 font-medium leading-relaxed text-sm px-6">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;