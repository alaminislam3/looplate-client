import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import TopContributors from './TopContributors/TopContributors';
import ImpactOverview from './ImpactOverview/ImpactOverview';

import OurMission from './Our Mission/OurMission';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <TopContributors></TopContributors>
           <OurMission></OurMission>
           
           <ImpactOverview></ImpactOverview>
        </div>
    );
};

export default Home;