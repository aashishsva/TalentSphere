import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { isValidEmail } from "../utils/validation";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email)) return toast.error("Enter a valid email address");
    if (!form.password) return toast.error("Password is required");

    const promise = api.post("/auth/login", form);
    toast.promise(promise, {
      loading: "Authenticating...",
      success: "Welcome back!",
      error: (err) => err.response?.data?.message || "Authentication failed",
    });

    try {
      const res = await promise;
      localStorage.setItem("token", res.data.token);
      const me = await api.get("/users/me");

      dispatch(loginSuccess({ user: me.data.user, token: res.data.token }));
      navigate("/");
    } catch {}
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50/50 px-4">
      <div className="w-full max-w-[440px]">
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl text-white text-2xl font-bold mb-4 shadow-lg shadow-blue-200">N</div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign in to TelentSphere</h2>
          <p className="text-slate-500 mt-2 font-medium">Welcome back! Please enter your details.</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400 text-slate-700"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <Link to="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400 text-slate-700"
              />
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-[0.98] mt-2">
              Sign in
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold hover:underline ml-1">
                Create one for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;