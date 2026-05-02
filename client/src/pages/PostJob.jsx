import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const promise = api.post("/jobs", payload);

    toast.promise(promise, {
      loading: "Publishing your listing...",
      success: "Job is live now! 🚀",
      error: "Could not post job ❌",
    });

    try {
      await promise;
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6"
      >
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Hire Top Talent</h1>
          <p className="text-slate-500 font-medium mt-2">Fill in the details to reach thousands of qualified candidates.</p>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            
            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Role / Title</label>
                  <input
                    name="title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                  <input
                    name="company"
                    placeholder="e.g. Google"
                    value={form.company}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                  <input
                    name="location"
                    placeholder="City or Remote"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Employment Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800 appearance-none cursor-pointer"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Annual Salary</label>
                  <input
                    name="salary"
                    placeholder="e.g. 12 - 15 LPA"
                    value={form.salary}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 2: Technicals */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Requirements & Details</h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Skills (Comma Separated)</label>
                <input
                  name="skills"
                  placeholder="React, Tailwind, Node.js, MongoDB"
                  value={form.skills}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comprehensive Job Description</label>
                <textarea
                  name="description"
                  placeholder="What will the candidate do? What are the perks?"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700 leading-relaxed"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <button
                disabled={loading}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? "Syncing with Servers..." : "🚀 Publish Job Listing"}
              </button>
              <p className="text-center text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-tighter">By publishing, you agree to TelentSphere's Recruiter Guidelines.</p>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PostJob;