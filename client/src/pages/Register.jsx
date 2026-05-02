import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { isValidEmail, isStrongPassword } from "../utils/validation";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Full name is required");
    if (!isValidEmail(form.email)) return toast.error("Invalid email address");
    if (!isStrongPassword(form.password)) return toast.error("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match");

    const payload = { name: form.name, email: form.email, password: form.password, role: form.role };
    const promise = api.post("/auth/register", payload);

    toast.promise(promise, {
      loading: "Creating your account...",
      success: "Account created! Please login.",
      error: (err) => err.response?.data?.message || "Registration failed",
    });

    try {
      setLoading(true);
      await promise;
      navigate("/login");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 py-12 px-4">
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
          <p className="text-slate-500 mt-2 font-medium">Join thousands of professionals on TelentSphere.</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Switcher */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
              {["candidate", "recruiter"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, role: r })}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all capitalize ${
                    form.role === r ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] mt-4 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center mt-8 font-medium text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline ml-1">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;