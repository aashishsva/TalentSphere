import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import JobCardSkeleton from "../components/JobCardSkeleton";
import { api } from "../services/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const topJobs = jobs.filter((job) => job.matchScore >= 50);
  const otherJobs = jobs.filter((job) => job.matchScore < 50);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await api.get("/jobs/recommended", {
          params: filters,
        });

        setJobs(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    fetchJobs();
  }, [filters]);

  const clearFilters = () => {
    setFilters({ keyword: "", location: "", type: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Search Header Section */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Opportunities
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Find your next role among {jobs.length}+ curated openings
              </p>
            </div>

            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 px-4 py-2 bg-blue-50 rounded-full transition-colors w-fit"
            >
              Reset All Filters
            </button>
          </div>

          <SearchBar filters={filters} setFilters={setFilters} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-[2rem] p-20 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-800">
              No matches found
            </h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">
              Try adjusting your keywords or location to find more results.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 text-blue-600 font-bold underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            {/* 🔥 Top Picks */}
            {topJobs.length > 0 && (
              <div className="mb-12 bg-indigo-50/40 p-6 rounded-3xl border border-indigo-100">
                <h2 className="text-xl font-bold mb-4">🔥 Top Picks For You</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {topJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              </div>
            )}

            {/* Other Jobs */}
            {otherJobs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Other Jobs</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
