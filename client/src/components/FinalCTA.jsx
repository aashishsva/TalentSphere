import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-32 bg-blue-600 relative overflow-hidden">
      {/* Aesthetic Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border-8 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 border-[20px] border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
          Your dream role <br />
          <span className="opacity-50">is now in range.</span>
        </h2>
        
        <p className="text-blue-100 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
          Join 20,000+ engineers who have found their perfect tech stack match. 
          The Sphere is waiting for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/jobs"
            className="w-full sm:w-auto px-12 py-5 bg-white text-blue-600 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all active:scale-95"
          >
            Explore the Sphere
          </Link>
          <Link
            to="/register"
            className="w-full sm:w-auto px-12 py-5 bg-blue-700 text-white border border-blue-400 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-800 transition-all"
          >
            Create Profile
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;