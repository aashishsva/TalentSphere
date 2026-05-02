import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center bg-[#fcfcfd] overflow-hidden pt-20 pb-24">
      
      {/* 🌌 High-End Artistic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Mesh Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-100/40 to-transparent blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-indigo-100/40 to-transparent blur-[120px]" />
        
        {/* Subtle Dot Matrix Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        
        {/* 🚀 Moving Highlight Label */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200/60 shadow-[0_2px_20px_rgba(0,0,0,0.04)] mb-10 transition-transform hover:scale-105 duration-500">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden`}>
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
              </div>
            ))}
          </div>
          <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
            Join 2,400+ developers hired this month
          </span>
        </div>

        {/* ✍️ The "Impact" Headline */}
        <h1 className="text-[clamp(3rem,9vw,6.5rem)] font-black text-slate-900 leading-[0.9] tracking-tight mb-8">
          The <span className="text-blue-600">bridge</span> between <br />
          <span className="relative inline-block mt-2">
            greatness.
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M0 10c20-8 40-8 100 0" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/></svg>
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-400 font-medium leading-relaxed mb-14 px-4">
          TalentSphere is a curated marketplace where world-class talent meets 
          the industry's most innovative engineering teams.
        </p>

        {/* 🔍 Elevated Search Console with 3D Effect */}
        <div className="w-full max-w-5xl mx-auto relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[2.5rem] blur-xl opacity-50 transition duration-1000 group-hover:opacity-100" />
          <div className="relative transform transition-all duration-500 group-hover:-translate-y-1">
            <SearchBar />
          </div>
        </div>

        {/* 🧊 Interactive Feature Tiles (The Bento Evolution) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="relative group p-10 bg-white/40 backdrop-blur-md border border-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 text-[40px] opacity-10 group-hover:opacity-100 transition-opacity font-black">01</div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Elite Network</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Access a highly vetted pool of talent from startups to FAANG giants.</p>
            <div className="mt-6 w-12 h-1 bg-blue-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
          </div>

          <div className="relative group p-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 text-[40px] opacity-10 group-hover:opacity-100 transition-opacity font-black text-blue-600">02</div>
            <h3 className="text-xl font-black text-slate-900 mb-4">AI Matching</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Our neural scoring engine matches candidates with the perfect role culture.</p>
            <div className="mt-6 w-12 h-1 bg-slate-200 rounded-full group-hover:bg-blue-600 group-hover:w-20 transition-all duration-500"></div>
          </div>

          <div className="relative group p-10 bg-white/40 backdrop-blur-md border border-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 text-[40px] opacity-10 group-hover:opacity-100 transition-opacity font-black">03</div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Real-time Sync</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Instant updates on applications and interview stages with full transparency.</p>
            <div className="mt-6 w-12 h-1 bg-blue-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
          </div>

        </div>

        {/* 🏷️ Social Proof Marquee (Optional Text Based) */}
        <div className="mt-24 pt-12 border-t border-slate-100">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-8">Empowering teams at</p>
           <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale hover:opacity-100 transition-opacity duration-700">
              <span className="text-xl font-black tracking-tighter">GITHUB</span>
              <span className="text-xl font-black tracking-tighter">LINEAR</span>
              <span className="text-xl font-black tracking-tighter">VERCEL</span>
              <span className="text-xl font-black tracking-tighter">STRIPE</span>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;