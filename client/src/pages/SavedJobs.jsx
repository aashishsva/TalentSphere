import { useEffect, useState } from "react";
import { api } from "../services/api";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);

        const res = await api.get("/users/saved-jobs");

        // 🔥 sort by matchScore (high → low)
        const sorted = res.data.sort(
          (a, b) => (b.matchScore || 0) - (a.matchScore || 0)
        );

        setJobs(sorted);
      } catch (err) {
        toast.error("Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  // 🏆 Best job (top match)
  const bestJob = jobs[0];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
          Opening your wishlist...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Saved Opportunities
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Review and apply to the roles you've bookmarked.
            </p>
          </div>

          {jobs.length > 0 && (
            <div className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 shadow-sm">
              {jobs.length} Jobs Collected
            </div>
          )}
        </header>

        {/* 🏆 BEST MATCH SECTION */}
        {bestJob && (
          <div className="mb-10 p-6 rounded-3xl bg-green-50 border border-green-200 shadow-sm">
            <p className="text-xs font-bold text-green-600 mb-2">
              🏆 BEST MATCH FOR YOU
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {bestJob.title}
                </h2>
                <p className="text-sm text-slate-500">
                  {bestJob.company}
                </p>

                <p className="text-xs mt-1 text-green-600 font-semibold">
                  {bestJob.matchScore || 0}% Match
                </p>
              </div>

              <Link
                to={`/jobs/${bestJob._id}`}
                className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!jobs.length ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center"
          >
            <div className="text-5xl mb-6">⭐</div>
            <h3 className="text-xl font-bold text-slate-800">
              Your collection is empty
            </h3>
            <p className="text-slate-500 mt-2 mb-8 max-w-sm mx-auto">
              Save jobs you're interested in to keep track of them and apply when you're ready.
            </p>
            <Link
              to="/jobs"
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all"
            >
              Browse Latest Jobs
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;