import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

function SubList() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((d) => {
      setSubs(d.data);

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
            subs &&
            subs.map((c) => (
              <div
                key={c._id}
                className="col btn btn-outlined-primary btn-lg btn-block btn-raised"
              >
                <Link to={`/subs/${c.slug}`}>{c.name}</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default SubList;
