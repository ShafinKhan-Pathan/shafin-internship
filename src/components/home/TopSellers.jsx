import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getTopSellers} from '../../services/Api'
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const topSellersData = async () => {
      try {
        const topSellersResults = await getTopSellers()
        console.log(topSellersResults);
        setTopSellers(topSellersResults);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    topSellersData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {error && (
            <h1 className="error__message">
              We're sorry, but our website is currently unavailable. Please try
              again later !!
            </h1>
          )}
          {loading ? (
            <div className="col-md-12">
              <ol className="author_list">
                {[...Array(12)].map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="author">
                        <Skeleton
                          width="100%"
                          height="50px"
                          borderRadius="100%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">
                        <Skeleton
                          width="90%"
                          height="30px"
                          borderRadius="10px"
                        />
                      </Link>
                      <span>
                        <Skeleton
                          width="70px"
                          height="20px"
                          borderRadius="2px"
                        />
                      </span>
                    </div>
                  </li>
                ))}
                ,
              </ol>
            </div>
          ) : (
            <div className="col-md-12">
              <ol className="author_list">
                {topSellers.map((elem) => (
                  <li key={elem.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${elem.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={elem.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{elem.authorName}</Link>
                      <span>{elem.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
