const skills = ["React", "Node", "MongoDB", "JavaScript", "Tailwind"];

const TopSkills = () => {
  return (
    <section className="py-20 bg-slate-50 text-center">
      <h2 className="text-3xl font-bold mb-6">Top Skills in Demand</h2>

      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((s, i) => (
          <span key={i} className="px-4 py-2 bg-white rounded-full border">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TopSkills;