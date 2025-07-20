import React from 'react';
import Banner from './Banner/Banner';
import Featured from './Featured/Featured';
import TopContributors from './TopContributors/TopContributors';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <TopContributors></TopContributors>
        </div>
    );
};

export default Home;