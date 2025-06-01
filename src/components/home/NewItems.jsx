import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNewItems } from "../../services/Api";
import Skeleton from "../UI/Skeleton";
import CustomSlider from "../UI/CustomSlider";
import NftCard from "../UI/NftCard";
const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newItemsData = async () => {
      try {
        const newItemResults = await getNewItems();
        setNewItems(newItemResults);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    newItemsData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {error && (
            <h1 className="error__message">
              We're sorry, but our website is currently unavailable. Please try
              again later !!
            </h1>
          )}
          {loading && (
            <CustomSlider>
              {[...Array(4)].map((_, index) => (
                <div className="px-2" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="100%"
                      />
                    </div>
                    <div className="de_countdown"></div>

                    <div className="nft__item_wrap">
                      <Link to="/item-details">
                        <Skeleton
                          width="100%"
                          height="200px"
                          borderRadius="10px"
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Skeleton
                        width="100%"
                        height="50px"
                        borderRadius="20px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CustomSlider>
          )}
          <CustomSlider>
            {newItems.map((item) => (
              <div className="px-2" key={item.id}>
                <NftCard item={item} />
              </div>
            ))}
          </CustomSlider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
