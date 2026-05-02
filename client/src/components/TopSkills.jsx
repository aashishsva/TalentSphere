import { motion } from "framer-motion";

const skills = [
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: "Frontend" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: "Backend" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: "Database" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: "Core" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: "Scalability" },
  { name: "Tailwind", img: "https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/tailwindcss/tailwindcss-original.svg", level: "Design" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: "AI / Data" },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: "DevOps" },
];

const TopSkills = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Engine Index</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              Elite stack <br />
              <span className="text-slate-300 italic">for elite talent.</span>
            </h2>
          </div>
          <p className="text-slate-400 font-bold text-sm max-w-[240px] md:text-right uppercase tracking-tighter leading-tight">
            Connecting the world's best developers with the tech they love.
          </p>
        </div>

        {/* Branded Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98, backgroundColor: "#f8fafc" }}
              className="group relative p-10 bg-slate-50/50 border border-slate-100 rounded-[3rem] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center min-h-[220px]"
            >
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              {/* Actual Image Logo */}
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 transition-transform duration-500 group-hover:scale-110">
                <img 
                  src={skill.img} 
                  alt={skill.name} 
                  className="w-full h-full object-contain filter group-hover:drop-shadow-2xl"
                />
              </div>

              <div className="text-center">
                <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">{skill.name}</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.level} Listing Available
                </p>
              </div>

              {/* Floating Decorative Dot */}
              <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-slate-200 rounded-full group-hover:bg-blue-600 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Social Proof Marquee */}
        <div className="mt-24 flex items-center gap-8 opacity-30 grayscale pointer-events-none overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee gap-20 items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center">
                 <span className="text-2xl font-black italic tracking-tighter">TYPESCRIPT •</span>
                 <span className="text-2xl font-black italic tracking-tighter">NEXT.JS •</span>
                 <span className="text-2xl font-black italic tracking-tighter">GRAPHQL •</span>
                 <span className="text-2xl font-black italic tracking-tighter">KUBERNETES •</span>
                 <span className="text-2xl font-black italic tracking-tighter">AWS •</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopSkills;