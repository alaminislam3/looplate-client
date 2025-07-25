import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import TopContributors from './TopContributors/TopContributors';
import ImpactOverview from './ImpactOverview/ImpactOverview';
import LatestCharityRequests from './LatestCharityRequests/LatestCharityRequests';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <TopContributors></TopContributors>
           <LatestCharityRequests></LatestCharityRequests>
           <ImpactOverview></ImpactOverview>
        </div>
    );
};

export default Home;