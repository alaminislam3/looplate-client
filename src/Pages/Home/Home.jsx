import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import TopContributors from './TopContributors/TopContributors';
import ImpactOverview from './ImpactOverview/ImpactOverview';

import OurMission from './Our Mission/OurMission';
import OurTestimonial from './Testimonial/OurTestimonial';
import Subscription from './Subscription/Subscription';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <OurMission></OurMission>
           <TopContributors></TopContributors>
           <OurTestimonial></OurTestimonial>
           <Subscription></Subscription>
           <ImpactOverview></ImpactOverview>
        </div>
    );
};

export default Home;