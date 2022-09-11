import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';

function Home() {
  return (
    <>
      <Jumbotron title={'New Arrivals'} />
      <NewArrivals />
      <Jumbotron title={'Best Sellers'} />
      <BestSellers />
    </>
  );
}

export default Home;
