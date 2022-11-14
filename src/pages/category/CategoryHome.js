import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/category';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';

function CategoryHome({ match }) {
  const [category, setCategory] = useState({});

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    getCategory(slug).then((d) => {
      setCategory(d.data);
    });
  }, []);
  return (
    <>
      <p>{JSON.stringify(category)}</p>
    </>
  );
}

export default CategoryHome;
