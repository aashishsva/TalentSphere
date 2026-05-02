const Contact = () => (
  <div className="min-h-screen bg-white pt-24 pb-20">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
      <div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">Let's <span className="text-blue-600">sync.</span></h1>
        <p className="text-slate-500 text-lg font-medium mb-10">Have questions about the protocol or need help with your enterprise account?</p>
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Support Email</p>
          <p className="text-xl font-bold text-slate-900">ops@talentsphere.io</p>
        </div>
      </div>
      <form className="space-y-6 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
        <input placeholder="Name" className="w-full bg-white p-4 rounded-2xl outline-none border border-transparent focus:border-blue-600 transition-all font-bold" />
        <input placeholder="Email" className="w-full bg-white p-4 rounded-2xl outline-none border border-transparent focus:border-blue-600 transition-all font-bold" />
        <textarea placeholder="Message" rows="4" className="w-full bg-white p-4 rounded-2xl outline-none border border-transparent focus:border-blue-600 transition-all font-bold" />
        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all">Send Transmission</button>
      </form>
    </div>
  </div>
);
export default Contact;