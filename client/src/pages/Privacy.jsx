const LegalPage = ({ title, content }) => (
  <div className="min-h-screen bg-[#fafafa] pt-24 pb-20">
    <div className="max-w-3xl mx-auto px-6 bg-white p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-sm">
      <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-8 uppercase italic">{title}</h1>
      <div className="space-y-6 text-slate-500 font-medium leading-relaxed">
        <p className="text-sm uppercase tracking-widest font-black text-slate-300">Last Updated: May 2026</p>
        <p>At TalentSphere, your privacy is our primary protocol. We encrypt all personal identifiers and ensure that your resume data is only visible to verified recruiters you interact with.</p>
        <h3 className="text-lg font-black text-slate-900 mt-10">1. Data Encryption</h3>
        <p>All transmissions are handled via 256-bit SSL encryption to ensure that your professional journey remains yours until you decide to share it.</p>
      </div>
    </div>
  </div>
);

export default LegalPage;