import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from "../UI/Skeleton";

AOS.init();


const TopSellers = () => {
  const [sellers, setSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchtopSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchtopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div data-aos="fade-up" className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div data-aos="fade-up" className="col-md-12">
            <ol className="author_list">
              {loading
                ? [...Array(6)].map((_, idx) => (
                    <li key={idx}>
                      <div className="author_list_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width="120px" height="18px" borderRadius="4px" />
                        <div style={{ marginTop: "6px" }}>
                          <Skeleton width="60px" height="14px" borderRadius="4px" />
                        </div>
                      </div>
                    </li>
                  ))
                : sellers.map((seller, index) => (
                    <li key={seller.id || seller.name}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage || AuthorImage}
                            alt={seller.name}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.name}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
