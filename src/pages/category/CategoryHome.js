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
    setLoading(true);
    getCategory(slug).then((d) => {
      setCategory(d.data.category);
      setProducts(d.data.products);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {loading ? (
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Loading..
              </h4>
            ) : (
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                {products.length} Products in {category.name}'s category
              </h4>
            )}
          </div>
        </div>
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <ProductCard product={p} loading={loading} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryHome;
