import { Link } from "react-router-dom";

const RecruiterCTA = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
          {/* Animated Glow Effect */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/40 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-6">
              Hiring Protocol
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-tight">
              Scale your team with <br /> 
              <span className="italic text-slate-400">precision intelligence.</span>
            </h3>
            <p className="text-slate-400 font-medium mb-10 max-w-lg mx-auto">
              Stop sorting through noise. Access a vetted ecosystem of world-class 
              talent ready to define the next decade of your company.
            </p>
            
            <Link
              to="/post-job"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Deploy a Listing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterCTA;