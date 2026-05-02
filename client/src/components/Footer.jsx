import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs italic">TS</div>
               <span className="text-xl font-black tracking-tighter text-slate-900">TalentSphere</span>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
              The world's first AI-driven talent ecosystem built specifically for 
              high-performance engineering teams.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><Link to="/jobs" className="hover:text-blue-600 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/register" className="hover:text-blue-600 transition-colors">Join Now</Link></li>
              <li><Link to="/post-job" className="hover:text-blue-600 transition-colors">For Recruiters</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
            © 2026 TalentSphere Protocol. Engineered with precision.
          </p>
          <div className="flex gap-8">
             <a href="#" className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors tracking-tighter">X / TWITTER</a>
             <a href="#" className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors tracking-tighter">LINKEDIN</a>
             <a href="#" className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors tracking-tighter">GITHUB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;