import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        toast.error("Job details not found");
        navigate("/jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleApply = async () => {
    try {
      await api.post(`/applications/${job._id}`);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/30 pb-20">
      {/* Top Banner Section */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <button 
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-slate-500 hover:text-blue-600 mb-6 flex items-center gap-2 transition-colors"
          >
            ← Back to Search
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-3">
                <img src={job.logo || "https://via.placeholder.com/150"} alt="Company" className="max-w-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{job.title}</h1>
                <p className="text-lg font-medium text-blue-600 mt-1">{job.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <button className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-slate-600">
                  Share
               </button>
               <button 
                onClick={handleApply}
                className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
               >
                 Apply Now
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Description Column */}
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Job Description</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.skills?.map((s, i) => (
                  <span key={i} className="px-5 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6">Overview</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                      <p className="text-sm font-semibold text-slate-700">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-xl">💼</span>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Job Type</p>
                      <p className="text-sm font-semibold text-slate-700 capitalize">{job.type}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-xl">💰</span>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Annual Salary</p>
                      <p className="text-sm font-semibold text-slate-700">{job.salary || "Competitive"}</p>
                    </div>
                  </div>
                </div>
                
                <hr className="my-8 border-slate-100" />
                
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-xs text-blue-700 leading-relaxed font-medium">
                    Be one of the first few applicants for this role. Good luck!
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;