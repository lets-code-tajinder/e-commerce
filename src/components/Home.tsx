import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import LeftSide from "./LeftSide";
import { API_URLS } from "../configs/urls";

interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productImage: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(API_URLS.GET_ALL_PRODUCTS)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <img className="main_img img1" src="../images/16.png" alt="no img" />
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
              {data.map((result) => {
                const img = `./images/${result.productImage}`;

                return (
                  <div className="col-md-4 mb-3" key={result.id}>
                    <div className="col-md-12 border px-2 py-3">
                      <img
                        style={{ width: "100%", height: "120px" }}
                        alt="no img"
                        src={img}
                      />
                      <p className="m-0 pro_p">{result.productName}</p>
                      <h2 className="m-0 pro_h2">{result.productPrice}</h2>
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
