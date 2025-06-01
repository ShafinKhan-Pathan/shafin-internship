import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExplore, getExploreByFilter } from "../../services/Api";
import NftCard from "../UI/NftCard";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliceOperation, setSliceOperation] = useState(8);
  useEffect(() => {
    const getExploreData = async () => {
      try {
        const getExploreResult = await getExplore();
        setExplore(getExploreResult);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getExploreData();
  }, []);

  function getMoreNft() {
    setSliceOperation((prevCount) => prevCount + 4);
  }
  const filterNftCards = async (filter) => {
    try {
      setLoading(true);
      const filteredData =
        filter === "" ? await getExplore() : await getExploreByFilter(filter);
      setExplore(filteredData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterNftCards(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {error && (
        <h1 className="error__message">
          We're sorry, but our website is currently unavailable. Please try
          again later !!
        </h1>
      )}

      {loading ? (
        <>
          {[...Array(8)].map((_, index) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              key={index}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="100%" />
                </div>
                <div className="de_countdown"></div>

                <div className="nft__item_wrap">
                  <Link to="/item-details">
                    <Skeleton width="100%" height="200px" borderRadius="10px" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Skeleton width="100%" height="50px" borderRadius="20px" />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {explore?.slice(0, sliceOperation).map((item) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              key={item.id}
            >
              <NftCard item={item} />
            </div>
          ))}
        </>
      )}

      <div className="col-md-12 text-center">
        {sliceOperation < 16 ? (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={getMoreNft}
          >
            Load more
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ExploreItems;
