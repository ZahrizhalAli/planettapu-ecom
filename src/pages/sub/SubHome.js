import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';
import { getSub } from '../../functions/sub';
function SubHome({ match }) {
  const [sub, setSub] = useState({});

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((d) => {
      setSub(d.data.sub);
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
                {products.length} Products in {sub.name}'s Sub category
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

export default SubHome;
