import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { motion } from "framer-motion";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/profile/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Profile not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return <div className="text-center py-20 font-bold text-slate-400 uppercase tracking-widest">User Not Found</div>;

  const avatar = user.photo
    ? user.photo
    : `https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff&size=200`;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6"
      >
        {/* Profile Identity Header */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
             <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
               {user.role}
             </span>
          </div>

          <div className="relative">
            <img src={avatar} className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] object-cover shadow-2xl border-4 border-slate-50" alt={user.name} />
          </div>

          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{user.name}</h1>
            <p className="text-lg font-medium text-slate-500 flex items-center justify-center md:justify-start gap-2">
               📍 {user.location || "Base location not set"}
            </p>
            <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-3">
               {user.role === 'recruiter' && user.website && (
                  <a href={user.website} target="_blank" className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                    Visit Website
                  </a>
               )}
               {user.resume && (
                  <a href={user.resume} target="_blank" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    View Portfolio / CV
                  </a>
               )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-6 mt-8">
          
          {/* About / Bio Card */}
          {(user.about || user.skills?.length > 0) && (
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Background & Expertise</h3>
              
              {user.about && (
                <div className="prose prose-slate max-w-none mb-8">
                  <p className="text-slate-600 leading-relaxed font-medium italic">"{user.about}"</p>
                </div>
              )}

              {user.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((s, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Detailed Stats / Info Card */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Detailed Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {user.role === "candidate" ? (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🎓</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Education</p>
                    <p className="font-bold text-slate-800">{user.education || "No details provided"}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🏢</div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company</p>
                      <p className="font-bold text-slate-800">{user.company || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">💼</div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Position</p>
                      <p className="font-bold text-slate-800">{user.position || "Not specified"}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default PublicProfile;