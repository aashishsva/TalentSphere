import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { api } from "../services/api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully signed out");
    navigate("/login");
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const avatarUrl = user?.photo
    ? `${user.photo}?t=${Date.now()}`
    : `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff&bold=true`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications");
      }
    };
    if (user) fetchNotifications();
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-slate-200/80 shadow-sm py-2"
          : "bg-white border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:shadow-lg group-hover:shadow-blue-200 transition-all duration-300">
            TS
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">
            Talent<span className="text-blue-600">Sphere</span>
          </span>
        </Link>

        {/* Dynamic Navigation */}
        <nav className="hidden lg:flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
          <Link
            to="/"
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              isActive("/")
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              isActive("/jobs")
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Explore
          </Link>

          {user?.role === "recruiter" && (
            <Link
              to="/dashboard"
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                isActive("/dashboard")
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Analytics
            </Link>
          )}

          {user?.role === "candidate" && (
            <>
              <Link
                to="/my-applications"
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  isActive("/my-applications")
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Applications
              </Link>
              <Link
                to="/saved"
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  isActive("/saved")
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Wishlist
              </Link>
            </>
          )}
        </nav>

        {/* Action Hub */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "recruiter" && (
                <Link to="/post-job" className="hidden sm:block">
                  <button className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-95">
                    Post Job
                  </button>
                </Link>
              )}

              {/* Notification Center */}
              <div className="relative border-l pl-4 border-slate-200">
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className={`p-2.5 rounded-xl transition-all relative group ${showNotif ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:rotate-12 transition-transform"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
                  )}
                </button>

                {/* Refined Dropdown Menu */}
                {showNotif && (
                  <div className="absolute right-0 mt-4 w-[340px] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-black text-slate-900 text-sm tracking-tight">
                          Activity Feed
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                          {unreadCount} Unread Alerts
                        </p>
                      </div>
                      <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">
                        Mark All Read
                      </button>
                    </div>

                    {/* Content Area */}
                    <div className="max-h-[380px] overflow-y-auto custom-scrollbar bg-white/40">
                      {notifications.length === 0 ? (
                        <div className="py-16 px-10 text-center">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#cbd5e1"
                              strokeWidth="2"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                          </div>
                          <p className="text-slate-400 text-xs font-semibold">
                            No activity yet. We'll alert you when something
                            happens.
                          </p>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-50">
                          {notifications.map((n) => (
                            <div
                              key={n._id}
                              className={`p-5 flex gap-4 transition-all cursor-pointer hover:bg-white/60 ${!n.read ? "bg-blue-50/30" : ""}`}
                            >
                              {/* Status Dot */}
                              <div
                                className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-slate-200"}`}
                              />

                              <div className="space-y-1">
                                <p
                                  className={`text-xs leading-relaxed ${!n.read ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}`}
                                >
                                  {n.message}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                                    {new Date(
                                      n.createdAt || Date.now(),
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">
                                    System Alert
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {/* <Link
                      to="/notifications"
                      onClick={() => setShowNotif(false)}
                      className="block p-4 text-center bg-slate-50/50 hover:bg-slate-50 border-t border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] transition-colors"
                    >
                      View Full History
                    </Link> */}
                  </div>
                )}
              </div>

              {/* Profile Portal */}
              <div className="flex items-center gap-2 border-l pl-4 border-slate-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 bg-slate-50 p-1 pr-4 rounded-2xl hover:bg-white hover:shadow-md hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100 group"
                >
                  <img
                    src={avatarUrl}
                    className="w-9 h-9 rounded-xl border border-white shadow-sm object-cover"
                    alt="User"
                  />
                  <div className="hidden sm:block text-left leading-none">
                    <p className="text-[11px] font-black text-slate-900">
                      {user.name.split(" ")[0]}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
                      Account
                    </p>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                  title="Sign out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-0.5 transition-transform"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
              >
                Join Now
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-900 bg-slate-100 rounded-xl active:scale-95 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-6 py-8 space-y-4 shadow-inner animate-in fade-in slide-in-from-top-4 duration-300">
          <Link
            to="/jobs"
            onClick={() => setOpen(false)}
            className="block text-xl font-bold text-slate-900 py-2 border-b border-slate-50 italic"
          >
            Explore Roles
          </Link>
          {user?.role === "candidate" && (
            <>
              <Link
                to="/my-applications"
                onClick={() => setOpen(false)}
                className="block text-xl font-bold text-slate-900 py-2 border-b border-slate-50 italic"
              >
                Applications
              </Link>
              <Link
                to="/saved-jobs"
                onClick={() => setOpen(false)}
                className="block text-xl font-bold text-slate-900 py-2 border-b border-slate-50 italic"
              >
                Wishlist ⭐
              </Link>
            </>
          )}
          {user?.role === "recruiter" && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="block text-xl font-bold text-slate-900 py-2 border-b border-slate-50 italic"
            >
              Analytics
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-xl font-bold text-red-600 pt-4 flex items-center gap-2"
            >
              Sign out 🚪
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-xl font-bold text-blue-600 pt-4"
            >
              Sign in 🔑
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
