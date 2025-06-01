import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHotCollections } from "../../services/Api";
import Skeleton from "../UI/Skeleton";
import CustomSlider from "../UI/CustomSlider";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hotCollectionData = async () => {
      try {
        const hotCollectionResult = await getHotCollections();
        setHotCollections(hotCollectionResult);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    hotCollectionData();
  }, []);
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        {error && (
          <h1 className="error__message">
            We're sorry, but our website is currently unavailable. Please try
            again later !!
          </h1>
        )}
        {loading ? (
          <CustomSlider>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="p-2">
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="200px" borderRadius="8px" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width="40px" height="40px" borderRadius="50%" />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="100px" height="16px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            ))}
          </CustomSlider>
        ) : (
          <CustomSlider>
            {hotCollections.map((collectionElement) => (
              <div key={collectionElement.id} className="p-2">
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collectionElement.nftId}`}>
                      <img
                        src={collectionElement.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collectionElement.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={collectionElement.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collectionElement.title}</h4>
                    </Link>
                    <span>ERC-{collectionElement.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </CustomSlider>
        )}
      </div>
    </section>
  );
};

export default HotCollections;
