import { HeroSection } from "../components/HeroSection";
import { PopularDishes } from "../components/PopularDishes";
import { AboutSection } from "../components/AboutSection";
import { WorkingHours } from "../components/WorkingHours";
import { GalleryPreview } from "../components/GalleryPreview";
import { Contact } from "../components/Contact";
export function Home() {
  return (
    <div>
      <HeroSection />
      <PopularDishes />
      <AboutSection />
      <WorkingHours />
      <GalleryPreview />
      <Contact />
    </div>
  );
}
