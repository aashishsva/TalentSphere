import { useState, useEffect, useRef } from "react";
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
  const notifRef = useRef(null);
  const { user } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.log("Failed to mark as read");
    }
  };

  return (
    <header
      className={`sticky top-0 w-full z-50 backdrop-blur bg-white/90 border-b border-slate-200 transition-all duration-300 ${
        scrolled ? "shadow-sm py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:shadow-lg group-hover:shadow-blue-200 transition-all duration-300">
            TS
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">
            Talent<span className="text-blue-600">Sphere</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
          <Link to="/" className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isActive("/") ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
            Home
          </Link>
          <Link to="/jobs" className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isActive("/jobs") ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
            Explore
          </Link>
          {user?.role === "recruiter" && (
            <Link to="/dashboard" className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isActive("/dashboard") ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
              Analytics
            </Link>
          )}
          {user?.role === "candidate" && (
            <>
              <Link to="/my-applications" className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isActive("/my-applications") ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
                Applications
              </Link>
              <Link to="/saved" className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isActive("/saved") ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
                Wishlist
              </Link>
            </>
          )}
        </nav>

        {/* ✅ Desktop Action Hub — lg: only */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "recruiter" && (
                <Link to="/post-job">
                  <button className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-95">
                    Post Job
                  </button>
                </Link>
              )}

              {/* Notification Center */}
              <div ref={notifRef} className="relative border-l pl-4 border-slate-200">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowNotif(!showNotif); }}
                  className={`p-2.5 rounded-xl transition-all relative group ${showNotif ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 w-2 h-2 rounded-full border-2 border-white" />
                  )}
                </button>

                {showNotif && (
                  <div className="absolute right-0 mt-4 w-[340px] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-black text-slate-900 text-sm tracking-tight">Activity Feed</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{unreadCount} Unread Alerts</p>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await Promise.all(notifications.filter((n) => !n.read).map((n) => api.put(`/notifications/${n._id}`)));
                            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                          } catch {}
                        }}
                        className="text-[10px] font-black text-blue-600"
                      >
                        Mark All Read
                      </button>
                    </div>
                    <div className="max-h-[380px] overflow-y-auto custom-scrollbar bg-white/40">
                      {notifications.length === 0 ? (
                        <div className="py-16 px-10 text-center">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                          </div>
                          <p className="text-slate-400 text-xs font-semibold">No activity yet. We'll alert you when something happens.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-50">
                          {notifications.map((n) => (
                            <div key={n._id} className={`p-5 flex gap-4 transition-all cursor-pointer hover:bg-white/60 ${!n.read ? "bg-blue-50/30" : ""}`}>
                              <div
                                onClick={() => handleMarkAsRead(n._id)}
                                className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-slate-200"}`}
                              />
                              <div className="space-y-1">
                                <p className={`text-xs leading-relaxed ${!n.read ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}`}>
                                  {n.message}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                                    {new Date(n.createdAt || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                  </span>
                                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">System Alert</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile + Logout */}
              <div className="flex items-center gap-2 border-l pl-4 border-slate-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 bg-slate-50 p-1 pr-4 rounded-2xl hover:bg-white hover:shadow-md hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-100 group"
                >
                  <img src={avatarUrl} className="w-9 h-9 rounded-xl border border-white shadow-sm object-cover" alt="User" />
                  <div className="text-left leading-none">
                    <p className="text-[11px] font-black text-slate-900">{user.name.split(" ")[0]}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Account</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                  title="Sign out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                Sign in
              </Link>
              <Link to="/register" className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* ✅ Mobile right side — bell + hamburger only */}
        <div className="flex lg:hidden items-center gap-2">
          {user && (
            <div ref={notifRef} className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowNotif(!showNotif); }}
                className={`p-2.5 rounded-xl transition-all relative ${showNotif ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 w-2 h-2 rounded-full border-2 border-white" />
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-4 w-[300px] bg-white/90 backdrop-blur-xl border border-slate-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50">
                  <div className="p-5 pb-3 border-b border-slate-100 flex justify-between items-center">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">Activity Feed</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{unreadCount} Unread</p>
                    </div>
                    <button
                      onClick={async () => {
                        try {
                          await Promise.all(notifications.filter((n) => !n.read).map((n) => api.put(`/notifications/${n._id}`)));
                          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                        } catch {}
                      }}
                      className="text-[10px] font-black text-blue-600"
                    >
                      Mark All Read
                    </button>
                  </div>
                  <div className="max-h-[280px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-10 px-6 text-center">
                        <p className="text-slate-400 text-xs font-semibold">No activity yet.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-50">
                        {notifications.map((n) => (
                          <div key={n._id} onClick={() => handleMarkAsRead(n._id)} className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 ${!n.read ? "bg-blue-50/30" : ""}`}>
                            <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? "bg-blue-500" : "bg-slate-200"}`} />
                            <p className={`text-xs leading-relaxed ${!n.read ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}`}>
                              {n.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hamburger — only icon, no X here */}
          <button
            onClick={() => setOpen(true)}
            className="p-2.5 bg-slate-100 rounded-xl active:scale-95 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16M4 6h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm lg:hidden">
          <div className="absolute top-0 left-0 w-full bg-white rounded-b-3xl shadow-xl overflow-hidden">

            {/* Top bar with close button */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                  TS
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900">
                  Talent<span className="text-blue-600">Sphere</span>
                </span>
              </Link>
              {/* ✅ Close X button */}
              <button
                onClick={() => setOpen(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User strip */}
            {user && (
              <div className="flex items-center gap-3 px-6 py-4 bg-slate-50/60 border-b border-slate-100">
                <img src={avatarUrl} className="w-10 h-10 rounded-xl object-cover border border-slate-200" alt="User" />
                <div>
                  <p className="text-sm font-black text-slate-900">{user.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest capitalize">{user.role}</p>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="px-4 py-3 space-y-1">
              <Link to="/" onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
                Home
              </Link>
              <Link to="/jobs" onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/jobs") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
                Explore Jobs
              </Link>

              {user?.role === "recruiter" && (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/dashboard") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
                    Analytics
                  </Link>
                  <Link to="/post-job" onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/post-job") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
                    Post a Job
                  </Link>
                </>
              )}

              {user?.role === "candidate" && (
                <>
                  <Link to="/my-applications" onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/my-applications") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
                    My Applications
                  </Link>
                  <Link to="/saved" onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/saved") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
                    Wishlist
                  </Link>
                </>
              )}

              {user && (
                <Link to="/profile" onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-bold transition ${isActive("/profile") ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
                  Profile
                </Link>
              )}

              <div className="pt-2 border-t border-slate-100">
                {user ? (
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition">
                    Sign out
                  </button>
                ) : (
                  <div className="space-y-2 pt-1">
                    <Link to="/login" onClick={() => setOpen(false)} className="block w-full px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
                      Sign in
                    </Link>
                    <Link to="/register" onClick={() => setOpen(false)} className="block w-full px-4 py-3 rounded-xl text-sm font-bold bg-slate-900 text-white text-center hover:bg-blue-600 transition">
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Backdrop click closes */}
          <div onClick={() => setOpen(false)} className="absolute inset-0 -z-10" />
        </div>
      )}
    </header>
  );
};

export default Navbar;