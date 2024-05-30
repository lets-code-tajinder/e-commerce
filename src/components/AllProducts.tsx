import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import LeftSide from "./LeftSide";
import { API_URLS } from "../configs/urls";
import { httpPost } from "../utils/http";

interface Product {
  id: string;
  productImage: string;
  productQuantity: number;
  productName: string;
  productPrice: string;
}

const AllProduct: React.FC = () => {
  const { id } = useParams();

  const [productDetail, setProductDetail] = useState<Product[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await httpPost(API_URLS.GET_PRODUCTS_BY_CATEGORY_ID, {
            id,
          });
          setProductDetail(res.data.myData);
          setTitle(res.data.data.title);
        } catch (errors) {
          console.error(errors);
        }
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <LeftSide />
          </div>
          <div className="col-md-8">
            <div className="col-md-12 contact-us py-3 px-3 mb-4">
              <p>{title}</p>
            </div>
            {productDetail.map((result) => (
              <div className="col-md-12 pt-3 pb-5 border mb-4" key={result.id}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="col-md-10 m-auto mb-5">
                      <img
                        style={{ width: "100%", height: "160px" }}
                        src={`../images/${result.productImage}`}
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
                          name=""
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

export default AllProduct;
