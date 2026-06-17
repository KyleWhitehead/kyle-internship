import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";


const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );

        const data = await response.json();

        console.log("Author Page Data:", data);

        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuthorData();
    }
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section">
            <div className="container py-5">
              <div className="row">
                <div className="col-md-12 mb-4 text-center">
                  <Skeleton width="100%" height="180px" borderRadius="4px" />
                </div>

                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width="120px" height="120px" borderRadius="50%" />
                        <div className="profile_name mt-3">
                          <Skeleton width="240px" height="28px" borderRadius="4px" />
                          <div style={{ marginTop: "8px" }}>
                            <Skeleton width="160px" height="18px" borderRadius="4px" />
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            <Skeleton width="220px" height="20px" borderRadius="4px" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower mb-2">
                          <Skeleton width="100px" height="20px" borderRadius="4px" />
                        </div>
                        <Skeleton width="100px" height="36px" borderRadius="6px" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-4">
                  <div className="de_tab tab_simple">
                    <div className="row">
                      {[...Array(4)].map((_, i) => (
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                          <div className="nft__item">
                            <div className="author_list_pp">
                              <Skeleton width="50px" height="50px" borderRadius="50%" />
                            </div>
                            <div className="nft__item_wrap">
                              <Skeleton width="100%" height="220px" borderRadius="8px" />
                            </div>
                            <div className="nft__item_info mt-2">
                              <Skeleton width="80%" height="18px" borderRadius="4px" />
                              <div style={{ marginTop: "8px" }}>
                                <Skeleton width="40%" height="14px" borderRadius="4px" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="container py-5 text-center">
        Author not found.
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">

              <div className="col-md-12">
                <div className="d_profile de-flex">

                  <div className="de-flex-col">
                    <div className="profile_avatar">

                      <img
                        src={author.authorImage || AuthorImage}
                        alt={author.authorName}
                      />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}

                          <span className="profile_username">
                            @{author.tag}
                          </span>

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
                            {author.address}
                          </span>

                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={() =>
                              navigator.clipboard.writeText(author.address)
                            }
                          >
                            Copy
                          </button>

                        </h4>
                      </div>

                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">

                      <div className="profile_follower">
                        {author.followers} followers
                      </div>

                      <Link to="#" className="btn-main">
                        Follow
                      </Link>

                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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
