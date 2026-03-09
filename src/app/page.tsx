import { Appbar } from "./components/auth/Appbar";
import HeroSection from "./components/home/HeroSection";
import HomeStorySection from "./components/home/HomeStorySection";
import EventSection from "./components/home/EventSection";
import ServicesSection from "./components/home/ServiceSection";
import WhyChooseEventSystem from "./components/home/WhyChooseEventSystem";
import EventFeaturesSection from "./components/home/EventFeatureSection";
import Footer from "./components/home/Footer";


export default async function Home() {

  return (
    <div>
      <Appbar />
      {/* {JSON.stringify(session)} */}
      <div>
        <HeroSection />
        <HomeStorySection />
        <EventSection />
        <ServicesSection />
        <WhyChooseEventSystem />
        <EventFeaturesSection />
        <Footer />
      </div>
    </div>
  );
}
