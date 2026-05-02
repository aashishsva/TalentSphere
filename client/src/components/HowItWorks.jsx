const steps = [
  "Upload Resume",
  "Get Skill Match",
  "Apply Smartly",
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-slate-50">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl shadow text-center">
            <h3 className="font-bold text-lg">{step}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;