import AllBlogsSection from "@/components/Blogs";
import HeroSection from "@/components/Hero";
import LatestBlogsSection from "@/components/Latest";
import HeroHeader from "@/components/Header";
export default function Home() {
  return (
   <>
   <HeroHeader/>
   <HeroSection/>
   <LatestBlogsSection/>
   <AllBlogsSection/>
  
   </>
  );
}
