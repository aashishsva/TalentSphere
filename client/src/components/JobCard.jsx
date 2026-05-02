import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { loginSuccess } from "../features/auth/authSlice";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const isSaved = user?.savedJobs?.includes(job._id);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents navigating to job details

    const promise = api.post(`/users/save-job/${job._id}`);
    toast.promise(promise, {
      loading: "Updating...",
      success: "Saved jobs updated",
      error: "Failed to save",
    });

    try {
      const res = await promise;
      dispatch(
        loginSuccess({
          user: { ...user, savedJobs: res.data },
          token,
        }),
      );
    } catch {}
  };

  const handleApply = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents navigating to job details
    try {
      await api.post(`/applications/${job._id}`);
      toast.success("Applied Successfully ✅");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error applying");
    }
  };

  return (
    <Link to={`/jobs/${job._id}`} className="group block">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] relative overflow-hidden">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform">
              <img
                src={job.logo || "https://via.placeholder.com/100"}
                alt={job.company}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              {job.matchScore !== undefined && (
                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                  {job.matchScore}% Match
                </span>
              )}
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm font-medium text-slate-500">
                {job.company}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`p-2.5 rounded-xl border transition-all ${
              isSaved
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-white border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isSaved ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {/* Job Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-semibold border border-slate-100">
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            {job.location}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100">
            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
            {job.type}
          </div>
          {job.salary && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-100">
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
              {job.salary}
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-50">
          {job.skills?.slice(0, 3).map((s, i) => (
            <span
              key={i}
              className="text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              {s} {i !== 2 && i !== job.skills.length - 1 ? "•" : ""}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="text-[11px] font-bold text-slate-300">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              Posted on
            </span>
            <span className="text-xs font-medium text-slate-600">
              {new Date(job.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <button
            onClick={handleApply}
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-sm shadow-slate-200"
          >
            Quick Apply
          </button>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
