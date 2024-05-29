import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LeftSide from "./LeftSide";
import { API_URLS } from "../configs/urls";

interface Product {
  id: string;
  productName: string;
  productImage: string;
  productQuantity: number;
  productPrice: string;
}

const SpecialProducts: React.FC = () => {
  const [productDetail, setProductDetail] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(API_URLS.GET_PRODUCT_DATA)
      .then((res) => {
        setProductDetail(res.data.special);
      })
      .catch((errors) => {
        console.error(errors);
      });
  }, []);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <LeftSide />
          </div>
          <div className="col-md-8">
            <div className="col-md-12 contact-us py-3 px-3 mb-4">
              <p>Special Products</p>
            </div>
            {productDetail.map((result) => (
              <div key={result.id} className="col-md-12 pt-3 pb-5 border mb-4">
                <div className="row">
                  <div className="col-md-4">
                    <div className="col-md-10 m-auto mb-5">
                      <img
                        style={{ width: "100%", height: "160px" }}
                        src={`/images/${result.productImage}`}
                        alt="no img"
                      />
                    </div>
                    <div className="col-md-10 border m-auto">
                      <p className="p-2 m-0 text-center">
                        In Stock: {result.productQuantity}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="col-md-12 mb-3">
                      Date Added: 2013-06-01 08:05:32
                    </div>
                    <div className="col-md-12 mb-4">
                      <h4>{result.productName}</h4>
                    </div>
                    <div className="col-md-12 mb-4">
                      <p className="p-0 m-0">Model: {result.productName}</p>
                      <p className="m-0 p-0">
                        Manufacturer: {result.productName}
                      </p>
                    </div>
                    <div className="col-md-12 mb-4">
                      <h2 className="pro_h2">{result.productPrice}</h2>
                    </div>
                    <div className="col-md-12">
                      <Link to={`/buy-products/${result.id}`}>
                        <input
                          className="pro_input"
                          type="button"
                          value="BUY NOW"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProducts;
