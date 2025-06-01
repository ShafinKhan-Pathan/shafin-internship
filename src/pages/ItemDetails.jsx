import { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import { getItemDetailsById } from "../services/Api";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getItemDetailsData = async () => {
      try {
        const getItemDetailsResult = await getItemDetailsById(id);
        setItemDetails(getItemDetailsResult);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItemDetailsData();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {error && (
                <h1 className="error__message">
                  We're sorry, but our website is currently unavailable. Please
                  try again later !!
                </h1>
              )}
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="100%" borderRadius="2px" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        <Skeleton
                          width="75%"
                          height="50px"
                          borderRadius="2px"
                        />
                      </h2>

                      <Skeleton width="75%" height="150px" borderRadius="2px" />

                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                <Skeleton
                                  width="100%"
                                  height="50px"
                                  borderRadius="50%"
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                <Skeleton
                                  width="150px"
                                  height="20px"
                                  borderRadius="2px"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                <Skeleton
                                  width="100%"
                                  height="50px"
                                  borderRadius="50%"
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                <Skeleton
                                  width="150px"
                                  height="20px"
                                  borderRadius="2px"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>

                        <div className="nft-item-price">
                          <span>
                            {" "}
                            <Skeleton
                              width="50px"
                              height="20px"
                              borderRadius="2px"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="col-md-6 text-center" data-aos="fade">
                    <img
                      src={itemDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                      
                    />
                  </div>
                  <div className="col-md-6" data-aos="fade">
                    <div className="item_info">
                      <h2>
                        {itemDetails.title} #{itemDetails.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemDetails.likes}
                        </div>
                      </div>
                      <p>{itemDetails.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                {itemDetails.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                {itemDetails.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{itemDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
