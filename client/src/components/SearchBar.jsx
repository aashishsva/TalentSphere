const SearchBar = ({ filters = {}, setFilters = () => {} }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-[1.5rem] p-2 sm:p-3">
      <div className="flex flex-col md:flex-row items-center gap-2">
        
        {/* Keyword Search */}
        <div className="relative flex-1 w-full group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input
            type="text"
            name="keyword"
            placeholder="Job title or keywords"
            value={filters.keyword || ""}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-4 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 font-semibold"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-slate-100" />

        {/* Location Search */}
        <div className="relative flex-1 w-full group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </span>
          <input
            type="text"
            name="location"
            placeholder="City or remote"
            value={filters.location || ""}
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-4 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 font-semibold"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-slate-100" />

        {/* Job Type Dropdown */}
        <div className="relative w-full md:w-48 group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </span>
          <select
            name="type"
            value={filters.type || ""}
            onChange={handleChange}
            className="w-full pl-11 pr-8 py-4 bg-transparent text-sm text-slate-700 outline-none appearance-none cursor-pointer font-semibold"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="remote">Remote</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>

        {/* Main Search Button */}
        {/* <button className="w-full md:w-auto bg-slate-900 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 transition-transform"><path d="m21 21-4.3-4.3"/><circle cx="11" cy="11" r="8"/></svg>
          <span>Find Jobs</span>
        </button> */}

      </div>
    </div>
  );
};

export default SearchBar;