const JobFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const jobTypes = [
    { label: "All Types", value: "" },
    { label: "Full Time", value: "Full-time" },
    { label: "Part Time", value: "Part-time" },
    { label: "Remote", value: "Remote" },
    { label: "Internship", value: "Internship" },
  ];

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Filters</h2>
        <button 
          onClick={() => setFilters({ keyword: "", location: "", type: "" })}
          className="text-[10px] font-bold text-blue-600 uppercase hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Location Input */}
      <div className="mb-10">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
        <div className="relative mt-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs">📍</span>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Search city..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold text-slate-700"
          />
        </div>
      </div>

      {/* Job Type Radio Group */}
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Employment Type</label>
        <div className="mt-4 space-y-3">
          {jobTypes.map((type) => (
            <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="type"
                  value={type.value}
                  checked={filters.type === type.value}
                  onChange={handleChange}
                  className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-full checked:border-blue-600 transition-all cursor-pointer"
                />
                <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
              <span className={`text-sm font-semibold transition-colors ${filters.type === type.value ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sidebar Footer Asset */}
      <div className="mt-12 p-4 bg-blue-600 rounded-2xl text-white">
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Pro Tip</p>
        <p className="text-xs font-medium mt-1 leading-relaxed">Applying to Remote roles increases your chances by 40%.</p>
      </div>
    </div>
  );
};

export default JobFilters;