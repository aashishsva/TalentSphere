import { useEffect, useState } from "react";
import { api } from "../services/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await api.get("/applications/my");
      setApps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">
          Syncing applications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 pt-12">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              My Applications
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Real-time tracking of your professional journey.
            </p>
          </div>
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
            Total: {apps.length}
          </div>
        </header>

        {apps.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-[2.5rem] p-24 text-center shadow-sm"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 2 3.5 3.5L12 9l-3.5-3.5L12 2Z" />
                <path d="M12 22v-5" />
                <path d="M9 17H4.5a2.5 2.5 0 0 1 0-5H11" />
                <path d="M15 17h4.5a2.5 2.5 0 0 0 0-5H13" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-slate-800">
              Your journey hasn't started yet
            </h3>
            <p className="text-slate-500 mt-2 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
              Apply to jobs and they will appear here. Your dream role is just
              one click away.
            </p>
            <Link
              to="/jobs"
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95"
            >
              Explore Available Jobs
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {apps.map((app, index) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white border border-slate-200 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center transition-all hover:shadow-[0_30px_60px_rgba(0,0,0,0.03)] hover:border-blue-100"
              >
                {/* Left: Job Info */}
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-blue-200 transition-colors">
                      {app.job?.company?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 text-xl tracking-tight group-hover:text-blue-600 transition-colors">
                      {app.job?.title}
                    </h2>
                    <p className="text-sm font-bold text-slate-400 mt-0.5 tracking-tight">
                      {app.job?.company}
                    </p>

                    <div className="mt-4 flex gap-4">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {app.job?.location}
                      </span>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="20"
                            height="14"
                            x="2"
                            y="7"
                            rx="2"
                            ry="2"
                          />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        {app.job?.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status & Date */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-none border-slate-50">
                  <div className="text-left md:text-right mb-0 md:mb-5">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.25em]">
                      Submission Date
                    </p>
                    <p className="text-sm font-bold text-slate-700 mt-1">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {/* STATUS BADGE */}
                    <div
                      className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 ${
                        app.status === "accepted"
                          ? "bg-green-50 border-green-100 text-green-600"
                          : app.status === "rejected"
                            ? "bg-red-50 border-red-100 text-red-600"
                            : "bg-blue-50 border-blue-100 text-blue-600"
                      }`}
                    >
                      {app.status === "pending" && "Under Review"}
                      {app.status === "accepted" && "Accepted"}
                      {app.status === "rejected" && "Declined"}
                    </div>

                    {/* MATCH SCORE */}
                    {app.matchScore !== undefined && (
                      <div className="text-[10px] font-black text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-xl">
                        {app.matchScore}% Match
                      </div>
                    )}

                    {/* MATCHED SKILLS */}
                    {app.matchedSkills?.length > 0 && (
                      <p className="text-xs text-gray-400 text-right">
                        ✔ {app.matchedSkills.join(", ")}
                      </p>
                    )}

                    {/* MISSING SKILLS */}
                    {app.missingSkills?.length > 0 && (
                      <p className="text-xs text-red-400 text-right">
                        ✖ {app.missingSkills.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
