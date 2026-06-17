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
      <div className="container py-5 text-center">
        <Skeleton width="100%" height="40px" borderRadius="4px" />
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
