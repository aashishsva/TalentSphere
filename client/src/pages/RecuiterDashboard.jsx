import { useEffect, useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─── SVG ICONS ───────────────────────────────────────────────────────────────

const IconBriefcase = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12.01" strokeWidth="3" />
  </svg>
);

const IconDocument = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconCheckCircle = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconXCircle = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const IconEdit = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const IconArrowLeft = ({ className = "w-10 h-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconPlus = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconCheck = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconX = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconExternalLink = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconClock = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconInbox = ({ className = "w-10 h-10" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

// ─── STAT CARD CONFIG ────────────────────────────────────────────────────────

const statConfig = [
  {
    label: "Total Listings",
    key: "totalJobs",
    color: "blue",
    Icon: IconBriefcase,
  },
  {
    label: "Total Apps",
    key: "totalApplications",
    color: "indigo",
    Icon: IconDocument,
  },
  { label: "Accepted", key: "accepted", color: "green", Icon: IconCheckCircle },
  { label: "Rejected", key: "rejected", color: "red", Icon: IconXCircle },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
  });
  const [sort, setSort] = useState("top");

  useEffect(() => {
    fetchMyJobs();
    fetchStats();
  }, []);
  useEffect(() => {
    if (selectedJob) {
      fetchApplicants(selectedJob);
    }
  }, [sort]);

  const fetchMyJobs = async () => {
    try {
      const res = await api.get("/jobs/my-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/jobs/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplicants = async (jobId) => {
    try {
      setLoading(true);
      setApplicants([]);
      const res = await api.get(`/jobs/${jobId}/applicants?sort=${sort}`);
      setApplicants(res.data);
      setSelectedJob(jobId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId, status) => {
    const promise = api.put(`/applications/${appId}/status`, { status });
    toast.promise(promise, {
      loading: "Updating status...",
      success: `Candidate ${status} successfully`,
      error: "Failed to update",
    });
    try {
      await promise;
      fetchApplicants(selectedJob);
      fetchStats();
    } catch (err) {}
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job listing?"))
      return;
    try {
      await api.delete(`/jobs/${jobId}`);
      toast.success("Listing removed");
      fetchMyJobs();
      if (selectedJob === jobId) {
        setSelectedJob(null);
        setApplicants([]);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/jobs/${editJob._id}`, form);
      toast.success("Job updated");
      setEditJob(null);
      fetchMyJobs();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Recruiter Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              Manage your active listings and evaluate talent.
            </p>
          </div>
          <Link
            to="/post-job"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            <IconPlus className="w-4 h-4" />
            Post New Job
          </Link>
        </header>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statConfig.map(({ label, key, color, Icon }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {label}
                  </p>
                  <h2 className="text-2xl font-black text-slate-900">
                    {stats[key]}
                  </h2>
                </div>
                <div
                  className={`w-12 h-12 bg-${color}-50 text-${color}-400 rounded-2xl flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Jobs Navigation */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-4">
              Active Listings
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => {
                    setSelectedJob(job._id);
                    fetchApplicants(job._id);
                  }}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer relative group ${
                    selectedJob === job._id
                      ? "bg-white border-blue-500 shadow-md ring-4 ring-blue-500/5"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-xs font-semibold text-slate-400 mt-1">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditJob(job);
                          setForm(job);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-lg transition-colors"
                      >
                        <IconEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteJob(job._id);
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg transition-colors"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && (
                <div className="text-center py-10 bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm">
                  No jobs posted yet
                </div>
              )}
            </div>
          </div>

          {/* Applicants Detailed View */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm min-h-[500px] overflow-hidden">
              <div className="p-8 border-b border-slate-50 bg-slate-50/30">
                <h3 className="font-black text-slate-900 tracking-tight">
                  Applicant Management
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Select a job to track candidates and their progress.
                </p>
              </div>

              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSort("top")}
                    className={`px-3 py-1 rounded ${
                      sort === "top" ? "bg-indigo-600 text-white" : "border"
                    }`}
                  >
                    Top Match 🔥
                  </button>

                  <button
                    onClick={() => setSort("latest")}
                    className={`px-3 py-1 rounded ${
                      sort === "latest" ? "bg-indigo-600 text-white" : "border"
                    }`}
                  >
                    Latest
                  </button>
                </div>
                {!selectedJob ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                    <IconArrowLeft className="w-10 h-10 mb-4" />
                    <p className="font-bold uppercase tracking-widest text-[10px]">
                      Select a listing from the left
                    </p>
                  </div>
                ) : loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-20 bg-slate-50 animate-pulse rounded-3xl"
                      />
                    ))}
                  </div>
                ) : applicants.length === 0 ? (
                  <div className="text-center py-20 bg-blue-50/50 rounded-3xl border-2 border-dashed border-blue-100">
                    <div className="flex justify-center mb-3 text-blue-300">
                      <IconInbox className="w-10 h-10" />
                    </div>
                    <p className="text-blue-400 font-bold text-sm italic">
                      Waiting for the first applicant...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applicants.map((app, index) => (
                      <div
                        key={app._id}
                        className={`p-6 border rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 ${
                          app.matchScore === applicants[0]?.matchScore &&
                          sort === "top"
                            ? "border-green-400 bg-green-50 shadow-md"
                            : "border-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <img
                            src={
                              app.applicant?.photo
                                ? `${app.applicant.photo}?t=${Date.now()}`
                                : `https://ui-avatars.com/api/?name=${app.applicant?.name}&background=f1f5f9&color=64748b`
                            }
                            className="w-12 h-12 rounded-full border border-slate-200"
                            alt="User"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              {/* 🔥 Rank */}
                              <span className="text-xs text-gray-400 font-bold">
                                #{index + 1}
                              </span>

                              {/* 🔥 Top Match Badge */}
                              {applicants.length > 0 &&
                                app.matchScore === applicants[0].matchScore &&
                                sort === "top" && (
                                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                                    🏆 Top
                                  </span>
                                )}
                            </div>

                            <Link
                              to={`/profile/${app.applicant?._id}`}
                              className="font-bold text-slate-900 hover:text-blue-600 transition-colors"
                            >
                              {app.applicant?.name}
                            </Link>
                            <p className="text-xs font-medium text-slate-400">
                              {app.applicant?.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                          {/* Status badge */}
                          <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-bold">
                            {app.matchScore || 0}% Match
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              app.status === "accepted"
                                ? "bg-green-100 text-green-600"
                                : app.status === "rejected"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {app.status === "accepted" && (
                              <IconCheck className="w-3 h-3" />
                            )}
                            {app.status === "rejected" && (
                              <IconX className="w-3 h-3" />
                            )}
                            {(!app.status || app.status === "pending") && (
                              <IconClock className="w-3 h-3" />
                            )}
                            {app.status || "Pending"}
                          </span>

                          {app.applicant?.resume && (
                            <a
                              href={app.applicant.resume}
                              target="_blank"
                              className="inline-flex items-center gap-1.5 p-2 px-4 bg-slate-900 text-white text-[10px] font-bold rounded-xl hover:bg-slate-800"
                            >
                              <IconExternalLink className="w-3.5 h-3.5" />
                              View Resume
                            </a>
                          )}

                          {(app.status === "pending" || !app.status) && (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateStatus(app._id, "accepted")
                                }
                                className="inline-flex items-center gap-1.5 p-2 px-3 bg-green-500 text-white rounded-xl text-[10px] font-bold shadow-lg shadow-green-100"
                              >
                                <IconCheck className="w-3.5 h-3.5" />
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(app._id, "rejected")
                                }
                                className="inline-flex items-center gap-1.5 p-2 px-3 bg-white border border-slate-200 text-red-500 rounded-xl text-[10px] font-bold"
                              >
                                <IconX className="w-3.5 h-3.5" />
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Job Modal */}
      <AnimatePresence>
        {editJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                Edit Listing Details
              </h2>
              <div className="space-y-4">
                {["title", "company", "location", "salary"].map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 capitalize">
                      {field}
                    </label>
                    <input
                      name={field}
                      value={form[field]}
                      onChange={(e) =>
                        setForm({ ...form, [e.target.name]: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 font-bold text-slate-700"
                    />
                  </div>
                ))}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Job Type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 font-bold text-slate-700"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setEditJob(null)}
                  className="flex-1 py-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-600 transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700"
                >
                  Update Listing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecruiterDashboard;
