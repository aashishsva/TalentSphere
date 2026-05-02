import FeaturedJobs from "../components/FeaturedJobs";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import RecruiterCTA from "../components/RecruiterCTA";
import TopSkills from "../components/TopSkills";
import WhyChooseUs from "../components/WhyChooseUs";


const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedJobs />
      <HowItWorks />
      <WhyChooseUs/>
      <TopSkills />
      <RecruiterCTA />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Home;
