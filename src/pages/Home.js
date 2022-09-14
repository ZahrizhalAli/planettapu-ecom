import React from 'react';
const Jumbotron = React.lazy(() => import('../components/cards/Jumbotron'));
const BestSellers = React.lazy(() => import('../components/home/BestSellers'));
const NewArrivals = React.lazy(() => import('../components/home/NewArrivals'));

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
