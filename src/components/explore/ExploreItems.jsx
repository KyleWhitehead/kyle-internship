import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(4);
  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTrigger((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sortedItems = useMemo(() => {
    const copy = [...items];

    switch (filter) {
      case "price_low_to_high":
        return copy.sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return copy.sort((a, b) => b.price - a.price);
      case "likes_high_to_low":
        return copy.sort((a, b) => b.likes - a.likes);
      default:
        return copy;
    }
  }, [items, filter]);

  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return "No expiry";

    const diff = expiryDate - Date.now();
    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>

                <div className="de_countdown">
                  <Skeleton width="80px" height="20px" borderRadius="4px" />
                </div>

                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="250px" borderRadius="8px" />
                </div>

                <div className="nft__item_info">
                  <Skeleton width="100%" height="20px" borderRadius="4px" />
                  <div style={{ marginTop: "8px" }}>
                    <Skeleton width="60%" height="16px" borderRadius="4px" />
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    <Skeleton width="40%" height="16px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mb-4">
        <div>
          <select
            id="filter-items"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setVisibleItems(4);
            }}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {sortedItems.slice(0, visibleItems).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator ID: ${item.authorId}`}
                  >
                    <img
                      className="lazy"
                      src={item.authorImage || AuthorImage}
                      alt={item.title}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="de_countdown">
                  {formatCountdown(item.expiryDate)}
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

                  <Link to="/item-details">
                    <img
                      src={item.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to="/item-details">
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

        {visibleItems < sortedItems.length && (
          <div className="col-md-12 text-center mt-4">
            <button
              id="loadmore"
              className="btn-main lead"
              onClick={() => setVisibleItems((prev) => prev + 4)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
