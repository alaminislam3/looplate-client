import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import TopContributors from './TopContributors/TopContributors';
import ImpactOverview from './ImpactOverview/ImpactOverview';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <TopContributors></TopContributors>
           <ImpactOverview></ImpactOverview>
        </div>
    );
};

export default Home;