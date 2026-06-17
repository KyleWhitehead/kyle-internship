import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";


const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        const text = await response.text();

        if (!text) {
          throw new Error(`Empty response for nftId=${nftId}`);
        }

        const data = JSON.parse(text);
        console.log("Item details data:", data);
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (nftId) {
      fetchItemDetails();
    } else {
      setLoading(false);
    }
  }, [nftId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div data-aos="fade-in" id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton
                    width="100%"
                    height="400px"
                    borderRadius="8px"
                  />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="60%" height="40px" borderRadius="4px" />

                    <div className="item_info_counts" style={{ marginTop: "20px" }}>
                      <Skeleton width="150px" height="20px" borderRadius="4px" />
                    </div>

                    <div style={{ marginTop: "20px" }}>
                      <Skeleton width="100%" height="80px" borderRadius="4px" />
                    </div>

                    <div className="d-flex flex-row" style={{ marginTop: "30px" }}>
                      <div className="mr40">
                        <Skeleton width="80px" height="20px" borderRadius="4px" />
                        <div className="item_author" style={{ marginTop: "10px" }}>
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "30px" }}>
                      <Skeleton width="80px" height="20px" borderRadius="4px" />
                      <div style={{ marginTop: "10px" }}>
                        <Skeleton width="100px" height="30px" borderRadius="4px" />
                      </div>
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

  if (!item) {
    return <div className="container py-5 text-center">No item found.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {item.title} {item.nftId ? `#${item.nftId}` : ""}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes || 0}
                    </div>
                  </div>

                  <p>
                    {item.description ||
                      "No description is available for this item."}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId || ""}`}>
                            <img
                              className="lazy"
                              src={item.ownerImage || AuthorImage}
                              alt={item.ownerName || "Owner"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId || ""}`}>
                            {item.ownerName || "Unknown"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId || ""}`}>
                            <img
                              className="lazy"
                              src={item.creatorImage || AuthorImage}
                              alt={item.creatorName || "Creator"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId || ""}`}>
                            {item.creatorName || "Unknown"}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
