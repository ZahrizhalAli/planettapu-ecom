import React from 'react';
const Jumbotron = React.lazy(() => import('../components/cards/Jumbotron'));
const BestSellers = React.lazy(() => import('../components/home/BestSellers'));
const NewArrivals = React.lazy(() => import('../components/home/NewArrivals'));
const CategoryList = React.lazy(() =>
  import('../components/category/CategoryList')
);
const SubList = React.lazy(() => import('../components/sub/SubList'));
function Home() {
  return (
    <>
      <Jumbotron title={'New Arrivals'} />
      <NewArrivals />
      <Jumbotron title={'Best Sellers'} />
      <BestSellers />
      <Jumbotron title={'Categories'} />
      <CategoryList />
      <Jumbotron title={'Sub Categories'} />

      <SubList />
    </>
  );
}

export default Home;
