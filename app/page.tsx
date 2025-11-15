import { FeaturedJobs } from "./components/home/featured-jobs";
import HeroSection from "./components/home/hero-section";
import { HowItWorks } from "./components/home/how-it-works";
import { JobCategories } from "./components/home/job-categories";
import { Testimonials } from "./components/home/testimonials";
import { WhyChooseUs } from "./components/home/why-choose-us";

export default function Home() {
  return (
    <div className="flex min-h-screen  flex-col items-center justify-start bg-zinc-50 font-sans dark:bg-black">
     < HeroSection />
      <JobCategories />
      <FeaturedJobs />
      <HowItWorks />
      <Testimonials />
      <WhyChooseUs />

    </div>
  );
}
