import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { Appbar } from "./components/auth/Appbar";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import HeroSection from "./components/home/HeroSection";
import HomeStorySection from "./components/home/HomeStorySection";
import EventSection from "./components/home/EventSection";
import ServicesSection from "./components/home/ServiceSection";
import WhyChooseEventSystem from "./components/home/WhyChooseEventSystem";
import EventFeaturesSection from "./components/home/EventFeatureSection";
import Footer from "./components/home/Footer";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}
export default async function Home() {
  const session = await getUser();

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
