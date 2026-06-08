import Banner from "@/Components/Banner";
import HowItWorks from "@/Components/HowItWorks";
import LatestRooms from "@/Components/LatestRooms";
import WhyChooseUs from "@/Components/WhyChooseUs";
import Image from "next/image";

export const metadata = {
  title: "Home",
};

export default function Home() {
   return (
    <div>
      <Banner></Banner>
      <LatestRooms></LatestRooms>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
