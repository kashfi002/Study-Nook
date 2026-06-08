import Banner from "@/Components/Banner";
import HowItWorks from "@/Components/HowItWorks";
import WhyChooseUs from "@/Components/WhyChooseUs";
import Image from "next/image";

export const metadata = {
  title: "Home",
};

export default function Home() {
   return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
