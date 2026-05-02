const JobCardSkeleton = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 animate-pulse">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-100 rounded-lg w-3/4"></div>
            <div className="h-3 bg-slate-50 rounded-lg w-1/3"></div>
          </div>
        </div>
        <div className="w-10 h-10 bg-slate-50 rounded-xl"></div>
      </div>

      {/* Tags Section */}
      <div className="flex gap-2 mb-6">
        <div className="h-6 w-20 bg-slate-100 rounded-full"></div>
        <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
        <div className="h-6 w-24 bg-slate-100 rounded-full"></div>
      </div>

      {/* Skills Section */}
      <div className="flex gap-3 mb-8 border-t border-slate-50 pt-4">
        <div className="h-2 w-12 bg-slate-50 rounded"></div>
        <div className="h-2 w-12 bg-slate-50 rounded"></div>
        <div className="h-2 w-12 bg-slate-50 rounded"></div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-1">
          <div className="h-2 w-16 bg-slate-50 rounded"></div>
          <div className="h-3 w-20 bg-slate-100 rounded"></div>
        </div>
        <div className="h-10 w-28 bg-slate-100 rounded-xl"></div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;