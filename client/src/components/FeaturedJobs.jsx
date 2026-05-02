import { useEffect, useState } from "react";
import { api } from "../services/api";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton"; // Tera premium skeleton
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        setLoading(true);

        const res = await api.get("/jobs/recommended?limit=6");
        setJobs(res.data.jobs || res.data); // Backend response structure ke hisaab se
      } catch (err) {
        console.error("Error fetching featured jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Featured Opportunities
            </h2>
            <p className="mt-3 text-slate-500 font-medium">
              Real-time listings from industry leaders. Your next big career
              move starts right here.
            </p>
          </div>

          <Link
            to="/jobs"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 group transition-all"
          >
            Explore all openings
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Jobs Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Jab data load ho raha ho, tab 6 Skeletons dikhao
            [...Array(6)].map((_, i) => <JobCardSkeleton key={i} />)
          ) : jobs.length > 0 ? (
            jobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))
          ) : (
            // Agar backend se koi job na aaye (Empty state)
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                No active listings at the moment
              </p>
            </div>
          )}
        </div>

        {/* Mobile View More */}
        {!loading && jobs.length > 0 && (
          <div className="mt-10 md:hidden">
            <Link
              to="/jobs"
              className="w-full inline-flex items-center justify-center py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600"
            >
              View All Openings
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
