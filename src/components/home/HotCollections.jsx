import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(data);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

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
    infinite: collections.length > 4,
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

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="row">
              {[...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="250px" borderRadius="8px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="80%" height="20px" borderRadius="4px" />
                      <div style={{ marginTop: "8px" }}>
                        <Skeleton width="60%" height="16px" borderRadius="4px" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...settings}>
            {collections.map((collection, index) => (
              <div key={collection.nftId} style={{ padding: "5px" }}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img src={collection.nftImage || nftImage} className="lazy img-fluid" alt={collection.title} />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img className="lazy pp-coll" src={collection.authorImage || AuthorImage} alt={collection.authorName} />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>{collection.code}</span>
                  </div>
                </div>
              </div>
            ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

