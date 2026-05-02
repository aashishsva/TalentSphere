import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { loginSuccess } from "../features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// --- Helper Components ---

const PdfThumbnail = ({ url }) => {
  const [thumb, setThumb] = useState(null);
  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    const render = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url, withCredentials: false })
          .promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.8 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport })
          .promise;
        if (!cancelled) setThumb(canvas.toDataURL());
      } catch (err) {
        console.log("Thumbnail error:", err);
      }
    };
    render();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return thumb ? (
    <img
      src={thumb}
      alt="Resume"
      className="w-16 h-20 object-cover border border-slate-200 rounded-lg shadow-sm"
    />
  ) : (
    <div className="w-16 h-20 bg-slate-100 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">
      PDF
    </div>
  );
};

const ResumeScore = ({ resumeUrl, skills, position }) => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [breakdown, setBreakdown] = useState(null);

  // const analyze = async () => {
  //   if (!resumeUrl) return toast.error("Please upload a resume first");
  //   setLoading(true);
  //   try {
  //     const response = await fetch("https://api.anthropic.com/v1/messages", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         model: "claude-sonnet-4-20250514",
  //         max_tokens: 1000,
  //         system: `You are a professional resume evaluator. Score 0-100. JSON format: {"score": 78, "grade": "B+", "breakdown": {"skills_match": 80, "completeness": 75, "clarity": 82, "impact": 70}, "tip": "One actionable tip."}`,
  //         messages: [{ role: "user", content: `Skills: ${skills}. Target: ${position}. URL: ${resumeUrl}.` }],
  //       }),
  //     });
  //     const data = await response.json();
  //     const parsed = JSON.parse(data.content[0].text);
  //     setScore(parsed.score);
  //     setBreakdown(parsed);
  //   } catch { toast.error("AI Analysis failed"); } finally { setLoading(false); }
  // };

  const handleParseResume = async () => {
    try {
      const res = await api.post("/users/parse-resume");

      toast.success("Skills extracted 🚀");

      // 🔥 update UI
      dispatch(
        loginSuccess({
          user: res.data.user,
          token: localStorage.getItem("token"),
        }),
      );
    } catch (err) {
      toast.error("Failed to parse resume");
    }
  };
  return (
    <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-bold text-slate-900">🤖 AI Talent Insights</h4>
          <p className="text-xs text-slate-500">Resume optimization score</p>
        </div>
        <button
          onClick={handleParseResume}
          disabled={loading || !resumeUrl}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          {loading ? "Analyzing..." : "Analyze Now"}
        </button>
      </div>

      <AnimatePresence>
        {breakdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black text-blue-600">{score}</div>
              <div className="text-xs font-bold text-slate-400 border-l pl-4">
                GRADE
                <br />
                <span className="text-lg text-slate-900">
                  {breakdown.grade}
                </span>
              </div>
            </div>
            {Object.entries(breakdown.breakdown).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>{key.replace("_", " ")}</span>
                  <span>{val}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs text-blue-700 leading-relaxed italic">
              " {breakdown.tip} "
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Profile Page ---

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    education: "",
    skills: "",
    company: "",
    position: "",
    website: "",
    about: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || "",
        education: user.education || "",
        skills: user.skills?.join(", ") || "",
        company: user.company || "",
        position: user.position || "",
        website: user.website || "",
        about: user.about || "",
      });
    }
  }, [user]);

  const avatarUrl = user?.photo
    ? user.photo
    : `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const promise = api.put("/users/profile", payload);
    toast.promise(promise, {
      loading: "Saving...",
      success: "Profile Updated",
      error: "Failed",
    });
    try {
      const res = await promise;
      dispatch(loginSuccess({ user: res.data.user, token }));
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Visual Header */}
      <div className="h-40 bg-gradient-to-r from-blue-700 to-indigo-800 w-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-6 -mt-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: User Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm text-center relative overflow-hidden">
              <div className="relative inline-block mb-4">
                <img
                  src={avatarUrl}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover transition-transform hover:scale-105"
                  alt="Profile"
                />
                <label className="absolute bottom-1 right-1 bg-blue-600 p-2.5 rounded-full text-white cursor-pointer shadow-lg hover:bg-blue-700 transition-all active:scale-90">
                  📷{" "}
                  <input
                    type="file"
                    className="hidden"
                    onChange={async (e) => {
                      const formData = new FormData();
                      formData.append("photo", e.target.files[0]);
                      setPhotoUploading(true);
                      try {
                        await api.post("/users/photo", formData);
                        const res = await api.get("/users/me");
                        dispatch(loginSuccess({ user: res.data.user, token }));
                        toast.success("Avatar Synced");
                      } finally {
                        setPhotoUploading(false);
                      }
                    }}
                  />
                </label>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {user?.name}
              </h2>
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
                {user?.role}
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-xs border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Location</span>
                  <span className="text-slate-800 font-bold">
                    {user?.location || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    Member Since
                  </span>
                  <span className="text-slate-800 font-bold">
                    {new Date(user?.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
            </div>

            {/* Resume Upload Box */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Resume Asset</h3>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                {resumeUploading ? (
                  <div className="w-16 h-20 bg-slate-200 animate-pulse rounded-lg" />
                ) : (
                  <PdfThumbnail url={user?.resume} />
                )}
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Primary CV
                  </p>
                  <div className="flex gap-2">
                    <label className="text-[10px] font-bold text-blue-600 cursor-pointer hover:underline">
                      UPLOAD{" "}
                      <input
                        type="file"
                        className="hidden"
                        onChange={async (e) => {
                          const formData = new FormData();
                          formData.append("resume", e.target.files[0]);
                          setResumeUploading(true);
                          try {
                            const res = await api.post(
                              "/users/resume",
                              formData,
                            );
                            dispatch(
                              loginSuccess({ user: res.data.user, token }),
                            );
                            toast.success("CV Updated");
                          } finally {
                            setResumeUploading(false);
                          }
                        }}
                      />
                    </label>
                    {user?.resume && (
                      <>
                        <button
                          onClick={() => setShowPreview(true)}
                          className="text-[10px] font-bold text-slate-600 hover:underline"
                        >
                          VIEW
                        </button>
                        <button
                          onClick={() =>
                            api
                              .delete("/users/resume")
                              .then((res) =>
                                dispatch(
                                  loginSuccess({ user: res.data.user, token }),
                                ),
                              )
                          }
                          className="text-[10px] font-bold text-red-500 hover:underline"
                        >
                          DELETE
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {user?.role === "candidate" && (
                <ResumeScore
                  resumeUrl={user?.resume}
                  skills={form.skills}
                  position={form.education}
                />
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Settings Form */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Account Settings
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                ID: {user?._id?.slice(-6)}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Official Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Contact Line
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+91..."
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Professional Bio
                </label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  rows="4"
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
                  placeholder="Write a short summary..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Location / Base
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    {user?.role === "candidate"
                      ? "Highest Education"
                      : "Current Company"}
                  </label>
                  <input
                    name={user?.role === "candidate" ? "education" : "company"}
                    value={
                      user?.role === "candidate" ? form.education : form.company
                    }
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Skill Set (Comma Separated)
                </label>
                <input
                  name="skills"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  placeholder="React, Node, Cloud..."
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-slate-800"
                />
              </div>

              <button className="w-full md:w-fit px-12 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 uppercase tracking-widest text-xs">
                Sync Account Data
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Modern Modal Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex justify-center items-center p-6"
          >
            <div className="bg-white w-full max-w-5xl h-full rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-6 right-6 bg-slate-100 hover:bg-red-500 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 font-bold"
              >
                ✕
              </button>
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(user?.resume)}&embedded=true`}
                className="w-full h-full border-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
