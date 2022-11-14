import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((d) => {
      setCategories(d.data);

      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {loading ? (
            <h5>loading</h5>
          ) : (
            categories &&
            categories.map((c) => (
              <div
                key={c._id}
                className="col btn btn-outlined-primary btn-lg btn-block btn-raised"
              >
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryList;
