import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ author, loading }) => {
  const { nftCollection } = author;
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? <>{[...Array(8)].map((_, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
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
            ))}</> : <>{nftCollection?.map((items) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={items.id} data-aos="fade-up">
              <div className="nft__item" >
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={author.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${items.nftId}`}>
                    <img
                      src={items.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{items.title}</h4>
                  </Link>
                  <div className="nft__item_price">{items.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{items.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}</>}
          
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
