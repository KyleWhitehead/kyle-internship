import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import AuthorImage from "../../images/author_thumbnail.jpg";

import nftImage from "../../images/nftImage.jpg";

const AuthorItems = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent fetching if id is missing

    if (!id) {
      setLoading(false);

      return;
    }

    const fetchAuthorItems = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
        );

        const data = await response.json();

        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author items:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("API Data")

    fetchAuthorItems();
  }, [id]);

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  // If no ID was provided in the URL or the API found nothing

  if (!id || !author) {
    return (
      <div className="container py-5 text-center">No author data found.</div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {/* Using optional chaining to prevent crashes */}

          {author.nftCollection?.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${id}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={author.authorName}
                  >
                    <img
                      className="lazy"
                      src={author.authorImage || AuthorImage}
                      alt={author.authorName}
                    />

                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>

                      <div className="nft__item_share">
                        <h4>Share</h4>

                        <a href="#!" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>

                        <a href="#!" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>

                        <a href="#!">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic item-details route if you have one, e.g., /item-details/${item.id} */}
                
                <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>

                  <div className="nft__item_price">{item.price} ETH</div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>

                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
