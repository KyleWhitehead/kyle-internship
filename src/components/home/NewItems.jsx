import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";


const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState({});
 
  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const { data} = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        )
        setNewItems(data);
      } catch (error) {
        console.error("Error fetching Items:", error);
      } finally {
        setLoading(false);
      }
      }
      fetchNewItems();
  }, []);

  useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(Date.now());
  }, 1000);

  return () => clearInterval(timer);
}, []);

 const formatCountdown = (expiryDate) => {
  if (!expiryDate) return "No expiry";

  const diff = expiryDate - currentTime;

  if (diff <= 0) return "Expired";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

const NextArrow = ({ onClick }) => {
    return (
      <button
        className="custom-arrow custom-next"
        onClick={onClick}
        type="button"
      >
        &#8250;
      </button>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="custom-arrow custom-prev"
        onClick={onClick}
        type="button"
      >
        &#8249;
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: newItems.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
    focusOnSelect: false,
    pauseOnFocus: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: () => {
      const active = document.activeElement;
      if (active instanceof HTMLElement) active.blur();
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
if (loading) {
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up" data-aos-duration="800">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {[...Array(4)].map((_, index) => (
            <div key={index} style={{ padding: "5px" }} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="nft__item" data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 80}>
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>

                <div className="de_countdown">
                  <Skeleton width="80px" height="20px" borderRadius="4px" />
                </div>

                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="220px" borderRadius="8px" />
                </div>

                <div className="nft__item_info">
                  <Skeleton width="80%" height="20px" borderRadius="4px" />
                  <div style={{ marginTop: "8px" }}>
                    <Skeleton width="40%" height="16px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
  return (
    <section id="section-items" className="no-bottom">
      <div  className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up" data-aos-duration="800">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">

          <Slider {...settings}>
          {newItems.map((newItem, index) => (
            <div key={newItem.id} style={{ padding: "5px" }}>
              <div className="nft__item"
                   data-aos="fade-up"
                   data-aos-duration="800"
                   data-aos-delay={index * 80}
              >
                <div className="author_list_pp">
                  <Link
                    to={`/author/${newItem.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator ID: ${newItem.authorId}`}
                    >
                    <img className="lazy" src={newItem.authorImage} alt={newItem.title} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">{formatCountdown(newItem.expiryDate)}</div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <button type="button" className="share-button">
                          <i className="fa fa-facebook fa-lg"></i>
                        </button>
                        <button type="button" className="share-button">
                          <i className="fa fa-twitter fa-lg"></i>
                        </button>
                        <button type="button" className="share-button">
                          <i className="fa fa-envelope fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${newItem.nftId}`}>
                    <img
                      src={newItem.nftImage}
                      className="lazy nft__item_preview"
                      alt={newItem.title}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${newItem.nftId}`}>
                    <h4>{newItem.nftId}</h4>
                  </Link>
                  <div className="nft__item_price">{newItem.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{newItem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
