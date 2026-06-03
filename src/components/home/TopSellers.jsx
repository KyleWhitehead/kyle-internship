import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
    const [sellers, setSellers] = React.useState([]);

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
            }
        };

        fetchtopSellers();
    }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller, index) => (
                <li key={seller.id || seller.name}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage || AuthorImage}
                        alt={seller.name}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{seller.name}</Link>
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
