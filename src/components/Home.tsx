import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import HomeIng from "../images/16.png";
import Header from "./Header";
import Footer from "./Footer";
import LeftSide from "./LeftSide";

interface Product {
  id: number;
  product_name: string;
  product_price: number;
  product_image: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost/enest1/fetch_product.php")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <img className="main_img img1" src={HomeIng} alt="no img" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <LeftSide />
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12 contact-us py-3 px-3 mb-4">
                <p>FEATURED PRODUCTS</p>
              </div>
            </div>
            <div className="row">
              {data.map((result) => (
                <div className="col-md-4 mb-3" key={result.id}>
                  <div className="col-md-12 border px-2 py-3">
                    <img
                      style={{ width: "100%", height: "120px" }}
                      alt="no img"
                      src={`/images/${result.product_image}`}
                    />
                    <p className="m-0 pro_p">{result.product_name}</p>
                    <h2 className="m-0 pro_h2">{result.product_price}</h2>
                    <hr />
                    <div className="col-md-12 pro_i ps-2">
                      <i
                        className="fa fa-plus-circle icon"
                        aria-hidden="true"
                      ></i>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                      <i className="fa fa-cart-plus" aria-hidden="true"></i>
                      <Link to={`/buy-products/${result.id}`}>
                        <input
                          className="pro_input"
                          type="submit"
                          name=""
                          value="Add to cart"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Footer />
      </div>
    </>
  );
};

export default Home;
