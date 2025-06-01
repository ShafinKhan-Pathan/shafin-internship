import { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import { getAuthorById } from "../services/Api";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [follow, setFollow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getAuthorData = async () => {
      try {
        const getAuthorResults = await getAuthorById(id);
        setAuthor(getAuthorResults);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getAuthorData();
  }, [id]);
  function checkFollow() {
    setFollow(true);
  }
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {error && (
                  <h1 className="error__message">
                    We're sorry, but our website is currently unavailable.
                    Please try again later !!
                  </h1>
                )}
                <div className="d_profile de-flex">
                  {loading ? (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width="100px"
                            height="100px"
                            borderRadius="50%"
                          />

                          <div className="profile_name">
                            <h4>
                              <Skeleton
                                width="150px"
                                height="25px"
                                borderRadius="8px"
                              />
                              <span className="profile_username">
                                <Skeleton
                                  width="125px"
                                  height="25px"
                                  borderRadius="4px"
                                />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton
                                  width="50px"
                                  height="15px"
                                  borderRadius="2px"
                                />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower"></div>
                          <Skeleton
                            width="100px"
                            height="30px"
                            borderRadius="5px"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          {follow ? (
                            <>
                              <div className="profile_follower">
                                {author.followers + 1} followers
                              </div>{" "}
                              <Link to="#" className="btn-main">
                                Unfollow
                              </Link>
                            </>
                          ) : (
                            <>
                              <div className="profile_follower">
                                {author.followers} followers
                              </div>
                              <Link
                                to="#"
                                className="btn-main"
                                onClick={checkFollow}
                              >
                                Follow
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} loading={loading} />;
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
