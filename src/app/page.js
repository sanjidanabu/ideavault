import Banner from "@/components/Banner";
import { StatsSection } from "@/components/StatsSection";
import { WorkSection } from "@/components/WorkSection";
import IdeasPage from "./ideas/page";


export default function Home() {
  return (
    <div className="">
      <Banner/>
      <IdeasPage/>
      <StatsSection/>
      <WorkSection/>
    </div>
  );
}
