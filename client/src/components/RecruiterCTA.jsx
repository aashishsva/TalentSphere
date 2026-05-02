const RecruiterCTA = () => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold">For Recruiters</h2>
      <p className="text-slate-500 mt-2">
        Post jobs and find top talent faster
      </p>

      <a
        href="/post-job"
        className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-bold"
      >
        Post a Job
      </a>
    </section>
  );
};

export default RecruiterCTA;