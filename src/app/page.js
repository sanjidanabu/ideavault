import Banner from "@/components/Banner";
import { StatsSection } from "@/components/StatsSection";
import { WorkSection } from "@/components/WorkSection";


export default function Home() {
  return (
    <div className="">
      <Banner/>
      <StatsSection/>
      <WorkSection/>
    </div>
  );
}
