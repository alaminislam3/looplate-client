import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";
import TopContributors from "./TopContributors/TopContributors";
import ImpactOverview from "./ImpactOverview/ImpactOverview";
import OurMission from "./Our Mission/OurMission";
import OurTestimonial from "./Testimonial/OurTestimonial";
import Subscription from "./Subscription/Subscription";
import HowWeWork from "./HowWeWork/HowWeWork";

import Lenis from "@studio-freight/lenis";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // scroll speed control
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing function
      smoothWheel: true, // smooth scroll on wheel
      smoothTouch: false, // if you want smooth scroll on touch
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // cleanup
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <Banner />
      <Featured />
      <OurMission />
      <TopContributors />
      <OurTestimonial />
      <HowWeWork />
      <Subscription />
      <ImpactOverview />
    </div>
  );
};

export default Home;
