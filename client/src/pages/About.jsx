import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 text-center">Our Mission</h2>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter text-center mb-12">
            Accelerating the world's <span className="text-slate-400 italic">innovation.</span>
          </h1>
          <div className="prose prose-slate max-w-none space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
            <p>TalentSphere was born out of a simple frustration: Hiring in tech is broken. We saw brilliant engineers getting lost in keyword filters and great companies struggling to find talent that actually fits their culture.</p>
            <p>Our protocol uses neural matching to ensure that every connection made on our platform is based on technical excellence and shared vision.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default About;